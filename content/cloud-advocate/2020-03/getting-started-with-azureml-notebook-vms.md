---
type: post
status: new
sidebar: auto
title: "Getting Started With AzureML Notebook VMs"
description: "Azure Machine Learning (AML), a cloud-based environment you can use to train, deploy, automate, manage, and track ML models. In the following tutorial we will walk through how to set up an Azure Notebook VM."
tags: ['AI', 'ML', 'VM']
author: 'Ari Bornstein'
date: 2019-12-24
url: 'https://medium.com/microsoftazure/getting-started-with-azureml-notebook-vms-f637b6e09ed4'
translator: ''
reviewer: ''
pub_date: 
---

# Getting Started With AzureML Notebook VMs

<ContentMeta />

(Notice this post is out of date please check out [Azure Machine Learning Compute Instance’s](https://docs.microsoft.com/en-us/azure/machine-learning/concept-compute-instance/?WT.mc_id=blog-medium-abornst) a new post describing how to get started is coming soon!)

![img](https://miro.medium.com/freeze/max/60/1*2pYrggp8mO47vVpGA2Dfdg.gif?q=20)

![img](https://miro.medium.com/max/6368/1*2pYrggp8mO47vVpGA2Dfdg.gif)

TLDR; [Azure Machine Learning](https://docs.microsoft.com/en-us/azure/machine-learning/service/overview-what-is-azure-ml?WT.mc_id=blog-medium-abornst) (AML), a cloud-based environment you can use to train, deploy, automate, manage, and track ML models. In the following tutorial we will walk through how to set up an Azure Notebook VM.

## What are the benefits of AzureML Notebook VMs?

Azure ML Notebook VMs are cloud-based environments preloaded with everything you need to get started with ML and data science in Azure.

AML Notebook VMs are secure and easy-to-use, fully customizable and directly integrated into Azure Machine Learning Service, providing a code-first experience for data scientists to build and deploy models using AzureML

Azure ML Notebook VM Features:

- **Secure** — Azure Active Directory login integrated with the AML Workspace, provides access to files stored in the workspace, implicitly configured for the workspace.
- **Scalable**— created with a few clicks in the AML workspace portal, managed from within the AML workspace portal. Since notebooks are managed by the AML Service compute can be scaled as needed.
- **Pre-Configured**— up-to-date AML Python Environment, GPU drivers, Pytorch, Tensorflow, Scikit learn, R etc.
- **Customizable** — ssh to the machine, install your own tools (or drivers), changes persist when machines are shut down or restarted.

## Step 1: Login to Azure

If you don’t have an Azure Subscription you can get a free account using the link below.

[Create your Azure free account today](https://azure.microsoft.com/en-us/free/?WT.mc_id=blog-medium-abornst).

## Step 2: Create Azure Machine Learning Workspace

![img](https://miro.medium.com/freeze/max/60/0*N09HG5K133NUC45H.gif?q=20)

Follow the instructions in the gif above to create a new azure machine learning service instance. More information can be found below.

[Tutorial: Create your first ML experiment - Azure Machine Learning](https://docs.microsoft.com/en-us/azure/machine-learning/service/tutorial-1st-experiment-sdk-setup?WT.mc_id=blog-medium-abornst)

## Step 3: Navigate to Azure ML Compute

![img](https://miro.medium.com/max/60/1*r9E_9IOr95ZxpA_2nOzC_g.png?q=20)

## Step 4: Click New Compute

![img](https://miro.medium.com/max/60/1*GJom1HUXnuK803DjzrGRtw.png?q=20)

## Step 5: Choose the VM Size and Deploy

![img](https://miro.medium.com/max/60/1*pzTToNLGuG9WRii4Q60X4g.png?q=20)

A list of VM Sizes and pricing can be found in the documentation below. The standard series is recommended for most projects and the N series are recommended for projects requiring GPU.

[Virtual Machine series](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/?WT.mc_id=blog-medium-abornst)

When you are done click create it should take about 5–10 mins to set up the new VM depending on the specified configuration.

## Step 6: Jupyter, JupyterLab or Open R Studio and Get Started Coding

![img](https://miro.medium.com/max/60/1*5FXOhPFpHBdHhqCh5SbvGw.png?q=20)

![img](https://miro.medium.com/max/5932/1*5FXOhPFpHBdHhqCh5SbvGw.png)

![img](https://miro.medium.com/max/60/1*W2t49hUltJddA_Mpyop9Tg.png?q=20)

![img](https://miro.medium.com/max/5344/1*W2t49hUltJddA_Mpyop9Tg.png)

## Bonus Best Practice: Shutdown VM when not in use delete VM when using standard dependencies.

![img](https://miro.medium.com/max/60/1*u-ap5ZImFnzj2kmpg3w9GA.png?q=20)

Since all notebooks are persisted in the notebooks section of the Azure ML Service unlike a DSVM your work can be recovered and shared across multiple notebook VMs. So it is seamless to start with a standard VM for basic data processing and later switch to a N Series VM if GPU Compute is needed.

## Next Steps

Now that you have set up your first Notebook VM check out my previous post on 9 Advanced Tips for Production machine learning.

[9 Advanced Tips for Production Machine Learning](https://medium.com/microsoftazure/9-advanced-tips-for-production-machine-learning-6bbdebf49a6f)

Also check out setting up Remote Debugging on your new Azure Notebook VM with [Visual Studio Code](https://code.visualstudio.com/).

[danielsc/azureml-debug-training](https://github.com/danielsc/azureml-debug-training/blob/master/Setting up VSCode Remote on an AzureML Notebook VM.md)

## About the Author

[Aaron (Ari) Bornstein](https://www.linkedin.com/in/aaron-ari-bornstein-22aa7a77/) is an avid AI enthusiast with a passion for history, engaging with new technologies and computational medicine. As an Open Source Engineer at Microsoft’s Cloud Developer Advocacy team, he collaborates with Israeli Hi-Tech Community, to solve real world problems with game changing technologies that are then documented, open sourced, and shared with the rest of the world.