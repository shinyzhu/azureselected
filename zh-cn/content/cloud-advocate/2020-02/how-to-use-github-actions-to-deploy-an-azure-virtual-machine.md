---
type: post
status: new
sidebar: auto
title: '如何使用GitHub Actions部署虚拟机'
description: '这是一篇指导性博客，帮助非开发人员社区使用GitHub Actions部署Azure资源。'
tags: ['Azure Virtual Machine', 'GitHub Actions']
author: 'Sarah Lean'
date: 2020-01-22
url: 'https://techcommunity.microsoft.com/t5/itops-talk-blog/how-to-use-github-actions-to-deploy-an-azure-virtual-machine/ba-p/1092015'
translator: ''
reviewer: ''
pub_date: 
---

# 如何使用GitHub Actions部署虚拟机

<ContentMeta />

Hands up if you are used to deploy servers either by unpacking them from a box or using a graphical user interface (GUI)? Yip, that’s me and it's where I’ve built my career. However, over the last few years I’ve been getting more and more used to deploying servers and their supporting resources via code. Either using something like PowerShell or Azure CLI, or sometimes a combination of both. 

I’ve also taught myself how to use tools such as Visual Studio Code, Git, GitHub or even Azure DevOps to get the task done.  It’s not been an easy journey but what it has been is fun and a challenge.

At the end of 2019 GitHub announced [GitHub Actions](https://github.blog/2019-11-14-powering-community-led-innovation-with-github-actions/), a new way to automate deployment of code from GitHub repositories.  I’ve been watching with interest as my developer focused colleagues and friends dig into the new service and show examples of it being used and have decided to take a look at it myself and see what it can do for the IT Pro community, as I’m a firm believer that these types of tools can offer IT Pros great opportunities as well.

## GitHub Actions Terminology

There is some new terminology that comes with GitHub Actions, so let’s define those before we dig in.

- **Action** – these define what we can do, we can either get them from the marketplace (free) or build our own
- **Workflow** – A collection of Environment variables, Jobs and Steps that are completed when an event happens
- **Jobs** – What the workflow will do
- **Steps** - A task undertaken by a Job using an Action
- **Event** – Something that happens and triggers a workflow, e.g a commit is pushed to a repository, an issue or pull request is issued

## What do you want to build?

Keeping it simple, I want my GitHub Action to build a virtual machine (VM) within Azure. Keeping it really simple I want it to build the VM and it’s associated supporting technology (disk, network interface, virtual network, storage account, etc) within the same resource group.  This isn’t exactly best practice but is an easy example to start with and one that is well known/documented.

I can use four blocks of Azure CLI code to build the VM within Azure.  The first block of code helps log into my Azure subscription using an Azure Service Principal and perform the necessary steps to create the VM.

```markup
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

```markup
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

```markup
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

```markup
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

## How do I instruct the Action?

To kick off the VM build we construct a Workflow file. This is in the form of YAML. You can call your workflow file anything you want as long as it ends with. yml or .yaml as the extension type. It also needs to be stored within a specific directory within your GitHub repository - **.github/workflows**

Your workflow file is split up into several sections, let’s look at each of them individually:

### Metadata

We start off with some naming the workflow:

```markup
name: GitHub for IT Pro CI/CD Pipeline
```

### Environment variables:

```markup
Env:

  OUTPUT_PATH: $
```

### Triggers

We then instruct how the action will be [triggered](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on); I have set my action to start whenever something is pushed to the repository: 

```markup
on: [push]
```

###  Jobs

Now we start to declare the jobs that our workflow will do, we have to start by declaring what platform our Workflow will run on (Linux, MacOS or Windows).

```markup
jobs:

# Deploy VM in Azure

  DeployVM:

    runs-on: windows-latest
```

### Steps

Now we can start with the steps within the workflow. The first step I’ve instructed my workflow to do a checkout. This takes the files/code from my repository and puts it into **$github.workspace** for my workflow to access it.

```markup
steps:

    # checkout code from repo

    - name: checkout repo

      uses: actions/checkout
```

The next step we have is one where we tell the workflow to look for the PowerShell script that helps to build the VM:

```markup
    - name: look for ps1 file

      run: |

        ls '$\IaC\AzCLI'
```

And the last step in our workflow is to deploy and provision the VM:

```markup
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

```markup
    - name: provision virtual machine in azure

      env:

        RESOURCE_GROUP: rg-githubitpro

        RESOURCE_GROUP_REGION: southcentralus

        SERVER_NAME: gihtubactions

        ADMIN_LOGIN: sarah
```

This first part is declaring some environment variables, here I am setting my Azure Resource Group name, the region I want the resource group to be deployed in, the name of my virtual machine (server) and the name of the admin login account that will be created for that VM.

The second stage of the step is telling my workflow to call my PowerShell script and pass in the following variables from the workflow and [GitHub Secrets store](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).  To allow GitHub Actions to deploy resources within my Azure Subscription I have created an Azure Service Principal. If you’ve never worked within them before I wrote an article covering how to create and work with them [here](https://techcommunity.microsoft.com/t5/itops-talk-blog/working-with-azure-service-principal-accounts/ba-p/1086961?WT.mc_id=blog-itopstalk-salean).

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

## Monitoring the GitHub Action running

When the Action is running you can monitor its progress. When you navigate to your repository on the GitHub website you will see a tab called Actions, click into that will take you into the Workflow section. You can create new workflows, edit workflows and monitor the progress of the workflows running.

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163886i433300750608D8F9/image-size/large?v=1.0&px=999)*GitHub Actions Tab*

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163889iD61736851B0DA262/image-size/large?v=1.0&px=999)*Monitoring GitHub Actions*

And once the workflow has completed you can check in your Azure subscription and hopefully see the resource created:

![undefined](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/163887i4528F2147C235951/image-size/large?v=1.0&px=999)*Azure Resources*

## Things to think about

My example workflow is a very basic one and the resource that I am deploying is a very basic one, however for me it was a great starting point to learn GitHub Actions. I’ve seen my colleagues use it for much more complex deployments and workflows, for example Aaron Powell is using it to [deploy his blog](https://www.aaron-powell.com/posts/2019-12-17-implementing-github-actions-for-my-blog/).

The [repository](https://github.com/weeyin83/vm-actions) I created to test out this deployment is a public one and the output of my workflow is available for anyone logged in or not to GitHub to view, which displays certain information that could be considered as sensitive such as my Azure Subscription ID and more importantly the Public IP address of my VM, which gives people with bad intentions an easy attack surface.  So, if you are testing GitHub Actions please be aware of this and vigilant on what you deploy in Azure and how it is secured.

I've recorded a video of me walking through the code and each step, this video can be found here: 
<https://youtu.be/0kDr9OlAzlM>

I’d love to hear how other IT Pros are using GitHub Actions to deploy infrastructure, so please do reach out and share your stories!

