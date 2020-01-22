---
type: post
status: new
title: 'Manage multiple Azure tenancies with Azure Lighthouse'
description: 'If you’ve explored the management capabilities inside Microsoft Azure, you’ll know there are a bunch of tools to help you manage and monitor your Azure resources and keep them compliant.'
tags: ['Azure Lighthouse', 'Azure Blueprints', 'Security']
author: 'Sonia Cuff'
date: 2019-09-03
url: 'https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse/ba-p/833928'
translator: ''
---

# Manage multiple Azure tenancies with Azure Lighthouse 使用 Azure Lighthouse 管理多个 Azure 租约

<ContentMeta />

If you’ve explored the management capabilities inside Microsoft Azure, you’ll know there are a bunch of tools to help you manage and monitor your Azure resources and keep them compliant. Azure Blueprints (in preview) enables you to extend this across multiple subscriptions, but until now there’s been no way to see or manage resources in multiple Azure tenancies, from a single browser pane. Enter, Azure Lighthouse!

如果你已经探索过 Microsoft Azure 的管理能力，你就会知道这里有大把的工具可以帮助你管理、监控 Azure 的资源，让它们有条不紊。Azure Blueprints（预览中）扩展了这些资源管理能力，可以帮助你管理多个订阅账户之间的资源，但是，还是不能在一个浏览器页面中实现。现在，Azure Lighthouse 来了！

[Announced at our Partner conference, Microsoft Ready, earlier this year](https://azure.microsoft.com/blog/introducing-azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff), Azure Lighthouse brings Azure resource management to a new level of scale. While you might immediately think this will benefit Microsoft Partners (like Managed Service Providers (MSPs)), there are also a significant number of Enterprises that have a business requirement for separate Azure environments, including multi-nationals, brand groups and franchise/owner operator businesses. Best of all, this new capability is completely free, though charges apply as normal for any billed underlying services (such as Log Analytics).

[今年早些时候，Azure Lighthouse 在我们的合作伙伴会议（Microsoft Ready）上发布](https://azure.microsoft.com/blog/introducing-azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff)，它将 Azure 的资源管理能力带上了新的高度。您千万不要认为 Microsoft 的合作伙伴（例如托管服务提供商（MSP））是这项功能的唯一的受益者！事实上，大量企业对独立的 Azure 环境有业务需求，包括跨国公司、品牌集团和特许经营/业主运营商，它们都会从中受益。最棒的是，除了像日志分析服务这样的基础计费服务外，这项新功能是完全免费的！

We’ve seen a glimpse of multi-tenancy support in the way that Office 365 allows a Partner to have delegated access to their customer’s tenancy – using their own partner login to perform tasks from the Admin Portal. Azure Lighthouse starts with this capability for Azure environments, then takes it a whole lot further.

我们已经在 Office 365 中见过多租户模式的运用了，它允许合作伙伴拥有客户租户中资源的代理访问权，用他们自己的账户登录，并通过管理面板执行任务。Azure Lighthouse 将这种模式应用到 Azure 环境中，并将它更进一步。

## The Partner experience 合作伙伴的体验

Partners will see in the “My Customers blade” a list of all the tenancies they’ve successfully onboarded, including how many subscriptions or resources they have access to inside those tenancies. These can be broken down to accurately reflect the services agreement & scope that the Partner has, with each customer.

合作伙伴可以在“我的客户”面板中看到他们成功加入的所有租户的列表，并可以看到他们在这些租户中可以访问的订阅或资源。列表内容也可以再细分，以准确反映合作伙伴与每个客户达成的服务协议和范围。

![azure-delegated-resource-management-customer-tenants.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129727i72A3652DD4F59FC6/image-size/large?v=1.0&px=999)

*Example of services being provided to each customer.* *提供给每位客户的服务示例图*

And with that access, the customer’s Azure resources will now appear directly inside the Azure Portal for the Partner. This means that the partner can see all resources across all customers, inside the corresponding Azure services blade.

有了该访问权限，客户的 Azure 资源现在将直接显示在合作伙伴的 Azure 门户中。 这意味着合作伙伴可以在相应的 Azure 服务片区中查看所有客户的所有资源。

The Partner can then take action on those resources, via the Azure CLI, PowerShell, HTTP request or the Azure Portal. Azure Resource Manager validates that the request is from a partner tenant and calls the Managed Services Resource Provider. The Managed Services RP provides precise access via the defined Role Based Access Control, and the request is actioned on the customer’s resource.

然后，合作伙伴可以通过 Azure CLI，PowerShell，HTTP Request 或 Azure 门户对这些资源执行操作。Azure 资源管理器将验证请求是否来自合作伙伴租户，然后调用托管服务资源提供程序。该程序将按照预定义的基于角色的访问控制提供精确的访问，然后，请求的操作会在客户的资源上被执行。

### So what can Partners then do? 合作伙伴还可以做什么？

Now pretend you are the Partner responsible for managing those multiple Azure tenancies. You can:

假如您是负责管理多个 Azure 租户的合作伙伴，您可以：

- Set up a monitoring alert or a log analytics alert and apply it to all Windows Server Virtual Machines across your customers.
- 设置监视警报或日志分析警报，并将其应用于客户中的所有 Win Server 虚拟机。
- Define a standard set of policies for all the customers you manage, and apply Azure Policy at scale, including having visibility of which resources are non-compliant.
- 为您管理的所有客户定义一套标准的策略，并大规模应用 Azure 策略，包括了解哪些资源不合规。
- For ease of management, you can define a set of tags and apply it across multiple customer resources (for example, tag all non-production/development resources).
- 为了便于管理，您可以定义一组标签并将其应用于多个客户资源（例如，标记所有非生产/开发资源）。
- You also have the ability to store an Automation Account in your own partner tenancy, to build automation runbooks that stay protected as your intellectual property as you onboard and offboard customers, but use those runbooks to automate actions across multiple tenancies.
- 您还可以通过将自动化帐户存储在自己的合作伙伴租约中，构建出自动化运行手册，来自动执行多个租约中的操作。同时，无论是用于内部用户还是外部用户，这些运行手册都将作为您的知识产权而受到保护。
- And you can even dive into the Azure Security Center and see which resources across all of your customers need the most attention.
- 您甚至可以深入 Azure 安全中心，查看所有客户中哪些资源最需要关注。

![AzureSecurityCenter.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129728i5FDA06549F907AC9/image-size/large?v=1.0&px=999)

## The Customer experience 客户的体验

In the customer’s Azure portal, under a new Service Providers blade, they can accept & approve access to the tenancy and define exactly which subscriptions or resource groups this access will apply to. The customer can also see a full history of their partner’s actions in the Azure Activity log.

在客户的 Azure 门户界面中，有一个新的“服务提供商”片区。在这里，客户可以接受并批准对租约的访问，并确切规定哪些订阅或资源组可以被访问。此外，客户还可以在 Azure 活动日志中查看其合作伙伴完整的历史操作记录。

![Customer Portal.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129729i8C3AF2E6FC54EE78/image-size/large?v=1.0&px=999)



## Onboarding

Azure Lighthouse starts with delegated administration access, which can be done in one of two ways:

Azure Lighthouse 委派管理访问权，可以通过以下两种途径完成：

Publish a public or private offer through the Cloud Partner Portal. Note there’s no money exchanging hands here, any transactions relating to those services are to be billed by the partner to the customer directly.

- 通过云合作伙伴门户发布公共或私有服务。请注意，这里没有货币转手，任何与这些服务有关的交易均应由合作伙伴直接与客户达成。

Or use an Azure Resource Manager template, to define and deploy the delegated administration rights.

- 使用 Azure 资源管理器模板来定义和部署委派的管理权限。

*What access is needed to the customer’s tenancy?*  *在客户的租户上需要什么访问权限？*

That’s under your control (and the customer has to accept) but using Role Based Access Control, generally Contributor for your team who will be performing actions and Reader for anyone monitoring customer systems. You can assign these to a group, then manage that group membership, and the customer can revoke that access from their portal at any time. If you’d like to get a little more granular, RBAC support means you can choose any one of the 70+ built-in roles and their associated access levels.

这完全由你来决定（客户必须接受），但使用基于角色的访问控制，通常是为要执行操作的团队赋予参与者的角色，以及为需要监视客户系统的人赋予读者的角色。你可以通过组来管理权限和人员，客户也可以随时撤销这些权限。如果您进一步了解 RBAC，会发现这里有 70 多个内置角色及相关的访问级别供您选择或参考。

## FAQs: 常见问题：

*Will this work with CSP subscriptions?* *这可以与CSP订阅一起使用吗？*

Yes! This access ignore the subscription type and just sees all resources as Azure resources, regardless of how they were purchased.

 当然了，这种访问与订阅的类型无关，它们就像是普通的 Azure 资源一样供您操作。

*Does it support Just In Time access?* *它支持即时访问吗？*

Not yet, but it’s an item on the product roadmap.

目前还不支持，不过这确实是产品规划中的一项。

*Does it work for all Azure services?*  *它适用于所有 Azure 服务吗？*

This list of supported services and scenarios is growing. Some features (like Azure Cost Management) are currently not supported. Today, you can access:

支持的服务和方案会越来越多，有些功能是暂时不支持的，例如Azure成本管理。目前，您可以访问的有：

Azure Automation Azure 自动化
Azure Backup Azure 备份
Azure Kubernetes Service (AKS) Azure Kubernetes 服务
Azure Monitor Azure 监控
Azure Policy Azure 策略
Azure Resource Graph
Azure Security Center Azure 安全中心
Azure Service Health Azure 服务运行状况
Azure Site Recovery Azure 网站恢复服务
Azure Virtual Machines Azure 虚拟机
Azure Virtual Network Azure 虚拟网络
Support Requests

For further details on supported Azure services and scenarios, visit：

有关受支持的 Azure服务和方案的更多详细信息，请访问：[跨租户管理体验](https://docs.microsoft.com/zh-cn/azure/lighthouse/concepts/cross-tenant-management-experience?WT.mc_id=itopstalk-blog-socuff#supported-services-and-scenarios)

For more FAQs, visit: <https://azure.microsoft.com/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff>

有关更多常见问题解答，请访问：https://azure.microsoft.com/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff

**Want to learn more?**

We’re just getting started with what Azure Lighthouse can do! Here are some resources to get you started:

刚刚开始使用 Azure Lighthouse 的功能，想要知道更多吗？以下是一些入门资源：

Product page: <https://azure.microsoft.com/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff>

产品页面：[Azure Lighthouse](https://azure.microsoft.com/zh-cn/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff)

Technical documentation: <https://docs.microsoft.com/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff>

技术文档：[Azure Lighthouse 文档](https://docs.microsoft.com/zh-cn/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff)

GitHub repository: https://github.com/Azure/Azure-Lighthouse-samples

GitHub 仓库：[Microsoft Azure Lighthouse](https://github.com/Azure/Azure-Lighthouse-samples)

(Includes resources like an Azure Policy generator to enrol resources not currently enrolled for Log Analytics and/or Event Hub.)

（包括 Azure 策略生成器之类的资源，用于注册当前尚未为 Log Analytics 和/或事件中心注册的资源。）

*-SCuffy*
