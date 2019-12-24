---
type: post
title: '部属 Java EE 应用到Azure: 第 1 部分'
description: 'There are a multitude of options for cloud based application development ranging from traditional IaaS (Infrastructure-as-a-Service), PaaS (Platform-as-a-Service) and CaaS (Containers-as-a-Service) all the way to Kubernetes and Serverless (and probably some more which I might be missing!). Think of it as a spectrum rather than a “one size fits all model”, with each option having its pros and cons. Ultimately, every scenario is unique and the final choice is driven by requirements — but its always good to know that you have “choices” at your disposal!'
tags: ['Java EE', 'Azure', 'IaaS', 'Cloud Computing', 'Database']
author: 'Abhishek Gupta'
date: 2019-12-14
url: ''
---

# 部属 Java EE 应用到Azure: 第 1 部分

<TagLinks />

There are a multitude of options for cloud based application development ranging from traditional `IaaS` (Infrastructure-as-a-Service), `PaaS`(Platform-as-a-Service) and `CaaS` (Containers-as-a-Service) all the way to [Kubernetes](https://kubernetes.io/) and `Serverless` (and probably some more which I might be missing!). Think of it as a spectrum rather than a “one size fits all model”, with each option having its pros and cons. Ultimately, every scenario is unique and the final choice is driven by requirements — but its always good to know that you have “choices” at your disposal!

基于云的应用程序开发有多种选择，包括传统的 `IaaS`（基础架构即服务）， `PaaS`（平台即服务）和 `CaaS`（ 容器即服务）一直到 [Kubernetes]（https://kubernetes.io/）和 `Serverless`（也许还有更多我未提及！）。思考整个范围，而不是 “一种适合所有模型的方法” ，每种选择都有其优缺点。 最终, 每个场景都是唯一的，最终选择取决于需求 — 但是有很多 "选择" 总是好的!

![img](https://miro.medium.com/max/60/0*v9YZMVTbaw9xoV70.png?q=20)

![img](https://miro.medium.com/max/980/0*v9YZMVTbaw9xoV70.png)

This is the first of a series of blogs that will walk you through one of the options of running Java EE applications on Azure. We will follow the most basic approach for deploying our Java EE app to an application server which is set up in a [Virtual Machine on Microsoft Azure](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=medium-blog-abhishgu) along with the [Azure Database for PostgreSQL](https://azure.microsoft.com/services/postgresql/?WT.mc_id=medium-blog-abhishgu) service as the backend database. In essence, this is the combination of `IaaS` (Azure VM) along with a `PaaS` (managed PostgreSQL on Azure)

这是一系列博客的第一篇，它将带您逐步了解其中一种在 Azure 中运行 Java EE 应用的方法。 我们将采用最基本的方法将Java EE应用部署在一个 [微软 Azure 虚拟机](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=medium-blog-abhishgu) 以及 [Azure PostgreSQL 数据库](https://azure.microsoft.com/services/postgresql/?WT.mc_id=medium-blog-abhishgu) 服务作为后端数据库。本质上, 这是结合 `IaaS` (Azure 虚拟机) 与 `PaaS` (LAzure中托管的 PostgreSQL )

> *Other options such as containers and Kubernetes will be covered in upcoming posts*

> *其他选项（例如容器和Kubernetes）将在以后的文章中介绍*

The example used in the blog post is a simple three-tier application that uses Java EE 8 specifications such as JAX-RS, EJB, CDI, JPA, JSF, Bean Validation. We will use the [Payara Server](https://www.payara.fish/) to deploy the application and use [PostgreSQL](https://www.postgresql.org/) as the relational database.

本文中使用的示例是一个简单的三层应用程序，该应用使用Java EE 8规范，例如JAX-RS，EJB，CDI，JPA，JSF，Bean验证。 我们将使用 [Payara服务器](https://www.payara.fish/) 部署应用程序，并使用 [PostgreSQL](https://www.postgresql.org/) 用作关系数据库。


During the course of the tutorial, we will cover:

- Postgres and Virtual machine setup on Azure
- Setup Payara server on the Virtual machine
- Configure and install the Java EE application
- Explore its functionality

在本教程中，我们将介绍:

- Azure 中 Postgres 和虚拟机设置
- 在虚拟机中设置 Payara 服务器
- 配置和安装 Java EE 应用
- 探索其功能

Except for minor changes, the application used in this tutorial has been adapted from [this project](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) by [Reza Rahman](https://twitter.com/reza_rahman)

除某些微小改动外, 本教程中使用的应用来自  [Reza Rahman](https://twitter.com/reza_rahman) 的 [此项目](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) 

# Pre-requisites

# 先决条件

You will need a [Microsoft Azure account](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) and the [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) to work through the tutorial.

你将需要 [微软 Azure 账号](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) 和 [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) 来完成本教程。


If you don’t have a Microsoft Azure account, go ahead and [sign up for a free one!](https://azure.microsoft.com/free/?WT.mc_id=medium-blog-abhishgu) The Azure CLI is a cross-platform command-line experience for managing Azure resources — please install it using [these instructions](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu).

# First things first…

# 第一件事情…

Set your Azure Subscription ID using the Azure CLI which will be used for this tutorial.

使用 Azure CLI 设置本教程的 Azure 订阅ID。

To set your Azure subscription ID

设置您的Azure订阅ID

```
export AZURE_SUBSCRIPTION_ID=[to be filled]az account set --subscription $AZURE_SUBSCRIPTION_ID
```

Create a resource group that will contain all the services (resources) which you will create as a part of this tutorial. A resource group is like a logical container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group.

创建一个资源组，其中将包含您将在本教程中创建的所有服务（资源）。 资源组就像一个逻辑容器，其中包含用于Azure解决方案的相关资源。 资源组包括您要作为组管理的那些资源。


To create a resource group

创建资源组

```
export AZURE_RESOURCE_GROUP_NAME=[to be filled]
export AZURE_LOCATION=[to be filled]az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

# Install PostgreSQL on Azure

# 在 Azure 中安装 PostgreSQL

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) is a relational database service based on the open-source [Postgres database engine](https://www.postgresql.org/). It’s a fully managed database-as-a-service offering which is available in two deployment options, as [a single server](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu), and as [a Hyperscale (Citus) cluster](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)

[用于PostgreSQL的Azure数据库](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) 是一个基于开源 [Postgres 数据库引擎](https://www.postgresql.org/) 关系数据库服务.这是一种完全托管的数据库即服务产品，有两个部署选项可用, 作为 [单一服务器](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu), 和作为 [和超大型 (Citus) 集群](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)

> *We will be using the single server option for the purposes of this tutorial*

> *在本教程中，我们将使用单服务器选项*

We will use the `az postgres server create`command to create a Postgres server instance on Azure. First, set up some of the server properties such as the name, admin user, etc.

我们将使用 `az postgres server create` 命令在Azure中创建 Postgres 服务器实例。 首先, 设置一些服务器属性，例如名称，管理员用户等。

```
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
export SKU=B_Gen5_1
export STORAGE=5120
```

> *For storage and SKU options, please refer to* [*the documentation*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=medium-blog-abhishgu)

> * 对于存储(storage)和 SKU 选项, 请参考 * [*该文档*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=medium-blog-abhishgu)

And, then invoke the command to initiate the database instance creation:

然后, 使用此命令创建并初始化数据库实例:

```
az postgres server create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME  --location $AZURE_LOCATION --admin-user $AZURE_POSTGRES_ADMIN_USER --admin-password $AZURE_POSTGRES_ADMIN_PASSWORD --storage-size $STORAGE --sku-name $SKU
```

The provisioning process will take a few minutes.

设置过程将花费几分钟。

To check the details of the Postgres database instance you just provisioned, invoke `az postgres server show` command

使用 `az postgres server show` 命令，检查刚刚配置的 Postgres 数据库实例的详细信息。

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

You should get a JSON response. Please note down the value for the `fullyQualifiedDomainName` attribute as you will be using this to connect to the Postgres instance later.

此时应该得到 JSON 格式响应。请记下 `fullyQualifiedDomainName` 属性的值，因为稍后将使用它来连接到 Postgres实例。

> *It should be of the format:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

> *其格式应该是:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

------

# Install Virtual Machine on Azure

# 在Azure中安装虚拟机

We will use a [Virtual machine](https://docs.microsoft.com/azure/virtual-machines/?WT.mc_id=medium-blog-abhishgu) on Azure to host the Payara JavaEE application server. To be specific, this will be a Ubuntu based Linux VM.

我们将使用 Azure [虚拟机](https://docs.microsoft.com/azure/virtual-machines/?WT.mc_id=medium-blog-abhishgu) 托管Payara JavaEE应用程序服务器。具体来说，这将是基于 Ubuntu 的 Linux 虚拟机。

Let’s start by setting up the required information for the VM

首先，设置虚拟机所需的信息

```
export AZURE_VM_NAME=[to be filled]
export AZURE_VM_USER=[to be filled]
export AZURE_VM_PASSWORD=[to be filled]
export VM_IMAGE=UbuntuLTS
```

We will use the `az vm create` command to create the VM instance

我们将使用 `az vm create` 命令创建虚拟机实例

```
az vm create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME --image $VM_IMAGE --admin-username $AZURE_VM_USER --admin-password $AZURE_VM_PASSWORD
```

The VM provisioning will take a few minutes.

此虚拟机配置将花费几分钟。

You need to get the public IP address of the VM. Do so using the `az vm list-ip-addresses` command

使用 `az vm list-ip-addresses` 命令，获取虚拟机的公共IP地址。 

```
az vm list-ip-addresses --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

You will see a JSON response — take a look at the `publicIpAddresses`section and note down the value of the`ipAddress` property. Configure it as an environment variable as you will be using it in the subsequent steps

查看 JSON 格式响应 — 检查 `publicIpAddresses` 部分，并记下 `ipAddress` 属性的值。 将其配置为环境变量，因为您将在后续步骤中使用它。

```
export VM_IP=[to be filled]
```

## Allow VM to access the Postgres database

## 允许虚拟机访问 Postgres 数据库

The Postgres database is not accessible by default. Use the `az postgres server firewall-rule create` command to create a firewall rule to explicitly allow the VM to access the Postgres instance. This will allow the JavaEE application deployed inside the VM to communicate with Postgres.

默认情况下无法访问 Postgres 数据库。 使用 `az postgres server firewall-rule create` 命令创建防火墙规则，明确允许虚拟机访问 Postgres 实例。这将允许虚拟机内部署的 JavaEE 应用程序与 Postgres 通信。

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnVMaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server $AZURE_POSTGRES_SERVER_NAME --name $FIREWALL_RULE_NAME --start-ip-address $VM_IP --end-ip-address $VM_IP
```

------

# Install Payara server on the Virtual Machine

# 在虚拟机中安装 Payara 服务器

[Payara Server](http://www.payara.fish/) is an open source application server derived from [GlassFish](https://javaee.github.io/glassfish/)that supports reliable and secure deployments of Java EE ([Jakarta EE](https://jakarta.ee/)) and [MicroProfile](https://microprofile.io/)applications in any environment: on-premise, in the cloud or hybrid.

[Payara 服务器](http://www.payara.fish/) 是派生自 [GlassFish](https://javaee.github.io/glassfish/) 开源应用程序服务器，它支持Java EE的可靠和安全部署。 ([Jakarta EE](https://jakarta.ee/)) 和 [MicroProfile](https://microprofile.io/) 应用程序可在任何环境中使用：本地，云中或混合环境中。

> *Check out the project on* [*GitHub*](https://github.com/payara/Payara) *or dive into* [*its documentation*](https://docs.payara.fish/) *to learn more!*

> *在* [*GitHub*](https://github.com/payara/Payara) *检出（git checkout命令）此项目，或在* [*文档*](https://docs.payara.fish/) *了解更多!*

SSH into the Linux VM you just provisioned using the username and VM IP

```
ssh $AZURE_VM_USER@$VM_IP
```

Enter the password once prompted. Once you’re logged into the Virtual Machine, proceed with the next steps.

提示时输入密码。 登录虚拟机后，请继续以下步骤。

## Install required toolset

## 安装所需工具集

Before installing the Payara server, we need to set up a few things such as JDK, etc.

在安装Payara服务器之前，我们需要预安装某些配置，例如JDK等。

```
sudo apt-get update
sudo apt install openjdk-8-jdk
sudo apt install maven
```

## Setup Payara server

## 安装 Payara 服务器

We are using Payara server version `5.193.1` which is the latest at the time of writing this tutorial. The setup simply involves downloading and extracting the server zip file.

我们使用 Payara 服务器 `5.193.1` 版本，这是撰写本教程时的最新版本。 该设置仅涉及下载和提取服务器 zip 文件。

```
export PAYARA_VERSION=5.193.1wget https://s3-eu-west-1.amazonaws.com/payara.fish/Payara+Downloads/$PAYARA_VERSION/payara-$PAYARA_VERSION.zipsudo apt install unzip
unzip payara-$PAYARA_VERSION.zip
```

To confirm, run `ls ~/payara5/`

运行 `ls ~/payara5/` 进行验证

Start the server using `asadmin`

使用 `asadmin` 启动服务器

```
~/payara5/bin/asadmin start-domain
```

It will take a few moments for the server to boot up. You should see the following logs:

服务器启动将需要一些时间。 您应该看到以下日志：

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

# 设置和部署应用程序

Now that we have the VM as well as Payara server up and running, we can now deploy our application.

此时我们已经启动并运行了虚拟机和 Payara 服务器，现在可以部署应用程序了。

Start by cloning the Git repository

首先克隆Git存储库

```
git clone https://github.com/abhirockzz/javaee-on-azure-iaasexport APP_FOLDER_NAME=javaee-on-azure-iaas
```

The `web.xml` file (under `javaee-on-azure-iaas/src/main/webapp/WEB-INF`) needs to be updated with the JDBC URL for the Postgres database on Azure. This is present in the `` attribute of the ` section and its format is as follows:

需要使用 Azure 中 Postgres 数据库的 JDBC URL 更新 `web.xml` 文件（在 `javaee-on-azure-iaas/src/main/webapp/WEB-INF` 下）。 它出现在部分 ``属性` 中，其格式如下：

```
jdbc:postgresql://POSTGRES_FQDN:5432/postgres?user=AZURE_POSTGRES_ADMIN_USER@=AZURE_POSTGRES_SERVER_NAME&amp;password=AZURE_POSTGRES_ADMIN_PASSWORD&amp;sslmode=require
```

Here is the list of placeholders which form a part of the JDBC URL:

这是构成JDBC URL一部分的占位符列表:

- `POSTGRES_FQDN` with value of `fullyQualifiedDomainName` for Postgres instance
- `AZURE_POSTGRES_ADMIN_USER` with admin user name used to provision PG
- `AZURE_POSTGRES_SERVER_NAME` with server name used to provision PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` with admin password used to provision PG

-  Postgres 实例 `POSTGRES_FQDN` 和 `fullyQualifiedDomainName` 的值
- `AZURE_POSTGRES_ADMIN_USER` 和管理员用户名用于配置 PG (Postgres)
- `AZURE_POSTGRES_SERVER_NAME` 和服务器名称用于配置 PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` 和管理员密码用于配置 PG

Set the required values

设置所需的值

```
export POSTGRES_FQDN=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
```

Simply use these commands to replace

只需使用这些命令即可替换

```
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
```

Here is an e.g. of what the `` section will look like:

如下是 `` 部分的示例：

```
<data-source>
    <name>java:global/JavaEECafeDB</name>
    <class-name>org.postgresql.ds.PGPoolingDataSource</class-name>
    <url>jdbc:postgresql://foobar-pg.postgres.database.azure.com:5432/postgres?user=foobar@foobar-pg&amp;password=foobarbaz&amp;sslmode=require</url>
</data-source>
```

The application is now configured. Let’s build it!

运行环境已设置完成。 开始构建程序吧！

```
mvn clean install -f $APP_FOLDER_NAME/pom.xml
```

You should have the WAR file available. To confirm

我们开始确认是否有可用的 WAR 文件

```
ls -lrt $APP_FOLDER_NAME/target | grep javaee-cafe.war
```

As a final step in the application setup process, let’s download the [JDBC driver for Postgres](https://jdbc.postgresql.org/) and add it to Payara server

作为应用程序设置过程的最后一步, 下载 [Postgres JDBC 驱动程序](https://jdbc.postgresql.org/) 并将其添加到 Payara 服务器

> *We are using driver version* `*42.2.8*`

> *当前使用驱动版本号* `*42.2.8*`

```
export PG_DRIVER_JAR=postgresql-42.2.8.jarwget https://jdbc.postgresql.org/download/$PG_DRIVER_JAR
```

Add the JAR to Payara, simply invoke `asadmin add-library`

调用  `asadmin add-library` ， 将JAR添加到Payara

```
~/payara5/glassfish/bin/asadmin add-library $PG_DRIVER_JAR
```

Finally, to deploy the WAR file, just copy it to the domain `autodeploy` folder

最后，开始部署WAR文件，将其复制到域 `autodeploy` 文件夹中

```
cp $APP_FOLDER_NAME/target/javaee-cafe.war ~/payara5/glassfish/domains/domain1/autodeploy
```

The deployment will take some time. In the meanwhile, you can track the logs using:

部署将需要一些时间。 同时，您可以使用以下方法跟踪日志：

```
tail -f ~/payara5/glassfish/domains/domain1/logs/server.log
```

You should see log messages indicating successful deployment of the `javaee-cafe` application

您应该会看到 `javaee-cafe` 应用程序的日志消息，提示成功部署

```
[2019-11-18T13:34:21.317+0000] [Payara 5.193] [INFO] [NCLS-DEPLOYMENT-02035] [javax.enterprise.system.tools.deployment.autodeploy] [tid: _ThreadID=104 _ThreadName=payara-executor-service-scheduled-task] [timeMillis: 1574084061317] [levelValue: 800] [[
[AutoDeploy] Successfully autodeployed : /home/abhishgu/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

------

# Explore the application

# 探索应用程序

It’s time to test drive the JavaEE app! To start off, we can access the application using a web browser. But, just like the Postgres instance, the virtual machine which hosts the Payara server along with the application is also protected by default i.e. you cannot access it from the public internet.

现在该测试 JavaEE应用了！ 首先，我们可以使用网络浏览器访问该应用程序。 但是，就像 Postgres 实例一样，默认情况下，托管 Payara 服务器和应用程序的虚拟机也受到保护，即您无法从公共 Internet 访问它。

We need to create a firewall rule using the `az vm open-port` to access it from our local machine. We just need to expose port `8080` since that's the default HTTP port which Payara server uses

我们需要使用 `az vm open-port` 创建防火墙规则，使本地计算机可以访问它。 我们只需要公开端口 `8080` ，因为这是 Payara 服务器使用的默认 HTTP 端口

```
az vm open-port --port 8080 --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

## Access the JSF front end

## 访问JSF前端

Use your browser to access `http://[ENTER_VM_IP]:8080/javaee-cafe`. You can use the UI to create, delete and see coffees.

使用浏览器打开 `http://[ENTER_VM_IP]:8080/javaee-cafe`. 你可以使用此图形交换系统创建、删除和列出咖啡（coffees）。

## Use the REST API

## 使用 REST API

The application also exposes a REST API for creating, deleting and listing coffees.

该应用使用 REST API 同样用于创建、删除和列出咖啡（coffees）。

```
export VM_IP=[to be filled]
```

Create coffees

创建咖啡

```
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

Get all coffees

获取全部咖啡

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

You should see a JSON response listing both the coffee options you just added

此时应会看到 JSON 格式的响应，列出刚才添加的所有咖啡

Get a coffee by ID

通过 ID 获取咖啡

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees/1
```

Delete a coffee by ID

通过 ID 删除咖啡

```
curl -X DELETE $VM_IP:8080/javaee-cafe/rest/coffees/1
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

Notice that `cappuccino` is now deleted

注意 `cappuccino` 已删除

------

# Clean up resources

# 清理资源

Once you are done exploring the application, you can delete the resources. Since we used a resource group, it's easy executing a single command.

> *Please be aware that this will delete all the resources in the group which includes the ones you created as part of the tutorial (VM, Postgres etc.) as well as any other service instances you might have if you used an* already existing *resource group*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

# Summary

You learned how to deploy a Java EE application to Azure using an app server deployed to a Virtual Machine along with a managed database offering for long term persistence.

As mentioned earlier, each option comes with its own pros and cons. In this case, you have complete control over your application, its deployment infrastructure, the way you scale it, etc. On the other hand, remember that managing the infrastructure, sizing it for your application, securing it, etc. is a set of responsibilities that you have to take on along with delivering core business value as a part of the app functionality.

The next part will dive into how to use a Docker container platform to deploy your Java EE applications. Stay tuned!
