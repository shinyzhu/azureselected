---
type: post
status: translating
sidebar: auto
title: "Twine 的现代开发流程"
description: '这是一篇关于如何使用现代网站开发工具编写和发布游戏（VS Code + 扩展、命令行编译器、GitHub Actions + GitHub Pages 实现 CI/CD）的文章，而不仅仅是使用 Twine 的默认编辑器。也向没接触过的读者介绍GitHub Action 和 CI 概念。'
tags: ['PlayFab', 'javascript']
author: 'Em Lazer-Walker'
date: 2020-01-16
url: 'https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp'
translator: 'DuanShaolong'
reviewer: 'shinyzhu'
pub_date: 2020-03-24
---

# Twine 的现代开发流程
<ContentMeta />

I love [Twine](https://twinery.org/)! Whether you're trying to prototype a larger work or make something on your own, it's such a powerful and easy-to-use tool to make hypertext-based narrative games.

我喜欢 [Twine](https://twinery.org/)！无论你是在尝试一个更大的原型作品，还是自己制作一些东西，它都是一个强大而易于使用的工具，可以制作基于超文本的叙事游戏。

That said, a common complaint I've heard from most people I've talked to who use it seriously is how readily its workflows fall apart at scale. 

话虽如此，我聊过的大多数人有一个常见的抱怨是：工作流在规模变大时非常容易崩溃。

A visual graph editor is a fantastic approach for small projects, but gets unmanageable quickly on larger projects. Additionally, the way the Twine 2 editor handles files means using using tools like version control can be difficult, and merging changes from multiple collaborators can be nearly impossible.

对于小项目来说，可视化图形编辑器是一种非常好的方法，但是对于较大的项目来说，它很快就变得难以胜任了。此外，Twine 2 编辑器处理文件的方式意味着使用诸如版本控制之类的工具可能很困难，合并来自多个协作者的更改几乎是不可能的。

But there's a solution! I'm going to spend the next few minutes walking you through my Twine development workflow. There are three important parts of it I want to talk about:

但是已经找到解决方案了！我下面将用几分钟时间带你了解我的 Twine 开发流程。我会分三个重要的部分：

1. **纯文本文件**。我使用[VS Code](https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker) 来编写我的游戏，而不是使用可视化的Twine编辑器。
3. **现代版本控制**。使用GitHub托管的git库来存储我的游戏。
3. **自动化发布**。每次当我推送游戏的一个新版本到GitHub，会即时通过 [GitHub Actions](https://github.com/features/actions) 和 [GitHub Pages](https://pages.github.com/) 完成发布，游戏立刻可玩。



1. **Plain text files**. I use [VS Code](https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker) to write my games, rather than using the visual Twine editor. 
2. **Modern version control**, storing my games in git on GitHub.
3. **Automatic publishing**. Every time I push a new version of my game to GitHub, it's instantly playable via [GitHub Actions](https://github.com/features/actions) and [GitHub Pages](https://pages.github.com/).

下面逐步介绍我使用的工具，以及让你如何使用类似的工具链！

Let's step through the tools I use, and how you can get set up with a similar toolchain!

## 使用文本编辑器进行编写
## Writing in a Text Editor

对于Twine游戏为什么文本化编辑代替节点的图形化编辑是有价值的？

Why is it valuable to be able to write Twine games as text files instead of as nodes in a visual graph?

**规模友好.**当你的游戏增长到成千上万字时,在Twine的可视化节点编辑器中跳转将会非常痛苦。即使是对于中等规模的项目，把整个游戏文件放在单个文本文件中，你也可以随心所欲的浏览操作此文件。甚至在考虑将大型脚本文件拆分成多个文件之前，这样的操作可以大大减少大型项目的认知负载。
**It scales better.** When your game grows to be tens of thousands of words, navigating Twine's node-based visual editor can be a pain. Having your entire game be in a single text file, that you can manipulate and browse however you'd like, is far easier for even medium-sized projects. And that's even before considering that being able to split your script up into multiple files, which can greatly reduce the cognitive load for larger projects.

**可复用.**希望跨段落之间或跨多个游戏项目重用一些宏或其他脚本位吗？能在IDE中复制/粘贴文本比在可视化编辑器中管理文本要容易得多。

**It allows for reuse.** Have some macros or other bits of scripting you'd like to reuse between passages, or across multiple game projects? Being able to copy/paste text in an IDE is a lot easier than managing it in the visual editor.

**可使用更高效的工具编写.**相对Twine的文本框，在常用的于其它编程和写作任务的文本编辑器中编写会更舒适一些。这就意味着我可以使用这些工具来是生活更轻松。

**It gives you access to better writing tools.** I'm more comfortable writing in the same text editor I use for other programming and writing tasks than I am in Twine's text boxes. It also means I can use the tools they provide to make my life easier! 

VS Code扩展可以为Harlowe和Sugarcube添加语法高亮功能。更重要的是，访问其整个IDE生态系统意味着我可以使用工具来帮助创作创意散文。这不仅意味着基本的事情，如拼写检查和无所不在的单词计数器，而且还包括更强大的工具来完成对[使用微妙的性别歧视/种族主义/攻击性的语言的警告](https://alexjs.com/)，甚至是[与AI协作激发我的创造力](https://www.robinsloan.com/notes/writing-with-the-machine/)！

VS Code has extensions to add syntax highlighting for both Harlowe and Sugarcube. More than that, access to its entire IDE ecosystem means I can pull in tools to help with creative prose writing. This means basic things like spell check and an omnipresent word counter, but it can also mean more powerful tools to do things like [warn me if I'm using subtly sexist/racist/ableist language](https://alexjs.com/) or even [spark my creativity by collaborating with an AI](https://www.robinsloan.com/notes/writing-with-the-machine/)!

**支持更强大的版本控制和协作.**稍后将做更多介绍。在一个文本文件中编写我的游戏意味着它被存储在一个人类可读的文本文件中，这就是我下面要讨论的所有其它优秀工具和技术的原因。

**It enables more robust versioning and collaboration.** More on this later, but writing my game in a text file means it's stored in a human-readable text file, which is what enables all of the other great tools and techniques I'll be talking about next.

这听起来很棒！为了得到这些优势，我们需要使用一种叫做Twee的特殊编程语言！
This all sounds great! To get all of these benefits, we can use a special programming language called Twee!

### 什么是Twee？
### What is Twee?

在Twine 1的旧时代，官方有提供两种游戏制作方法：使用Twine可视化编辑器，或者使用一种叫做twee的脚本语言编写代码，这个语言可以用官方的CLI工具进行编译。

In the olden days of Twine 1, there were two officially-supported ways to make games: using the Twine visual editor, or by writing code in a scripting language called twee that could be compiled by an official CLI tool, also called `twee`. 

(一个有趣的历史副作用：即使Twine的可视化编辑器是更受欢迎的工具，但twee CLI却比他它早诞生3年！)

(A fun historical sidenote: even though the Twine's visual editor is the more popular tool, the twee CLI predates it by 3 years!)

Twee代码在概念上与Twine图形是一致的,文件中不同段落引用的文本块也不同。

Twee code is conceptually the same as a Twine graph, with different blocks of text in a file referring to different passages.

```
:: Start
This is the first passage in a Twine game!

[[This is a link|Next Passage]]


:: Next Passage
The player just clicked a link to get here!
```
当Twine 2发布后，官方对于twee语言的支持就停止了，唯一官方支持的路径是使用Twine 2可视化编辑器及其对故事格式的大幅扩展支持。

When Twine 2 came out, support for the twee language was officially killed, and the only officially supported path was to use the Twine 2 visual editor and its greatly-expanded support for story formats.

## 如何通过Twine 2来使用Twee？
## How do you use Twee with Twine 2?

当Twine 2还没有完成发布"Twee 2"时，社区就站了出来，出现了一些第三方Twee CLI工具。不过，因为Twine 2处理故事格式的方式与Twine 1的截然不同，twee语言需要被修改。

When Twine 2 wasn't accompanied by a "Twee 2", the community stepped up, and a number of third-party twee CLI tools emerged. The twee language needed to adapt, though, since Twine 2 handles story formats in a vastly different way from Twine 1. 

接下来是现代Twee工具开发的一些技术解释。我认为它很有趣，如果你想跳过它，那我长话短说：我使用[Tweego](https://www.motoslave.net/tweego) CLI工具写了一个新版本的Twee，称为[Twee 3](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)。

What follows is a bit of a technical explanation of the development of modern Twee tools. I think it's interesting, but if you want to skip over it, the main practical takeaway is that I use the [Tweego](https://www.motoslave.net/tweego) CLI tool to write a newer version of Twee that's called [Twee 3](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md).

### Twine 2故事格式：技术说明
### Twine 2 Story Formats: A Technical Explanation

为了理解为什么不能使用Twine 2里面的`twee`工具，我们需要先理解Twee 2故事格式的工作机制。

To understand why we can't just use the old `twee` tool with Twine 2, we need to understand how Twine 2 story formats work.

Twine 2后台会将你的工作存储为XML文档。单击Twine 2编辑器中的"发布"按钮时，该XML文档将被传递给一个选定本质上是一个HTML模板的的"故事格式"，故事格式通常会将JS嵌入模板中，以根据需要解析和修改Twine的故事数据，并将其显示为可玩的游戏。

Internally, Twine 2 stores your work as an XML document. When you click the "publish" button in the Twine 2 editor, that XML document is passed to the selected "story format", which is essentially an HTML template. A story format will typically embed JS within that template to parse and modify the Twine story data as appropriate to display it as a playable game. 

这就是为什么不同的故事格式会呈现出截然不同的创作语法：就Twine引擎而言，段落文本只是一个任意的文本blob（除了解析在可视化图形编辑器中绘制线条的链接），主要由故事格式来决定如何解析段落以提供叙述功能。

This is why/how different story formats present vastly different authoring syntax: as far as Twine the engine is concerned, a passage's text is just an arbitrary text blob (except insofar as it parses links to draw lines in the visual graph editor), and it's then up to the story format to decide how to parse a passage to provide narrative functionality.

如果你很期待看到一个"最小化且可用的故事格式"，那么我有维护一个故事格式称为[Twison](https://github.com/lazerwalker/twison)。如果你把Twison集成到自己的游戏引擎，它会通过一些计算和数据蒙版将Twine的XML故事数据转换为更容易使用的JSON数据。

If you're curious to see a "minimum viable story format", I maintain a story format called [Twison](https://github.com/lazerwalker/twison) that converts Twine story data XML into JSON, with a few bits of computation and data-munging meant to make the JSON easier to consume if you're integrating it into your own game engine.

这些都意味着故事格式对于从实际脚本到一个可玩的游戏的重要性。对于设想的CLI工具来说，仅仅是获取twee代码然后将其捆绑到同样是Twine 2内部使用的XML格式是不够的，它还需要将该XML传递到故事格式，同时生成对应的HTML文件。

This all means a story format is essential to actually going from a script to a playable game! It isn't enough for a hypothetical CLI tool to just take your twee code and bundle it up into the same XML format that Twine 2 uses internally, it also needs to then pass that XML to a story format and generate an HTML file from that interaction.

### 因此……是否有Twee 2？
### So... is there or isn't there a Twee 2?

过去几年对于那些想写Twee的人来说是一个动荡的时期。经过很长一段时间的发展，人们构建出各种竞相兼容Twine 2的twee编译器，现在已经有一个由互动小说技术基金会（IFTF）维护的一个针对Twee 3的[正式的语言规范](https：//github.com/iftechfoundation/twe-specs/bid/master/twee-3-specification.md)。

The last few years have been a tumultuous time for people who would want to write Twee. After quite some time of different people building out different competing Twine 2-compatible twee compilers, there is now a [formal language specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) for Twee 3, maintained by the Interactive Fiction Technology Foundation (IFTF). 

它被设计成原始Twee语言（可追溯为Twee 1）的一个超集，并且可以很容易的在twee代码和Twine 2可视化编辑器使用的内部格式之间进行转换。

It's designed to be a superset of the original `twee` language (retroactively known as Twee 1), and to be fairly easy to convert between twee code and the internal format used by the Twine 2 visual editor. 

如果你对我们这段发展历史感兴趣，那么这段[口述历史](https://videlais.com/2019/06/08/an-oral-history-of-twee/)将能带给你一个很全面的概述。

If you're interested in the history and politics of how we got here, [this oral history](https://videlais.com/2019/06/08/an-oral-history-of-twee/) is a great overview.

目前已经有多种功能的Twee 3编译器，我个人使用的是[Tweego](https://www.motoslave.net/tweego)。我确信其它编译器也很好，但是Tweego表现更好，它被积极维护，并且可以很容易在[官方Twine论坛](https://discordapp.com/invite/n5dJvPp)获得支持。

There are multiple functioning Twee 3 compilers, but I personally use [Tweego](https://www.motoslave.net/tweego). I'm sure others are great as well, but Tweego works well, is actively maintained, and is easy to get support for in the [official Twine Discord](https://discordapp.com/invite/n5dJvPp).

## 如何使用Tweego
## How to use Tweego

如果你习惯使用CLI工具，那么Tweego就很容易上手。从[官网](https://www.motoslave.net/tweego/)下载正确的二进制文件（https：//www.motoslave.net/tweego/）后，你就可以直接调用它将一个`.twee`文件编译成可在浏览器中打开的`.html`文件：

If you're comfortable using CLI tools, Tweego is quite easy to use. After downloading the correct binary from the [website](https://www.motoslave.net/tweego/), you can call it directly to simply compile a `.twee` file into a compiled `.html` file you can play in a browser:

```
$ /path/to/tweego -o example.html example.twee
```
下面是从早期版本更新到Twee 3的示例代码，并包含一些元数据：

Here's the sample code from earlier updated to Twee 3 and with some metadata:

```
::StoryData
{
    "ifid": "F2277A49-95C9-4B14-AE66-62526089F861",
    "format": "Harlowe",
    "format-version": "3.1.0",
    "start": "Start"
}

:: Start
This is the first passage in a Twine game!

[[This is a link|Next Passage]]


:: Next Passage
The player just clicked a link to get here!
```

其中的`ifid`是游戏的随机唯一标识符。如果你试图编译一个不包含`ifid`的twee文件，Tweego将会帮你自动生成一个。

That `ifid` is a random unique identifier for a game. If you try to compile a Twee file without including that, tweego will automatically generate one for you. 

类似地，Tweego还有大量其它可供输入的选项和标志，你可以通过运行`tweego --help`看到。对于那些完成类似于指定故事格式的选项，我强烈建议你参照我上面操作那样在元数据块中去指定。

Similarly, tweego has a ton of other options and flags you can pass in, that you can see by running `tweego --help`. For the options that do things like specify a story format, I'd highly recommend just specifying that in a metadata block like I have above.

值得单独拿出来说的选项还有`--watch`。如果你运行`tweego -o example.html example.twee --watch`，它将启动一个server，用于监视文件更改，然后重新编译。你可以把一个文本编辑器在当前窗口打开，同时把一个网页浏览器在另一个窗口打开并指向你的编译输出文件，这样就构成了一个快速测试修改的好方法。

Also worth calling out is the `--watch` option. If you run `tweego -o example.html example.twee --watch`, it will start up a server that watches for file changes and then recompiles. If you have a text editor open in one window and a web browser open in another one pointed to your compiled output, this is a great way to quickly test changes!

### 但是我想使用可视化编辑器！
### But I want to use the visual editor!

即使你有一些任务不得不使用Twine 2可视化编辑器，你也可以通过Tweego去使用。你可以把Tweego生成的.html文件直接导入到Twine 2，然后你就可以使用Twine 2的`-d`标识把.html文件转换回Twee代码（例如：`tweego -o example.twee example.html -d`）。

If you have a reason to use the Twine 2 visual editor for something, you can also use it with Tweego. You can take the .html file output by Tweego and import it directly into Twine 2. When you're done, you can convert back from a .html file produced by Twine 2 into Twee by using the `-d` flag (e.g. `tweego -o example.twee example.html -d`).

顺便说一句：Twee语言包含的导入功能允许你将游戏分散到多个文件中，在编译时载入即可。这可能成为一种管理大型游戏或者跨项目重用宏的强大技术，此类工作流会使可视化编辑器的来回跳跃更加棘手。有关详细信息，请参阅[tweego文档](https://www.motoslave.net/tweego/docs/)。

As an aside: the Twee language includes import functionality that lets you spread your game across multiple files and then join them at compilation time. That can be a really powerful technique for managing larger games, or reusing macros across projects, but that sort of workflow can make jumping back and forth with the visual editor trickier. See the [tweego docs](https://www.motoslave.net/tweego/docs/) for more info.

## 版本控制
## Version Control

如前所述，在纯文本文件中编写Twine游戏最酷的部分之一是对版本管理的便捷性。

As mentioned, one of the coolest parts about writing Twine games in plain text files is how much easier they are to version. 

如果你曾经尝试重温你制作的早期版本的Twine游戏，或尝试与其他编写者协作，那么你一定知道当你纯粹在`.html`文件上操作时是多么的困难！无论你用git管理还是仅仅将`.html`文件存储在一台服务器上，都不得不对那些不是特别适合人类阅读的文件进行导入和导出操作，那是一件非常痛苦的事情。

If you've ever tried to revisit previous versions of a Twine game you've made, or tried to collaborate with other writers, you know how difficult this can be when you're operating purely on `.html` files! Whether you're using git or just storing `.html` files on a server somewhere, having to import and export files that aren't particularly human readable is a major pain.

过去，我经常放弃尝试修复与其他编写者的合并冲突，只是手动将改变复制粘贴到Twine编辑器中。但是将全部内容都存储在Twee文件中就可以避免这个令人沮丧的事情。

In the past, I've often given up on trying to fix merge conflicts with other writers, and just manually copy-pasted changes into the Twine editor by hand. That's frustrating, and avoidable by storing everything in Twee files instead!

我不会回忆我是如何使用git和GitHub的，但我会说我做的一件重要的事情：不再存储编译后的.html文件到git上。相反，我将设置一个构建过程来负责自动编译我的`.twee`文件到`.html`文件。这意味着我们可以保持git存储库的干净性和可读性。

I'm not going to walk through how I use git and GitHub, but I will say one important thing that I do is not store my compiled .html files in git at all. Rather, I'm going to set up a build process so that GitHub is responsible for automatically compiling my `.twee` files into `.html` files. This means we can keep the git repository clean and readable!

## 在GitHub上自动化构建
## Automatically building on GitHub

CI和CD（分别为：持续集成和持续交付）的概念在非游戏软件开发领域已经非常流行。高级想法是部署软件的新版本不需要大量手动工作。

The concepts of CI and CD (continuous integration and continuous delivery, respectively) are very popular in non-game software development. The high-level idea is that it shouldn't require a lot of manual work to deploy a new version of your software. 

只要将新代码推送到版本控制服务器，它就应该负责确保代码完整性，然后编译、部署，或者任何其他操作，一切完成后才会将代码交付到用户手中。

As soon as you push up new code to your version control server, it should be responsible for making sure things aren't broken and then compiling it, deploying it, or whatever else might need to be done to get your code into the hands of users.

如果你已经习惯了写游戏、获取HTML文件，上传到诸如[https://philome.la](https://philome.la/)或[https://itch.io](https://itch.io/)的流程，这可能显得有些异味，或者可能有些过火。

This might seem foreign, or perhaps overkill, if you're just used to the flow of writing a game, getting an HTML file, and uploading that to something like [https://philome.la](https://philome.la/) or [https://itch.io](https://itch.io/).

然而，[GitHub Actions](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320)是一个可以免费使用的轻量级服务，我们可以很容易用于设置一个部署管道！在上一节中，我提到我不会将编译好的HTML文件存储在 Twine/Twee游戏的git存储库中，取而代之的是让GitHub Actions处理所有内容。

However, [GitHub Actions](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320) are a lightweight free service we can use to easily set up a deployment pipeline! In the previous section, I mentioned I don't store the compiled HTML files in my git repos for Twine/Twee games. Instead, GitHub Actions handles everything.

每次我将Twine游戏的新版本推送到GitHub时，GitHub Action都会运行，其使用Tweego来编译我的游戏，然后将其发布到[GitHub Pages](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320)。最终结果是，我不再需要考虑如何发布我的游戏，或者担心自己会不会忘记部署最新版本：我可以在GitHub上看到的Twee代码版本，就是玩家正在玩的版本！

Every time I push a new version of a Twine game to GitHub, a GitHub Action runs that uses Tweego to compile my game, and then publishes it to [GitHub Pages](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320). The end result is I don't need to think about how to publish my game, or worry if I've forgotten to deploy the latest version or not: whatever version of my Twee code I can read on GitHub, that's the version players are playing!

为你自己的Twine/Twee项目进行这样的设置也很容易，下面我们开始吧！
Getting this set up with your own Twine/Twee project is easy. Let's walk through it!

### 添加故事格式到git
### Add the story format to git

当你的Twee指定使用像Harlowe或Sugarcube这样的故事格式时，Tweego可以自动找到正确的故事格式，因为从Tweego官网下载的 Tweego版本包含六个标准格式。我们将要在GitHub Actions中安装的Tweego将不能访问那些故事格式。

When your Twee specifies that you're using a story format like Harlowe or Sugarcube, Tweego can find the correct story format because the version of Tweego you've downloaded from the Tweego website includes a half-dozen standard ones. The way we'll be installing Tweego on GitHub Actions won't have access to those.

在你的git目录下创建一个文件夹并命名为`storyformats`。转到你已经下载的Tweego文件夹，并将相应的故事格式从`storyformats`目录移动到您刚刚创建的目录中，提交并推送到git。

Within your git directory, create a folder called `storyformats`. Go into wherever you've downloaded Tweego, and move the appropriate story format(s) from its `storyformats` directory into the one you've just created. Commit and push that to git.

这对于未来维护你的游戏也可以说是一件好事。如果你五年后回顾从前，可能当时指定的故事格式版本已经不可用了，并且追踪它也很困难，包含在你的git存储库中的确切故事格式的捆绑包将有助于确保（尽管不能保证）您编辑和编译游戏的能力。

This is also generally a good thing for maintaining your game in the future! If you come back to this in five years, it's possible this specific version of the story format you're using might not still be available, and tracking it down might be hard; including the exact story format bundle within your git repo will help ensure (although not guarantee) your ability to edit and compile your game.

### 生成一个GitHub个人访问token（为GitHub Pages）
### Generating a GitHub Personal Access token (for GitHub Pages)

我通常使用[GitHub Pages](https://pages.github.com/)来托管我的游戏。这是一个免费的静态站点托管服务，像Twine游戏就可以很好的集成到GitHub上。不仅完全免费，还能扩展以支持任意量级的流量。我想这绝对是最好且最容易的托换小型静态网站的方法，如Twine游戏这类就不需要任何后端服务器服务。

I typically use [GitHub Pages](https://pages.github.com/) to host my games. It's a free hosting service for static sites such as Twine games that's integrated right into GitHub. It's totally free, and can scale to support any amount of traffic. I think it's absolutely the best and easiest way to host small websites like Twine games that don't require any sort of backend server services.

如果你不想使用GitHub Pages来托管你的游戏，你可以跳过这部分。

If you don't want to use GH Pages to host your game, you can safely skip this section.

为了使GitHub Actions将游戏部署到GitHub Pages，它需要权限来将代码提交到你的git存储库（简单操作的背后：GitHub Pages将被配置为托管任何文件，会存在一个特殊的`gh-pages`git分支，GitHub Actions将负责进行一个包含你的HTML的新提交到该分支上）。

In order for GitHub Actions to deploy your game to GitHub Pages, it needs permissions to commit code to your git repo (under the hood: GitHub Pages will be configured to host any files that exist in a special `gh-pages` git branch, and GitHub Actions will be responsible for making a new commit containing your HTML file onto that branch).

打开https://github.com/settings/tokens，并点击按钮生成一个新的token。任取一个你想要的名字，并授予完整的“Repo”权限。

Go to https://github.com/settings/tokens, and click the button to generate a new token. Name it whatever you want, and give it full "Repo" permissions.

![Personal Access Token](https://res.cloudinary.com/practicaldev/image/fetch/s--KYSoUNqs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/4g4t443g0nalsr7zlgsn.png)

在下一个页面，你将会看到生成的token（将是一个随机字符和数字组成的长字符串），请保存这个token。

On the next screen, you'll see the token itself (it'll be a long string of random letters and numbers). Save that!

打开要运行GitHub Actions的GitHub存储库的存储库设置页面，在"Secrets"选项卡下，添加一个名为"GH_PAT"的新机密，其输入值是上一步生成的token。

Go to the repository settings for the GitHub repo that you'll be running GitHub Actions on. Under the "Secrets" tab, add a new secret named "GH_PAT" whose value is the token you just generated.

![Repo Secrets](https://res.cloudinary.com/practicaldev/image/fetch/s--FRBExJMl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/zhy5awog2vcun0qbgxt4.png)

### 开始使用GitHub Actions
### Getting Started with GitHub Actions

要设置GitHub Actions，你只需要在你的git存储库中添加一个新文件。

To set up a GitHub Action, all you need to do is add a new file into your git repo.

GitHub Actions基于"工作流"，也就是配置文件。如果你添加一个名为`.github/workflows/build.yml`（或者任何`.yml`文件在那个目录下），它就会读取该配置并尝试去使用它。

GitHub Actions are based on "workflows", which are configuration files. If you add a file called `.github/workflows/build.yml` (or any `.yml` file inside that directory), it will read that config and try to use it.

配置文件应如下所示：
That file should look like this:

```
name: Build

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: Use Go 1.13
        uses: actions/setup-go@v1
        with:
          go-version: 1.13.x

      - name: build game
        run: |
          go get github.com/tmedwards/tweego
          export PATH=$PATH:$(go env GOPATH)/bin
          tweego YOUR_TWEE_FILE.twee -o dist/index.html


      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2
        env:
          PERSONAL_TOKEN: ${{ secrets.GH_PAT }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./dist
```
请确定将`YOUR_TWEE_FILE.twee`换成实际文件名，并更改任何其它需要的tweego设置。如果你不确定你在做什么，那你可能需要将输出文件保留为`dist/index.html`。

Be sure to swap out `YOUR_TWEE_FILE.twee` for the actual filename, and change any other tweego settings you might need to. If you're not sure what you're doing, you probably want to leave the output file as `dist/index.html`.

如果你进行了新的提交并推送到你GitHub上的游戏主分支，几分钟后它将会直接在网页上线！默认情况下，它应该会在`https://[your-github-username].github.com/[repo-name]`下可用，尽管你也可以配置GitHub Pages以使用[自定义域名](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)。

If you make a new commit and push it to your game's master branch on GitHub, after a few minutes it should be live on the web! By default, it should be available at `https://[your-github-username].github.com/[repo-name]`, although it's also possible to configure GitHub Pages to work with a [custom domain name](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site). 

GitHub Actions可能需要几分钟来编译和发布，所以请耐心等待一下！你也可以点击你存储库中的“Actions”选项卡，将会看到构建正在进行中。

The GitHub Action can take a few minutes to compile and deploy, so be patient! You can also click through to the "Actions" tab in your repository and see the build as it progresses.

感兴趣的话，我们继续来看看这个配置文件正在做什么：

For those who are interested, let's walk through what this config file is doing:

```
name: Build
```

这仅仅是工作流的命名。它可以是你想要的任何名称，其将会出现的Actions页面中。

This just names the workflow. It can be anything you want; it'll show up in the Actions UI.

```
on:
  push:
    branches:
      - master
```

这表示每当有人将代码推送到主分支时，将执行以下一系列步骤。

This indicates the series of steps that follow will execute whenever someone pushes code to the master branch.

```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
```

现在，我们已经开始定义任务本身。具体来说，它在Linux上运行，尽管这对我们来说并不重要。

Now we've started to define the task itself. Specifically, it runs on Linux, although that doesn't really matter to us.

从概念上讲，工作流由许多步骤组成。步骤可以是我们手动编写的一些代码，也可以是社区提供的操作的预设集合。

Conceptually, a workflow is made up of a number of steps. A step can either be some code we manually write, or it can be a preset collection of actions provided by the community.

```
- uses: actions/checkout@v1
```


这一步将签出我们代码的最新版本

This checks out the latest version of our code

```
- name: Use Go 1.13
  uses: actions/setup-go@v1
  with:
    go-version: 1.13.x
```

Tweego是用Go语言编写的。我们将要从头开始编译Tweego的代码，也就意味着我们需要一个Go编译器。这一步为我们提供了Go代码的工作环境，并让我们指定我们想要的Go版本。

Tweego is written in the programming language Go. We'll be compiling Tweego's code from scratch, which means we need a Go compiler. This gives us a working environment for Go code, and lets us specify which version of Go we want.

```
- name: build game
    run: |
      go get github.com/tmedwards/tweego
      export PATH=$PATH:$(go env GOPATH)/bin
      tweego YOUR_TWEE_FILE.twee -o dist/index.html
```

这是一个自定义脚本！首先`go get`那一行下载并编译Tweego工具本身。下一行是做一些不需要特别担心的繁琐的环境设置（修改我们的PATH，这样我们可以只调用tweego二进制文件，而无需指定一个完整的文件路径）。最后一行，我们运行tweego本身。

This is a custom script! The first `go get` line downloads and compiles the Tweego tool itself. The next line does some fiddly environment setup you don't particularly need to worry about (modifying our PATH so we can just call the `tweego` binary without specifying a full filepath). Finally, we run tweego itself.

```
- name: Deploy
  uses: peaceiris/actions-gh-pages@v2
  env:
    PERSONAL_TOKEN: ${{ secrets.GH_PAT }}
    PUBLISH_BRANCH: gh-pages
    PUBLISH_DIR: ./dist
```

此时，我们在一个`dist`的目录下有一个HTML文件。这是由另一个GitHub用户创建的将代码部署到GitHub Pages的[第三方操作](https://github.com/peaceiris)。这个配置给它我们的个人访问token（这样它就有权限去提交/部署），并指定我们想要把`dist`目录下的全部文件发布到`gh-pages branch`。

At this point, we have an HTML file in a directory called `dist`. This is a [third-party action](https://github.com/peaceiris) created by another GitHub user that deploys code straight to GitHub Pages. This config gives it our personal access token (so it has permissions to commit/deploy), and specifies that we want to take all of the files in the `dist` directory and publish them to the `gh-pages branch`.

## 这就是全部内容了！
## ...and that's it!

有了这一切，我们应该已经明白了！

And with all of that, we should be good to go!

作为一个习惯于使用更以程序员为中心的编程工具的人，我发现这个工作流程使Twine游戏创作变得更加轻松和愉快。希望它也能对你所有帮助！

As someone used to working with more programer-focused tools, I've found this workflow to make it WAY easier and more pleasant to work on games with Twine. Hopefully it's helpful to you too!

如果你对此感兴趣，那么你很可能也会对[PlayFab-Twine](https://lazerwalker.com/playfab-twine)感兴趣，我的工具可以轻松自动地将免费分析添加到你的Twine游戏中。[PlayFab-Twine的GitHub存储库](https://github.com/lazerwalker/playfab-twine)也是使用此工作流开发Twine项目的一个很棒的示例！

If this is interesting to you, you might also be interested in [PlayFab-Twine](https://lazerwalker.com/playfab-twine), my tool to easily and automatically add free analytics to your Twine games. The [GitHub repo](https://github.com/lazerwalker/playfab-twine) for that site is also a great example of a Twine project developed using this workflow!

如果你在使用中有任何问题请发给我一份笔记，我很期待听到你的声音！

Drop me a note if you're using any of this stuff, I'd love to hear from you!