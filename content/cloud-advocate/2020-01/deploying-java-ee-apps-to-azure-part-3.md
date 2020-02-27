---
type: post
status: new
title: 'Deploying Java EE apps to Azure: Part 3'
description: 'This is the final blog in a series of posts that explore different options for running Java EE workloads on Azure. In this part, we will run the Java EE app on a Kubernetes cluster in Azure.'
tags: ['Java EE', 'Azure', 'IaaS', 'Cloud Computing', 'Database']
author: 'Abhishek Gupta'
date: 2019-12-11
url: 'https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-3-772e717bc4d1'
translator: ''
reviewer: ''
---

# Deploying Java EE apps to Azure: Part 3


This is the final blog in a series of posts that explore different options for running Java EE workloads on Azure. In this part, we will run the Java EE app on a [Kubernetes cluster in Azure](https://docs.microsoft.com/azure/aks/?WT.mc_id=azuremedium-blog-abhishgu).

![img](https://miro.medium.com/max/60/1*-gOAml8lPYXSaU5clFltdQ.png?q=20)

![img](https://miro.medium.com/max/980/1*-gOAml8lPYXSaU5clFltdQ.png)

The previous parts covered how to deploy a Java EE application to an application server which is set up in a [Virtual Machine on Microsoft Azure](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=azuremedium-blog-abhishgu)as well as a Docker container in [Azure Container Instances](https://docs.microsoft.com/azure/container-instances/?WT.mc_id=azuremedium-blog-abhishgu).

- [Part 1: Using Payara Server in a VM](https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-1-e895284b46d1)
- [Part 2: Using Docker container](https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-2-37d73d0ee401)

The example used in the blog post is a simple three-tier application that uses Java EE 8 specifications such as JAX-RS, EJB, CDI, JPA, JSF, Bean Validation. We will use the [Payara Server](https://www.payara.fish/) to deploy the application and use [PostgreSQL](https://www.postgresql.org/) as the relational database.

During the course of the tutorial, we will cover:

- Postgres setup on Azure
- Setup and configure Azure Kubernetes Service cluster and Azure Container Registry
- Dockerize the Java EE app
- Deploy the application to Kubernetes
- Explore its functionality

> *Except for minor changes, the application used in this tutorial has been adapted from* [*this project*](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) *by* [*Reza Rahman*](https://twitter.com/reza_rahman)

------

# Pre-requisites

You will need a [Microsoft Azure account](https://docs.microsoft.com/azure/?WT.mc_id=azuremedium-blog-abhishgu) and the [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=azuremedium-blog-abhishgu) to work through the tutorial.

If you don’t have a Microsoft Azure account, go ahead and [sign up for a free one!](https://azure.microsoft.com/free/?WT.mc_id=azuremedium-blog-abhishgu). The Azure CLI is a cross-platform command-line experience for managing Azure resources — please install it using [these instructions](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=azuremedium-blog-abhishgu).

# First things first…

Set your Azure Subscription ID using the Azure CLI which will be used for this tutorial.

To set your Azure subscription ID

```
export AZURE_SUBSCRIPTION_ID=[to be filled]
az account set --subscription $AZURE_SUBSCRIPTION_ID
```

Create a resource group that will contain all the services (resources) which you will create as a part of this tutorial. A resource group is like a logical container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group.

To create a resource group

```
export AZURE_RESOURCE_GROUP_NAME=[to be filled]export AZURE_LOCATION=[to be filled]
az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

------

# Install Postgres on Azure

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=azuremedium-blog-abhishgu) is a relational database service based on the open-source [Postgres database engine](https://www.postgresql.org/). It’s a fully managed database-as-a-service offering which is available in two deployment options, as [a single server](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=azuremedium-blog-abhishgu) and as [a Hyperscale (Citus) cluster](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=azuremedium-blog-abhishgu)

> *We will be using the single server option for the purposes of this tutorial*

We will use the `az postgres server create`command to create a Postgres server instance on Azure. First, set up some of the server properties such as the name, admin user, etc.

```
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
export SKU=B_Gen5_1
export STORAGE=5120
```

> *For storage and SKU options, please refer to* [*the documentation*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=azuremedium-blog-abhishgu)

And, then invoke the command to initiate the database instance creation:

```
az postgres server create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME  --location $AZURE_LOCATION --admin-user $AZURE_POSTGRES_ADMIN_USER --admin-password $AZURE_POSTGRES_ADMIN_PASSWORD --storage-size $STORAGE --sku-name $SKU
```

The provisioning process will take a few minutes.

To check the details of the Postgres database instance you just provisioned, invoke `az postgres server show` command

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

You should get a JSON response. Please note down the value for the `fullyQualifiedDomainName` attribute as you will be using this to connect to the Postgres instance later.

> *It should be of the format:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

------

# Azure Kubernetes Service (AKS) setup

You need the `az aks create` command to stand up a Kubernetes cluster on Azure

> *To keep things simple, the below command creates a single node cluster. Feel free to change the specification as per your requirements*

```
export AKS_CLUSTER_NAME=[to be filled]az aks create --resource-group $AZURE_RESOURCE_GROUP --name $AKS_CLUSTER_NAME --node-count 1 --node-vm-size Standard_B2s --node-osdisk-size 30 --generate-ssh-keys
```

Get the AKS cluster credentials using `az aks get-credentials` - as a result, `kubectl` will now point to your new cluster. You can confirm the same

```
az aks get-credentials --resource-group $AZURE_RESOURCE_GROUP --name $AKS_CLUSTER_NAMEkubectl get nodes
```

> *If you are interested in learning Kubernetes and Containers using* [*Azure*](https://azure.microsoft.com/services/kubernetes-service/?WT.mc_id=azuremedium-blog-abhishgu)*, simply* [*create a* ***free\****account*](https://azure.microsoft.com/en-us/free/?WT.mc_id=azuremedium-blog-abhishgu) *and get going! A good starting point is to use the* [*quickstarts, tutorials and code samples*](https://docs.microsoft.com/azure/aks/?WT.mc_id=azuremedium-blog-abhishgu) *in the documentation to familiarize yourself with the service. I also highly recommend checking out the* [*50 days Kubernetes Learning Path*](https://azure.microsoft.com/resources/kubernetes-learning-path/?WT.mc_id=azuremedium-blog-abhishgu)*. Advanced users might want to refer to* [*Kubernetes best practices*](https://docs.microsoft.com/azure/aks/best-practices?WT.mc_id=azuremedium-blog-abhishgu) *or the watch some of the* [*videos*](https://azure.microsoft.com/resources/videos/index/?services=kubernetes-service&WT.mc_id=azuremedium-blog-abhishgu) *for demos, top features and technical sessions.*

## Allow AKS to access the Postgres database

The Postgres database is not accessible to external services by default. We can use the `az postgres server firewall-rule create` command to create a firewall rule to explicitly allow Azure services to access the Postgres instance. This will allow the JavaEE application deployed in AKS to communicate with Postgres.

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnAKSaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server-name $AZURE_POSTGRES_SERVER_NAME --start-ip-address=0.0.0.0 --end-ip-address=0.0.0.0 --name $FIREWALL_RULE_NAME
```

> *Note: This setting allows network connections from all IPs within the Azure network. For production use, try to configure the most restrictive firewall rules possible*

------

# Setup Azure Container Registry

Azure Container Registry is a managed, private Docker registry service to store and manage your private Docker container images (it based on the open-source Docker Registry 2.0). You can use Azure container registries with your existing container development and deployment pipelines, or use [Azure Container Registry Tasks](https://docs.microsoft.com/azure/container-registry/container-registry-tasks-overview?WT.mc_id=azuremedium-blog-abhishgu) to build container images in Azure. You can either build on-demand, or fully automate builds with triggers such as source code commits and base image updates.

Let’s create a registry to store the Docker image for the JavaEE application. We will use the `az acr create`command

```
export ACR_NAME=[to-be-filled]az acr create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $ACR_NAME --sku Basic --admin-enabled true
```

> *We are using the* `*Basic*` *SKU. Valid value are:* `*Basic*`*,* `*Classic*`*,* `*Premium*`*,* `*Standard*`

You can log in to the registry once it’s created and check the login server

```
az acr login --name $ACR_NAME
az acr show --name $ACR_NAME --query loginServer --output table
```

> *You will use the ACR login server name soon. Its value follows the format:* `*[ACR_NAME].azurecr.io*`

## Configure Azure Container Registry to work with Azure Kubernetes Service

To access images stored in `Azure Container Registry`, you must grant the `Azure Kubernetes Service` service principal the correct rights to pull images from ACR.

Get the `appId` of the service principal which is associated with your AKS cluster

```
AKS_SERVICE_PRINCIPAL_APPID=$(az aks show --name $AKS_CLUSTER_NAME --resource-group $AZURE_RESOURCE_GROUP --query servicePrincipalProfile.clientId -o tsv)
```

Find the resource ID for Azure Container Registry

```
ACR_RESOURCE_ID=$(az acr show --resource-group $AZURE_RESOURCE_GROUP --name $ACR_NAME --query "id" --output tsv)
```

Grant `acrpull` permissions to AKS service principal

```
az role assignment create --assignee $AKS_SERVICE_PRINCIPAL_APPID --scope $ACR_RESOURCE_ID --role acrpull
```

Our AKS cluster along with ACR is ready to use!

------

# Setup and prepare application image

Clone the git repository

```
git clone https://github.com/abhirockzz/javaee-on-azure-kubernetes
cd javaee-on-azure-kubernetes
```

You need to enter the Postgres connectivity information to the ``attribute of the ` section in `web.xml`.

> *You can find the* `*web.xml*` *file under* `*javaee-on-azure-iaas/src/main/webapp/WEB-INF*`

The format is as follows:

```
jdbc:postgresql://[POSTGRES_FQDN]:5432/postgres?user=[AZURE_POSTGRES_ADMIN_USER]@[AZURE_POSTGRES_SERVER_NAME]&amp;password=[AZURE_POSTGRES_ADMIN_PASSWORD]&amp;sslmode=require
```

Here are the list placeholders which form a part of the JDBC URL:

- `POSTGRES_FQDN` with value of `fullyQualifiedDomainName`
- `AZURE_POSTGRES_ADMIN_USER` with admin user name used to provision PG
- `AZURE_POSTGRES_SERVER_NAME` with server name used to provision PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` with admin password used to provision PG

Set the required values

```
export POSTGRES_FQDN=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
```

Simply use these commands to replace

```
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
```

Here is an e.g. of what the `` section will look like:

```
<data-source>
        <name>java:global/JavaEECafeDB</name>
        <class-name>org.postgresql.ds.PGPoolingDataSource</class-name>
        <url>jdbc:postgresql://foobar-pg.postgres.database.azure.com:5432/postgres?user=foobar@foobar-pg&amp;password=foobarbaz&amp;sslmode=require</url>
    </data-source>
```

The application is now configured. Let’s build it!

```
mvn clean install
```

You should have the WAR file available. To confirm

```
ls -lrt target | grep javaee-cafe.war
```

## Build and push the image to Azure Container Registry

Our application artifact (`WAR` file) is ready. We can now build the Docker image and push it out to Azure Container Registry. Here is a quick look at the Dockerfile used for this

```
FROM payara/server-full
COPY target/javaee-cafe.war $DEPLOY_DIR
RUN wget https://jdbc.postgresql.org/download/postgresql-42.2.8.jar
RUN cp /opt/payara/postgresql-42.2.8.jar ${PAYARA_DIR}/glassfish/domains/${DOMAIN_NAME}/lib && rm /opt/payara/postgresql-42.2.8.jar
EXPOSE 8080
```

It builds on top of the base image for `payara/server-full`, copies the `WAR`file to a folder from where it can be automatically detected and deployed, downloads the Postgres JDBC driver and places it in the appropriate location for the Payara application server. That's it!

```
export DOCKER_IMAGE=javaee-cafe
docker build -t $DOCKER_IMAGE .
docker tag $DOCKER_IMAGE $ACR_NAME.azurecr.io/$DOCKER_IMAGE
```

To push the image

```
docker push $ACR_NAME.azurecr.io/$DOCKER_IMAGE
```

For e.g., if the `ACR_NAME` (name of the Azure Container Registry) is `javaeecafe-acr`, the resulting Docker image will be `javaeecafe-acr.azurecr.io/javaee-cafe`

Use `az acr repository list` command to check the image.

```
az acr repository list --name $ACR_NAME --output table
```

------

# Deploy the application to Azure Kubernetes Service

Before deploying the application, please update the Kubernetes manifest file `javaee-cafe.yaml` with the name of the Docker image. To be specific, update the `spec.containers.image` with the name of the Azure Container Registry which you specified above

> *It is assumed that the name of the Docker image is* `*javaee-azure*`*, if not please update that as well*

```
spec:
  containers:
    - name: javaee-cafe
      image: <replace_me>.azurecr.io/javaee-azure
```

For e.g.

```
spec:
  containers:
    - name: javaee-cafe
      image: javaeecafe-acr.azurecr.io/javaee-azure
```

To deploy the application

```
kubectl apply -f javaee-cafe.yml
```

This should spin up a `Pod`. Wait for it to transition to `Running` state.

```
kubectl get pods -l=app=javaee-cafe -w
```

Once the `Pod` is `Running`, confirm that the application has been deployed successfully

```
kubectl logs -f <replace_with_pod_name>
```

The application deployment should be in progress and finally, you should see the logs similar to the one below (with the `Successfully autodeployed`message)

```
[AutoDeploy] Successfully autodeployed : /foo/bar/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

------

# Explore the application

We use a `LoadBalancer` `Service` type to ensure that our Java EE app is accessible outside of the cluster. The creation of a Kubernetes `LoadBalancer``Service` in Azure does exactly what it's supposed to i.e. provision an [Azure Load Balancer](https://docs.microsoft.com/azure/load-balancer/?WT.mc_id=azuremedium-blog-abhishgu) behind the scenes.

```
apiVersion: v1
kind: Service
metadata:
  name: javaee-cafe
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: javaee-cafe
```

We can get the load balancer IP by using

```
kubectl get svc javaee-cafe
```

> *where* `*javaee-cafe*` *is the name of the* `*Service*`

The value of the `EXTERNAL-IP` is the load balancer IP and will be used to access the application

## Access the JSF front end

Use your browser to access `http://[LOAD_BALANCER_IP]/javaee-cafe`. You can use the UI to create, delete and see coffees.

![img](https://miro.medium.com/max/60/1*rbEWA7qQYoqUKAtCfqLdZQ.png?q=20)

![img](https://miro.medium.com/max/5944/1*rbEWA7qQYoqUKAtCfqLdZQ.png)

## Use the REST API

The application also exposes a REST API for creating, deleting and listing coffees.

```
export JAVAEE_AKS_REST=http://[LOAD_BALANCER_IP]/javaee-cafe/rest/coffees
```

e.g.

```
export JAVAEE_AKS_REST=http://23.101.24.139/javaee-cafe/rest/coffees
```

Create coffees

```
curl -X POST $JAVAEE_AKS_REST -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"curl -X POST $JAVAEE_AKS_REST -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

Get all coffees

```
curl -H "Accept: application/json" $JAVAEE_AKS_REST
```

You should see a JSON response listing both the coffee options you just added

Get a coffee by ID

```
curl -H "Accept: application/json" $JAVAEE_AKS_REST/1
```

Delete a coffee by ID

```
curl -X DELETE $JAVAEE_AKS_REST/1
curl -H "Accept: application/json" $JAVAEE_AKS_REST
```

Notice that `cappuccino` is now deleted

## Scale

Right now, we have one instance of our application since we had set `spec.replicas` to `1` in the Kubernetes manifest. We can scale our application horizontally and Kubernetes will ensure that it spins up and maintains the required number of `Pod`s. To add another instance

```
kubectl scale deployment javaee-cafe --replicas=2
```

To confirm that another `Pod` has been spun up:

```
kubectl get pods -l=app=javaee-cafe -w
```

You can continue accessing the application in the same manner and now the requests will be transparently load balanced amongst your app instances by the Load Balancer.

------

# Clean up resources

Once you are done exploring the application, you can delete the resources. Since we used a resource group, it’s as easy as executing a single command.

> *Please be aware that this will delete all the resources in the group which includes the ones you created as part of the tutorial as well as any other service instances you might have if you used an* already existing *resource group*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

# Summary

You learned how to leverage Docker containers to package your Java EE application and deploy it to a Kubernetes cluster in Azure along with a managed database offering for long term persistence.

That brings us to the end of this series exploring some of the common ways of deploying Java EE workloads to Azure. I hope you found it useful! 🙌

<ContentMeta />
