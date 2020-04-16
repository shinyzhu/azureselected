---
type: post
status: translating
sidebar: auto
title: "Twine 的现代开发流程"
description: '这是一篇关于如何使用现代网站开发工具编写和发布游戏（VS Code + 扩展、命令行编译器、GitHub Actions + GitHub Pages 实现 CI/CD）的文章，而不仅仅是使用 Twine 的默认编辑器。也向没接触过的读者介绍GitHub Action 和 CI 概念。'
tags: ['PlayFab', 'javascript', 'GitHub Actions']
author: 'Em Lazer-Walker'
date: 2020-01-16
url: 'https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp'
translator: 'DuanShaolong'
reviewer: 'shinyzhu'
pub_date: 2020-03-24
---

# Twine 的现代开发流程
<ContentMeta />

我喜欢 [Twine](https://twinery.org/)！无论你是在尝试一个更大的原型作品，还是自己制作一些东西，它都是一个强大而易于使用的工具，可以制作基于超文本的叙事游戏。

话虽如此，我聊过的大多数人有一个常见的抱怨是：工作流在规模变大时非常容易崩溃。

对于小项目来说，可视化图形编辑器是一种非常好的方法，但是对于较大的项目来说，它很快就变得难以胜任了。此外，Twine 2 编辑器处理文件的方式意味着使用诸如版本控制之类的工具可能很困难，合并来自多个协作者的更改几乎是不可能的。

但是已经找到解决方案了！我下面将用几分钟时间带你了解我的 Twine 开发流程。我会分三个重要的部分：

1. **纯文本文件**。我使用[VS Code](https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker) 来编写我的游戏，而不是使用可视化的Twine编辑器。
3. **现代版本控制**。使用GitHub托管的git库来存储我的游戏。
3. **自动化发布**。每次当我推送游戏的一个新版本到GitHub，会即时通过 [GitHub Actions](https://github.com/features/actions) 和 [GitHub Pages](https://pages.github.com/) 完成发布，游戏立刻可玩。

下面逐步介绍我使用的工具，以及让你如何使用类似的工具链！

## 使用文本编辑器进行编写
对于Twine游戏，为什么文本化编辑要比图形化的节点编辑更有价值呢？

**它可以更好地扩展。**当您的游戏增加到数万字数时，浏览Twine的基于节点的可视化编辑器可能会很痛苦。如果将整个游戏放在一个单独的文本文件中，您可以随意操作和浏览，这对于中等规模的项目来说要容易得多。甚至在考虑将脚本分割成多个文件之前，这也已经足够了，可以大大减少大型项目的认知负载。

**可复用。**希望跨段落之间或跨多个游戏项目重用一些宏或其他脚本位吗？能在IDE中复制/粘贴文本比在可视化编辑器中管理文本要容易得多。

**可以用更高效的工具来编写。**相对于 Twine 的文本框，使用平常编程和写作的文本编辑器会更顺手，这意味着我可以使用这些工具来让生活更轻松。

VS Code扩展可以为Harlowe和Sugarcube添加语法高亮功能。更重要的是，整个 IDE 生态系统让我可以使用工具来帮助创意写作。这不仅意味着基本的能力如拼写检查和无所不在的单词计数器，而且还包括更强大的工具比如[当使用微妙的性别歧视/种族主义/攻击性的语言时警告我](https://alexjs.com/)，甚至是[与AI协作激发我的创造力](https://www.robinsloan.com/notes/writing-with-the-machine/)！

**支持更强大的版本控制和协作。**稍后将详细介绍。在文本文件中编写游戏意味着它被存储在一个人类可读的文件中，这样能够使用所有其他的出色工具和技术。我们接着探讨。

这听起来很棒！为了得到这些优势，我们需要使用一种叫做Twee的特殊编程语言！

### 什么是 Twee？
在 Twine 1 的旧时代，官方提供了两种游戏制作方法：使用 Twine 可视化编辑器，或者使用一种叫做 `twee` 的脚本语言编写代码，这个语言可以用官方的 CLI 工具（也叫做`twee`）进行编译。

::: tip 注

一个有趣的历史：尽管 Twine 可视化编辑器更受欢迎，但 twee CLI 却比他它早诞生3年！

:::

Twee 代码在概念上与Twine图形是一致的，文件中不同的文本块指向不同的段落。

```
:: Start
This is the first passage in a Twine game!

[[This is a link|Next Passage]]


:: Next Passage
The player just clicked a link to get here!
```
当 Twine 2 发布后，官方停止了 twee 语言的支持，唯一受官方支持的方式是使用 Twine 2 可视化编辑器，它大幅扩展了对故事格式的支持。

## 如何在 Twine 2 中使用 Twee？
当 Twine 2 还没有发布 `Twee 2` 时，社区就站了出来，出现了一些第三方Twee CLI工具。不过，因为Twine 2处理故事格式的方式与Twine 1的截然不同，twee语言需要被修改。

接下来是现代Twee工具开发的一些技术解释。我认为它很有趣，如果你想跳过它，那我就长话短说：我使用[Tweego](https://www.motoslave.net/tweego) CLI工具写了一个新版本的Twee，称为[Twee 3](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)。

### Twine 2 故事格式：技术说明
要理解为什么不能使用Twine 2里的`twee`工具，我们需要先理解Twee 2故事格式的工作机制。

Twine 2后台会将你的内容存储为XML文档。当你点击Twine 2编辑器中的"发布"按钮时，该XML文档将被传递给一个选定的"故事格式" - 本质上是一个HTML模板。故事格式通常会将JS嵌入到HTML模板中，以根据需要解析和修改Twine的故事数据，并将其显示为可玩的游戏。

这就是为什么不同的故事格式会呈现出截然不同的创作语法，就Twine引擎而言，段落文本只是一个任意的文本块（除了要解析在可视化编辑器中绘制线条的链接），主要由故事格式来决定如何解析段落以提供叙述功能。

如果你很期待看到一个"最小化且可用的故事格式"，那么我维护了一个叫做[Twison](https://github.com/lazerwalker/twison)的故事格式。如果你把Twison集成到自己的游戏引擎里，它会通过一些计算和数据蒙版将Twine的XML故事数据转换为更容易使用的JSON数据。

这些都意味着故事格式对于从实际脚本到实现一个可玩游戏的重要性。对于设想的CLI工具来说，仅仅是获取twee代码然后将其捆绑到同样是Twine 2内部使用的XML格式是不够的，它还需要将该XML传递到故事格式，同时生成对应的HTML文件。

### 因此……是否应该有Twee 2？
过去几年对于那些想写Twee的人来说是一个动荡的时期。经过很长一段时间的发展，人们竞相创造出各种兼容Twine 2的twee编译器，现在已经有一个由[互动小说技术基金会（IFTF）](https://iftechfoundation.org)维护的一个Twee 3的[正式语言规范](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)。

它被设计成原始Twee语言（可追溯为Twee 1）的一个超集，并且可以很容易的在twee代码和Twine 2可视化编辑器使用的内部格式之间进行转换。

如果你对我们这段发展历史感兴趣，那么这段[口述历史](https://videlais.com/2019/06/08/an-oral-history-of-twee/)将能带给你一个很全面的概述。

目前已经有多种功能的Twee 3编译器，我个人使用的是[Tweego](https://www.motoslave.net/tweego)。我确信其它编译器也很好，但是Tweego表现更好并且维护团队很活跃，也能很容易地在[官方Twine论坛](https://discordapp.com/invite/n5dJvPp)获得支持。

## 如何使用Tweego
如果你习惯使用CLI工具，那么Tweego就很容易上手。从[官网](https://www.motoslave.net/tweego/)下载正确的二进制文件后，你就可以直接使用它将一个`.twee`文件编译成可在浏览器中打开的`.html`文件：

```
$ /path/to/tweego -o example.html example.twee
```
下面是从早期版本更新到Twee 3的示例代码，并包含一些元数据：

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

类似地，Tweego还有大量其它可供输入的选项和标志，你可以通过运行`tweego --help`看到。对于那些完成类似于指定故事格式的选项，我强烈建议你参照我上面操作那样在元数据块中去指定。

值得单独拿出来说的选项还有`--watch`。如果你运行`tweego -o example.html example.twee --watch`，它将启动一个服务用来监视文件更改，然后自动重新编译。你可以把一个文本编辑器在当前窗口打开，同时把一个网页浏览器在另一个窗口打开并指向你的编译输出文件，这样就构成了一个快速测试修改的好方法。

### 但是我想使用可视化编辑器！
即使你有一些任务不得不使用Twine 2可视化编辑器，你也可以通过Tweego来使用。你可以把Tweego生成的`.html`文件直接导入到Twine 2，完成编辑后，你可以使用Twine 2的`-d`标识把`.html`文件转换回Twee代码（例如：`tweego -o example.twee example.html -d`）。

顺便说一句：Twee语言包含的导入功能允许你将游戏分散到多个文件中，在编译时载入即可。这可能成为一种管理大型游戏或者跨项目重用宏的强大技术，此类工作会使可视化编辑器的来回跳跃更加棘手。详细信息请参阅[tweego文档](https://www.motoslave.net/tweego/docs/)。

## 版本控制
如前所述，以纯文本编写Twine游戏最酷的一个地方就是非常容易的版本管理。

如果你曾经尝试重温你制作的早期版本的Twine游戏，或尝试与其他作者协作，那么你一定知道当你纯粹在`.html`文件上操作时是多么的困难！无论你用git管理还是仅仅将`.html`文件存储在一台服务器上，都不得不对那些不是特别适合人类阅读的文件进行导入和导出操作，那是一件非常痛苦的事情。

过去，我经常放弃尝试修复与其他作者的合并冲突，只是手动将修改的内容复制粘贴到Twine编辑器中。但是将全部内容都存储在Twee文件中就可以避免这个令人沮丧的事情。

我不会介绍我是如何使用git和GitHub的，但我会说我做的一件重要的事情：不再存储编译后的.html文件到git上。相反，我将设置一个构建过程来负责自动编译我的`.twee`文件到`.html`文件。这意味着我们可以保持git存储库的干净性和可读性。

## 在GitHub上自动化构建
CI和CD（分别为：持续集成和持续交付）的概念在非游戏软件开发领域已经非常流行。高阶的想法是部署软件的新版本根本不需要大量手动工作。

只要将新代码推送到版本控制服务器，它就应该负责确保代码完整性，然后编译、部署，或者任何其他操作，一切完成后才会将代码交付到用户手中。

如果你已经习惯了写游戏、获取HTML文件，然后上传到诸如[https://philome.la](https://philome.la/)或[https://itch.io](https://itch.io/)的流程，这可能显得有些另类，或者可能有些过火。

然而，[GitHub Actions](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320)是一个可以免费使用的轻量级服务，我们可以很容易用于设置一个部署管道！在上一节中，我提到我不会将编译好的HTML文件存储在 Twine/Twee游戏的git存储库中，取而代之的是让GitHub Actions处理所有内容。

每次我将Twine游戏的新版本推送到GitHub时，GitHub Action都会运行，它使用Tweego来编译我的游戏，然后将其发布到[GitHub Pages](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320)。最终结果是，我不再需要考虑如何发布我的游戏，或者担心自己会不会忘记部署最新版本：我可以在GitHub上看到的Twee代码版本，就是玩家正在玩的版本！

为你自己的Twine/Twee项目进行这样的设置也很容易，下面我们开始吧！

### 添加故事格式到 git
当你在Twee里使用像Harlowe或Sugarcube这样的故事格式时，Tweego可以自动找到正确的故事格式，因为从Tweego官网下载的 Tweego版本包含六个标准格式。但我们将要在GitHub Actions中安装的Tweego不能访问那些故事格式。

在你的git目录下创建一个名为`storyformats`的文件夹。转到你下载好的Tweego文件夹，并将相应的故事格式从`storyformats`目录复制到您刚刚创建的目录中，提交并推送到git。

一般来说，这对于未来维护游戏也是一件好事。如果你在五年后回顾这个问题，可能当时指定的故事格式版本已经不能用了，并且追踪它也很困难，这时包含在你的git存储库中的确切故事格式包将有助于确保（尽管不能保证）你能编辑和编译游戏。

### 生成GitHub个人访问令牌（用于GitHub Pages）
我通常使用[GitHub Pages](https://pages.github.com/)来托管我的游戏。这是一个免费的静态站点托管服务，像Twine游戏就可以很好的集成到GitHub上。不仅完全免费，还能自动扩展以支持任意量级的流量。我想这绝对是托管像Twine游戏这类不需要任何后端服务的最好且最容易的方法。

如果你不想使用GitHub Pages来托管你的游戏，你可以跳过这部分。

为了使GitHub Actions将游戏部署到GitHub Pages，它需要权限来将代码提交到你的git存储库（幕后逻辑：GitHub Pages将在一个特殊的`gh-pages`分支上配置为托管任何文件，GitHub Actions将负责提交包含HTML文件到该分支上）。

打开https://github.com/settings/tokens，并点击按钮生成一个新的令牌。任意取一个你想要的名字，并授予完整的“Repo”权限。

![Personal Access Token](https://res.cloudinary.com/practicaldev/image/fetch/s--KYSoUNqs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/4g4t443g0nalsr7zlgsn.png)

在下一个页面，你将会看到生成的令牌（将是一个随机字符和数字组成的长字符串），请保存好它。

打开要运行GitHub Actions的GitHub存储库的设置页面，在"Secrets"选项卡下，添加一个名为"GH_PAT"的新密钥，输入上一步生成的令牌。

![Repo Secrets](https://res.cloudinary.com/practicaldev/image/fetch/s--FRBExJMl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/zhy5awog2vcun0qbgxt4.png)

### 开始使用GitHub Actions
要设置GitHub Actions，你只需要在你的git存储库中添加一个新文件。

GitHub Actions基于"工作流"，也就是配置文件。如果你添加一个名为`.github/workflows/build.yml`（或者任何`.yml`文件在那个目录下），它就会读取该配置并尝试去使用它。

配置文件如下所示：

```yaml
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

如果你进行了新的提交并推送到你GitHub的主分支，几分钟后它将会直接在网页上可用！默认情况下，它应该会在`https://[your-github-username].github.com/[repo-name]`这个地址，尽管你也可以配置GitHub Pages使用[自定义域名](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)。

GitHub Actions可能需要几分钟来编译和发布，所以请耐心等待一下。你也可以点击你存储库中的“Actions”选项卡，将会看到构建正在进行中。

感兴趣的话，我们继续来看看这个配置文件正在做什么：

```yaml
name: Build
```

这仅仅是工作流的命名。它可以是你想要的任何名称，将会出现的Actions页面中。

```yaml
on:
  push:
    branches:
      - master
```

这表示每当有人将代码推送到主分支时，将执行以下一系列步骤。

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
```

现在，我们已经开始定义任务本身。具体来说，它在Linux上运行，尽管这对我们来说并不重要。

从概念上讲，工作流由许多步骤组成。步骤可以是我们手动编写的一些代码，也可以是社区提供的操作的预设集合。

```yaml
- uses: actions/checkout@v1
```


这一步将签出我们代码的最新版本。

```yaml
- name: Use Go 1.13
  uses: actions/setup-go@v1
  with:
    go-version: 1.13.x
```

Tweego是用Go语言编写的。我们将要从头开始编译Tweego的代码，也就意味着我们需要一个Go编译器。这一步为我们提供了Go代码的工作环境，并让我们指定我们想要的Go版本。

```yaml
- name: build game
    run: |
      go get github.com/tmedwards/tweego
      export PATH=$PATH:$(go env GOPATH)/bin
      tweego YOUR_TWEE_FILE.twee -o dist/index.html
```

这是一个自定义脚本。首先`go get`那一行下载并编译Tweego工具本身。下一行是做一些不需要特别担心的繁琐的环境设置（修改我们的PATH，这样我们可以只调用tweego二进制文件，而无需指定一个完整的文件路径）。最后一行，我们运行tweego本身。

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v2
  env:
    PERSONAL_TOKEN: ${{ secrets.GH_PAT }}
    PUBLISH_BRANCH: gh-pages
    PUBLISH_DIR: ./dist
```

此时，我们在一个`dist`的目录下有一个HTML文件。这是由另一个GitHub用户创建的将代码部署到GitHub Pages的[第三方 Action](https://github.com/peaceiris)。这里的配置提供个人访问令牌（这样它就有权限去提交/部署），并指定我们想要把`dist`目录下的全部文件发布到`gh-pages`分支。

## 这就是全部内容了！
有了这一切，我们应该已经明白了！

作为一个习惯于使用更以程序员为中心的编程工具的人，我发现这个工作流程使Twine游戏创作变得更加轻松和愉快。希望它也能对你所有帮助！

如果你对此感兴趣，那么你很可能也会对我的另一个工具[PlayFab-Twine](https://lazerwalker.com/playfab-twine)感兴趣，它可以轻松自动地将免费分析功能添加到你的Twine游戏中。[PlayFab-Twine的GitHub存储库](https://github.com/lazerwalker/playfab-twine)也是使用此工作流开发Twine项目的一个很棒的示例！

如果你在使用中有任何问题，请给我留言，我很期待听到你的声音！
