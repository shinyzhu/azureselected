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
这是系列博客的第二篇，本篇将继续带您逐步了解这种在 Azure 中运行 Java EE 应用的方法。[第一部分](https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-1-e895284b46d1) 讲述了如何将 Java EE 应用程序部署到一个 [微软 Azure 虚拟机](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=medium-blog-abhishgu) 上并使用 [Azure 数据库 PostgreSQL](https://azure.microsoft.com/services/postgresql/?WT.mc_id=medium-blog-abhishgu) 的服务作为后台数据库。

In this part, we will run the Java EE app as a Docker container on [Azure Container Instances](https://azure.microsoft.com/services/container-instances/?WT.mc_id=medium-blog-abhishgu). The example used in this blog is a simple three-tier application that uses Java EE 8 specifications such as JAX-RS, EJB, CDI, JPA, JSF, Bean Validation. We will use the [Payara Server](https://www.payara.fish/) to deploy the application and use [PostgreSQL](https://www.postgresql.org/) as the relational database.
在这一部分，我们将使用 Java EE 应用程序作为 Docker 容器部署在 [Azure 容器实例](https://azure.microsoft.com/services/container-instances/?WT.mc_id=medium-blog-abhishgu)上。在这个博客中使用的例子中建立了一个简单的三层应用程序，使用了Java EE 8 规范，如 JAX-RS，EJB，CDI，JPA，JSF，Bean Validation。我们将使用 [Payara 服务器](https://www.payara.fish/) 部署应用并使用关系型数据库 [PostgreSQL](https://www.postgresql.org/) 。

![img](https://miro.medium.com/max/60/1*-gOAml8lPYXSaU5clFltdQ.png?q=20)

![img](https://miro.medium.com/max/980/1*-gOAml8lPYXSaU5clFltdQ.png)

During the course of the tutorial, we will cover:

- Postgres setup on Azure
- Dockerize the Java EE app and setup Azure Container Registry to store the Docker image
- Deploy the application to Azure Container Instances
- Explore its functionality

在本教程中，我们将介绍：
 - 在Azure上建立Postgres
 -  Dockerize Java EE 应用程序并设置 Azure 容器注册表来存储 Docker 镜像
 - 应用程序部署到 Azure 容器实例
 - 探索其功能

> *Except for minor changes, the application used in this tutorial has been adapted from* [*this project*](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee) *by* [*Reza Rahman*](https://twitter.com/reza_rahman)
*通过些调整，在该教程中使用的应用程序已被* [*Reza Rahman*](https://twitter.com/reza_rahman) *改编为* [*一个项目*](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee)。

------

# Pre-requisites 先决条件

You will need a [Microsoft Azure account](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) and the [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) to work through the tutorial.
你需要一个 [微软 Azure 账号](https://docs.microsoft.com/azure/?WT.mc_id=medium-blog-abhishgu) 以及 [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu) 来完成这个教程。


If you don’t have a Microsoft Azure account, go ahead and [sign up for a free one!](https://azure.microsoft.com/free/?WT.mc_id=medium-blog-abhishgu). The Azure CLI is a cross-platform command-line experience for managing Azure resources — please install it using [these instructions](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu).
如果你没有一个 Azure 账号， [可以点击并免费注册](https://azure.microsoft.com/free/?WT.mc_id=medium-blog-abhishgu)！ Azure CLI 是一个管理 Azure 资源的跨平台的命令行工具 - 请使用[这些说明](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=medium-blog-abhishgu)安装。



# First things first… 首先第一件事情...

Set your Azure Subscription ID using the Azure CLI which will be used for this tutorial.
使用 Azure CLI 设置将用于本教程的 Azure Subscription ID。

To set your Azure subscription ID
设置Azure subscription ID

```
export AZURE_SUBSCRIPTION_ID=[to be filled]
az account set --subscription $AZURE_SUBSCRIPTION_ID
```

Create a resource group that will contain all the services (resources) which you will create as a part of this tutorial. A resource group is like a logical container that holds related resources for an Azure solution. The resource group includes those resources that you want to manage as a group.
创建一个含所有服务（资源）的包，其中一部分作为本教程的资源组。资源组是像储存着相关资源 Azure solution 的逻辑容器。资源组包含着你想要管理的资源。

To create a resource group
创建资源组

```
export AZURE_RESOURCE_GROUP_NAME=[to be filled]
export AZURE_LOCATION=[to be filled]
az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

------

# Install Postgres on Azure 在Azure上安装Postgres

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) is a relational database service based on the open-source [Postgres database engine](https://www.postgresql.org/). It’s a fully managed database-as-a-service offering which is available in two deployment options, as [a single server](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu) and as [a Hyperscale (Citus) cluster](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)

[Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=medium-blog-abhishgu) 是一个建立在开源的 [Postgres 数据库引擎](https://www.postgresql.org/) 关系型数据库服务。 这是一个完全托管型的数据库服务，提供两种部署选项可用， 作为[作为单一的服务器](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=medium-blog-abhishgu) 或者是作为 [一个超大规模 (Citus) 集群](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=medium-blog-abhishgu)


> *We will be using the single server option for the purposes of this tutorial 在这次教程中我们将使用 “单一服务器” 选项*

We will use the `az postgres server create` command to create a Postgres server instance on Azure. First, set up some of the server properties such as the name, admin user, etc. 我们将使用 `az postgres server create` 命令在Azure上创建一个Postgres服务器实例。首先，设置了一些服务器的属性，如名称、管理员账号等等。

```
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
export SKU=B_Gen5_1
export STORAGE=5120
```

> *For storage and SKU options, please refer to* [*the documentation*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=medium-blog-abhishgu)
> *对于存储和SKU选项，请参阅* [*这篇文档*](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=medium-blog-abhishgu)

And, then invoke the command to initiate the database instance creation 然后调用命令来启动数据库实例的创建：

```
az postgres server create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME  --location $AZURE_LOCATION --admin-user $AZURE_POSTGRES_ADMIN_USER --admin-password $AZURE_POSTGRES_ADMIN_PASSWORD --storage-size $STORAGE --sku-name $SKU
```

The provisioning will take a few minutes.
该配置将需要几分钟的时间。

To check the details of the Postgres database instance you just provisioned, invoke `az postgres server show` command 要检查你刚才供应的Postgres数据库实例的详细信息，调用 `az postgres server show` 命令：

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

You should get a JSON response. Please note down the value for the `fullyQualifiedDomainName` attribute as you will be using this to connect to the Postgres instance later.
你应该得到一个JSON响应。请记下 `fullyQualifiedDomainName` 属性的值，你将稍后使用它连接到Postgres的实例。

> *It should be of the format:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`  
> *应该是以下格式：*`* [AZURE_POSTGRES_DB_NAME] .postgres.database.azure.com *`

## Allow Azure Container Instances to access the Postgres database 允许 Azure 容器实例访问 Postgres 数据库

Later in the post, we will see how to deploy the application to [Azure Container Instances](https://docs.microsoft.com/azure/container-instances/?WT.mc_id=medium-blog-abhishgu). But, the Postgres database is not accessible to external services by default. We will use the `az postgres server firewall-rule create` command to create a firewall rule to explicitly allow Azure services to access the Postgres instance — this will allow the JavaEE application deployed within Azure Container Instances to communicate with Postgres.
在后面的文章中，我们将看到如何将应用程序部署到 [Azure 容器实例](https://docs.microsoft.com/azure/container-instances/?WT.mc_id=medium-blog-abhishgu)。但是，Postgres 数据库并不是默认外部服务访问。我们将使用 `az postgres server firewall-rule create` 命令创建防火墙规则明确允许 Azure 的服务来访问 Postgres 的实例 - 这将允许部署 Azure 容器实例内的 Postgres 的通信的 JavaEE 应用。

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnACIaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server-name $AZURE_POSTGRES_SERVER_NAME --start-ip-address=0.0.0.0 --end-ip-address=0.0.0.0 --name $FIREWALL_RULE_NAME
```

> *This setting allows network connections from all IPs within the Azure network. For production use, try to configure the most restrictive firewall rules possible*
> *此设置允许从 Azure 网络内的所有IP网络连接。供生产使用，尝试配置最严格的防火墙规则可能*

------

# Setup Azure Container Registry 安装 Azure 容器注册表

Azure Container Registry is a managed, private Docker registry service to store and manage your private Docker container images (it based on the open-source Docker Registry 2.0). You can use Azure container registries with your existing container development and deployment pipelines or use [Azure Container Registry Tasks](https://docs.microsoft.com/azure/container-registry/container-registry-tasks-overview?WT.mc_id=medium-blog-abhishgu) to build container images in Azure. You can either build on-demand, or fully automate builds with triggers such as source code commits and base image updates.
 Azure 容器注册表是一个管理私人 Docker 注册服务的用来存储和管理的私人 Docker 容器的镜像（它基于开源的 Docker 注册表2.0）。您可以使用 Azure 容器注册表与您现有容器的开发和部署管道或者使用 [Azure容器注册表任务](https://docs.microsoft.com/azure/container-registry/container-registry-tasks-overview?WT.mc_id=medium-blog-abhishgu) 在 Azure 构建容器的镜像。您可以构建点播，或构建完全自动的触发器，如源代码提交和基本图像更新。

Let’s create a registry to store the Docker image for the JavaEE application. We will use the `az acr create`command
让我们创建一个注册表存储 Docker 镜像的 JavaEE 应用，使用 `az acr create` 命令。

```
export ACR_NAME=javaeecafe-acraz acr create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $ACR_NAME --sku Basic --admin-enabled true
```

> *We are using the* `*Basic*` *SKU. Valid value are:* `*Basic*`*,* `*Classic*`*,* `*Premium*`*,* `*Standard*` 
> *我们使用的是*`*Basic*` *SKU。有效值是：`*Basic*`*,* `*Classic*`*,* `*Premium*`*,* `*Standard*`

You can login to the registry once it’s created and check the login server
一旦创建它，​​您可以登录到注册表，并检查登录服务器

```
az acr login --name $ACR_NAME
az acr show --name $ACR_NAME --query loginServer --output table
```

> *You will use the ACR login server name soon. It’s value follows the format:* `*[ACR_NAME].azurecr.io*`
> *你很快就会使用ACR登录服务器名。它的值为如下格式：*
`* [ACR_NAME] .azurecr.io *`

------

# Setup and prepare application image 安装并准备应用图像

Clone the git repository
克隆Git仓库

```
git clone https://github.com/abhirockzz/javaee-on-azure-caas
cd javaee-on-azure-caas
```

You need to enter the Postgres connectivity information to the ``attribute of the `` section in `web.xml`.
您需要输入 Postgres 的连接信息以 在`web.xml`中提交贡献。

> *You can find the* `*web.xml*` *file under* `*javaee-on-azure-iaas/src/main/webapp/WEB-INF*`    
> *你可以在* `*javaee-on-azure-iaas/src/main/webapp/WEB-INF*`*下找到* `*web.xml*` *文件* 


The format is as follows
格式如下：

```
jdbc:postgresql://[POSTGRES_FQDN]:5432/postgres?user=[AZURE_POSTGRES_ADMIN_USER]@[AZURE_POSTGRES_SERVER_NAME]&amp;password=[AZURE_POSTGRES_ADMIN_PASSWORD]&amp;sslmode=require
```

Here are the list placeholders which form a part of the JDBC URL:

- `POSTGRES_FQDN` with value of `fullyQualifiedDomainName`
- `AZURE_POSTGRES_ADMIN_USER` with the admin user name used to provision PG
- `AZURE_POSTGRES_SERVER_NAME` with server name used to provision PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` with admin password used to provision PG

以下是一部分形成 JDBC URL 的列表占位符：
- `POSTGRES_FQDN` 值为 `fullyQualifiedDomainName`
 - `AZURE_POSTGRES_ADMIN_USER` + 管理员用户名 用于规定 PG
- `AZURE_POSTGRES_SERVER_NAME` + 用户名称 用来规定 PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` + 管理员密码 用于规定 PG

Set the required values
设置所需的值

```
export POSTGRES_FQDN=
export AZURE_POSTGRES_ADMIN_USER=
export AZURE_POSTGRES_SERVER_NAME=
export AZURE_POSTGRES_ADMIN_PASSWORD=
```

Simply use these commands to replace the contents of `web.xml`
只需使用这些命令来代替`web.xml`内容

```
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAME
sed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
```

Here is an example of what the ` ` section will look like
这里是` `部分形式的案例：

```
<data-source>
        <name>java:global/JavaEECafeDB</name>
        <class-name>org.postgresql.ds.PGPoolingDataSource</class-name>
        <url>jdbc:postgresql://foobar-pg.postgres.database.azure.com:5432/postgres?user=foobar@foobar-pg&amp;password=foobarbaz&amp;sslmode=require</url>
</data-source>
```

The application is now configured. Let’s build it!
应用程序配置好了。现在让我们建立它！

```
mvn clean install
```

You should have the WAR file available. To confirm
你应该有这个WAR文件可用。确认下吧

```
ls -lrt target | grep javaee-cafe.war
```

## Build and push the image to Azure Container Registry Build和 push 镜像到 Azure容器注册表

Our application artifact (`WAR` file) is ready. We can now build the Docker image and push it out to Azure Container Registry. Here is a quick look at the `Dockerfile` used for creating the image
我们的应用程序神器（`WAR`文件）已准备就绪。现在，我们可以建立Docker 镜像并将其应用到Azure容器注册表。这里可用快速浏览一下`Dockerfile`用于创建镜像。

```
FROM payara/server-full
COPY target/javaee-cafe.war $DEPLOY_DIR
RUN wget https://jdbc.postgresql.org/download/postgresql-42.2.8.jar
RUN cp /opt/payara/postgresql-42.2.8.jar ${PAYARA_DIR}/glassfish/domains/${DOMAIN_NAME}/lib && rm /opt/payara/postgresql-42.2.8.jar
EXPOSE 8080
```

It builds on top of the base image for `payara/server-full`, copies the `WAR`file to a folder from where it can be automatically detected and deployed, downloads the Postgres JDBC driver and places it in the appropriate location for the Payara application server. That's it!
它建立在`payara/server-full`，从那里可自动检测和部署，下载Postgres的JDBC驱动程序，并将其放置在适当的位置为副本的`WAR`file到一个文件夹 Payara 应用服务器。就是它！

```
export DOCKER_IMAGE=javaee-cafe
docker build -t $DOCKER_IMAGE .
docker tag $DOCKER_IMAGE $ACR_NAME.azurecr.io/$DOCKER_IMAGE
```

To push the image 
push 镜像：

```
docker push $ACR_NAME.azurecr.io/$DOCKER_IMAGE
```

Use `az acr repository list` command to confirm
使用 `az acr repository list` 命令来确认:

```
az acr repository list --name $ACR_NAME --output table
```

------

# Deploy the application to Azure Container Instances 将应用程序部署到 Azure 容器实例

Azure Container Instances allows you to run a container in Azure, without having to manage any VMs and or adopt a higher-level service. It is a solution for any scenario that can operate in isolated containers, including simple applications, task automation, and build jobs. For scenarios where you need full container orchestration, including service discovery across multiple containers, automatic scaling, and coordinated application upgrades, please take a look at [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/services/kubernetes-service/?WT.mc_id=medium-blog-abhishgu).
Azure 容器实例允许你在 Azure 中运行容器，而无需管理任何虚拟机，或者采用更高级别的服务。这是一个可以在隔离容器中，如简单的应用程序、自动化任务、建立工作运行，在任何场景下的解决方案。对于您需要完整的容器业务流程，包括跨多个容器，自动缩放服务发现和协调的应用升级的情况，请看看 [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/services/kubernetes-service/?WT.mc_id=medium-blog-abhishgu)。

We are now ready to deploy the JavaEE application to Azure Container Instances. When you create a container instance, you can specify a custom DNS name label so your application is reachable at [*customlabel.azureregion.azurecontainer.io*](http://customlabel.azureregion.azurecontainer.io/).
我们现在准备部署 JavaEE 应用到 Azure 容器实例。当你创建一个容器实例，你可以指定自定义DNS名称标签来让你的应用程序是在 [*customlabel.azureregion.azurecontainer.io*](http://customlabel.azureregion.azurecontainer.io/)可获得的。

```
export ACI_CONTAINER_NAME=javaee-cafe
export DNS_NAME_LABEL=javaee-cafe
```

We will need the password for Azure Container Registry to run our Docker image in Azure Container Instance.
我们需要 Azure 容器注册表的密码来运行在 Azure 容器实例中的 Docker 镜像。

```
az acr credential show --name $ACR_NAME
```

Enter below command to create the container and enter the password (obtained above) when prompted
在下面输入命令来创建容器并输入密码（上面获得的）提示时：

```
az container create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $ACI_CONTAINER_NAME --image $ACR_NAME.azurecr.io/$DOCKER_IMAGE --dns-name-label $DNS_NAME_LABEL --registry-username $ACR_NAME --ports 8080
```

> `*--ports 8080*` *ensures that we can access the application from port* `*8080*`*. This is because Payara application server serves HTTP traffic on port* `*8080*`*by default.*  
>`*--ports 8080 *` *确保我们能够从端口* `* 8080 *`*访问应用程序。这是因为 Payara 应用服务器默认从*`* 8080 *`*提供端口的HTTP流量。*

The deployment will take a while. In the meanwhile, you can track the logs using:
部署将需要一段时间。这时，您可以跟踪使用日志：

```
az container attach -g $AZURE_RESOURCE_GROUP_NAME -n $ACI_CONTAINER_NAME
```

You should see log messages indicating successful deployment of the `javaee-cafe` application
您应该看到日志消息显示 `JavaEE-cafe` 应用的成功部署

```
[yyyy-mm-ddT13:34:21.317+0000] [Payara 5.193] [INFO] [NCLS-DEPLOYMENT-02035] [javax.enterprise.system.tools.deployment.autodeploy] [tid: _ThreadID=104 _ThreadName=payara-executor-service-scheduled-task] [timeMillis: 1574084061317] [levelValue: 800] [[
    [AutoDeploy] Successfully autodeployed : /home/abhishgu/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

------

# Explore the application 探索应用

## Access the JSF front end 访问JSF前端

Use your browser to access `http://[APP_FQDN]:8080/javaee-cafe`. You can use the UI to create, delete and see coffees.
使用浏览器访问`http://[APP_FQDN]:8080/javaee-cafe`。您可以使用用户界面来创建，删除和查看 coffees。

The `APP_FQDN` is nothing but the combination of the DNS label and the Azure region e.g. `http://javaee-cafe.southeastasia.azurecontainer.io:8080/javaee-cafe`
在`APP_FQDN`只不过是DNS标签和 Azure region 的组合，如 `http://javaee-cafe.southeastasia.azurecontainer.io:8080/javaee-cafe`

![img](https://miro.medium.com/max/60/1*rbEWA7qQYoqUKAtCfqLdZQ.png?q=20)

![img](https://miro.medium.com/max/5944/1*rbEWA7qQYoqUKAtCfqLdZQ.png)

Java EE cafe

## Use the REST API 使用REST API

The application also exposes a REST API for creating, deleting and listing coffees.
该应用程序还公开一个 REST API 用于创建，删除和列出 coffees。

```
export JAVAEE_ACI_REST=http://javaee-cafe.southeastasia.azurecontainer.io:8080/javaee-cafe/rest/coffees
```

Create coffees 创建 coffees

```
curl -X POST $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"curl -X POST $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

Get all coffees 获得所有coffees

```
curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees
```

You should see a JSON response listing both the coffee options you just added
你应该看到一个 JSON 响应列出你刚才添加的 coffee 选项

Get a coffee by ID 通过 ID 获取 coffee

```
curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees/1
```

Delete a coffee by ID 通过 ID 删除 coffee

```
curl -X DELETE $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees/1curl -H "Accept: application/json" $JAVAEE_ACI_REST:8080/javaee-cafe/rest/coffees
```

Notice that `cappuccino` is now deleted 
注意到 `cappiccino` 现在被删除了

## Clean up resources 清除资源

Once you have finished exploring the application, you can delete the resources. Since we used a resource group, it's easy executing a single command. 一旦您完成探索应用程序，你可以删除该资源。因为我们使用了资源组，执行一个命令很容易实现。

> *Please be aware that this will delete all the resources in the group which includes the ones you created as part of the tutorial (Azure Container Registry, Postgres etc.) as well as any other service instances you might have if you used an* already existing *resource group*
> *请注意，这将删除所有的资源，其中包括你的教程（ Azure 容器注册表，Postgres等）和其他你放在资源组里面的其他服务实例。*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

------

# Summary 总结

You learned how to leverage Docker containers to package and deploy the application to Azure Container Instances along with a managed database offering for long term persistence.
您了解了如何利用 Docker 容器来打包并配置 Azure 容器实例的应用程序，并使用托管数据库来提供长期持久服务。

The third installment will cover [Kubernetes](https://kubernetes.io/) as a deployment platform for our Java EE application. Stay tuned!
第三部分将介绍[Kubernetes](https://kubernetes.io/) 作为我们的 Java EE 应用部署平台。敬请关注！