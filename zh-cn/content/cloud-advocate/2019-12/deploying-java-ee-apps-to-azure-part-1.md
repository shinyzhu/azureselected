---
type: post
status: translated
sidebar: auto
title: '部署 Java EE 应用到 Azure: 第 1 部分'
description: '这是一系列博客的第一篇，它将引导您逐步了解在Azure上运行Java EE应用程序的一种选择。 我们将采用最基本的方法将Java EE应用程序部署到在Microsoft Azure上的虚拟机中设置的应用程序服务器上，并将Azure Database for PostgreSQL服务作为后端数据库。 本质上，这是IaaS（Azure VM）与PaaS（Azure上的托管PostgreSQL）的组合。'
tags: ['Java EE', 'Azure', 'IaaS', 'Cloud Computing', 'Database']
author: 'Abhishek Gupta'
date: 2019-11-21
url: 'https://medium.com/microsoftazure/deploying-java-ee-apps-to-azure-part-1-e895284b46d1'
translator: 'HeMinzhang'
reviewer: 'shinyzhu'
pub_date: 2019-12-27
next: ../2020-01/deploying-java-ee-apps-to-azure-part-2.md
---

# 部署 Java EE 应用到 Azure: 第 1 部分

<ContentMeta />

基于云的应用程序开发有多种选择，包括传统的 `IaaS`（基础架构即服务）， `PaaS`（平台即服务）和 `CaaS`（ 容器即服务）一直到 [Kubernetes](https://kubernetes.io/) 和 `Serverless` （无服务器）（也许还有更多我未提及！）。思考实际应用范围，而不是 “一种适合所有模型的方法” ，每种选择都有其优缺点。 最终, 每个场景都是唯一的，最终选择取决于需求 — 但是有很多 "选择" 总是好的!

![img](https://miro.medium.com/max/980/0*v9YZMVTbaw9xoV70.png)

这是系列博客的第一篇，它将带您逐步了解其中一种在 Azure 中运行 Java EE 应用的方法。 我们将采用最基本的方法将 Java EE 应用部署在一个 [Azure 虚拟机](https://azure.microsoft.com/services/virtual-machines/?WT.mc_id=azureselected-content-xinglzhu) 以及 [Azure PostgreSQL 数据库](https://azure.microsoft.com/services/postgresql/?WT.mc_id=azureselected-content-xinglzhu) 服务作为后端数据库。本质上, 这是结合 `IaaS` (Azure 虚拟机) 与 `PaaS` ( Azure 中托管的 PostgreSQL )

> *其他选项（例如容器和Kubernetes）将在以后的文章中介绍*

本文中使用的示例是一个简单的三层应用程序，该应用使用Java EE 8规范，例如JAX-RS，EJB，CDI，JPA，JSF，Bean验证。 我们将使用 [Payara服务器](https://www.payara.fish/) 部署应用程序，并使用 [PostgreSQL](https://www.postgresql.org/) 用作关系数据库。

在本教程中，我们将介绍:

- Azure 中 Postgres 和虚拟机设置
- 在虚拟机中设置 Payara 服务器
- 配置和安装 Java EE 应用
- 探索其功能

除某些微小改动外, 本教程中使用的应用来自  [Reza Rahman](https://twitter.com/reza_rahman) 的 [此项目](https://github.com/m-reza-rahman/javaee-azure/tree/master/javaee)。

# 先决条件

你将需要 [微软 Azure 账号](https://docs.microsoft.com/azure/?WT.mc_id=azureselected-content-xinglzhu) 和 [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest&WT.mc_id=azureselected-content-xinglzhu) 来完成本教程。

如果没有微软账户, 在此 [免费注册](https://azure.microsoft.com/free/?WT.mc_id=azureselected-content-xinglzhu) 。Azure CLI 是一个成熟的管理 Azure 资源跨平台命令行 — 请使用 [这些指示](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest&WT.mc_id=azureselected-content-xinglzhu) 安装。

# 第一件事情

使用 Azure CLI 设置本教程的 Azure 订阅ID。

设置您的Azure订阅ID：

```
export AZURE_SUBSCRIPTION_ID=[to be filled]az account set --subscription $AZURE_SUBSCRIPTION_ID
```

创建一个资源组，其中将包含您将在本教程中创建的所有服务（资源）。 资源组就像一个逻辑容器，其中包含用于Azure解决方案的相关资源。 资源组包括您要作为组管理的那些资源。

创建资源组：

```
export AZURE_RESOURCE_GROUP_NAME=[to be filled]
export AZURE_LOCATION=[to be filled]az group create --name $AZURE_RESOURCE_GROUP_NAME --location $AZURE_LOCATION
```

# 在 Azure 中安装 PostgreSQL

[用于PostgreSQL的Azure数据库](https://docs.microsoft.com/azure/postgresql/?WT.mc_id=azureselected-content-xinglzhu) 是一个基于开源 [Postgres 数据库引擎](https://www.postgresql.org/) 关系数据库服务.这是一种完全托管的数据库即服务产品，有两个部署选项可用，作为 [单一服务器](https://docs.microsoft.com/azure/postgresql/concepts-servers?WT.mc_id=azureselected-content-xinglzhu), 和作为 [和超大型 (Citus) 集群](https://docs.microsoft.com/azure/postgresql/concepts-hyperscale-nodes?WT.mc_id=azureselected-content-xinglzhu)。

> *在本教程中，我们将使用单服务器选项*

我们将使用 `az postgres server create` 命令在 Azure 中创建 Postgres 服务器实例。 首先, 设置一些服务器属性，例如名称，管理员用户等。

```
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
export SKU=B_Gen5_1
export STORAGE=5120
```

> *对于存储和 SKU 选项, 请参考  [该文档](https://docs.microsoft.com/azure/postgresql/concepts-pricing-tiers?WT.mc_id=azureselected-content-xinglzhu)。*

然后, 使用此命令创建并初始化数据库实例：

```
az postgres server create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME  --location $AZURE_LOCATION --admin-user $AZURE_POSTGRES_ADMIN_USER --admin-password $AZURE_POSTGRES_ADMIN_PASSWORD --storage-size $STORAGE --sku-name $SKU
```

设置过程将花费几分钟。

使用 `az postgres server show` 命令，检查刚刚配置的 Postgres 数据库实例的详细信息。

```
az postgres server show --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_POSTGRES_SERVER_NAME
```

此时应该得到 JSON 格式响应。请记下 `fullyQualifiedDomainName` 属性的值，因为稍后将使用它来连接到 Postgres实例。

> *其格式应该是:* `*[AZURE_POSTGRES_DB_NAME].postgres.database.azure.com*`

# 在Azure中安装虚拟机

我们将使用 Azure [虚拟机](https://docs.microsoft.com/azure/virtual-machines/?WT.mc_id=azureselected-content-xinglzhu) 托管 Payara JavaEE 应用程序服务器。具体来说，这将是基于 Ubuntu 的 Linux 虚拟机。

首先，设置虚拟机所需的信息：

```
export AZURE_VM_NAME=[to be filled]
export AZURE_VM_USER=[to be filled]
export AZURE_VM_PASSWORD=[to be filled]
export VM_IMAGE=UbuntuLTS
```

我们将使用 `az vm create` 命令创建虚拟机实例：

```
az vm create --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME --image $VM_IMAGE --admin-username $AZURE_VM_USER --admin-password $AZURE_VM_PASSWORD
```

此虚拟机配置将花费几分钟。

使用 `az vm list-ip-addresses` 命令，获取虚拟机的公共IP地址。 

```
az vm list-ip-addresses --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

查看 JSON 格式响应 — 检查 `publicIpAddresses` 部分，并记下 `ipAddress` 属性的值。 将其配置为环境变量，因为您将在后续步骤中使用它。

```
export VM_IP=[to be filled]
```

## 允许虚拟机访问 Postgres 数据库

默认情况下无法访问 Postgres 数据库。 使用 `az postgres server firewall-rule create` 命令创建防火墙规则，明确允许虚拟机访问 Postgres 实例。这将允许虚拟机内部署的 JavaEE 应用程序与 Postgres 通信。

```
export FIREWALL_RULE_NAME=AllowJavaEECafeAppOnVMaz postgres server firewall-rule create --resource-group $AZURE_RESOURCE_GROUP_NAME --server $AZURE_POSTGRES_SERVER_NAME --name $FIREWALL_RULE_NAME --start-ip-address $VM_IP --end-ip-address $VM_IP
```

# 在虚拟机中安装 Payara 服务器

[Payara 服务器](http://www.payara.fish/) 是派生自 [GlassFish](https://javaee.github.io/glassfish/) 开源应用程序服务器，它支持Java EE的可靠和安全部署。 ([Jakarta EE](https://jakarta.ee/)) 和 [MicroProfile](https://microprofile.io/) 应用程序可在任何环境中使用：本地，云中或混合环境中。

> *在* [*GitHub*](https://github.com/payara/Payara) *检出（git checkout命令）此项目，或在* [*文档*](https://docs.payara.fish/) *了解更多!*

```
ssh $AZURE_VM_USER@$VM_IP
```

提示时输入密码。 登录虚拟机后，请继续以下步骤。

## 安装所需工具集

在安装Payara服务器之前，我们需要预安装某些配置，例如JDK等。

```
sudo apt-get update
sudo apt install openjdk-8-jdk
sudo apt install maven
```

## 安装 Payara 服务器

我们使用 Payara 服务器 `5.193.1` 版本，这是撰写本教程时的最新版本。 该设置仅涉及下载和提取服务器 zip 文件。

```
export PAYARA_VERSION=5.193.1wget https://s3-eu-west-1.amazonaws.com/payara.fish/Payara+Downloads/$PAYARA_VERSION/payara-$PAYARA_VERSION.zipsudo apt install unzip
unzip payara-$PAYARA_VERSION.zip
```

运行 `ls ~/payara5/` 进行验证。

使用 `asadmin` 启动服务器。

```
~/payara5/bin/asadmin start-domain
```

服务器启动将需要一些时间。 您应该看到以下日志：

```
Waiting for domain1 to start ..................
Successfully started the domain : domain1
domain  Location: /home/abhishgu/payara5/glassfish/domains/domain1
Log File: /home/abhishgu/payara5/glassfish/domains/domain1/logs/server.log
Admin Port: 4848
Command start-domain executed successfully.
```

# 设置和部署应用程序

此时我们已经启动并运行了虚拟机和 Payara 服务器，现在可以部署应用程序了。

首先克隆Git存储库：

```
git clone https://github.com/abhirockzz/javaee-on-azure-iaasexport APP_FOLDER_NAME=javaee-on-azure-iaas
```

需要使用 Azure 中 Postgres 数据库的 JDBC URL 更新 `web.xml` 文件（在 `javaee-on-azure-iaas/src/main/webapp/WEB-INF` 下）。 它出现在部分 ``属性` 中，其格式如下：

```
jdbc:postgresql://POSTGRES_FQDN:5432/postgres?user=AZURE_POSTGRES_ADMIN_USER@=AZURE_POSTGRES_SERVER_NAME&amp;password=AZURE_POSTGRES_ADMIN_PASSWORD&amp;sslmode=require
```

这是构成JDBC URL一部分的占位符列表:

-  Postgres 实例 `POSTGRES_FQDN` 和 `fullyQualifiedDomainName` 的值
- `AZURE_POSTGRES_ADMIN_USER` 和管理员用户名用于配置 PG (Postgres)
- `AZURE_POSTGRES_SERVER_NAME` 和服务器名称用于配置 PG
- `AZURE_POSTGRES_ADMIN_PASSWORD` 和管理员密码用于配置 PG

设置所需的值：

```
export POSTGRES_FQDN=[to be filled]
export AZURE_POSTGRES_ADMIN_USER=[to be filled]
export AZURE_POSTGRES_SERVER_NAME=[to be filled]
export AZURE_POSTGRES_ADMIN_PASSWORD=[to be filled]
```

只需使用这些命令即可替换：

```
export FILE_NAME=javaee-on-azure-iaas/src/main/webapp/WEB-INF/web.xmlsed -i 's/POSTGRES_FQDN/'"$POSTGRES_FQDN"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_SERVER_NAME/'"$AZURE_POSTGRES_SERVER_NAME"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_USER/'"$AZURE_POSTGRES_ADMIN_USER"'/g' $FILE_NAMEsed -i 's/AZURE_POSTGRES_ADMIN_PASSWORD/'"$AZURE_POSTGRES_ADMIN_PASSWORD"'/g' $FILE_NAME
```

如下是 `` 部分的示例：

```
<data-source>
    <name>java:global/JavaEECafeDB</name>
    <class-name>org.postgresql.ds.PGPoolingDataSource</class-name>
    <url>jdbc:postgresql://foobar-pg.postgres.database.azure.com:5432/postgres?user=foobar@foobar-pg&amp;password=foobarbaz&amp;sslmode=require</url>
</data-source>
```

运行环境已设置完成。 开始构建程序吧！

```
mvn clean install -f $APP_FOLDER_NAME/pom.xml
```

我们开始确认是否有可用的 WAR 文件：

```
ls -lrt $APP_FOLDER_NAME/target | grep javaee-cafe.war
```

作为应用程序设置过程的最后一步, 下载 [Postgres JDBC 驱动程序](https://jdbc.postgresql.org/) 并将其添加到 Payara 服务器。

> *当前使用驱动版本号* `*42.2.8*`

```
export PG_DRIVER_JAR=postgresql-42.2.8.jarwget https://jdbc.postgresql.org/download/$PG_DRIVER_JAR
```

调用  `asadmin add-library` ， 将JAR添加到Payara：

```
~/payara5/glassfish/bin/asadmin add-library $PG_DRIVER_JAR
```

最后，开始部署WAR文件，将其复制到域 `autodeploy` 文件夹中：

```
cp $APP_FOLDER_NAME/target/javaee-cafe.war ~/payara5/glassfish/domains/domain1/autodeploy
```

部署将需要一些时间。 同时，您可以使用以下方法跟踪日志：

```
tail -f ~/payara5/glassfish/domains/domain1/logs/server.log
```

您应该会看到 `javaee-cafe` 应用程序的日志消息，提示成功部署：

```
[2019-11-18T13:34:21.317+0000] [Payara 5.193] [INFO] [NCLS-DEPLOYMENT-02035] [javax.enterprise.system.tools.deployment.autodeploy] [tid: _ThreadID=104 _ThreadName=payara-executor-service-scheduled-task] [timeMillis: 1574084061317] [levelValue: 800] [[
[AutoDeploy] Successfully autodeployed : /home/abhishgu/payara5/glassfish/domains/domain1/autodeploy/javaee-cafe.war.]]
```

# 探索应用程序

现在该测试 JavaEE应用了！ 首先，我们可以使用网络浏览器访问该应用程序。 但是，就像 Postgres 实例一样，默认情况下，托管 Payara 服务器和应用程序的虚拟机也受到保护，即您无法从公共 Internet 访问它。

我们需要使用 `az vm open-port` 创建防火墙规则，使本地计算机可以访问它。 我们只需要公开端口 `8080` ，因为这是 Payara 服务器使用的默认 HTTP 端口

```
az vm open-port --port 8080 --resource-group $AZURE_RESOURCE_GROUP_NAME --name $AZURE_VM_NAME
```

## 访问JSF前端

使用浏览器打开 `http://[ENTER_VM_IP]:8080/javaee-cafe`. 你可以使用此图形交换系统创建、删除和列出咖啡（coffees）。

## 使用 REST API

该应用使用 REST API 同样用于创建、删除和列出咖啡（coffees）。

```
export VM_IP=[to be filled]
```

创建咖啡：

```
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"cappuccino","price":"10"}' -H "Content-Type: application/json"
curl -X POST $VM_IP:8080/javaee-cafe/rest/coffees -d '{"name":"caffe-latte","price":"15"}' -H "Content-Type: application/json"
```

获取全部咖啡：

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

此时应会看到 JSON 格式的响应，列出刚才添加的所有咖啡

通过 ID 获取咖啡：

```
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees/1
```

通过 ID 删除咖啡：

```
curl -X DELETE $VM_IP:8080/javaee-cafe/rest/coffees/1
curl -H "Accept: application/json" $VM_IP:8080/javaee-cafe/rest/coffees
```

注意 `cappuccino` 已删除。

# 清理资源

探索完应用程序后，您可以删除资源。 由于我们使用了资源组，因此执行单个命令很容易。

> *请注意，这将删除该组中的所有资源，包括您在教程中创建的资源（虚拟机，Postgres等），如果资源组是* 之前创建 *，资源组中的其他服务实例也会删除*

```
az group delete --name $AZURE_RESOURCE_GROUP_NAME
```

# 总结

您已通过学习如何在 Azure 中部署 Java EE 应用程序，掌握了使用虚拟机和托管数据库部属应用服务器，提供长期持久性支持。

如前所述，每个选项都有其优缺点。 在这种情况下，您可以完全控制应用程序，部署基础结构，扩展方式等。另一方面，请记住，管理基础结构、调整应用大小、安全防护等应用程序功能，是同交付核心业务价值一样，必须承担的一系列责任。

下一部分将深入探讨如何使用Docker容器平台来部署Java EE应用程序。 敬请关注！

