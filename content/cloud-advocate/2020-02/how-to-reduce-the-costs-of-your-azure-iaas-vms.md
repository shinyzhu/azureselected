---
type: post
status: new
sidebar: auto
title: 'How to Reduce the Costs of your Azure IaaS VMs'
description: 'This blog post is focused on helping you saving money by reducing the costs when you are using Azure IaaS virtual machines (VM). Some of the tips here will help everyone out there.'
tags: ['Azure Stack Hub', 'Azure Migration Center', 'Azure Cost Management', 'Azure Dedicated Host', 'Azure Hybrid Benefit']
author: 'Thomas Maurer'
date: 2020-01-23
url: 'https://www.thomasmaurer.ch/2020/01/how-to-reduce-the-costs-of-your-azure-iaas-vms/'
translator: ''
reviewer: ''
pub_date: 
---

# How to Reduce the Costs of your Azure IaaS VMs

<ContentMeta />

Azure Infrastructure-as-a-service (IaaS) offers significant benefits over traditional virtualization. With benefits like the possibility to quickly spin up a couple of virtual machine in any Azure region around the world whenever you need it, is pretty powerful. There are a lot more benefits to [Azure IaaS virtual machines](https://azure.microsoft.com/services/virtual-machines?WT.mc_id=thomasmaurer-blog-thmaure). However, that’s not part of this blog. This blog post is focused on helping you saving money by reducing the costs when you are using Azure IaaS virtual machines (VM). Some of the tips here will help everyone out there, some of the tips

## Pick the right Azure VM series and the right Azure VM size

![Reduce cost by picking the right Azure VM size](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Reduce-cost-by-picking-the-right-Azure-VM-size-768x508.jpg)Reduce cost by picking the right Azure VM size

First of all, obviously, you pay more for larger virtual machines. Something I realized by working with a lot of customers is that they take the on-premises VM size and use the equivalent size in Azure. Not realizing that the VM size they had was way to oversized. But since they had the static capacity on-prem, they didn’t’ care. Now when you pay for more capacity in the cloud, the story is different. So make sure you realize that the Azure VM sizes are not oversized. You can still change the size later to a larger virtual machine if needed. And if you are looking at tools like [Azure Migrate](https://azure.microsoft.com/services/azure-migrate?WT.mc_id=thomasmaurer-blog-thmaure) to migrate your existing VMs to Azure IaaS, you will have some additional advantages. Azure Migrate asses your environment and helps you pick the right Azure VM size depending on performance data history. Azure Migrate works with Hyper-V and VMware virtual machines, if you want to know more about Azure Migrate, check out my [blog post](https://www.thomasmaurer.ch/2019/07/assess-and-migrate-hyper-v-vms-with-azure-migrate/). If you are already running the virtual machine in Azure, Azure Advisor can be helpful to figure out that your virtual machine is underutilized. Picking the right size will help you to save money and reduce the cost of Azure IaaS VMs.

To make it easier to pick the right size, Azure offers you different type or also called [VM series](https://azure.microsoft.com/pricing/details/virtual-machines/series?WT.mc_id=thomasmaurer-blog-thmaure). You can find a broad set of different virtual machine types in Azure, which give you a choice depending on your use cases, scenarios, and application needs. From general-purpose VMs, compute, memory or storage optimized, VMs with GPUs, and HPC workloads. You can find some documentation on the different VM types and sizes [here](https://docs.microsoft.com/azure/virtual-machines/windows/sizes?WT.mc_id=thomasmaurer-blog-thmaure).

## Run them when you need them, shut them off when you don’t

Another great benefit of Cloud Computing and next to the large scale are the Pay-per-use options. If you don’t need a virtual machine, you can shut it down, and you are only paying for the existing storage, but not for the computing power anymore. This helps you with workloads, which will need to scale up and down using virtual machines. Or simply with virtual machines in test/dev environments or labs, which don’t need to run 100 percent of the time.

## Commit and use Azure Reserved VM instances

![Azure Reservations Reserved Instances and reserved capacity](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Reservations-Reserved-Instances-and-reserved-capacity-768x429.jpg)Azure Reservations Reserved Instances and reserved capacity

Now, I know that shutting down virtual machines is excellent in theory if you have the right workloads and applications running in these virtual machines. However, what about the virtual machines which need to run 24h 365 days a year. For that, Microsoft has something called Azure Reservations, and if you are thinking specifically about Azure IaaS VMs, it is called Azure Reserved VM Instances (RIs). Azure Reserved Virtual Machine Instances can help you save money by pre-paying for one-year or three-years of virtual machines. Pre-paying allows you to get a discount on the resources you use. Reservations can significantly reduce your Azure IaaS virtual machine, SQL database compute, Azure Cosmos DB, or other resource costs up to 72% on pay-as-you-go prices. If you want to know more about Azure Reservations, check out [my blog post about how to save money on Azure using Azure Reservations](https://www.thomasmaurer.ch/2019/09/how-to-save-money-on-azure-using-azure-reservations/).

## Using Economical burstable VMs

B-series are economical virtual machines that provide a low-cost option for workloads that typically run at a low to moderate baseline CPU utilization, but sometimes need to burst to significantly higher CPU utilization when the demand rises. If you want to know more about B-series Azure VMs, check out the following [Microsoft Docs](https://docs.microsoft.com/azure/virtual-machines/windows/b-series-burstable?WT.mc_id=thomasmaurer-blog-thmaure).

## Azure Spot Virtual Machines for batch processing jobs with significant cost savings

With Azure Spot Virtual Machines (Spot VMs), you’ll be able to access unused Azure compute capacity at deep discounts, up to 90 percent compared to pay-as-you-go prices. [Spot VMs](https://azure.microsoft.com/pricing/spot?WT.mc_id=thomasmaurer-blog-thmaure) are ideal for workloads that can be interrupted, providing scalability while reducing costs. Using Spot VMs allows you to take advantage of our unused capacity at a significant cost saving. At any point in time when Azure needs the capacity back, the Azure infrastructure will evict Spot VMs. Therefore, Spot VMs are great for workloads that can handle interruptions like batch processing jobs, dev/test environments, large compute workloads, and more. You get unique Azure pricing and benefits when running Windows Server workloads on Spot VMs. Spot VMs are currently in preview and you can find more about them on [Microsoft Docs](https://docs.microsoft.com/azure/virtual-machines/windows/spot-vms?WT.mc_id=thomasmaurer-blog-thmaure).

## Leverage the Azure Hybrid Benefit

If you already have existing Windows Server and SQL Server on-premises licenses with Software Assurance, you can use them for Azure virtual machines (VMs). This will allow you to save the Pay-as-you-go cost for Windows Server and SQL Server licenses. The [Azure Hybrid Benefit](https://azure.microsoft.com/pricing/hybrid-benefit?WT.mc_id=thomasmaurer-blog-thmaure) applies not only to Azure VMs but also on Azure SQL Database PaaS services and the [Azure Dedicated Host](https://www.thomasmaurer.ch/2019/08/azure-dedicated-host-for-your-azure-vms/). If you want to know more about how to take advantage of the Azure Hybrid Benefit, check out the [Microsoft Azure Docs page](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing?WT.mc_id=thomasmaurer-blog-thmaure).

## Cost Management to Analyse your Spendings

![Azure Cost Management](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Cost-Management-768x418.jpg)Azure Cost Management

[With ](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Cost-Management.jpg)[Azure Cost Management](https://azure.microsoft.com/services/cost-management?WT.mc_id=thomasmaurer-blog-thmaure), you can monitor your cloud spending by tracking resource usage and manage costs across all your clouds with a single unified view. It also helps to analyze and optimize your cloud spendings and cloud efficiency. It gives you a transparent view across your organization and helps you to identify resources to optimize. Sonia Cuff wrote a great blog on [Step-by-Step: Finding and Analyzing Microsoft Azure Cloud Usage Costs](https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Step-by-Step-Finding-and-Analyzing-Microsoft-Azure-Cloud-Usage/ba-p/718890?WT.mc_id=thomasmaurer-blog-thmaure).

## Reduce the Costs of your Azure IaaS VMs using Azure Advisor

![Azure Advisor Recommendations](https://www.thomasmaurer.ch/wp-content/uploads/2020/01/Azure-Advisor-Recommendations-768x325.jpg)

Azure Advisor Recommendations

[Azure Advisor](https://azure.microsoft.com/services/advisor?WT.mc_id=thomasmaurer-blog-thmaure) is a personalized cloud consultant that helps you follow best practices to optimize your Azure deployments. It analyzes your resource configuration and usage data to recommend solutions that can help you improve the performance, high availability, security, but also the cost-effectiveness of your Azure resources. It will recommend you to right-size or shutdown underutilized virtual machines, buy virtual machines reserved instances to save money over pay-as-you.go costs and much more. If you want to know more about Azure Advisor, you can check out the [Microsoft Docs](https://docs.microsoft.com/azure/advisor?WT.mc_id=thomasmaurer-blog-thmaure).

## Select the right Azure region

Today, Microsoft Azure offers up more than 54 [Azure regions worldwide](https://azure.microsoft.com/global-infrastructure/regions?WT.mc_id=thomasmaurer-blog-thmaure), more than any other cloud provider. This has not only a massive benefit of having the capability of deploying Azure resources and virtual machines where ever you need them. But it can also help you to reduce costs. Not all Azure services are available in all Azure regions, and not all Azure services cost the same in every region. Azure resource prices can depend on operational costs and other factors in the specific region. Usually, you want to deploy your virtual machines as close as possible where you need them, and you place them in the specific Azure regions. However, if there is no need to deploy them within a particular region, you can run your VMs in the cheapest available regions to reduce the cost for your Azure virtual machines.

You can find a list of services and products available by region [here](https://azure.microsoft.com/global-infrastructure/services?WT.mc_id=thomasmaurer-blog-thmaure).

## Move services to PaaS and SaaS

![Azure Migrate and modernize with cloud migration strategies](https://www.thomasmaurer.ch/wp-content/uploads/2019/09/Azure-Migrate-and-modernize-with-cloud-migration-strategies-768x225.jpg)Azure Migrate and modernize with cloud migration strategies

This is obvious to many of you, but by analyzing your workloads running inside your virtual machines, you will find specific workloads that can be modernized to run on Azure Platform-as-a-service (PaaS) services or even migrate into a Software-as-a-service solution. For example, if you think about Exchange or SharePoint, instead of migrating these applications into Azure virtual machines, you can reduce costs by migrating to Office 365. Don’t understand me wrong. I know that modernizing applications can be a lot of work and can cost a lot of time and money. The [Azure Migration Center](https://azure.microsoft.com/migration?WT.mc_id=thomasmaurer-blog-thmaure) gives you an excellent overview of your cloud migration journey, including assess, migrate, optimize, secure, and manage.

The [Azure Migration Center](https://azure.microsoft.com/migration?WT.mc_id=thomasmaurer-blog-thmaure) also helps you with your cloud migration strategies. And it enables you to define your journey to the cloud. Migration and Modernization by rehosting, refactor or rearchitect, using cloud-native by rebuild or create new, or using SaaS and replace the existing application.

## Receive free extended security updates for Windows Server and SQL Server 2008 and 2008 R2

A year ago, Microsoft [announced](https://azure.microsoft.com/en-us/blog/announcing-new-options-for-sql-server-2008-and-windows-server-2008-end-of-support?WT.mc_id=thomasmaurer-blog-thmaure) new options for SQL Server 2008 and Windows Server 2008 end of support. Support for SQL Server 2008 and SQL Server 2008 R2 already ended on July 9, 2019, Windows Server 2008, and Windows Server 2008 R2 followed on January 14, 2020. Customers who are still running Windows Server and SQL Server 2008 and 2008 R2 do have different options. First, migrate to a newer version like Windows Server 2019, or buy extended security support, or migrate your Windows Server and SQL Server workloads to Azure, to get free extended security updates for thee years. This offer not only works for virtual machines running on Azure but also running on [Azure Stack Hub](https://www.thomasmaurer.ch/2019/01/extended-security-updates-sql-windows-server-2008-azure-stack/).

## Conclusion

Many different ways allow you to save money and reduce the costs of your Azure IaaS VMs. If you combine, for example, Azure Reserved VM Instances, the Azure Hybrid Benefit, and the free extended security support for Windows Server and SQL Server, you will gain massive price reductions. Even if you are only following one of these tips, you might save a lot of money.