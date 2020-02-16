---
type: post
status: new
title: 'Deploying Java EE apps to Azure: Part 2'
description: 'This is the second blog in a series of posts that will walk you through the options of running Java EE applications on Azure. In this part, we will run the Java EE app as a Docker container on Azure Container Instances.'
tags: ['Java EE', 'Azure', 'IaaS', 'Cloud Computing', 'Database']
author: 'Abhishek Gupta'
date: 2019-12-06
url: 'https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-2-37d73d0ee401'
translator: ''
---

# Deploying Java EE apps to Azure: Part 2

<ContentMeta />

This is the second blog in a series of posts that will walk you through the options of running Java EE applications on Azure. [The first part](https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-1-e895284b46d1) provided details on how to deploy a Java EE app to an application server which is set up in a [Virtual Machine on Microsoft Azure](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=medium-blog-abhishgu) along with the [Azure Database for PostgreSQL](https://azure.microsoft.com/services/postgresql/?WT.mc_id=medium-blog-abhishgu) service as the backend database.

In this part, we will run the Java EE app as a Docker container on [Azure Container Instances](https://azure.microsoft.com/services/container-instances/?WT.mc_id=medium-blog-abhishgu). The example used in this blog is a simple three-tier application that uses Java EE 8 specifications such as JAX-RS, EJB, CDI, JPA, JSF, Bean Validation. We will use the [Payara Server](https://www.payara.fish/) to deploy the application and use [PostgreSQL](https://www.postgresql.org/) as the relational database.

![img](https://miro.medium.com/max/60/1*-gOAml8lPYXSaU5clFltdQ.png?q=20)

![img](https://miro.medium.com/max/980/1*-gOAml8lPYXSaU5clFltdQ.png)

During the course of the tutorial, we will cover:

- Postgres setup on Azure
- Dockerize the Java EE app and setup Azure Container Registry to store the Docker image
- Deploy the application to Azure Container Instances
- Explore its functionality

> *Except for minor changes, the application used in this tutorial has been adapted from* [*this project*](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) *by* [*Reza Rahman*](https://twitter.com/reza_rahman)

------

# Pre-requisites

You will need a [Microsoft Azure account](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) and the [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) to work through the tutorial.

If you don’t have a Microsoft Azure account, go ahead and [sign up for a free one!](https://azure.microsoft.com/free/?WT.mc_id=medium-blog-abhishgu). The Azure CLI is a cross-platform command-line experience for managing Azure resources — please install it using [these instructions](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu).

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
export AZURE_RESOURCE_GROUP_NAME=[to be filled]
export AZURE_LOCATION=[to be filled]
az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

------

# Install Postgres on Azure

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) is a relational database service based on the open-source [Postgres database engine](https://www.postgresql.org/). It’s a fully managed database-as-a-service offering which is available in two deployment options, as [a single server](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu) and as [a Hyperscale (Citus) cluster](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)

> *We will be using the single server option for the purposes of this tutorial*

We will use the `az postgres server create`command to create a Postgres server instance on Azure. First, set up some of the server properties such as the name, admin user, etc.

```
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
export SKU=B_Gen5_1
export STORAGE=5120
```

> *For storage and SKU options, please refer to* [*the documentation*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=medium-blog-abhishgu)

And, then invoke the command to initiate the database instance creation:

```
az postgres server create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME  --location $AZURE_LOCATION --admin-user $AZURE_POSTGRES_ADMIN_USER --admin-password $AZURE_POSTGRES_ADMIN_PASSWORD --storage-size $STORAGE --sku-name $SKU
```

The provisioning will take a few minutes.

To check the details of the Postgres database instance you just provisioned, invoke `az postgres server show` command:

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

You should get a JSON response. Please note down the value for the `fullyQualifiedDomainName` attribute as you will be using this to connect to the Postgres instance later.

> *It should be of the format:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

## Allow Azure Container Instances to access the Postgres database

Later in the post, we will see how to deploy the application to [Azure Container Instances](https://docs.microsoft.com/azure/container-instances/?WT.mc_id=medium-blog-abhishgu). But, the Postgres database is not accessible to external services by default. We will use the `az postgres server firewall-rule create` command to create a firewall rule to explicitly allow Azure services to access the Postgres instance — this will allow the JavaEE application deployed within Azure Container Instances to communicate with Postgres.

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnACIaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server-name $AZURE_POSTGRES_SERVER_NAME --start-ip-address=0.0.0.0 --end-ip-address=0.0.0.0 --name $FIREWALL_RULE_NAME
```

> *This setting allows network connections from all IPs within the Azure network. For production use, try to configure the most restrictive firewall rules possible*

------

# Setup Azure Container Registry

Azure Container Registry is a managed, private Docker registry service to store and manage your private Docker container images (it based on the open-source Docker Registry 2.0). You can use Azure container registries with your existing container development and deployment pipelines or use [Azure Container Registry Tasks](https://docs.microsoft.com/azure/container-registry/container-registry-tasks-overview?WT.mc_id=medium-blog-abhishgu) to build container images in Azure. You can either build on-demand, or fully automate builds with triggers such as source code commits and base image updates.

Let’s create a registry to store the Docker image for the JavaEE application. We will use the `az acr create`command

```
export ACR_NAME=javaeecafe-acraz acr create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $ACR_NAME --sku Basic --admin-enabled true
```

> *We are using the* `*Basic*` *SKU. Valid value are:* `*Basic*`*,* `*Classic*`*,* `*Premium*`*,* `*Standard*`

You can login to the registry once it’s created and check the login server

```
az acr login --name $ACR_NAME
az acr show --name $ACR_NAME --query loginServer --output table
```

> *You will use the ACR login server name soon. It’s value follows the format:* `*[ACR_NAME].azurecr.io*`

------

# Setup and prepare application image

Clone the git repository

```
git clone https://github.com/abhirockzz/javaee-on-azure-caas
cd javaee-on-azure-caas
```

You need to enter the Postgres connectivity information to the ``attribute of the ` section in `web.xml`.

> *You can find the* `*web.xml*` *file under* `*javaee-on-azure-iaas/src/main/webapp/WEB-INF*`

The format is as follows:

```
jdbc:postgresql://[POSTGRES_FQDN]:5432/postgres?user=[AZURE_POSTGRES_ADMIN_USER]@[AZURE_POSTGRES_SERVER_NAME]&amp;password=[AZURE_POSTGRES_ADMIN_PASSWORD]&amp;sslmode=require
```

Here are the list placeholders which form a part of the JDBC URL:

- `POSTGRES_FQDN` with value of `fullyQualifiedDomainName`
- `AZURE_POSTGRES_ADMIN_USER` with the admin user name used to provision PG
- `AZURE_POSTGRES_SERVER_NAME` with server name used to provision PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` with admin password used to provision PG

Set the required values

```
export POSTGRES_FQDN=
export AZURE_POSTGRES_ADMIN_USER=
export AZURE_POSTGRES_SERVER_NAME=
export AZURE_POSTGRES_ADMIN_PASSWORD=
```

Simply use these commands to replace the contents of `web.xml`

```
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
```

Here is an example of what the `` section will look like:

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

Our application artifact (`WAR` file) is ready. We can now build the Docker image and push it out to Azure Container Registry. Here is a quick look at the `Dockerfile` used for creating the image

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

To push the image:

```
docker push $ACR_NAME.azurecr.io/$DOCKER_IMAGE
```

Use `az acr repository list` command to confirm:

```
az acr repository list --name $ACR_NAME --output table
```

------

# Deploy the application to Azure Container Instances

Azure Container Instances allows you to run a container in Azure, without having to manage any VMs and or adopt a higher-level service. It is a solution for any scenario that can operate in isolated containers, including simple applications, task automation, and build jobs. For scenarios where you need full container orchestration, including service discovery across multiple containers, automatic scaling, and coordinated application upgrades, please take a look at [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/services/kubernetes-service/?WT.mc_id=medium-blog-abhishgu).

We are now ready to deploy the JavaEE application to Azure Container Instances. When you create a container instance, you can specify a custom DNS name label so your application is reachable at [*customlabel.azureregion.azurecontainer.io*](http://customlabel.azureregion.azurecontainer.io/).

```
export ACI_CONTAINER_NAME=javaee-cafe
export DNS_NAME_LABEL=javaee-cafe
```

We will need the password for Azure Container Registry to run our Docker image in Azure Container Instance.

```
az acr credential show --name $ACR_NAME
```

Enter below command to create the container and enter the password (obtained above) when prompted:

```
az container create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $ACI_CONTAINER_NAME --image $ACR_NAME.azurecr.io/$DOCKER_IMAGE --dns-name-label $DNS_NAME_LABEL --registry-username $ACR_NAME --ports 8080
```

> `*--ports 8080*` *ensures that we can access the application from port* `*8080*`*. This is because Payara application server serves HTTP traffic on port* `*8080*`*by default.*

The deployment will take a while. In the meanwhile, you can track the logs using:

```
az container attach -g $AZURE_RESOURCE_GROUP_NAME -n $ACI_CONTAINER_NAME
```

You should see log messages indicating successful deployment of the `javaee-cafe` application

```
[yyyy-mm-ddT13:34:21.317+0000] [Payara 5.193] [INFO] [NCLS-DEPLOYMENT-02035] [javax.enterprise.system.tools.deployment.autodeploy] [tid: _ThreadID=104 _ThreadName=payara-executor-service-scheduled-task] [timeMillis: 1574084061317] [levelValue: 800] [[
    [AutoDeploy] Successfully autodeployed : /home/abhishgu/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

------

# Explore the application

## Access the JSF front end

Use your browser to access `http://[APP_FQDN]:8080/javaee-cafe`. You can use the UI to create, delete and see coffees.

The `APP_FQDN` is nothing but the combination of the DNS label and the Azure region e.g. `http://javaee-cafe.southeastasia.azurecontainer.io:8080/javaee-cafe`

![img](https://miro.medium.com/max/60/1*rbEWA7qQYoqUKAtCfqLdZQ.png?q=20)

![img](https://miro.medium.com/max/5944/1*rbEWA7qQYoqUKAtCfqLdZQ.png)

Java EE cafe

## Use the REST API

The application also exposes a REST API for creating, deleting and listing coffees.

```
export JAVAEE_ACI_REST=http://javaee-cafe.southeastasia.azurecontainer.io:8080/javaee-cafe/rest/coffees
```

Create coffees

```
curl -X POST $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"curl -X POST $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

Get all coffees

```
curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees
```

You should see a JSON response listing both the coffee options you just added

Get a coffee by ID

```
curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees/1
```

Delete a coffee by ID

```
curl -X DELETE $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees/1curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees
```

Notice that `cappuccino` is now deleted

## Clean up resources

Once you have finished exploring the application, you can delete the resources. Since we used a resource group, it's easy executing a single command.

> *Please be aware that this will delete all the resources in the group which includes the ones you created as part of the tutorial (Azure Container Registry, Postgres etc.) as well as any other service instances you might have if you used an* already existing *resource group*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

------

# Summary

You learned how to leverage Docker containers to package and deploy the application to Azure Container Instances along with a managed database offering for long term persistence.

The third installment will cover [Kubernetes](https://kubernetes.io/) as a deployment platform for our Java EE application. Stay tuned!