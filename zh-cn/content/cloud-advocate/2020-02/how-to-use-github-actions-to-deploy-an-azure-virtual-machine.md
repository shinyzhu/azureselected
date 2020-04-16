---
type: post
status: review
sidebar: auto
title: '如何使用GitHub Actions部署虚拟机'
description: '这是一篇指导性博客，帮助非开发人员社区使用GitHub Actions部署Azure资源。'
tags: ['Azure Virtual Machine', 'GitHub Actions']
author: 'Sarah Lean'
date: 2020-01-22
url: 'https://techcommunity.microsoft.com/t5/itops-talk-blog/how-to-use-github-actions-to-deploy-an-azure-virtual-machine/ba-p/1092015'
translator: 'IannaZhou'
reviewer: 'shinyzhu'
pub_date: 2020-03-17
---

# 如何使用GitHub Actions部署虚拟机

<ContentMeta />

在部署服务器时，人们要么将其从安装包中解压，要么使用 GUI 进行操作，你也是其中的一员吗？我在事业起步时就是这么操作的。但是，在过去的几年当中，我逐渐适应了通过代码来部署服务器及其相关资源。通过使用PowerShell 或者 Azure CLI，或者两者结合。

我自学了一系列工具，如 Visual Studio Code, Git, GitHub 甚至是 Azure DevOps 来完成任务。一路走来并不容易，但却有趣而充满挑战。

2019年末，GitHub 发布了[GitHub Actions](https://github.blog/2019-11-14-powering-community-led-innovation-with-github-actions/)，GitHub Actions 可以自动从 GitHub 代码库中部署代码。当我的同事和朋友们开始深入了解并演示这项服务时，我就一直饶有兴趣，并决定自己上手，看看能给 IT 专家社区带来些什么，我始终坚定地相信，这些工具可以给 IT 专家们带来很好的机遇。

## GitHub Actions 术语

在我详细讲解之前，需要提一提 GitHub Actions 的相关术语。

- **Action** – 定义我们能做何种操作，我们可以从市场中免费获得，或自己创建。
- **Workflow** – 工作流，事件发生时所完成的一系列环境变量、任务以及步骤。
- **Jobs** – 任务，工作流所要执行的任务。
- **Steps** - 步骤，任务使用一项 Action 所接收的步骤。
- **Event** – 事件，发生时可以触发工作流的事件，例如向一个代码库提交代码时，会触发一个 Issue 或 PR。 

## 你想构建什么？

简单点说，我想用 GitHub Action 在 Azure 中创建虚拟机(VM)。再明确一点说，我想让它在同一资源群组下，构建虚拟机及其相关的支持性技术（存储磁盘，网络接口，虚拟网络，存储账户等）。这不是最佳的实践范式，但却是一个对新手十分友好的例子，且有详细的文档记录。

只需要使用四段 Azure CLI 代码，就能在 Azure 中创建 VM。第一段代码使用 Azure Service Principal 登录我的 Azure 订阅并执行创建 VM 的必需步骤。

```powershell
#region Login
# This logs into Azure with a Service Principal Account
#
Write-Output "Logging in to Azure with a service principal..."
az login `
    --service-principal `
    --username $servicePrincipal `
    --password $servicePrincipalSecret `
    --tenant $servicePrincipalTenantId
Write-Output "Done"
Write-Output ""
#endregion
```

下一段代码将选择正确的订阅，确保我的资源分配至正确的位置：

```powershell
#region Subscription
#This sets the subscription the resources will be created in
Write-Output "Setting default azure subscription..."
az account set `
    --subscription $azureSubscriptionName
Write-Output "Done"
Write-Output ""
#endregion
```

第三段代码将为虚拟机构建赖以生存的资源组：

```powershell
#region Create Resource Group
# This creates the resource group used to house the VM
Write-Output "Creating resource group $resourceGroupName in region $resourceGroupNameRegion..."
az group create `
    --name $resourceGroupName `
    --location $resourceGroupNameRegion
    Write-Output "Done creating resource group"
    Write-Output ""
#endregion
```

第四段代码将在资源组里创建 VM：

```powershell
#region Create VM
# Create a VM in the resource group
Write-Output "Creating VM..."
try {
    az vm create  `
        --resource-group $resourceGroupName `
        --name $serverName `
        --image win2016datacenter `
        --admin-username $adminLogin `
        --admin-password $adminPassword
    }
catch {
    Write-Output "VM already exists"
    }
Write-Output "Done creating VM"
Write-Output ""
#endregion
```

这些代码并不复杂， 在很多文档和教程里你都会看到这个著名的示例。在我的脚本中，我使用了多种参数，从而确保信息能被安全的存储或者导入至我的工作流文件中。完整的 PowerShell 脚本 [请点击此处](https://gist.github.com/weeyin83/81e7a7bf3caf3d0bce787db5d562b47e?WT.mc_id=blog-itops-salean)。

## 我该如何创建Action？

为了启动VM构建，我们创建一个YAML格式的工作流文件。工作流文件的名字可以是任意合法命名，它以`.yml`或`.yaml`结尾作为扩展名。还需要存储在 GitHub 库的特定目录中，即`.github/workflows`。

您的工作流文件分为几个部分，让我们分别查看每个部分：

### 元数据

我们从命名工作流开始：

```yaml
name: GitHub for IT Pro CI/CD Pipeline
```

### 环境变量

```yaml
Env:

  OUTPUT_PATH: $
```

### 触发器

然后，我们指示如何[触发](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on)该动作 ; 我已将我的操作设置为在将任何内容推送到仓库时开始：

```yaml
on: [push]
```

###  任务

现在，我们开始声明工作流将要执行的任务，我们首先必须声明工作流将在哪个平台上运行（Linux，MacOS或Windows）。

```yaml
jobs:

# Deploy VM in Azure

  DeployVM:

    runs-on: windows-latest
```

### 步骤

现在，我们可以从工作流中的步骤开始。 我已指示我的工作流第一步是签出。 这将从我的仓库中获取文件/代码，并将其放入 `$ github.workspace` 以便我的工作流访问它。

```yaml
steps:

    # checkout code from repo

    - name: checkout repo

      uses: actions/checkout
```

下一步是告诉工作流查找有助于构建VM的PowerShell脚本：

```yaml
    - name: look for ps1 file

      run: |

        ls '$\IaC\AzCLI'
```

我们工作流的最后一步是部署和配置VM：

```yaml
 - name: provision virtual machine in azure

      env:

        RESOURCE_GROUP: rg-githubitpro

        RESOURCE_GROUP_REGION: southcentralus

        SERVER_NAME: gihtubactions

        ADMIN_LOGIN: sarah

      run: >

        powershell -command "& '$\IaC\AzCLI\vmcreation.ps1'"

        -servicePrincipal $

        -servicePrincipalSecret $

        -servicePrincipalTenantId $

        -azureSubscriptionName $

        -resourceGroupName %RESOURCE_GROUP%

        -resourceGroupNameRegion %RESOURCE_GROUP_REGION%

        -serverName %SERVER_NAME%

        -adminLogin %ADMIN_LOGIN%

        -adminPassword $
```

该步骤有很多内容，所以现在让我们进一步分解一下我们正在做的事情：

```yaml
    - name: provision virtual machine in azure

      env:

        RESOURCE_GROUP: rg-githubitpro

        RESOURCE_GROUP_REGION: southcentralus

        SERVER_NAME: gihtubactions

        ADMIN_LOGIN: sarah
```

第一部分声明了一些环境变量，在这里我设置了Azure资源组名称，我要部署资源组的区域，虚拟机（服务器）的名称以及将要使用的管理员登录帐户名称。 

该步骤的第二步是告诉工作流调用我的PowerShell脚本，并从工作流和[GitHub 密钥存储](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)传入下面的变量。为了允许GitHub Actions在我的Azure订阅中部署资源，我创建了一个Azure服务主体。 如果您从未接触过，那么我之前在[另一篇文章](https://techcommunity.microsoft.com/t5/itops-talk-blog/working-with-azure-service-principal-accounts/ba-p/1086961?WT.mc_id=blog-itopstalk-salean)中介绍了如何创建和使用它们。

```yaml
run: >

        powershell -command "& '$\IaC\AzCLI\vmcreation.ps1'"

        -servicePrincipal $

        -servicePrincipalSecret $

        -servicePrincipalTenantId $

        -azureSubscriptionName $

        -resourceGroupName %RESOURCE_GROUP%

        -resourceGroupNameRegion %RESOURCE_GROUP_REGION%

        -serverName %SERVER_NAME%

        -adminLogin %ADMIN_LOGIN%

        -adminPassword $
```

此工作流的完整文件可以在[这里](https://gist.github.com/weeyin83/b63d320cc814dee9aebb599b847d0a49)找到。

## 监控GitHub Action的运行状态

Action在运行时，你可以监视其进度。当你导航到GitHub仓库时，你将看到一个名为Actions的选项卡，单击该选项卡将带你进入Workflow部分。 你可以创建新的工作流，编辑工作流并监控工作流的运行进度。

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163886i433300750608D8F9/image-size/large?v=1.0&px=999)*GitHub Actions 标签页*

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163889iD61736851B0DA262/image-size/large?v=1.0&px=999)*监控 GitHub Actions*

工作流完成后，你可以检查Azure订阅，就能看到创建的资源了：

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163887i4528F2147C235951/image-size/large?v=1.0&px=999)*Azure 资源*

## 注意事项

这里的示例是一个非常基本的工作流，而正在部署的资源也是一个非常基本的资源，但是对我来说，这是学习GitHub Actions的一个很好的起点。我已经看到我的同事将其用于更复杂的部署和工作流，例如Aaron Powell正在使用它来[部署他的博客](https://www.aaron-powell.com/posts/2019-12-17-implementing-github-actions-for-my-blog/)。

我为测试此部署而创建的[代码库](https://github.com/weeyin83/vm-actions)是公开的，工作流的输出可供已登录或未登录到GitHub的任何人查看，它包含某些可能被视为敏感的信息，比如我的Azure订阅ID，更重要的是虚拟机的IP地址，给了恶意的人一个容易攻击的机会。因此，如果你正在测试GitHub Action，请注意这一点，并警惕你在Azure中部署的内容以及它的安全性。

我录制了一段视频，记录了代码的过程和每一步，可以在此处找到此视频：<https://youtu.be/0kDr9OlAzlM>。

我很想听听其他IT专业人士是如何使用GitHub Action来部署基础设施的，所以请联系并分享您的故事！