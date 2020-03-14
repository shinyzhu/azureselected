---
type: post
status: review
sidebar: auto
title: '如何降低Azure虚拟机的成本'
description: '这篇博客专注于通过减少使用Azure虚拟机（VM）的成本来帮助您省钱。这里的一些技巧将帮助所有人。'
tags: ['Azure Stack Hub', 'Azure Migration Center', 'Azure Cost Management', 'Azure Dedicated Host', 'Azure Hybrid Benefit']
author: 'Thomas Maurer'
date: 2020-01-23
url: 'https://www.thomasmaurer.ch/2020/01/how-to-reduce-the-costs-of-your-azure-iaas-vms/'
translator: 'DuanShaolong'
reviewer: 'shinyzhu'
pub_date: 2020-03-14
---

# 如何降低Azure虚拟机的成本

<ContentMeta />

Azure基础设施既服务(IaaS)通过传统虚拟化技术提供显著的优点。比如无论何时需要都可以在全球任何Azure区域快速启动几个虚拟机，因此非常强大。更多其它优点请点击[Azure基础设服务虚拟机](https://azure.microsoft.com/services/virtual-machines?WT.mc_id=thomasmaurer-blog-thmaure)。当然，那些不属于这篇博客的部分内容。这篇博客专注于通过降低使用Azure基础设施服务虚拟机的成本来帮助你节省金钱。这里的一些提议可以帮到每位用户。

## 选择合适的Azure虚拟机系列及合适的Azure虚拟机型号

![通过选择合适的Azure虚拟机型号来降低成本](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Reduce-cost-by-picking-the-right-Azure-VM-size-768x508.jpg)
通过选择合适的Azure虚拟机型号来降低成本

首先，很明显你需要为大型虚拟机支付更多的费用。在与客户的合作中，我发现：他们在Azure上所使用的虚拟机规格与本地数据中心所使用的虚拟机规格相同，但并没有意识到这样的虚拟机规格是过大的。本地数据中心的硬件是静态容量，他们可以不关心这些，但是当你在云平台上需要为过大的虚拟机资源付费时情况就不同了。因此，请确保你使用的Azure虚拟机规格没有太大。如果需要，你随时可以将虚拟机规格改为更大的型号。如果你正在寻找一个工具比如[Azure Migrate](https://azure.microsoft.com/services/azure-migrate?WT.mc_id=thomasmaurer-blog-thmaure) 以迁移你已有的虚拟机到Azure基础设施服务，你还将有一些额外的优势。Azure Migrate会评估你的现有环境并依据历史性能数据帮助你选择合适的Azure虚拟机型号。Azure Migrate可以用于Hyper-V和VMware的虚拟机，如果想了解更多关于Azure Migrate的信息，请查看我的[博客](https://www.thomasmaurer.ch/2019/07/assess-and-migrate-hyper-v-vms-with-azure-migrate/)。如果你已经在Azure中运行虚拟机，Azure 顾问可以帮助你了解虚拟机是否充分利用。选择正确的型号将帮追节省资金并降低Azure基础设施服务虚拟机的成本。

为了更加方便的选择合适的型号，Azure为你提供不同的类型或者称作[VM 类型](https://azure.microsoft.com/pricing/details/virtual-machines/series?WT.mc_id=thomasmaurer-blog-thmaure)。你可以在Azure网站上找到一套不同的虚拟机类型，这些虚拟机类型根据用例、方案和应用程序需求为你提供丰富的选择，包括：通用虚拟机，计算、内存或者存储优化的虚拟机，带有GPU的虚拟机，HPC负载的虚拟机。关于不同类型和型号的虚拟机信息你可以点击查看此[文档](https://docs.microsoft.com/azure/virtual-machines/windows/sizes?WT.mc_id=thomasmaurer-blog-thmaure)。

## 需要的时候运行，不需要的时候就关闭
云计算的另一个巨大优势是用量付费的选项。如果某个时间段你不再需要一个虚拟机继续运行，你可以将其关闭，此时你只需要为其所使用的存储付费，而不用为其计算能力付费。这可以帮助你处理那些需要使用虚拟机进行扩展和缩减的工作负载，或者只是用于测试/开发/实验环境的那些不需要100%时间运行的虚拟机。

## 选择使用Azure预留实例
![Azure Reservations Reserved Instances and reserved capacity](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Reservations-Reserved-Instances-and-reserved-capacity-768x429.jpg)Azure预留实例和预留容量

现在，我知道关闭那些运行了正确负载和应用程序的虚拟机在理论上是优秀的做法。然而那些需要全年365天24小时运行的虚拟机要如何处理呢？对于这样的场景，微软有一些称作Azure预留实例，如果你考虑需要使用Azure基础设施服务虚拟机，就选择Azure预留虚拟机实例。Azure预留虚拟机实例可以采用预付一年或者三年的虚拟机费用帮助你节省资金。预付费的方式允许你获得所使用资源的折扣。这种预留的形式可以显著降低Azure基础设施服务虚拟机，SQL数据库计算服务，Azure Cosmos数据库，及其它服务资源可降低最高72%的成本（与即用即付价格相比）。想要了解更多关于Azure预留，请查看 [我的关于如何使用Azue预留节省Azure成本的博客](https://www.thomasmaurer.ch/2019/09/how-to-save-money-on-azure-using-azure-reservations/)。

## 使用经济型可爆发的虚拟机
B系列属于经济型虚拟机，可为通常以低到中等基准CPU性能运行但有时在需求提高时需要爆发到高得多的CPU性能的工作负荷提供低成本选项。这些工作负荷无需CPU始终满负荷运转，但偶尔需要爆发以更快完成某些任务。想要了解更多关于A系列Azure虚拟机的请点击[微软文档](https://docs.microsoft.com/azure/virtual-machines/windows/b-series-burstable?WT.mc_id=thomasmaurer-blog-thmaure)。

## Azure Spot虚拟机用于批量处理作业可显著节省成本
借助Azure Spot虚拟机，您将能够以大幅折扣访问未使用的Azure计算容量，与即用即付价格相比高达90%的折扣。[Spot VMs](https://azure.microsoft.com/pricing/spot?WT.mc_id=thomasmaurer-blog-thmaure) 非常适合用于可中断的工作负载，提供可扩展性的同事降低成本。使用Spot虚拟机使你能够充分利用未使用的计算能力，从而显著降低成本。当Azure需要恢复容量时，Azure基础结构将创建Spot实例。因此，Spot实例非常适合用于处理中断的工作负荷，如批处理作业、开发/测试环境、大型计算工作负荷等。当Spot虚拟机运行Windows Server工作负载时，你将获得独一无二的定价和优势，Spot实例当前为公共预览版。不建议将此预览版本用于生产工作负荷。有关详细信息，请参阅[微软文档](https://docs.microsoft.com/azure/virtual-machines/windows/spot-vms?WT.mc_id=thomasmaurer-blog-thmaure)。

## 利用Azure混合优势
如果你已经拥有带有软件保障的Windows Server和SQL Server本地许可证，那么你可以直接将其用于Azure虚拟机，这就允许你节省即用即付的Windows Server和SQL Server许可授权的成本。[Azure混合权益](https://azure.microsoft.com/pricing/hybrid-benefit?WT.mc_id=thomasmaurer-blog-thmaure)不仅适用于Azure虚拟机，也适用于PaaS层的Azure数据库和[Azure专用主机](https://www.thomasmaurer.ch/2019/08/azure-dedicated-host-for-your-azure-vms/)。想要了解更多关于Azure混合权益的优势请查看[微软Azure文档](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing?WT.mc_id=thomasmaurer-blog-thmaure)。

## 使用成本管理来分析你的支出
![Azure Cost Management](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Cost-Management-768x418.jpg)Azure成本管理

使用[Azure 成本管理](https://azure.microsoft.com/services/cost-management?WT.mc_id=thomasmaurer-blog-thmaure),你可以使用统一的单个视图跟踪所有云中的资源使用情况和管理成本，同时获取丰富的运营和财务见解，做出明智的决策。通过使用持续成本优化和行业最佳做法来提高云投资回报。Sonia Cuff写了一篇博客[逐步分析：查找和分析微软Azure云使用成本](https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Step-by-Step-Finding-and-Analyzing-Microsoft-Azure-Cloud-Usage/ba-p/718890?WT.mc_id=thomasmaurer-blog-thmaure)。

## 使用Azure顾问降低你的Azure基础设施服务虚拟机成本
![Azure Advisor Recommendations](https://www.thomasmaurer.ch/wp-content/uploads/2020/01/Azure-Advisor-Recommendations-768x325.jpg)
Azure 顾问推荐

[Azure顾问](https://azure.microsoft.com/services/advisor?WT.mc_id=thomasmaurer-blog-thmaure)是一个针对Azure最佳做法的个性化云咨询顾问。Azure顾问会分析配置和使用情况遥测，提供个性化的可操作建议，从而帮助优化Azure资源，实现高可用性、安全性、卓越运营、性能并节省成本。它会建议你选择合适的虚拟机型号或者关闭未使用的虚拟机，购买预留虚拟机以节省成本。想要了解更多关于Azure顾问的信息，请查看[微软文档](https://docs.microsoft.com/azure/advisor?WT.mc_id=thomasmaurer-blog-thmaure)。

## 选择合适的Azure区域
今天，微软Azure提供超过54个（现在是58个，译者注）[Azure全球区域](https://azure.microsoft.com/global-infrastructure/regions?WT.mc_id=thomasmaurer-blog-thmaure)，领先于其它云提供商。这不仅可以实现你所需的全球部署Azure资源和虚拟机的能力，而且还可以帮助你节省成本。并非所有Azure服务在所有Azure区域中都可用，而且并非所有Azure服务在每个区域的成本都相同。Azure资源价格可能取决于特定区域中的运营成本和其他因素。通常，您希望在需要虚拟机的地方尽可能接近虚拟机，并将它们放置在特定的Azure区域中。然而，如果你不需要在特定区域中部署，则可以在最便宜的区域运行虚拟机以降低Azure虚拟机的成本。

你可以查看服务和产品区域可用性[列表](https://azure.microsoft.com/global-infrastructure/services?WT.mc_id=thomasmaurer-blog-thmaure)。

## 迁移服务到PaaS和SaaS
![Azure Migrate and modernize with cloud migration strategies](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Migrate-and-modernize-with-cloud-migration-strategies-768x225.jpg)Azure Migrate和使用云迁移策略现代化

这对你们中的许多人是轻而易举的，但通过分析在虚拟机内运行的工作负载，您会发现一些特定的工作负载可以现代化，可以在Azure平台即服务（PaaS）服务上运行，甚至迁移到软件即服务解决方案。例如，如果您考虑Exchange或SharePoint，而不是将这些应用程序迁移到Azure虚拟机，则可以通过迁移到Office 365来降低成本。应用程序现代化不仅有大量工作要做，而且会花费大量的时间和金钱。[Azure迁移中心](https://azure.microsoft.com/migration?WT.mc_id=thomasmaurer-blog-thmaure) 将会给你提供一个出色的云迁移之旅，包括：访问，迁移，优化，安全，和管理。

[Azure迁移中心](https://azure.microsoft.com/migration?WT.mc_id=thomasmaurer-blog-thmaure)可以为你提供云迁移策略，它使你能够定义迁移到云的过程。通过重新托管、重构或重新构建迁移、使用云本机（通过重新生成或创建新云）或使用SaaS并替换现有应用程序进行迁移和现代化。

## 为Windows Server，SQL Server 2008和2008R2接收免费的安全扩展更新
一年前，微软[宣布](https://azure.microsoft.com/en-us/blog/announcing-new-options-for-sql-server-2008-and-windows-server-2008-end-of-support?WT.mc_id=thomasmaurer-blog-thmaure)了SQL Server 2008和Windows Server 2008终止支持的新选项。对SQL Server 2008和SQL Server 2008 R2的支持已于2019年7月9日结束，Windows Server 2008和Windows Server 2008 R2已于2020年1月14日结束。仍在运行Windows Server和SQL Server 2008和2008 R2的客户确实有不同的选项。第一，可以将Windows Server 2019等较新版本；第二，购买扩展的安全支持；第三，将 Windows Server和SQL Server工作负载迁移到Azure，以便获得您数年来的免费安全扩展更新，不仅适用于在Azure上运行，而且适用于在Azure Stack Hub上运行的虚拟机。

## 结论
Azure上有许多不同的方法允许你节省资金并降低Azure基础设施服务虚拟机成本。例如：将Azure预留虚拟机实例和Azure混合权益和免费的Windows Server及SQL Server安全扩展更新组合起来，你将得到巨大的价格优惠。即使你只遵循以上提示的一种也可以节省很多资金。
