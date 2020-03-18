---
type: post
status: new
sidebar: auto
title: 'Manage multiple Azure tenancies with Azure Lighthouse'
description: 'If you’ve explored the management capabilities inside Microsoft Azure, you’ll know there are a bunch of tools to help you manage and monitor your Azure resources and keep them compliant.'
tags: ['Azure Lighthouse', 'Azure Blueprints', 'Security']
author: 'Sonia Cuff'
date: 2019-09-03
url: 'https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse/ba-p/833928'
translator: ''
reviewer: ''
pub_date: 
---

# Manage multiple Azure tenancies with Azure Lighthouse

<ContentMeta />

If you’ve explored the management capabilities inside Microsoft Azure, you’ll know there are a bunch of tools to help you manage and monitor your Azure resources and keep them compliant. Azure Blueprints (in preview) enables you to extend this across multiple subscriptions, but until now there’s been no way to see or manage resources in multiple Azure tenancies, from a single browser pane. Enter, Azure Lighthouse!

 

[Announced at our Partner conference, Microsoft Ready, earlier this year](https://azure.microsoft.com/blog/introducing-azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff), Azure Lighthouse brings Azure resource management to a new level of scale. While you might immediately think this will benefit Microsoft Partners (like Managed Service Providers (MSPs)), there are also a significant number of Enterprises that have a business requirement for separate Azure environments, including multi-nationals, brand groups and franchise/owner operator businesses. Best of all, this new capability is completely free, though charges apply as normal for any billed underlying services (such as Log Analytics).

 

We’ve seen a glimpse of multi-tenancy support in the way that Office 365 allows a Partner to have delegated access to their customer’s tenancy – using their own partner login to perform tasks from the Admin Portal. Azure Lighthouse starts with this capability for Azure environments, then takes it a whole lot further.

 

**The Partner experience**
Partners will see in the “My Customers blade” a list of all the tenancies they’ve successfully onboarded, including how many subscriptions or resources they have access to inside those tenancies. These can be broken down to accurately reflect the services agreement & scope that the Partner has, with each customer. 

![azure-delegated-resource-management-customer-tenants.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129727i72A3652DD4F59FC6/image-size/large?v=1.0&px=999)

*Example of services being provided to each customer.*

 

And with that access, the customer’s Azure resources will now appear directly inside the Azure Portal for the Partner. This means that the partner can see all resources across all customers, inside the corresponding Azure services blade.

 

The Partner can then take action on those resources, via the Azure CLI, PowerShell, HTTP request or the Azure Portal. Azure Resource Manager validates that the request is from a partner tenant and calls the Managed Services Resource Provider. The Managed Services RP provides precise access via the defined Role Based Access Control, and the request is actioned on the customer’s resource.

 

*So what can Partners then do?*
Now pretend you are the Partner responsible for managing those multiple Azure tenancies. You can:

 

- Set up a monitoring alert or a log analytics alert and apply it to all Windows Server Virtual Machines across your customers.
- Define a standard set of policies for all the customers you manage, and apply Azure Policy at scale, including having visibility of which resources are non-compliant.
- For ease of management, you can define a set of tags and apply it across multiple customer resources (for example, tag all non-production/development resources).
- You also have the ability to store an Automation Account in your own partner tenancy, to build automation runbooks that stay protected as your intellectual property as you onboard and offboard customers, but use those runbooks to automate actions across multiple tenancies.
- And you can even dive into the Azure Security Center and see which resources across all of your customers need the most attention.

![AzureSecurityCenter.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129728i5FDA06549F907AC9/image-size/large?v=1.0&px=999)

 

**The Customer experience**
In the customer’s Azure portal, under a new Service Providers blade, they can accept & approve access to the tenancy and define exactly which subscriptions or resource groups this access will apply to. The customer can also see a full history of their partner’s actions in the Azure Activity log.

![Customer Portal.jpg](https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/129729i8C3AF2E6FC54EE78/image-size/large?v=1.0&px=999)

 

**Onboarding**
Azure Lighthouse starts with delegated administration access, which can be done in one of two ways:
Publish a public or private offer through the Cloud Partner Portal. Note there’s no money exchanging hands here, any transactions relating to those services are to be billed by the partner to the customer directly.

Or use an Azure Resource Manager template, to define and deploy the delegated administration rights.

 

*What access is needed to the customer’s tenancy?* That’s under your control (and the customer has to accept) but using Role Based Access Control, generally Contributor for your team who will be performing actions and Reader for anyone monitoring customer systems. You can assign these to a group, then manage that group membership, and the customer can revoke that access from their portal at any time. If you’d like to get a little more granular, RBAC support means you can choose any one of the 70+ built-in roles and their associated access levels.

 

**FAQs:**
*Will this work with CSP subscriptions?* Yes! This access ignore the subscription type and just sees all resources as Azure resources, regardless of how they were purchased.

 

*Does it support Just In Time access?* Not yet, but it’s an item on the product roadmap.

 

*Does it work for all Azure services?* This list of supported services and scenarios is growing. Some features (like Azure Cost Management) are currently not supported. Today, you can access: 
Azure Automation
Azure Backup
Azure Kubernetes Service (AKS)
Azure Monitor
Azure Policy
Azure Resource Graph
Azure Security Center
Azure Service Health
Azure Site Recovery
Azure Virtual Machines
Azure Virtual Network
Support Requests

 

For further details on supported Azure services and scenarios, visit:
[https://docs.microsoft.com/azure/lighthouse/concepts/cross-tenant-management-experience?WT.mc_id=ito...](https://docs.microsoft.com/azure/lighthouse/concepts/cross-tenant-management-experience?WT.mc_id=itopstalk-blog-socuff#supported-services-and-scenarios)

 

For more FAQs, visit: <https://azure.microsoft.com/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff>

 

**Want to learn more?**
We’re just getting started with what Azure Lighthouse can do! Here are some resources to get you started:

 

Product page: <https://azure.microsoft.com/services/azure-lighthouse/?WT.mc_id=itopstalk-blog-socuff>

 

Technical documentation: <https://docs.microsoft.com/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff>

 

GitHub repository: <https://github.com/Azure/Azure-Lighthouse-samples>
(Includes resources like an Azure Policy generator to enrol resources not currently enrolled for Log Analytics and/or Event Hub.)

 

*-SCuffy*

