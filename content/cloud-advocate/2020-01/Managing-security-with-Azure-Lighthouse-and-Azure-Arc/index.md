---
type: post
status: new
title: 'Managing security with Azure Lighthouse and Azure Arc'
description: 'ITOpsTalk blog article for IT Operations on a scenario of how the Azure Lighthouse and Azure Arc products can monitor the security (Azure Policy compliance, Azure Security Centre and Secure Score) of multiple tenants and how adding Azure Arc to the mix then includes on-prem and other-Cloud resources in those management blades.  No video demo but lots of screenshots.'
tags: ['arc', 'Azure', 'Enterprise', 'Governance', 'hybrid', 'IT Ops', 'IT Pro', 'lighthouse', 'MSP', 'Operations', 'partner', 'Security', 'Server']
author: 'Sonia Cuff'
date: 2019-11-26
url: 'https://techcommunity.microsoft.com/t5/itops-talk-blog/managing-security-with-azure-lighthouse-and-azure-arc/ba-p/1032864'
translator: ''
---

# Managing security with Azure Lighthouse and Azure Arc

<ContentMeta />

I've previously blogged about Azure Lighthouse, for [managing multiple difference Azure tenancies](https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse/ba-p/833928?WT.mc_id=itopstalk-blog-socuff). This capability is useful for both Managed Service Providers, with support arrangements for multiple customers, and for large or complex Enterprise organizations (for example, if there are sub-brands or franchisees). Onboarding is done via deploying an Azure Resource Manager template or publishing an Azure Marketplace offer (public or private), which enables delegated administration into the other tenancies.

 

This allows service providers, from the account in their own primary Azure tenancy, to have visibility of all of their customer's Azure resources and to be able to act on them, from the Azure Portal, CLI or APIs. 

 

![ResourceGroups-AllCustomers](ResourceGroups-AllCustomers.png)

*Resources from multiple Azure tenancies, visible via the Azure Portal.* 

 

**The best way to unlock the power of this tool is to first decide what you're going to manage** - and security is always a good place to start. 

 

First, we want to make sure that all of the resources across our customers are compliance to the [default set of security policies](https://docs.microsoft.com/azure/security-center/security-center-policy-definitions?WT.mc_id=itopstalk-blog-socuff) that the Azure Security Center monitors by default. In this picture, you can see that one of our customer subscriptions has 4 non-compliant resources against that policy initiative, totally 21 policies that are non-compliant.

![AzurePolicyCompliance-All customers](AzurePolicyCompliance-All customers.png)

From here, we can drill down into those 4 resources and see what needs remediation in each, without having to switch logins into a different tenancy.

 

Next, we'll take a look at the Azure Security Center, and see not only an overall secure score but also recommended security hygiene measures, regulatory compliance and security alerts, aggregated across all of the tenancies we have access in to. For partners providing Security-as-a-Service offers, this provides you with a great task list, and large Enterprises can now get a single picture of their security risk across their multiple environments.

![SecurityCenter-Overview](SecurityCenter-Overview.png)

 

And if we want a more granular level of detail, we can bring up the Secure Score details for each individual tenancy:

![SecureScore](SecureScore.png)

 

**But wait, there's more!**

 

With the recently announced [Azure Arc (preview)](https://docs.microsoft.com/azure/azure-arc/servers/overview?WT.mc_id=itopstalk-blog-socuff), non-Azure Windows and Linux Servers can now be onboarded into Azure as connected machines, allowing you to query Azure Policies inside the VMs (guest configuration) and ingest log data into Log Analytics. It's early days for Azure Arc, with support for more services coming soon, but now those connected machines can be queried for their operating system-level security settings via Azure Policy. You've now just unlocked the full breadth of your customer's server environment, whether their servers are in Azure, in a data center, on premises or even in someone else's Cloud! 

 

As the capabilities of both [Azure Lighthouse](https://docs.microsoft.com/azure/lighthouse/concepts/cross-tenant-management-experience?WT.mc_id=itopstalk-blog-socuff) and Azure Arc grow, this tool will become even more powerful as a centralized management capability for partners and large Enterprises. And remember, if the Azure Portal isn't your thing, you can automate those tasks through the CLI or APIs at scale now, across multiple tenancies. I just wish I could share what's on the roadmap next!   

 

For more information on Azure Lighthouse, including onboarding options, visit: <https://docs.microsoft.com/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff>