---
type: post
status: new
sidebar: auto
title: '是否可以在应用的一部分使用 Blazor?'
description: '这篇博客文章将描述如何在大型应用中托管Blazor WASM应用程序'
tags: ['Microsoft Blazor']
author: 'Aaron Powell'
date: 2019-12-06
url: 'https://www.aaron-powell.com/posts/2019-12-10-can-you-use-blazor-for-only-part-of-an-app/'
translator: '龙少'
reviewer: 'shinyzhu'
pub_date: 2020-02-28
---

# 是否可以在应用的一部分使用 Blazor?
<ContentMeta />

[Blazor](https://docs.microsoft.com/en-gb/aspnet/core/blazor/?view=aspnetcore-3.0&WT.mc_id=aaronpowell-blog-aapowell) 被设计成一个可以创建完整网页应用的平台，你可以看到最近我们为我的博客创建的独立搜索网站就是一个 [Blazor实践](https://www.aaron-powell.com/posts/2019-11-29-implementing-search-in-blazor-webassembly-with-lucenenet)。 但是就像你工具箱里的任意一个工具一样，它可能不总是适用于你的工作。

以我的博客举例，它更多的是一个只读形式的内容存储在[Github](https://github.com/aaronpowell/aaronpowell.github.io)上的网站，它将markdown格式文件转换成HTML文件。 并不确定，我们可能把它做成一个Blazor WASM应用，使用一个.NET的markdown库去动态生成页面，但这可能对于运行我的网站并带给读者一个良好体验来说是一个不高效的方法。

但是如果我们想要集成一个我们已有的搜索应用，我们又该如何决策呢？

## 了解Blazor是如何开始的
想知道我们要如何在另一个应用里运行Blazor WebAssembly。我们需要先学习一下Blazor WebAssessbly应用是如何运行的。

当你创建一个新的项目，里面包含一个你或许从未打开过的文件 `wwwroot/index.html` , 但这是拼图很重要的一片。这个文件看起来就像：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Project Name</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
</head>
<body>
    <app>Loading...</app>

    <script src="_framework/blazor.webassembly.js"></script>
</body>
</html>
```
实际上，它非常简单，我们需要的重要代码是这两行：

```html
<app>Loading...</app>

<script src="_framework/blazor.webassembly.js"></script>
```
在快速找到`<app>`元素之前，我们首先看一下JavaScript文件。你或许会注意到这个文件并没有出现在硬盘里，这是因为它是属于构建输出的部分。你可以在ASP.NET Core的Github仓库[`src/Components/Web.JS/src/Boot.WebAssembly.ts`](https://github.com/aspnet/AspNetCore/blob/5bdf75f3e160bc90768526ba07c30e594b08b96d/src/Components/Web.JS/src/Boot.WebAssembly.ts)里找到它的源码(at the time of writing anyway)。此文件与Blazor服务器共享一部分内容，但是与使用[`MonoPlatform`](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Platform/Mono/MonoPlatform.ts)的最大区别是它进行一堆WASM交互操作。

这个文件至关重要，没有它你的Blazor应用将无法启动，它先负责(通过注入[一个脚本文件到DOM](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Platform/Mono/MonoPlatform.ts#L197-L200))初始化托管在Mono的WASM环境。然后它使用另一个生成的文件 `_framework/blazor.boot.json`去找出需要将哪些.NET dll文件加载到Mono/WASM环境中。
因此你需要把这个js文件包含在内，同时把`_framework`文件夹放在根路径下以确保它可以找到JSON文件(见 [此评论](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Boot.WebAssembly.ts#L61-L62))。

### 延迟加载Blazor
我在钻研源代码时发现的一个有趣的题外话是，你可以通过添加`autostart="false"`在`<script>`标签里来延迟Blazor的加载。就像[这里](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/BootCommon.ts#L5)提到的一样，然后使用JavaScript调用`window.Blazor.start()`以启动Blazor应用。

我不打算使用它来进行这种集成，但很容易理解你可以用一个用户启动的初始化过程，而不是在页面中加载。

## 放置你的Blazor应用
既然我们已经明白了是什么使Blazor应用开始运行，那么我们如何了解它出现在DOM的何处呢？那就是我们HTML文件里`<app>`元素的用处，但是**Blazor**又怎么知道它呢？

事实证明，那是我们通过`Startup` 类控制的一些事情：

```c#
using Microsoft.AspNetCore.Components.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace DemoProject
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IComponentsApplicationBuilder app)
        {
            app.AddComponent<App>("app");
        }
    }
}
```

可以看到在14行的位置我们使用了`AddComponent`并指定一个DOM selector `app`。这就是它如何知道应用启动时DOM里有哪些元素。这些操作你是可以修改的，或许修改selector为一个DOM元素的ID或者一个`<div>`，又或者是任意你想要的内容，但那都不重要，因此我将它叫做`<app>`。

_题外话：我并没有进行尝试，但考虑到你指定了DOM元素和入口组件(通过泛型，上面例子中指向`App.razor`)你可以在页面上运行多个Blazor应用程序。至于为什么这个么做我不知道，但理论上你是可以这么做的。_

## 托管 Blazor
当托管一个Blazor WASM[有一些可选项](https://docs.microsoft.com/en-gb/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1&WT.mc_id=aaronpowell-blog-aapowell)的时候，我想专注于[Azure Storage 静态站点](https://docs.microsoft.com/en-gb/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1&WT.mc_id=aaronpowell-blog-aapowell#azure-storage)的方法，这也是我的博客托管的方法。

首先我们要做的事情是使用命令`dotnet publish --configuration Release`发布应用。然后我们可以得到`bin/Release/{TARGET FRAMEWORK}/publish/{ASSEMBLY NAME}/dist/_framework`文件夹的内容，包括：`blazor.boot.json`, `blazor.server.js`, `blazor.webassembly.js`，一个叫做`_bin`的文件夹和一个叫做`wasm`的文件夹。

我们将拷贝这个`_framework`文件夹并防止在静态站点的根目录下，维护所有的路径，以确保Blazor可以启动。

_注意：根据文档使用`dotnet run`托管站点时你是可以修改`content-root`和`path-base`，但我没有发现他们发布后也可以正常工作。此外，Hugo非常积极使用绝对路径，因此我发现最简单的办法是把我的WASM文件放在和`dotnet run`使用的相同的结构中。_

由于这是一个搜索应用，我们来创建一个新的[搜索](https://raw.githubusercontent.com/aaronpowell/aaronpowell.github.io/fac2ae4c8db58f6b4b010522769fc928eb0e1983/src/content/search.md)页，并把它放在我们需要的HTML文件里：

```html
<app></app>

<script src="/_framework/blazor.webassembly.js"></script>
```
现在生成你的静态站点(或者任意你选择的托管方式)并导航至`/search`路径下。

如果一切都没有问题你将会收到一个错误页面！

>抱歉，这个地址没有任何内容。

![D'oh](https://www.aaron-powell.com/images/doh.gif)

## Blazor 路由
如果你记得[我们上一篇博客](https://www.aaron-powell.com/posts/2019-11-29-implementing-search-in-blazor-webassembly-with-lucenenet)我们了解了Razor组件中的`@page`指令。此处你指定的路由对应的页面将匹配已有的`@page "/"`。但是我们现在的路由是`/search`，并且Blazor的路由引擎找到了URL并执行你的`App.razor`组件：

```html
<Router AppAssembly="@typeof(Program).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
    </Found>
    <NotFound>
        <LayoutView Layout="@typeof(MainLayout)">
            <p>Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```
当`Router`无法找到一个匹配的路由去使用`RouteView`，它就会被丢往`NotFound`页面，这就是我们收到这个错误页面的原因。

别担心，这个很容易修复，只需要更新`@page`指令以匹配您希望它在已发布网站中匹配的路由 ，或者简化 App.razor 以不关心路由。

一旦一个新的版本发布完成，并且文件拷贝完成，这个页面就会正常呈现。

## 结论
Blazor是一个构建应用非常棒的方法，但是相比创建应用程序，在提前生成静态内容并使用Blazor增强现有应用程序更有价值。 

我们研究了一下在HTML页面中运行Blazor应用所需要的重要文件，同时研究了将其放入其它类型应用需要什么。

