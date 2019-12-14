---
title: 'Deploying Java EE apps to Azure: Part 1'
description: 'There are a multitude of options for cloud based application development ranging from traditional IaaS (Infrastructure-as-a-Service), PaaS (Platform-as-a-Service) and CaaS (Containers-as-a-Service) all the way to Kubernetes and Serverless (and probably some more which I might be missing!). Think of it as a spectrum rather than a “one size fits all model”, with each option having its pros and cons. Ultimately, every scenario is unique and the final choice is driven by requirements — but its always good to know that you have “choices” at your disposal!'
tags: ['Java EE', 'Azure', 'IaaS', 'Cloud Computing', 'Database']
author: 'Abhishek Gupta'
---

# Deploying Java EE apps to Azure: Part 1

<TagLinks />

There are a multitude of options for cloud based application development ranging from traditional `IaaS` (Infrastructure-as-a-Service), `PaaS`(Platform-as-a-Service) and `CaaS` (Containers-as-a-Service) all the way to [Kubernetes](https://kubernetes.io/) and `Serverless` (and probably some more which I might be missing!). Think of it as a spectrum rather than a “one size fits all model”, with each option having its pros and cons. Ultimately, every scenario is unique and the final choice is driven by requirements — but its always good to know that you have “choices” at your disposal!

![img](https://miro.medium.com/max/60/0*v9YZMVTbaw9xoV70.png?q=20)

![img](https://miro.medium.com/max/980/0*v9YZMVTbaw9xoV70.png)

This is the first of a series of blogs that will walk you through one of the options of running Java EE applications on Azure. We will follow the most basic approach for deploying our Java EE app to an application server which is set up in a [Virtual Machine on Microsoft Azure](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=medium-blog-abhishgu) along with the [Azure Database for PostgreSQL](https://azure.microsoft.com/services/postgresql/?WT.mc_id=medium-blog-abhishgu) service as the backend database. In essence, this is the combination of `IaaS` (Azure VM) along with a `PaaS` (managed PostgreSQL on Azure)

> *Other options such as containers and Kubernetes will be covered in upcoming posts*

The example used in the blog post is a simple three-tier application that uses Java EE 8 specifications such as JAX-RS, EJB, CDI, JPA, JSF, Bean Validation. We will use the [Payara Server](https://www.payara.fish/) to deploy the application and use [PostgreSQL](https://www.postgresql.org/) as the relational database.

During the course of the tutorial, we will cover:

- Postgres and Virtual machine setup on Azure
- Setup Payara server on the Virtual machine
- Configure and install the Java EE application
- Explore its functionality

Except for minor changes, the application used in this tutorial has been adapted from [this project](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) by [Reza Rahman](https://twitter.com/reza_rahman)

# Pre-requisites

You will need a [Microsoft Azure account](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) and the [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) to work through the tutorial.

If you don’t have a Microsoft Azure account, go ahead and [sign up for a free one!](https://azure.microsoft.com/free/?WT.mc_id=medium-blog-abhishgu) The Azure CLI is a cross-platform command-line experience for managing Azure resources — please install it using [these instructions](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu).

# First things first…

Set your Azure Subscription ID using the Azure CLI which will be used for this tutorial.

To set your Azure subscription ID

```
export AZURE_SUBSCRIPTION_ID=[to be filled]az account set --subscription $AZURE_SUBSCRIPTION_ID
```

Create a resource group that will contain all the services (resources) which you will create as a part of this tutorial. A resource group is like a logical container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group.

To create a resource group

```
export AZURE_RESOURCE_GROUP_NAME=[to be filled]
export AZURE_LOCATION=[to be filled]az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

# Install PostgreSQL on Azure

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) is a relational database service based on the open-source [Postgres database engine](https://www.postgresql.org/). It’s a fully managed database-as-a-service offering which is available in two deployment options, as [a single server](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu), and as [a Hyperscale (Citus) cluster](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)

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

The provisioning process will take a few minutes.

To check the details of the Postgres database instance you just provisioned, invoke `az postgres server show` command

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

You should get a JSON response. Please note down the value for the `fullyQualifiedDomainName` attribute as you will be using this to connect to the Postgres instance later.

> *It should be of the format:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

------

# Install Virtual Machine on Azure

We will use a [Virtual machine](https://docs.microsoft.com/azure/virtual-machines/?WT.mc_id=medium-blog-abhishgu) on Azure to host the Payara JavaEE application server. To be specific, this will be a Ubuntu based Linux VM.

Let’s start by setting up the required information for the VM

```
export AZURE_VM_NAME=[to be filled]
export AZURE_VM_USER=[to be filled]
export AZURE_VM_PASSWORD=[to be filled]
export VM_IMAGE=UbuntuLTS
```

We will use the `az vm create` command to create the VM instance

```
az vm create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME --image $VM_IMAGE --admin-username $AZURE_VM_USER --admin-password $AZURE_VM_PASSWORD
```

The VM provisioning will take a few minutes.

You need to get the public IP address of the VM. Do so using the `az vm list-ip-addresses` command

```
az vm list-ip-addresses --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

You will see a JSON response — take a look at the `publicIpAddresses`section and note down the value of the`ipAddress` property. Configure it as an environment variable as you will be using it in the subsequent steps

```
export VM_IP=[to be filled]
```

## Allow VM to access the Postgres database

The Postgres database is not accessible by default. Use the `az postgres server firewall-rule create` command to create a firewall rule to explicitly allow the VM to access the Postgres instance. This will allow the JavaEE application deployed inside the VM to communicate with Postgres.

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnVMaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server $AZURE_POSTGRES_SERVER_NAME --name $FIREWALL_RULE_NAME --start-ip-address $VM_IP --end-ip-address $VM_IP
```

------

# Install Payara server on the Virtual Machine

[Payara Server](http://www.payara.fish/) is an open source application server derived from [GlassFish](https://javaee.github.io/glassfish/)that supports reliable and secure deployments of Java EE ([Jakarta EE](https://jakarta.ee/)) and [MicroProfile](https://microprofile.io/)applications in any environment: on-premise, in the cloud or hybrid.

> *Check out the project on* [*GitHub*](https://github.com/payara/Payara) *or dive into* [*its documentation*](https://docs.payara.fish/) *to learn more!*

SSH into the Linux VM you just provisioned using the username and VM IP

```
ssh $AZURE_VM_USER@$VM_IP
```

Enter the password once prompted. Once you’re logged into the Virtual Machine, proceed with the next steps.

## Install required toolset

Before installing the Payara server, we need to set up a few things such as JDK, etc.

```
sudo apt-get update
sudo apt install openjdk-8-jdk
sudo apt install maven
```

## Setup Payara server

We are using Payara server version `5.193.1` which is the latest at the time of writing this tutorial. The setup simply involves downloading and extracting the server zip file.

```
export PAYARA_VERSION=5.193.1wget https://s3-eu-west-1.amazonaws.com/payara.fish/Payara+Downloads/$PAYARA_VERSION/payara-$PAYARA_VERSION.zipsudo apt install unzip
unzip payara-$PAYARA_VERSION.zip
```

To confirm, run `ls ~/payara5/`

Start the server using `asadmin`

```
~/payara5/bin/asadmin start-domain
```

It will take a few moments for the server to boot up. You should see the following logs:

```
Waiting for domain1 to start ..................
Successfully started the domain : domain1
domain  Location: /home/abhishgu/payara5/glassfish/domains/domain1
Log File: /home/abhishgu/payara5/glassfish/domains/domain1/logs/server.log
Admin Port: 4848
Command start-domain executed successfully.
```

------

# Setup and deploy the application

Now that we have the VM as well as Payara server up and running, we can now deploy our application.

Start by cloning the Git repository

```
git clone https://github.com/abhirockzz/javaee-on-azure-iaasexport APP_FOLDER_NAME=javaee-on-azure-iaas
```

The `web.xml` file (under `javaee-on-azure-iaas/src/main/webapp/WEB-INF`) needs to be updated with the JDBC URL for the Postgres database on Azure. This is present in the `` attribute of the ` section and its format is as follows:

```
jdbc:postgresql://POSTGRES_FQDN:5432/postgres?user=AZURE_POSTGRES_ADMIN_USER@=AZURE_POSTGRES_SERVER_NAME&amp;password=AZURE_POSTGRES_ADMIN_PASSWORD&amp;sslmode=require
```

Here is the list of placeholders which form a part of the JDBC URL:

- `POSTGRES_FQDN` with value of `fullyQualifiedDomainName` for Postgres instance
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
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
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
mvn clean install -f $APP_FOLDER_NAME/pom.xml
```

You should have the WAR file available. To confirm

```
ls -lrt $APP_FOLDER_NAME/target | grep javaee-cafe.war
```

As a final step in the application setup process, let’s download the [JDBC driver for Postgres](https://jdbc.postgresql.org/) and add it to Payara server

> *We are using driver version* `*42.2.8*`

```
export PG_DRIVER_JAR=postgresql-42.2.8.jarwget https://jdbc.postgresql.org/download/$PG_DRIVER_JAR
```

Add the JAR to Payara, simply invoke `asadmin add-library`

```
~/payara5/glassfish/bin/asadmin add-library $PG_DRIVER_JAR
```

Finally, to deploy the WAR file, just copy it to the domain `autodeploy` folder

```
cp $APP_FOLDER_NAME/target/javaee-cafe.war ~/payara5/glassfish/domains/domain1/autodeploy
```

The deployment will take some time. In the meanwhile, you can track the logs using:

```
tail -f ~/payara5/glassfish/domains/domain1/logs/server.log
```

You should see log messages indicating successful deployment of the `javaee-cafe` application

```
[2019-11-18T13:34:21.317+0000] [Payara 5.193] [INFO] [NCLS-DEPLOYMENT-02035] [javax.enterprise.system.tools.deployment.autodeploy] [tid: _ThreadID=104 _ThreadName=payara-executor-service-scheduled-task] [timeMillis: 1574084061317] [levelValue: 800] [[
[AutoDeploy] Successfully autodeployed : /home/abhishgu/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

------

# Explore the application

It’s time to test drive the JavaEE app! To start off, we can access the application using a web browser. But, just like the Postgres instance, the virtual machine which hosts the Payara server along with the application is also protected by default i.e. you cannot access it from the public internet.

We need to create a firewall rule using the `az vm open-port` to access it from our local machine. We just need to expose port `8080` since that's the default HTTP port which Payara server uses

```
az vm open-port --port 8080 --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

## Access the JSF front end

Use your browser to access `http://[ENTER_VM_IP]:8080/javaee-cafe`. You can use the UI to create, delete and see coffees.

## Use the REST API

The application also exposes a REST API for creating, deleting and listing coffees.

```
export VM_IP=[to be filled]
```

Create coffees

```
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

Get all coffees

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

You should see a JSON response listing both the coffee options you just added

Get a coffee by ID

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees/1
```

Delete a coffee by ID

```
curl -X DELETE $VM_IP:8080/javaee-cafe/rest/coffees/1
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

Notice that `cappuccino` is now deleted

------

# Clean up resources

Once you are done exploring the application, you can delete the resources. Since we used a resource group, it's easy executing a single command.

> *Please be aware that this will delete all the resources in the group which includes the ones you created as part of the tutorial (VM, Postgres etc.) as well as any other service instances you might have if you used an* already existing *resource group*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

# Summary

You learned how to deploy a Java EE application to Azure using an app server deployed to a Virtual Machine along with a managed database offering for long term persistence.

As mentioned earlier, each option comes with its own pros and cons. In this case, you have complete control over your application, its deployment infrastructure, the way you scale it, etc. On the other hand, remember that managing the infrastructure, sizing it for your application, securing it, etc. is a set of responsibilities that you have to take on along with delivering core business value as a part of the app functionality.

The next part will dive into how to use a Docker container platform to deploy your Java EE applications. Stay tuned!