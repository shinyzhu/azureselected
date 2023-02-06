(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{339:function(t,e,a){"use strict";a.r(e);var s=a(12),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"twine-的现代开发流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#twine-的现代开发流程"}},[t._v("#")]),t._v(" Twine 的现代开发流程")]),t._v(" "),e("ContentMeta"),t._v(" "),e("p",[t._v("我喜欢 "),e("a",{attrs:{href:"https://twinery.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Twine"),e("OutboundLink")],1),t._v("！无论你是在尝试一个更大的原型作品，还是自己制作一些东西，它都是一个强大而易于使用的工具，可以制作基于超文本的叙事游戏。")]),t._v(" "),e("p",[t._v("话虽如此，我聊过的大多数人有一个常见的抱怨是：工作流在规模变大时非常容易崩溃。")]),t._v(" "),e("p",[t._v("对于小项目来说，可视化图形编辑器是一种非常好的方法，但是对于较大的项目来说，它很快就变得难以胜任了。此外，Twine 2 编辑器处理文件的方式意味着使用诸如版本控制之类的工具可能很困难，合并来自多个协作者的更改几乎是不可能的。")]),t._v(" "),e("p",[t._v("但是已经找到解决方案了！我下面将用几分钟时间带你了解我的 Twine 开发流程。我会分三个重要的部分：")]),t._v(" "),e("ol",[e("li",[e("strong",[t._v("纯文本文件")]),t._v("。我使用"),e("a",{attrs:{href:"https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker",target:"_blank",rel:"noopener noreferrer"}},[t._v("VS Code"),e("OutboundLink")],1),t._v(" 来编写我的游戏，而不是使用可视化的Twine编辑器。")]),t._v(" "),e("li",[e("strong",[t._v("现代版本控制")]),t._v("。使用GitHub托管的git库来存储我的游戏。")]),t._v(" "),e("li",[e("strong",[t._v("自动化发布")]),t._v("。每次当我推送游戏的一个新版本到GitHub，会即时通过 "),e("a",{attrs:{href:"https://github.com/features/actions",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Actions"),e("OutboundLink")],1),t._v(" 和 "),e("a",{attrs:{href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Pages"),e("OutboundLink")],1),t._v(" 完成发布，游戏立刻可玩。")])]),t._v(" "),e("p",[t._v("下面逐步介绍我使用的工具，以及让你如何使用类似的工具链！")]),t._v(" "),e("h2",{attrs:{id:"使用文本编辑器进行编写"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用文本编辑器进行编写"}},[t._v("#")]),t._v(" 使用文本编辑器进行编写")]),t._v(" "),e("p",[t._v("对于Twine游戏，为什么文本化编辑要比图形化的节点编辑更有价值呢？")]),t._v(" "),e("p",[t._v("**它可以更好地扩展。**当您的游戏增加到数万字数时，浏览Twine的基于节点的可视化编辑器可能会很痛苦。如果将整个游戏放在一个单独的文本文件中，您可以随意操作和浏览，这对于中等规模的项目来说要容易得多。甚至在考虑将脚本分割成多个文件之前，这也已经足够了，可以大大减少大型项目的认知负载。")]),t._v(" "),e("p",[t._v("**可复用。**希望跨段落之间或跨多个游戏项目重用一些宏或其他脚本位吗？能在IDE中复制/粘贴文本比在可视化编辑器中管理文本要容易得多。")]),t._v(" "),e("p",[t._v("**可以用更高效的工具来编写。**相对于 Twine 的文本框，使用平常编程和写作的文本编辑器会更顺手，这意味着我可以使用这些工具来让生活更轻松。")]),t._v(" "),e("p",[t._v("VS Code扩展可以为Harlowe和Sugarcube添加语法高亮功能。更重要的是，整个 IDE 生态系统让我可以使用工具来帮助创意写作。这不仅意味着基本的能力如拼写检查和无所不在的单词计数器，而且还包括更强大的工具比如"),e("a",{attrs:{href:"https://alexjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("当使用微妙的性别歧视/种族主义/攻击性的语言时警告我"),e("OutboundLink")],1),t._v("，甚至是"),e("a",{attrs:{href:"https://www.robinsloan.com/notes/writing-with-the-machine/",target:"_blank",rel:"noopener noreferrer"}},[t._v("与AI协作激发我的创造力"),e("OutboundLink")],1),t._v("！")]),t._v(" "),e("p",[t._v("**支持更强大的版本控制和协作。**稍后将详细介绍。在文本文件中编写游戏意味着它被存储在一个人类可读的文件中，这样能够使用所有其他的出色工具和技术。我们接着探讨。")]),t._v(" "),e("p",[t._v("这听起来很棒！为了得到这些优势，我们需要使用一种叫做Twee的特殊编程语言！")]),t._v(" "),e("h3",{attrs:{id:"什么是-twee"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-twee"}},[t._v("#")]),t._v(" 什么是 Twee？")]),t._v(" "),e("p",[t._v("在 Twine 1 的旧时代，官方提供了两种游戏制作方法：使用 Twine 可视化编辑器，或者使用一种叫做 "),e("code",[t._v("twee")]),t._v(" 的脚本语言编写代码，这个语言可以用官方的 CLI 工具（也叫做"),e("code",[t._v("twee")]),t._v("）进行编译。")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("注")]),t._v(" "),e("p",[t._v("一个有趣的历史：尽管 Twine 可视化编辑器更受欢迎，但 twee CLI 却比他它早诞生3年！")])]),t._v(" "),e("p",[t._v("Twee 代码在概念上与Twine图形是一致的，文件中不同的文本块指向不同的段落。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(":: Start\nThis is the first passage in a Twine game!\n\n[[This is a link|Next Passage]]\n\n\n:: Next Passage\nThe player just clicked a link to get here!\n")])])]),e("p",[t._v("当 Twine 2 发布后，官方停止了 twee 语言的支持，唯一受官方支持的方式是使用 Twine 2 可视化编辑器，它大幅扩展了对故事格式的支持。")]),t._v(" "),e("h2",{attrs:{id:"如何在-twine-2-中使用-twee"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何在-twine-2-中使用-twee"}},[t._v("#")]),t._v(" 如何在 Twine 2 中使用 Twee？")]),t._v(" "),e("p",[t._v("当 Twine 2 还没有发布 "),e("code",[t._v("Twee 2")]),t._v(" 时，社区就站了出来，出现了一些第三方Twee CLI工具。不过，因为Twine 2处理故事格式的方式与Twine 1的截然不同，twee语言需要被修改。")]),t._v(" "),e("p",[t._v("接下来是现代Twee工具开发的一些技术解释。我认为它很有趣，如果你想跳过它，那我就长话短说：我使用"),e("a",{attrs:{href:"https://www.motoslave.net/tweego",target:"_blank",rel:"noopener noreferrer"}},[t._v("Tweego"),e("OutboundLink")],1),t._v(" CLI工具写了一个新版本的Twee，称为"),e("a",{attrs:{href:"https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("Twee 3"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h3",{attrs:{id:"twine-2-故事格式-技术说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#twine-2-故事格式-技术说明"}},[t._v("#")]),t._v(" Twine 2 故事格式：技术说明")]),t._v(" "),e("p",[t._v("要理解为什么不能使用Twine 2里的"),e("code",[t._v("twee")]),t._v("工具，我们需要先理解Twee 2故事格式的工作机制。")]),t._v(" "),e("p",[t._v('Twine 2后台会将你的内容存储为XML文档。当你点击Twine 2编辑器中的"发布"按钮时，该XML文档将被传递给一个选定的"故事格式" - 本质上是一个HTML模板。故事格式通常会将JS嵌入到HTML模板中，以根据需要解析和修改Twine的故事数据，并将其显示为可玩的游戏。')]),t._v(" "),e("p",[t._v("这就是为什么不同的故事格式会呈现出截然不同的创作语法，就Twine引擎而言，段落文本只是一个任意的文本块（除了要解析在可视化编辑器中绘制线条的链接），主要由故事格式来决定如何解析段落以提供叙述功能。")]),t._v(" "),e("p",[t._v('如果你很期待看到一个"最小化且可用的故事格式"，那么我维护了一个叫做'),e("a",{attrs:{href:"https://github.com/lazerwalker/twison",target:"_blank",rel:"noopener noreferrer"}},[t._v("Twison"),e("OutboundLink")],1),t._v("的故事格式。如果你把Twison集成到自己的游戏引擎里，它会通过一些计算和数据蒙版将Twine的XML故事数据转换为更容易使用的JSON数据。")]),t._v(" "),e("p",[t._v("这些都意味着故事格式对于从实际脚本到实现一个可玩游戏的重要性。对于设想的CLI工具来说，仅仅是获取twee代码然后将其捆绑到同样是Twine 2内部使用的XML格式是不够的，它还需要将该XML传递到故事格式，同时生成对应的HTML文件。")]),t._v(" "),e("h3",{attrs:{id:"因此-是否应该有twee-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#因此-是否应该有twee-2"}},[t._v("#")]),t._v(" 因此……是否应该有Twee 2？")]),t._v(" "),e("p",[t._v("过去几年对于那些想写Twee的人来说是一个动荡的时期。经过很长一段时间的发展，人们竞相创造出各种兼容Twine 2的twee编译器，现在已经有一个由"),e("a",{attrs:{href:"https://iftechfoundation.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("互动小说技术基金会（IFTF）"),e("OutboundLink")],1),t._v("维护的一个Twee 3的"),e("a",{attrs:{href:"https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("正式语言规范"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("p",[t._v("它被设计成原始Twee语言（可追溯为Twee 1）的一个超集，并且可以很容易的在twee代码和Twine 2可视化编辑器使用的内部格式之间进行转换。")]),t._v(" "),e("p",[t._v("如果你对我们这段发展历史感兴趣，那么这段"),e("a",{attrs:{href:"https://videlais.com/2019/06/08/an-oral-history-of-twee/",target:"_blank",rel:"noopener noreferrer"}},[t._v("口述历史"),e("OutboundLink")],1),t._v("将能带给你一个很全面的概述。")]),t._v(" "),e("p",[t._v("目前已经有多种功能的Twee 3编译器，我个人使用的是"),e("a",{attrs:{href:"https://www.motoslave.net/tweego",target:"_blank",rel:"noopener noreferrer"}},[t._v("Tweego"),e("OutboundLink")],1),t._v("。我确信其它编译器也很好，但是Tweego表现更好并且维护团队很活跃，也能很容易地在"),e("a",{attrs:{href:"https://discordapp.com/invite/n5dJvPp",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方Twine论坛"),e("OutboundLink")],1),t._v("获得支持。")]),t._v(" "),e("h2",{attrs:{id:"如何使用tweego"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何使用tweego"}},[t._v("#")]),t._v(" 如何使用Tweego")]),t._v(" "),e("p",[t._v("如果你习惯使用CLI工具，那么Tweego就很容易上手。从"),e("a",{attrs:{href:"https://www.motoslave.net/tweego/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官网"),e("OutboundLink")],1),t._v("下载正确的二进制文件后，你就可以直接使用它将一个"),e("code",[t._v(".twee")]),t._v("文件编译成可在浏览器中打开的"),e("code",[t._v(".html")]),t._v("文件：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("$ /path/to/tweego -o example.html example.twee\n")])])]),e("p",[t._v("下面是从早期版本更新到Twee 3的示例代码，并包含一些元数据：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('::StoryData\n{\n    "ifid": "F2277A49-95C9-4B14-AE66-62526089F861",\n    "format": "Harlowe",\n    "format-version": "3.1.0",\n    "start": "Start"\n}\n\n:: Start\nThis is the first passage in a Twine game!\n\n[[This is a link|Next Passage]]\n\n\n:: Next Passage\nThe player just clicked a link to get here!\n')])])]),e("p",[t._v("其中的"),e("code",[t._v("ifid")]),t._v("是游戏的随机唯一标识符。如果你试图编译一个不包含"),e("code",[t._v("ifid")]),t._v("的twee文件，Tweego将会帮你自动生成一个。")]),t._v(" "),e("p",[t._v("类似地，Tweego还有大量其它可供输入的选项和标志，你可以通过运行"),e("code",[t._v("tweego --help")]),t._v("看到。对于那些完成类似于指定故事格式的选项，我强烈建议你参照我上面操作那样在元数据块中去指定。")]),t._v(" "),e("p",[t._v("值得单独拿出来说的选项还有"),e("code",[t._v("--watch")]),t._v("。如果你运行"),e("code",[t._v("tweego -o example.html example.twee --watch")]),t._v("，它将启动一个服务用来监视文件更改，然后自动重新编译。你可以把一个文本编辑器在当前窗口打开，同时把一个网页浏览器在另一个窗口打开并指向你的编译输出文件，这样就构成了一个快速测试修改的好方法。")]),t._v(" "),e("h3",{attrs:{id:"但是我想使用可视化编辑器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#但是我想使用可视化编辑器"}},[t._v("#")]),t._v(" 但是我想使用可视化编辑器！")]),t._v(" "),e("p",[t._v("即使你有一些任务不得不使用Twine 2可视化编辑器，你也可以通过Tweego来使用。你可以把Tweego生成的"),e("code",[t._v(".html")]),t._v("文件直接导入到Twine 2，完成编辑后，你可以使用Twine 2的"),e("code",[t._v("-d")]),t._v("标识把"),e("code",[t._v(".html")]),t._v("文件转换回Twee代码（例如："),e("code",[t._v("tweego -o example.twee example.html -d")]),t._v("）。")]),t._v(" "),e("p",[t._v("顺便说一句：Twee语言包含的导入功能允许你将游戏分散到多个文件中，在编译时载入即可。这可能成为一种管理大型游戏或者跨项目重用宏的强大技术，此类工作会使可视化编辑器的来回跳跃更加棘手。详细信息请参阅"),e("a",{attrs:{href:"https://www.motoslave.net/tweego/docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("tweego文档"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("h2",{attrs:{id:"版本控制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#版本控制"}},[t._v("#")]),t._v(" 版本控制")]),t._v(" "),e("p",[t._v("如前所述，以纯文本编写Twine游戏最酷的一个地方就是非常容易的版本管理。")]),t._v(" "),e("p",[t._v("如果你曾经尝试重温你制作的早期版本的Twine游戏，或尝试与其他作者协作，那么你一定知道当你纯粹在"),e("code",[t._v(".html")]),t._v("文件上操作时是多么的困难！无论你用git管理还是仅仅将"),e("code",[t._v(".html")]),t._v("文件存储在一台服务器上，都不得不对那些不是特别适合人类阅读的文件进行导入和导出操作，那是一件非常痛苦的事情。")]),t._v(" "),e("p",[t._v("过去，我经常放弃尝试修复与其他作者的合并冲突，只是手动将修改的内容复制粘贴到Twine编辑器中。但是将全部内容都存储在Twee文件中就可以避免这个令人沮丧的事情。")]),t._v(" "),e("p",[t._v("我不会介绍我是如何使用git和GitHub的，但我会说我做的一件重要的事情：不再存储编译后的.html文件到git上。相反，我将设置一个构建过程来负责自动编译我的"),e("code",[t._v(".twee")]),t._v("文件到"),e("code",[t._v(".html")]),t._v("文件。这意味着我们可以保持git存储库的干净性和可读性。")]),t._v(" "),e("h2",{attrs:{id:"在github上自动化构建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在github上自动化构建"}},[t._v("#")]),t._v(" 在GitHub上自动化构建")]),t._v(" "),e("p",[t._v("CI和CD（分别为：持续集成和持续交付）的概念在非游戏软件开发领域已经非常流行。高阶的想法是部署软件的新版本根本不需要大量手动工作。")]),t._v(" "),e("p",[t._v("只要将新代码推送到版本控制服务器，它就应该负责确保代码完整性，然后编译、部署，或者任何其他操作，一切完成后才会将代码交付到用户手中。")]),t._v(" "),e("p",[t._v("如果你已经习惯了写游戏、获取HTML文件，然后上传到诸如"),e("a",{attrs:{href:"https://philome.la/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://philome.la"),e("OutboundLink")],1),t._v("或"),e("a",{attrs:{href:"https://itch.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://itch.io"),e("OutboundLink")],1),t._v("的流程，这可能显得有些另类，或者可能有些过火。")]),t._v(" "),e("p",[t._v("然而，"),e("a",{attrs:{href:"https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Actions"),e("OutboundLink")],1),t._v("是一个可以免费使用的轻量级服务，我们可以很容易用于设置一个部署管道！在上一节中，我提到我不会将编译好的HTML文件存储在 Twine/Twee游戏的git存储库中，取而代之的是让GitHub Actions处理所有内容。")]),t._v(" "),e("p",[t._v("每次我将Twine游戏的新版本推送到GitHub时，GitHub Action都会运行，它使用Tweego来编译我的游戏，然后将其发布到"),e("a",{attrs:{href:"https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Pages"),e("OutboundLink")],1),t._v("。最终结果是，我不再需要考虑如何发布我的游戏，或者担心自己会不会忘记部署最新版本：我可以在GitHub上看到的Twee代码版本，就是玩家正在玩的版本！")]),t._v(" "),e("p",[t._v("为你自己的Twine/Twee项目进行这样的设置也很容易，下面我们开始吧！")]),t._v(" "),e("h3",{attrs:{id:"添加故事格式到-git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#添加故事格式到-git"}},[t._v("#")]),t._v(" 添加故事格式到 git")]),t._v(" "),e("p",[t._v("当你在Twee里使用像Harlowe或Sugarcube这样的故事格式时，Tweego可以自动找到正确的故事格式，因为从Tweego官网下载的 Tweego版本包含六个标准格式。但我们将要在GitHub Actions中安装的Tweego不能访问那些故事格式。")]),t._v(" "),e("p",[t._v("在你的git目录下创建一个名为"),e("code",[t._v("storyformats")]),t._v("的文件夹。转到你下载好的Tweego文件夹，并将相应的故事格式从"),e("code",[t._v("storyformats")]),t._v("目录复制到您刚刚创建的目录中，提交并推送到git。")]),t._v(" "),e("p",[t._v("一般来说，这对于未来维护游戏也是一件好事。如果你在五年后回顾这个问题，可能当时指定的故事格式版本已经不能用了，并且追踪它也很困难，这时包含在你的git存储库中的确切故事格式包将有助于确保（尽管不能保证）你能编辑和编译游戏。")]),t._v(" "),e("h3",{attrs:{id:"生成github个人访问令牌-用于github-pages"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生成github个人访问令牌-用于github-pages"}},[t._v("#")]),t._v(" 生成GitHub个人访问令牌（用于GitHub Pages）")]),t._v(" "),e("p",[t._v("我通常使用"),e("a",{attrs:{href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub Pages"),e("OutboundLink")],1),t._v("来托管我的游戏。这是一个免费的静态站点托管服务，像Twine游戏就可以很好的集成到GitHub上。不仅完全免费，还能自动扩展以支持任意量级的流量。我想这绝对是托管像Twine游戏这类不需要任何后端服务的最好且最容易的方法。")]),t._v(" "),e("p",[t._v("如果你不想使用GitHub Pages来托管你的游戏，你可以跳过这部分。")]),t._v(" "),e("p",[t._v("为了使GitHub Actions将游戏部署到GitHub Pages，它需要权限来将代码提交到你的git存储库（幕后逻辑：GitHub Pages将在一个特殊的"),e("code",[t._v("gh-pages")]),t._v("分支上配置为托管任何文件，GitHub Actions将负责提交包含HTML文件到该分支上）。")]),t._v(" "),e("p",[t._v("打开https://github.com/settings/tokens，并点击按钮生成一个新的令牌。任意取一个你想要的名字，并授予完整的“Repo”权限。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--KYSoUNqs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/4g4t443g0nalsr7zlgsn.png",alt:"Personal Access Token"}})]),t._v(" "),e("p",[t._v("在下一个页面，你将会看到生成的令牌（将是一个随机字符和数字组成的长字符串），请保存好它。")]),t._v(" "),e("p",[t._v('打开要运行GitHub Actions的GitHub存储库的设置页面，在"Secrets"选项卡下，添加一个名为"GH_PAT"的新密钥，输入上一步生成的令牌。')]),t._v(" "),e("p",[e("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--FRBExJMl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/zhy5awog2vcun0qbgxt4.png",alt:"Repo Secrets"}})]),t._v(" "),e("h3",{attrs:{id:"开始使用github-actions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开始使用github-actions"}},[t._v("#")]),t._v(" 开始使用GitHub Actions")]),t._v(" "),e("p",[t._v("要设置GitHub Actions，你只需要在你的git存储库中添加一个新文件。")]),t._v(" "),e("p",[t._v('GitHub Actions基于"工作流"，也就是配置文件。如果你添加一个名为'),e("code",[t._v(".github/workflows/build.yml")]),t._v("（或者任何"),e("code",[t._v(".yml")]),t._v("文件在那个目录下），它就会读取该配置并尝试去使用它。")]),t._v(" "),e("p",[t._v("配置文件如下所示：")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Build\n\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("push")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branches")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/checkout@v1\n\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Use Go 1.13\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/setup"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("go@v1\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("go-version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1.13.x\n\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" build game\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),e("span",{pre:!0,attrs:{class:"token scalar string"}},[t._v("\n          go get github.com/tmedwards/tweego\n          export PATH=$PATH:$(go env GOPATH)/bin\n          tweego YOUR_TWEE_FILE.twee -o dist/index.html")]),t._v("\n\n\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" peaceiris/actions"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("gh"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages@v2\n        "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PERSONAL_TOKEN")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.GH_PAT "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n          "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PUBLISH_BRANCH")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gh"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages\n          "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PUBLISH_DIR")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ./dist\n")])])]),e("p",[t._v("请确定将"),e("code",[t._v("YOUR_TWEE_FILE.twee")]),t._v("换成实际文件名，并更改任何其它需要的tweego设置。如果你不确定你在做什么，那你可能需要将输出文件保留为"),e("code",[t._v("dist/index.html")]),t._v("。")]),t._v(" "),e("p",[t._v("如果你进行了新的提交并推送到你GitHub的主分支，几分钟后它将会直接在网页上可用！默认情况下，它应该会在"),e("code",[t._v("https://[your-github-username].github.com/[repo-name]")]),t._v("这个地址，尽管你也可以配置GitHub Pages使用"),e("a",{attrs:{href:"https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site",target:"_blank",rel:"noopener noreferrer"}},[t._v("自定义域名"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("p",[t._v("GitHub Actions可能需要几分钟来编译和发布，所以请耐心等待一下。你也可以点击你存储库中的“Actions”选项卡，将会看到构建正在进行中。")]),t._v(" "),e("p",[t._v("感兴趣的话，我们继续来看看这个配置文件正在做什么：")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Build\n")])])]),e("p",[t._v("这仅仅是工作流的命名。它可以是你想要的任何名称，将会出现的Actions页面中。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("push")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branches")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" master\n")])])]),e("p",[t._v("这表示每当有人将代码推送到主分支时，将执行以下一系列步骤。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jobs")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("runs-on")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ubuntu"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("latest\n\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("steps")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n")])])]),e("p",[t._v("现在，我们已经开始定义任务本身。具体来说，它在Linux上运行，尽管这对我们来说并不重要。")]),t._v(" "),e("p",[t._v("从概念上讲，工作流由许多步骤组成。步骤可以是我们手动编写的一些代码，也可以是社区提供的操作的预设集合。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/checkout@v1\n")])])]),e("p",[t._v("这一步将签出我们代码的最新版本。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Use Go 1.13\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" actions/setup"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("go@v1\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("with")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("go-version")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1.13.x\n")])])]),e("p",[t._v("Tweego是用Go语言编写的。我们将要从头开始编译Tweego的代码，也就意味着我们需要一个Go编译器。这一步为我们提供了Go代码的工作环境，并让我们指定我们想要的Go版本。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" build game\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("run")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),e("span",{pre:!0,attrs:{class:"token scalar string"}},[t._v("\n      go get github.com/tmedwards/tweego\n      export PATH=$PATH:$(go env GOPATH)/bin\n      tweego YOUR_TWEE_FILE.twee -o dist/index.html")]),t._v("\n")])])]),e("p",[t._v("这是一个自定义脚本。首先"),e("code",[t._v("go get")]),t._v("那一行下载并编译Tweego工具本身。下一行是做一些不需要特别担心的繁琐的环境设置（修改我们的PATH，这样我们可以只调用tweego二进制文件，而无需指定一个完整的文件路径）。最后一行，我们运行tweego本身。")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Deploy\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("uses")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" peaceiris/actions"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("gh"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages@v2\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PERSONAL_TOKEN")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" secrets.GH_PAT "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PUBLISH_BRANCH")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gh"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("pages\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PUBLISH_DIR")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ./dist\n")])])]),e("p",[t._v("此时，我们在一个"),e("code",[t._v("dist")]),t._v("的目录下有一个HTML文件。这是由另一个GitHub用户创建的将代码部署到GitHub Pages的"),e("a",{attrs:{href:"https://github.com/peaceiris",target:"_blank",rel:"noopener noreferrer"}},[t._v("第三方 Action"),e("OutboundLink")],1),t._v("。这里的配置提供个人访问令牌（这样它就有权限去提交/部署），并指定我们想要把"),e("code",[t._v("dist")]),t._v("目录下的全部文件发布到"),e("code",[t._v("gh-pages")]),t._v("分支。")]),t._v(" "),e("h2",{attrs:{id:"这就是全部内容了"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#这就是全部内容了"}},[t._v("#")]),t._v(" 这就是全部内容了！")]),t._v(" "),e("p",[t._v("有了这一切，我们应该已经明白了！")]),t._v(" "),e("p",[t._v("作为一个习惯于使用更以程序员为中心的编程工具的人，我发现这个工作流程使Twine游戏创作变得更加轻松和愉快。希望它也能对你所有帮助！")]),t._v(" "),e("p",[t._v("如果你对此感兴趣，那么你很可能也会对我的另一个工具"),e("a",{attrs:{href:"https://lazerwalker.com/playfab-twine",target:"_blank",rel:"noopener noreferrer"}},[t._v("PlayFab-Twine"),e("OutboundLink")],1),t._v("感兴趣，它可以轻松自动地将免费分析功能添加到你的Twine游戏中。"),e("a",{attrs:{href:"https://github.com/lazerwalker/playfab-twine",target:"_blank",rel:"noopener noreferrer"}},[t._v("PlayFab-Twine的GitHub存储库"),e("OutboundLink")],1),t._v("也是使用此工作流开发Twine项目的一个很棒的示例！")]),t._v(" "),e("p",[t._v("如果你在使用中有任何问题，请给我留言，我很期待听到你的声音！")])],1)}),[],!1,null,null,null);e.default=n.exports}}]);