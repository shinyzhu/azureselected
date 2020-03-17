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

Hands up if you are used to deploy servers either by unpacking them from a box or using a graphical user interface (GUI)? Yip, that’s me and it's where I’ve built my career. However, over the last few years I’ve been getting more and more used to deploying servers and their supporting resources via code. Either using something like PowerShell or Azure CLI, or sometimes a combination of both. 

在部署服务器时，人们要么将其从安装包中解压，要么使用 GUI 进行操作，你也是其中的一员吗？我在事业起步时就是这么操作的。但是，在过去的几年当中，我逐渐适应了通过代码来部署服务器及其相关资源。通过使用PowerShell 或者 Azure CLI，或者两者结合都能达成。

I’ve also taught myself how to use tools such as Visual Studio Code, Git, GitHub or even Azure DevOps to get the task done.  It’s not been an easy journey but what it has been is fun and a challenge.

我自学了一系列工具，如 Visual Studio Code, Git, GitHub 甚至是 Azure DevOps 来完成任务。一路走来并不容易，但却有趣而充满挑战。

At the end of 2019 GitHub announced [GitHub Actions](https://github.blog/2019-11-14-powering-community-led-innovation-with-github-actions/), a new way to automate deployment of code from GitHub repositories.  I’ve been watching with interest as my developer focused colleagues and friends dig into the new service and show examples of it being used and have decided to take a look at it myself and see what it can do for the IT Pro community, as I’m a firm believer that these types of tools can offer IT Pros great opportunities as well.

2019年末，GitHub 发布了[GitHub Actions](https://github.blog/2019-11-14-powering-community-led-innovation-with-github-actions/)，GitHub Actions 可以自动从 GitHub repository中部署代码。当我的同事和朋友们开始了解并示例这项服务时，我就一直饶有兴趣，并决定自己上手，看看能给 IT 专家社区带来些什么，我始终坚定的相信，这些工具可以给 IT 专家们带来很好的机遇。

## GitHub Actions Terminology术语

There is some new terminology that comes with GitHub Actions, so let’s define those before we dig in.

在我详细讲解之前，需要提一提和 GitHub Actions 的相关术语。

- **Action** – these define what we can do, we can either get them from the marketplace (free) or build our own 定义我们能做何种操作，我们可以从市场中免费获得，或自己创建
- **Workflow** – A collection of Environment variables, Jobs and Steps that are completed when an event happens事件发生时所完成的一系列环境变量、任务以及步骤
- **Jobs** – What the workflow will doWorkflow 所要执行的任务
- **Steps** - A task undertaken by a Job using an ActionJob 使用一项 Action 所接收的任务步骤
- **Event** – Something that happens and triggers a workflow, e.g a commit is pushed to a repository, an issue or pull request is issued发生时可以触发工作流的事件，例如向一个 repository 提交 commit 时，会触发一个 issue 或 pull request 

## What do you want to build?你想构建什么？

Keeping it simple, I want my GitHub Action to build a virtual machine (VM) within Azure. Keeping it really simple I want it to build the VM and it’s associated supporting technology (disk, network interface, virtual network, storage account, etc) within the same resource group.  This isn’t exactly best practice but is an easy example to start with and one that is well known/documented.

简单点说，我想用 GitHub Action 在 Azure 中创建虚拟机(VM)。再明确一点说，我想让它在同一资源群组下，构建虚拟机及其相关的支持性技术（存储盘，网络界面，虚拟网络，存储账户等）。这不是最佳的实践范式，但却是一个对新手十分友好的例子，且有详细的文档记录。

I can use four blocks of Azure CLI code to build the VM within Azure.  The first block of code helps log into my Azure subscription using an Azure Service Principal and perform the necessary steps to create the VM.

只需要使用四段 Azure CLI 代码，就能在 Azure 中创建 VM。第一段代码使用 Azure Service Principal 登陆我的 Azure 订阅并执行创建 VM 的必需步骤。

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

The next section selects the correct subscription, just to be sure my resources go to the right place:

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

The third section creates the resource group for my VM to live in:

第三段代码将为虚拟机构建赖以生存的资源群组：

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

And the fourth section creates the VM within that resource group:

第四段代码将在资源群组里创建 VM：

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

The code isn’t complex and is a well-known example you can see in a lot of Documentation and tutorials. Within my script I’ve used various parameters to allow me to store the information securely or pass it in from my workflow file.  You can find my full PowerShell script [here](https://gist.github.com/weeyin83/81e7a7bf3caf3d0bce787db5d562b47e?WT.mc_id=blog-itops-salean).

这些代码并不复杂， 在很多文档和教程里你都会看到这个著名的示例。在我的脚本中，我使用了多种参数，从而确保信息能被安全的存储或者导入至我的工作流文件中。完整的 PowerShell 脚本 [请点击此处](https://gist.github.com/weeyin83/81e7a7bf3caf3d0bce787db5d562b47e?WT.mc_id=blog-itops-salean)。

## How do I instruct the Action?我该如何创建Action？

To kick off the VM build we construct a Workflow file. This is in the form of YAML. You can call your workflow file anything you want as long as it ends with. yml or .yaml as the extension type. It also needs to be stored within a specific directory within your GitHub repository - `.github/workflows`.

为了启动VM构建，我们创建一个YAML格式的工作流文件。工作流文件的名字可以是任意合法命名，它以`.yml`或`.yaml`结尾作为扩展名。还需要存储在 GitHub 库的特定目录中，即`.GitHub/workflows`。

Your workflow file is split up into several sections, let’s look at each of them individually:

您的工作流文件分为几个部分，让我们分别查看每个部分：

### Metadata元数据

We start off with some naming the workflow:

我们从命名工作流开始：

```
name: GitHub for IT Pro CI/CD Pipeline
```

### Environment variables:环境变量

```
Env:

  OUTPUT_PATH: $
```

### Triggers 触发器

We then instruct how the action will be [triggered](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on); I have set my action to start whenever something is pushed to the repository: 

然后，我们指示如何[触发](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on)该动作 ; 我已将我的操作设置为在将任何内容推送到仓库时开始：

```
on: [push]
```

###  Jobs 任务

Now we start to declare the jobs that our workflow will do, we have to start by declaring what platform our Workflow will run on (Linux, MacOS or Windows).

现在，我们开始声明工作流将要执行的任务，我们首先必须声明工作流将在哪个平台上运行（Linux，MacOS或Windows）。

```yaml
jobs:

# Deploy VM in Azure

  DeployVM:

    runs-on: windows-latest
```

### Steps 步骤

Now we can start with the steps within the workflow. The first step I’ve instructed my workflow to do a checkout. This takes the files/code from my repository and puts it into **$github.workspace** for my workflow to access it.

现在，我们可以从工作流中的步骤开始。 我已指示我的工作流第一步是签出。 这将从我的仓库中获取文件/代码，并将其放入 `$ github.workspace` 以便我的工作流访问它。

```yaml
steps:

    # checkout code from repo

    - name: checkout repo

      uses: actions/checkout
```

The next step we have is one where we tell the workflow to look for the PowerShell script that helps to build the VM:

下一步是告诉工作流查找有助于构建VM的PowerShell脚本：

```yaml
    - name: look for ps1 file

      run: |

        ls '$\IaC\AzCLI'
```

And the last step in our workflow is to deploy and provision the VM:

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

Now there is a lot to that step so let’s break down what we are doing even further:

该步骤有很多内容，所以现在让我们进一步分解一下我们正在做的事情：

```yaml
    - name: provision virtual machine in azure

      env:

        RESOURCE_GROUP: rg-githubitpro

        RESOURCE_GROUP_REGION: southcentralus

        SERVER_NAME: gihtubactions

        ADMIN_LOGIN: sarah
```

This first part is declaring some environment variables, here I am setting my Azure Resource Group name, the region I want the resource group to be deployed in, the name of my virtual machine (server) and the name of the admin login account that will be created for that VM.

第一部分声明了一些环境变量，在这里我设置了Azure资源组名称，我要部署资源组的区域，虚拟机（服务器）的名称以及将要使用的管理员登录帐户名称。 

The second stage of the step is telling my workflow to call my PowerShell script and pass in the following variables from the workflow and [GitHub Secrets store](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).  To allow GitHub Actions to deploy resources within my Azure Subscription I have created an Azure Service Principal. If you’ve never worked within them before I wrote an article covering how to create and work with them [here](https://techcommunity.microsoft.com/t5/itops-talk-blog/working-with-azure-service-principal-accounts/ba-p/1086961?WT.mc_id=blog-itopstalk-salean).

该步骤的第二步是告诉工作流调用我的PowerShell脚本，并从工作流和[GitHub 密钥存储](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)传入下面的变量。为了允许GitHub Actions在我的Azure订阅中部署资源，我创建了一个Azure服务主体。 如果您从未接触过，那么我之前在[另一篇文章](https://techcommunity.microsoft.com/t5/itops-talk-blog/working-with-azure-service-principal-accounts/ba-p/1086961?WT.mc_id=blog-itopstalk-salean)中介绍了如何创建和使用它们。

```markup
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

For a full copy of this workflow file, you can find it [here](https://gist.github.com/weeyin83/b63d320cc814dee9aebb599b847d0a49).

此工作流的完整文件可以在[这里](https://gist.github.com/weeyin83/b63d320cc814dee9aebb599b847d0a49)找到。

## Monitoring the GitHub Action running监控GitHub Action的运行

When the Action is running you can monitor its progress. When you navigate to your repository on the GitHub website you will see a tab called Actions, click into that will take you into the Workflow section. You can create new workflows, edit workflows and monitor the progress of the workflows running.

Action在运行时，你可以监视其进度。当你导航到GitHub仓库时，你将看到一个名为Actions的选项卡，单击该选项卡将带你进入Workflow部分。 你可以创建新的工作流，编辑工作流并监控工作流的运行进度。

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163886i433300750608D8F9/image-size/large?v=1.0&px=999)*GitHub Actions 标签页*

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163889iD61736851B0DA262/image-size/large?v=1.0&px=999)*监控 GitHub Actions*

And once the workflow has completed you can check in your Azure subscription and hopefully see the resource created:

工作流完成后，你可以检查Azure订阅，就能看到创建的资源了：

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163887i4528F2147C235951/image-size/large?v=1.0&px=999)*Azure 资源*

## Things to think about要考虑的事情

My example workflow is a very basic one and the resource that I am deploying is a very basic one, however for me it was a great starting point to learn GitHub Actions. I’ve seen my colleagues use it for much more complex deployments and workflows, for example Aaron Powell is using it to [deploy his blog](https://www.aaron-powell.com/posts/2019-12-17-implementing-github-actions-for-my-blog/).

这里的示例是一个非常基本的工作流，而正在部署的资源也是一个非常基本的资源，但是对我来说，这是学习GitHub Actions的一个很好的起点。我已经看到我的同事将其用于更复杂的部署和工作流，例如Aaron Powell正在使用它来[部署他的博客](https://www.aaron-powell.com/posts/2019-12-17-implementing-github-actions-for-my-blog/)。

The [repository](https://github.com/weeyin83/vm-actions) I created to test out this deployment is a public one and the output of my workflow is available for anyone logged in or not to GitHub to view, which displays certain information that could be considered as sensitive such as my Azure Subscription ID and more importantly the Public IP address of my VM, which gives people with bad intentions an easy attack surface.  So, if you are testing GitHub Actions please be aware of this and vigilant on what you deploy in Azure and how it is secured.

我为测试此部署而创建的[存储库](https://github.com/weeyin83/vm-actions)是公开的，工作流的输出可供已登录或未登录到GitHub的任何人查看，它包含某些可能被视为敏感的信息，比如我的Azure订阅ID，更重要的是虚拟机的IP地址，给了恶意的人一个容易攻击的机会。因此，如果你正在测试GitHub Action，请注意这一点，并警惕你在Azure中部署的内容以及它的安全性。

I've recorded a video of me walking through the code and each step, this video can be found here: 
<https://youtu.be/0kDr9OlAzlM>

我录制了一段视频，记录了代码的过程和每一步，可以在此处找到此视频：<https://youtu.be/0kDr9OlAzlM>。

I’d love to hear how other IT Pros are using GitHub Actions to deploy infrastructure, so please do reach out and share your stories!

我很想听听其他IT专业人士是如何使用GitHub Action来部署基础设施的，所以请联系并分享您的故事！