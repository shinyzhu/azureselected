(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{336:function(e,r,t){"use strict";t.r(r);var o=t(12),s=Object(o.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"基于-azure-lighthouse-和-azure-arc-的安全管理"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#基于-azure-lighthouse-和-azure-arc-的安全管理"}},[e._v("#")]),e._v(" 基于 Azure Lighthouse 和 Azure Arc 的安全管理")]),e._v(" "),r("ContentMeta"),e._v(" "),r("p",[e._v("我以前写过一篇关于 Azure Lighthouse 的博文，介绍了"),r("a",{attrs:{href:"https://techcommunity.microsoft.com/t5/ITOps-Talk-Blog/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse/ba-p/833928?WT.mc_id=itopstalk-blog-socuff",target:"_blank",rel:"noopener noreferrer"}},[e._v("管理多个不同的 Azure 租户"),r("OutboundLink")],1),e._v("。这个功能对于面向多客户的托管服务提供商，以及庞大复杂的企业组织（比如，有子品牌的或连锁加盟的企业集团）来讲，都很有用。通过部署 Azure 资源管理器模板，或发布一个（公有或私有的） Azure 市场报价，即可以完成交付，这将把管理权委托给其他租户。")]),e._v(" "),r("p",[e._v("这样一来，服务商就可以在他们自己的 Azure 主租户上查看他们客户的 Azure 资源，并且能够通过 Azure Portal、命令行或 APIs 来对其进行操作。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/158921iA45A705D8E928742/image-size/large?v=1.0&px=999",alt:"ResourceGroups-AllCustomers"}})]),e._v(" "),r("p",[r("em",[e._v("在这个 Azure Portal 上，可以看到不同的 Azure 租户的资源。")])]),e._v(" "),r("p",[r("strong",[e._v("解锁这个工具强大功能的最好方式，就是首先确定你要管理什么，")]),e._v(" 而安全性总不失为一个好的开始。")]),e._v(" "),r("p",[e._v("首先，我们需要确保我们客户的所有资源都是符合"),r("a",{attrs:{href:"https://docs.microsoft.com/azure/security-center/security-center-policy-definitions?WT.mc_id=itopstalk-blog-socuff",target:"_blank",rel:"noopener noreferrer"}},[e._v("默认安全政策"),r("OutboundLink")],1),e._v("的规定的，这表示默认由 Azure 安全中心对其进行监管。在这张图片中，你可以看到我们有一位客户的子信息有4个不符合初始政策的资源，一共违背了21条政策。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/158922iFF489F98E014166F/image-size/large?v=1.0&px=999",alt:"AzurePolicyCompliance-All customers"}})]),e._v(" "),r("p",[e._v("在这里，我们可以直接深入这4个资源来查看我们需要如何修补他们，而非要切换登录到另一个租户账号上。")]),e._v(" "),r("p",[e._v("接下来，我们来看一看 Azure 安全中心，在这里不仅可以查看到整体的安全评分，还可看到建议的安全管理措施、政策符合情况以及（潜在）安全问题预警。这里集合了所有我们有权限管理的租户的安全信息。对于提供“安全即服务”的合作伙伴来讲，这将为你提供一个很棒的任务清单，而大企业可以有一个其在不同环境的安全风险的整体的视图。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/158923i2EBD45FCEF944ABD/image-size/large?v=1.0&px=999",alt:"SecurityCenter-Overview"}})]),e._v(" "),r("p",[e._v("而如果我们想要查看更进一步的细节，我们可以对每个单独的租户查看安全评分细节。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://gxcuf89792.i.lithium.com/t5/image/serverpage/image-id/158924i65981E3540B38001/image-size/large?v=1.0&px=999",alt:"SecureScore"}})]),e._v(" "),r("p",[r("strong",[e._v("请等一下，这里还有更多内容！")])]),e._v(" "),r("p",[e._v("近日所发布的 "),r("a",{attrs:{href:"https://docs.microsoft.com/azure/azure-arc/servers/overview?WT.mc_id=itopstalk-blog-socuff",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Arc (preview)"),r("OutboundLink")],1),e._v(" 技术，使非 Azure Windows 系统的 Linux 服务器现在也可以作为一台连接机，部署 Azure 服务，允许你在虚拟机上以用户身份检查 Azure 政策，并接收日志数据写入日志分析。 Azure Arc 正刚刚萌芽，更多的服务支持将很快被推出，而现在，这些连接好的机器已经可以基于 Azure 政策对其系统运行的安全配置水平进行评测了。你现在已经完全解锁了你的客户服务器环境，无论他们的服务器是在 Azure 中，在某个数据中心里，在其本地内部部署的，还是在其他人的云平台中！")]),e._v(" "),r("p",[e._v("随着 "),r("a",{attrs:{href:"https://docs.microsoft.com/azure/lighthouse/concepts/cross-tenant-management-experience?WT.mc_id=itopstalk-blog-socuff",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Lighthouse"),r("OutboundLink")],1),e._v(" 和 Azure Arc 技术的增强，这个工具为合作伙伴与大型企业提供集中式管理的服务能力将更加强大。请记住，如果你不喜欢 Azure Portal ，你还可尝试大规模地使用命令行或 APIs j对多个租户进行任务的自动化管理。我只是希望我分享的技术图能为你带来启发！")]),e._v(" "),r("p",[e._v("更多关于 Azure Lighthouse 的信息，包括部署选项，请浏览："),r("a",{attrs:{href:"https://docs.microsoft.com/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.microsoft.com/azure/lighthouse/?WT.mc_id=itopstalk-blog-socuff"),r("OutboundLink")],1)])],1)}),[],!1,null,null,null);r.default=s.exports}}]);