---
type: post
status: translating
sidebar: auto
标题: "一位现代开发人员的Twine工作流管理"
title: "A Modern Developer's Workflow For Twine"
描述: '这篇文章将介绍我使用现代Web开发工具编写和发布项目的流程（VS Code + 扩展，编译器的CLI，GitHub Actions + GitHub pages 实现CI/CD），而不是仅仅使用其默认的编辑器功能。最终目的是为那些可能没有接触过的人介绍GitHub Actions和CI的概念。'
description: 'This is an article about my flow for how I use modern web development tools to write and publish my games (VS Code + extensions, a CLI compiler, GitHub Actions + GitHub pages for CI/CD), rather than just using the default editor.  It also ends up being a sort of intro to both GH Actions and the concept of CI for people who have likely never been exposed to it.'
tags: ['PlayFab', 'javascript']
author: 'Em Lazer-Walker'
date: 2020-01-16
url: 'https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp'
translator: 'DuanShaolong'
reviewer: ''
pub_date: 
---
<ContentMeta />
Twine应用里面创建的工程叫game，很像是我们使用VS时候创建的项目或者解决方案的意思，初步翻译成项目。【此部分待删除】
<ContentMeta />
# 一位现代开发人员的Twine工作流管理
# A Modern Developer's Workflow For Twine

<ContentMeta />

我喜欢[Twine](https://twinery.org/)！开展一个基于超文本的项目叙述，它是如此的强大且易用，无论是用于为一个大型工作进行原型设计还是做你自己的事情。

I love [Twine](https://twinery.org/)! Whether you're trying to prototype a larger work or make something on your own, it's such a powerful and easy-to-use tool to make hypertext-based narrative games.

话虽如此，我交谈过的大多数人那里听到的一个常见抱怨是：工作流程管理在规模上升时非常容易崩溃。

That said, a common complaint I've heard from most people I've talked to who use it seriously is how readily its workflows fall apart at scale. 

可视化图形编辑器对于小型项目来说是一种绝妙的方法，但在较大的项目中却会变得难以快速管理。此外，使用Twine2编辑器处理文件的方式意味着使用版本控制一类的工具会很困难，要合并多个协作者做出的改变几乎是不可能的。

A visual graph editor is a fantastic approach for small projects, but gets unmanageable quickly on larger projects. Additionally, the way the Twine 2 editor handles files means using using tools like version control can be difficult, and merging changes from multiple collaborators can be nearly impossible.

但是已经找到解决方案了！我下面将用几分钟时间带你了解我的Twine开发工作流程管理。我将分三个重要的部分来谈论：

But there's a solution! I'm going to spend the next few minutes walking you through my Twine development workflow. There are three important parts of it I want to talk about:

1. **纯文本文件**。我使用[VS Code](https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker) 来编写我的项目，而不是使用可视化的Twine编辑器。
3. **现代版本控制**。使用git存储我的项目在GitHub上。
3. **自动化发布**。每次我都会推送一个项目的新版本到GitHub，它会通过[GitHub Actions](https://github.com/features/actions) 和 [GitHub Pages](https://pages.github.com/)即时执行。

1. **Plain text files**. I use [VS Code](https://code.visualstudio.com/?WT.mc_id=devto-blog-emwalker) to write my games, rather than using the visual Twine editor. 
2. **Modern version control**, storing my games in git on GitHub.
3. **Automatic publishing**. Every time I push a new version of my game to GitHub, it's instantly playable via [GitHub Actions](https://github.com/features/actions) and [GitHub Pages](https://pages.github.com/).

下面逐步介绍我使用的工具，以及如何为你设置类似的工具链！

Let's step through the tools I use, and how you can get set up with a similar toolchain!

## 使用文本编辑器进行编写
## Writing in a Text Editor

对于Twine项目为什么文本化编辑代替节点的图形化编辑是有价值的？

Why is it valuable to be able to write Twine games as text files instead of as nodes in a visual graph?

**规模友好.**
**It scales better.** When your game grows to be tens of thousands of words, navigating Twine's node-based visual editor can be a pain. Having your entire game be in a single text file, that you can manipulate and browse however you'd like, is far easier for even medium-sized projects. And that's even before considering that being able to split your script up into multiple files, which can greatly reduce the cognitive load for larger projects.

**可复用.**
**It allows for reuse.** Have some macros or other bits of scripting you'd like to reuse between passages, or across multiple game projects? Being able to copy/paste text in an IDE is a lot easier than managing it in the visual editor.

**可使用更高效的工具编写.**
**It gives you access to better writing tools.** I'm more comfortable writing in the same text editor I use for other programming and writing tasks than I am in Twine's text boxes. It also means I can use the tools they provide to make my life easier! 

VS Code has extensions to add syntax highlighting for both Harlowe and Sugarcube. More than that, access to its entire IDE ecosystem means I can pull in tools to help with creative prose writing. This means basic things like spell check and an omnipresent word counter, but it can also mean more powerful tools to do things like [warn me if I'm using subtly sexist/racist/ableist language](https://alexjs.com/) or even [spark my creativity by collaborating with an AI](https://www.robinsloan.com/notes/writing-with-the-machine/)!

**支持更强大的版本控制和协作.**
**It enables more robust versioning and collaboration.** More on this later, but writing my game in a text file means it's stored in a human-readable text file, which is what enables all of the other great tools and techniques I'll be talking about next.

This all sounds great! To get all of these benefits, we can use a special programming language called Twee!

### What is Twee?

In the olden days of Twine 1, there were two officially-supported ways to make games: using the Twine visual editor, or by writing code in a scripting language called twee that could be compiled by an official CLI tool, also called `twee`. 

(A fun historical sidenote: even though the Twine's visual editor is the more popular tool, the twee CLI predates it by 3 years!)

Twee code is conceptually the same as a Twine graph, with different blocks of text in a file referring to different passages.

```
:: Start
This is the first passage in a Twine game!

[[This is a link|Next Passage]]


:: Next Passage
The player just clicked a link to get here!
```

When Twine 2 came out, support for the twee language was officially killed, and the only officially supported path was to use the Twine 2 visual editor and its greatly-expanded support for story formats.

## How do you use Twee with Twine 2?

When Twine 2 wasn't accompanied by a "Twee 2", the community stepped up, and a number of third-party twee CLI tools emerged. The twee language needed to adapt, though, since Twine 2 handles story formats in a vastly different way from Twine 1. 

What follows is a bit of a technical explanation of the development of modern Twee tools. I think it's interesting, but if you want to skip over it, the main practical takeaway is that I use the [Tweego](https://www.motoslave.net/tweego) CLI tool to write a newer version of Twee that's called [Twee 3](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md).

### Twine 2 Story Formats: A Technical Explanation

To understand why we can't just use the old `twee` tool with Twine 2, we need to understand how Twine 2 story formats work.

Internally, Twine 2 stores your work as an XML document. When you click the "publish" button in the Twine 2 editor, that XML document is passed to the selected "story format", which is essentially an HTML template. A story format will typically embed JS within that template to parse and modify the Twine story data as appropriate to display it as a playable game. 

This is why/how different story formats present vastly different authoring syntax: as far as Twine the engine is concerned, a passage's text is just an arbitrary text blob (except insofar as it parses links to draw lines in the visual graph editor), and it's then up to the story format to decide how to parse a passage to provide narrative functionality.

If you're curious to see a "minimum viable story format", I maintain a story format called [Twison](https://github.com/lazerwalker/twison) that converts Twine story data XML into JSON, with a few bits of computation and data-munging meant to make the JSON easier to consume if you're integrating it into your own game engine.

This all means a story format is essential to actually going from a script to a playable game! It isn't enough for a hypothetical CLI tool to just take your twee code and bundle it up into the same XML format that Twine 2 uses internally, it also needs to then pass that XML to a story format and generate an HTML file from that interaction.

### So... is there or isn't there a Twee 2?

The last few years have been a tumultuous time for people who would want to write Twee. After quite some time of different people building out different competing Twine 2-compatible twee compilers, there is now a [formal language specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) for Twee 3, maintained by the Interactive Fiction Technology Foundation (IFTF). 

It's designed to be a superset of the original `twee` language (retroactively known as Twee 1), and to be fairly easy to convert between twee code and the internal format used by the Twine 2 visual editor. 

If you're interested in the history and politics of how we got here, [this oral history](https://videlais.com/2019/06/08/an-oral-history-of-twee/) is a great overview.

There are multiple functioning Twee 3 compilers, but I personally use [Tweego](https://www.motoslave.net/tweego). I'm sure others are great as well, but Tweego works well, is actively maintained, and is easy to get support for in the [official Twine Discord](https://discordapp.com/invite/n5dJvPp).

## How to use Tweego

If you're comfortable using CLI tools, Tweego is quite easy to use. After downloading the correct binary from the [website](https://www.motoslave.net/tweego/), you can call it directly to simply compile a `.twee` file into a compiled `.html` file you can play in a browser:

```
$ /path/to/tweego -o example.html example.twee
```

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

That `ifid` is a random unique identifier for a game. If you try to compile a Twee file without including that, tweego will automatically generate one for you. 

Similarly, tweego has a ton of other options and flags you can pass in, that you can see by running `tweego --help`. For the options that do things like specify a story format, I'd highly recommend just specifying that in a metadata block like I have above.

Also worth calling out is the `--watch` option. If you run `tweego -o example.html example.twee --watch`, it will start up a server that watches for file changes and then recompiles. If you have a text editor open in one window and a web browser open in another one pointed to your compiled output, this is a great way to quickly test changes!

### But I want to use the visual editor!

If you have a reason to use the Twine 2 visual editor for something, you can also use it with Tweego. You can take the .html file output by Tweego and import it directly into Twine 2. When you're done, you can convert back from a .html file produced by Twine 2 into Twee by using the `-d` flag (e.g. `tweego -o example.twee example.html -d`).

As an aside: the Twee language includes import functionality that lets you spread your game across multiple files and then join them at compilation time. That can be a really powerful technique for managing larger games, or reusing macros across projects, but that sort of workflow can make jumping back and forth with the visual editor trickier. See the [tweego docs](https://www.motoslave.net/tweego/docs/) for more info.

## Version Control

As mentioned, one of the coolest parts about writing Twine games in plain text files is how much easier they are to version. 

If you've ever tried to revisit previous versions of a Twine game you've made, or tried to collaborate with other writers, you know how difficult this can be when you're operating purely on `.html` files! Whether you're using git or just storing `.html` files on a server somewhere, having to import and export files that aren't particularly human readable is a major pain.

In the past, I've often given up on trying to fix merge conflicts with other writers, and just manually copy-pasted changes into the Twine editor by hand. That's frustrating, and avoidable by storing everything in Twee files instead!

I'm not going to walk through how I use git and GitHub, but I will say one important thing that I do is not store my compiled .html files in git at all. Rather, I'm going to set up a build process so that GitHub is responsible for automatically compiling my `.twee` files into `.html` files. This means we can keep the git repository clean and readable!

## Automatically building on GitHub

The concepts of CI and CD (continuous integration and continuous delivery, respectively) are very popular in non-game software development. The high-level idea is that it shouldn't require a lot of manual work to deploy a new version of your software. 

As soon as you push up new code to your version control server, it should be responsible for making sure things aren't broken and then compiling it, deploying it, or whatever else might need to be done to get your code into the hands of users.

This might seem foreign, or perhaps overkill, if you're just used to the flow of writing a game, getting an HTML file, and uploading that to something like [https://philome.la](https://philome.la/) or [https://itch.io](https://itch.io/).

However, [GitHub Actions](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320) are a lightweight free service we can use to easily set up a deployment pipeline! In the previous section, I mentioned I don't store the compiled HTML files in my git repos for Twine/Twee games. Instead, GitHub Actions handles everything.

Every time I push a new version of a Twine game to GitHub, a GitHub Action runs that uses Tweego to compile my game, and then publishes it to [GitHub Pages](https://dev.to/lazerwalker/a-modern-developer-s-workflow-for-twine-4imp?devcontent0320). The end result is I don't need to think about how to publish my game, or worry if I've forgotten to deploy the latest version or not: whatever version of my Twee code I can read on GitHub, that's the version players are playing!

Getting this set up with your own Twine/Twee project is easy. Let's walk through it!

### Add the story format to git

When your Twee specifies that you're using a story format like Harlowe or Sugarcube, Tweego can find the correct story format because the version of Tweego you've downloaded from the Tweego website includes a half-dozen standard ones. The way we'll be installing Tweego on GitHub Actions won't have access to those.

Within your git directory, create a folder called `storyformats`. Go into wherever you've downloaded Tweego, and move the appropriate story format(s) from its `storyformats` directory into the one you've just created. Commit and push that to git.

This is also generally a good thing for maintaining your game in the future! If you come back to this in five years, it's possible this specific version of the story format you're using might not still be available, and tracking it down might be hard; including the exact story format bundle within your git repo will help ensure (although not guarantee) your ability to edit and compile your game.

### Generating a GitHub Personal Access token (for GitHub Pages)

I typically use [GitHub Pages](https://pages.github.com/) to host my games. It's a free hosting service for static sites such as Twine games that's integrated right into GitHub. It's totally free, and can scale to support any amount of traffic. I think it's absolutely the best and easiest way to host small websites like Twine games that don't require any sort of backend server services.

If you don't want to use GH Pages to host your game, you can safely skip this section.

In order for GitHub Actions to deploy your game to GitHub Pages, it needs permissions to commit code to your git repo (under the hood: GitHub Pages will be configured to host any files that exist in a special `gh-pages` git branch, and GitHub Actions will be responsible for making a new commit containing your HTML file onto that branch).

Go to https://github.com/settings/tokens, and click the button to generate a new token. Name it whatever you want, and give it full "Repo" permissions.

![Personal Access Token](https://res.cloudinary.com/practicaldev/image/fetch/s--KYSoUNqs--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/4g4t443g0nalsr7zlgsn.png)

On the next screen, you'll see the token itself (it'll be a long string of random letters and numbers). Save that!

Go to the repository settings for the GitHub repo that you'll be running GitHub Actions on. Under the "Secrets" tab, add a new secret named "GH_PAT" whose value is the token you just generated.

![Repo Secrets](https://res.cloudinary.com/practicaldev/image/fetch/s--FRBExJMl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/zhy5awog2vcun0qbgxt4.png)

### Getting Started with GitHub Actions

To set up a GitHub Action, all you need to do is add a new file into your git repo.

GitHub Actions are based on "workflows", which are configuration files. If you add a file called `.github/workflows/build.yml` (or any `.yml` file inside that directory), it will read that config and try to use it.

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

Be sure to swap out `YOUR_TWEE_FILE.twee` for the actual filename, and change any other tweego settings you might need to. If you're not sure what you're doing, you probably want to leave the output file as `dist/index.html`.

If you make a new commit and push it to your game's master branch on GitHub, after a few minutes it should be live on the web! By default, it should be available at `https://[your-github-username].github.com/[repo-name]`, although it's also possible to configure GitHub Pages to work with a [custom domain name](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site). 

The GitHub Action can take a few minutes to compile and deploy, so be patient! You can also click through to the "Actions" tab in your repository and see the build as it progresses.

For those who are interested, let's walk through what this config file is doing:

```
name: Build
```

This just names the workflow. It can be anything you want; it'll show up in the Actions UI.

```
on:
  push:
    branches:
      - master
```

This indicates the series of steps that follow will execute whenever someone pushes code to the master branch.

```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
```

Now we've started to define the task itself. Specifically, it runs on Linux, although that doesn't really matter to us.

Conceptually, a workflow is made up of a number of steps. A step can either be some code we manually write, or it can be a preset collection of actions provided by the community.

```
- uses: actions/checkout@v1
```

This checks out the latest version of our code

```
- name: Use Go 1.13
  uses: actions/setup-go@v1
  with:
    go-version: 1.13.x
```

Tweego is written in the programming language Go. We'll be compiling Tweego's code from scratch, which means we need a Go compiler. This gives us a working environment for Go code, and lets us specify which version of Go we want.

```
- name: build game
    run: |
      go get github.com/tmedwards/tweego
      export PATH=$PATH:$(go env GOPATH)/bin
      tweego YOUR_TWEE_FILE.twee -o dist/index.html
```

This is a custom script! The first `go get` line downloads and compiles the Tweego tool itself. The next line does some fiddly environment setup you don't particularly need to worry about (modifying our PATH so we can just call the `tweego` binary without specifying a full filepath). Finally, we run tweego itself.

```
- name: Deploy
  uses: peaceiris/actions-gh-pages@v2
  env:
    PERSONAL_TOKEN: ${{ secrets.GH_PAT }}
    PUBLISH_BRANCH: gh-pages
    PUBLISH_DIR: ./dist
```

At this point, we have an HTML file in a directory called `dist`. This is a [third-party action](https://github.com/peaceiris) created by another GitHub user that deploys code straight to GitHub Pages. This config gives it our personal access token (so it has permissions to commit/deploy), and specifies that we want to take all of the files in the `dist` directory and publish them to the `gh-pages branch`.

## ...and that's it!

And with all of that, we should be good to go!

As someone used to working with more programer-focused tools, I've found this workflow to make it WAY easier and more pleasant to work on games with Twine. Hopefully it's helpful to you too!

If this is interesting to you, you might also be interested in [PlayFab-Twine](https://lazerwalker.com/playfab-twine), my tool to easily and automatically add free analytics to your Twine games. The [GitHub repo](https://github.com/lazerwalker/playfab-twine) for that site is also a great example of a Twine project developed using this workflow!

Drop me a note if you're using any of this stuff, I'd love to hear from you!