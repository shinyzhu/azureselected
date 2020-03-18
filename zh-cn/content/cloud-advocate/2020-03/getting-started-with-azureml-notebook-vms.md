---
type: post
status: review
sidebar: auto
title: "AzureML Notebook VM入门"
description: "Azure机器学习（AML）是一种基于云端环境，可用于训练，部署，自动化，管理和跟踪ML模型。在下面的教程中，我们将逐步介绍如何设置Azure Notebook VM。"
tags: ['AI', 'ML', 'VM']
author: 'Ari Bornstein'
date: 2019-12-24
url: 'https://medium.com/microsoftazure/getting-started-with-azureml-notebook-vms-f637b6e09ed4'
translator: 'JamesL20'
reviewer: 'shinyzhu'
pub_date: 2020-03-18
---

# AzureML Notebook VM入门

<ContentMeta />

::: warning 注意

该贴的内容已经过期；关于即将推出的Azure机器学习计算实例，请查阅[这篇新文章](https://docs.microsoft.com/en-us/azure/machine-learning/concept-compute-instance/?WT.mc_id=blog-medium-abornst)！

:::

![img](https://miro.medium.com/max/900/1*2pYrggp8mO47vVpGA2Dfdg.gif)

内容摘要：[Azure 机器学习](https://docs.microsoft.com/en-us/azure/machine-learning/service/overview-what-is-azure-ml?WT.mc_id=blog-medium-abornst)（AML）是一种基于云端环境，你可以使用它来训练、部署、自动化、管理和跟踪 ML 模型。在下面的教程里，我们将介绍如何创建一个运行Azure Notebook VM。

## AzureML Notebook VMs有哪些优点？

AzureML Notebook VMs是一个基于云的环境，它预装了所有你需要用于机器学习和数据科学研究的功能。

AzureML Notebook VM安全易用，具备完全可自定义的功能，并且直接集成在Azure机器学习服务中，为数据科学家提供了代码优先的体验，便于使用Azure ML来构建和部署模型。

AzureML Notebook VM的特性：

- **安全性** — AML工作区与Azure Active Directory相互集成，支持通过该内置功能进行身份验证，访问工作区资源。
- **可扩展性** — 因为Notebooks是由AML服务进行管理，仅需在AML工作区网页上轻点几下鼠标，即可按需增减所需的计算资源。
- **预配置** — 默认提供最新AML Python环境，还有GPU驱动，Pytorch，Tensorflow，Scikit learn, R语言等诸多资源。
- **可定制化** — 可通过ssh访问虚拟机，安装你自己的工具或驱动，并且所作改动即使关机重启后依然保留。

## 第一步：登录Azure

如果你还没有Azure订阅，请通过以下链接获取免费账号。

[立即创建 Azure 免费帐户](https://azure.microsoft.com/en-us/free/?WT.mc_id=blog-medium-abornst)

## 第二步：创建Azure机器学习工作区

![img](https://miro.medium.com/freeze/max/900/0*N09HG5K133NUC45H.gif)

按照上面动图中的步骤来创建一个新的Azure机器学习服务实例。请参考以下教程获得更多信息。

[教程：创建你的第一个ML试验 - Azure机器学习](https://docs.microsoft.com/en-us/azure/machine-learning/service/tutorial-1st-experiment-sdk-setup?WT.mc_id=blog-medium-abornst)

## 第三步：在 Azure 机器学习中的工作区内选择“Compute”

![img](https://miro.medium.com/max/900/1*r9E_9IOr95ZxpA_2nOzC_g.png)

## 第四步：点击“New”

![img](https://miro.medium.com/max/900/1*GJom1HUXnuK803DjzrGRtw.png)

## 第五步：选择合适的VM类型并部署

![img](https://miro.medium.com/max/900/1*pzTToNLGuG9WRii4Q60X4g.png)

以下文档提供了VM类型和价格列表。对于大多数的项目，推荐使用标准系列；而对于GPU有一定要求的项目，建议使用N系列。

[虚拟机系列](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/?WT.mc_id=blog-medium-abornst)

选择完成后，点击“Create”按钮。根据配置不同，新虚拟机的创建大约是5 ~10分钟。

## 第六步：Jupyter、JupyterLab 和 RStudio，挑选你喜欢的工具开始编写代码吧

![img](https://miro.medium.com/max/900/1*5FXOhPFpHBdHhqCh5SbvGw.png)

![img](https://miro.medium.com/max/60/1*W2t49hUltJddA_Mpyop9Tg.png?q=20)

![img](https://miro.medium.com/max/900/1*W2t49hUltJddA_Mpyop9Tg.png)

## 最佳实践：关闭不在使用中的VM，删除使用标准依赖项的VM。

![img](https://miro.medium.com/max/900/1*u-ap5ZImFnzj2kmpg3w9GA.png)

不同于DSVM，由于所有Notebooks数据都保留在Azure机器学习服务的Notebooks区，你的数据能够被恢复并在多个Notebook VMs之间共享。因此，可以实现使用一台标准VM进行基本数据处理；当需要GPU算力时，无缝切换至另一台N系列VM。

## 后续步骤

现在你已经创建了你的第一台Notebook VM了，来看看我之前发布的9个机器学习生产环境下的高级技巧。

[9 Advanced Tips for Production Machine Learning](https://medium.com/microsoftazure/9-advanced-tips-for-production-machine-learning-6bbdebf49a6f)

还有一篇如何使用[Visual Studio Code](https://code.visualstudio.com/)对你新创建的Notebook VM设置远程调试。

[danielsc/azureml-debug-training](https://github.com/danielsc/azureml-debug-training/blob/master/Setting up VSCode Remote on an AzureML Notebook VM.md)

## 关于作者

[Aaron（Ari）Bornstein](https://www.linkedin.com/in/aaron-ari-bornstein-22aa7a77/)是一位狂热的AI爱好者，热衷于了解新技术、历史和计算医学。作为一名微软云开发大使团队的开源工程师，他通过与以色列高科技社区的相互协作，运用最前沿技术解决了各种现实场景中的难题。这些技术随后被记录、开源并与全世界分享。
