---
type: post
status: new
sidebar: auto
title: 'Can You Use Blazor for Only Part of an App?'
description: ''
tags: ['Microsoft Blazor']
author: 'Aaron Powell'
date: 2019-12-06
url: 'https://www.aaron-powell.com/posts/2019-12-10-can-you-use-blazor-for-only-part-of-an-app/'
translator: ''
reviewer: ''
pub_date: 
---

# Can You Use Blazor for Only Part of an App?

<ContentMeta />

[Blazor](https://docs.microsoft.com/en-gb/aspnet/core/blazor/?view=aspnetcore-3.0&WT.mc_id=aaronpowell-blog-aapowell) is designed to be a platform where you create a complete web application and we saw that in the last [experiment with Blazor](https://www.aaron-powell.com/posts/2019-11-29-implementing-search-in-blazor-webassembly-with-lucenenet) where we created a stand-alone search site for my blog. But like any tool in our toolbox, it isn't _always_ the right one for the job.

Take my blog for example, it's pretty much a read-only site with the content [stored in GitHub](https://github.com/aaronpowell/aaronpowell.github.io) as markdown that I use [Hugo](https://gohugo.io) to convert into HTML files. Now sure, it's possible to do it as a Blazor WASM application, we could get a .NET Markdown library could be used and the pages generated on-the-fly, but that'd an inefficient way to have my website run and would provide a sub-optimal experience to readers.

But if we want to integrate the search app that we've previously built, how do we go about that?

## Understanding How Blazor Starts

To think about how we can run Blazor WebAssembly within another application we need to learn a bit about how a Blazor WebAssembly application runs.

When you create a new project there's a file called `wwwroot/index.html` that you might never have dug into, but this is an important piece of the puzzle. It looks like this:

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
And really, it's pretty simple, the important pieces that we need are these two lines:

```html
<app>Loading...</app>

<script src="_framework/blazor.webassembly.js"></script>
```
We'll get to the `<app>` element shortly, but first, let's take a look at the JavaScript file. You might notice that this file doesn't appear anywhere on disk, and that's because it's part of the build output. You can find the source of this on GitHub in the ASP.NET Core repository at [`src/Components/Web.JS/src/Boot.WebAssembly.ts`](https://github.com/aspnet/AspNetCore/blob/5bdf75f3e160bc90768526ba07c30e594b08b96d/src/Components/Web.JS/src/Boot.WebAssembly.ts) (at the time of writing anyway). This file shares some stuff in common with Blazor Server, but with the main difference of using the [`MonoPlatform`](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Platform/Mono/MonoPlatform.ts) which does a bunch of WASM interop.

This file is critical, without it your Blazor application won't ever start up since it's responsible for initializing the WASM environment that hosts Mono (by injecting [a script into the DOM](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Platform/Mono/MonoPlatform.ts#L197-L200)) and then it will use another generated file, `_framework/blazor.boot.json`, to work out what .NET DLL's will need to be loaded into the Mono/WASM environment.

So you need to have this JS file included and the `_framework` folder needs to be at the root since that's how it finds the JSON file (see [this comment](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/Boot.WebAssembly.ts#L61-L62)).

### Lazy-Loading Blazor

An interesting aside which I came across while digging in the source is that you can delay the load of Blazor by adding `autostart="false"` to the `<script>` tag, as per [this line](https://github.com/aspnet/AspNetCore/blob/e72223eaf58a3ee6660a922064d2449e47b78253/src/Components/Web.JS/src/BootCommon.ts#L5) and then call `window.Blazor.start()` in JavaScript to start the Blazor application.

I'm not going to use it for this integration, but it's good to know that you can have a user-initiated initialisation, rather than on page load.

## Placing Your Blazor App

Now that we understand what makes our Blazor app start, how do we know where in the DOM it'll appear? Well, that's what the `<app>` element in our HTML is for, but how does **Blazor** know about it?

It turns out that that is something that we control from our `Startup` class:

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

See how on line 14 we're using `AddComponent` and specifying a DOM selector of `app`? That's how it knows what element in the DOM the application will start. This is something that you can change, maybe make it a selector to a ID of a DOM element or to a `<div>`, or to anything else that you want, but it's not that important, so I just leave it as `<app>`.

_Aside: I haven't tried it yet, but given that you specify the DOM element and the entry component (via generics, this points to `App.razor` in the above sample) you could potentially have multiple independent Blazor apps running on a page. Why would you do this, I have no idea... but you can in theory!_

## Hosting Blazor

When it comes to hosting Blazor WASM [there are a few options](https://docs.microsoft.com/en-gb/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1&WT.mc_id=aaronpowell-blog-aapowell) but I want to focus on the [Azure Storage static sites](https://docs.microsoft.com/en-gb/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1&WT.mc_id=aaronpowell-blog-aapowell#azure-storage) approach, which is how my blog is hosted.

First thing we'll need to do is publish the app in Release mode using `dotnet publish --configuration Release`. From that we'll grab the contents of the `bin/Release/{TARGET FRAMEWORK}/publish/{ASSEMBLY NAME}/dist/_framework` folder, which will contain `blazor.boot.json`, `blazor.server.js`, `blazor.webassembly.js`, a folder called `_bin` and a folder called `wasm`.

We want to copy this `_framework` folder and place it in the root of our static site, maintaining all the paths so that Blazor can start up.

_Note: According to the docs you can change the `content-root` and `path-base` when hosting using `dotnet run` but I haven't found them working when it's published. Also, Hugo is very aggressive at setting absolute paths so I found it easiest to put my WASM files in the same structure that `dotnet run` used._

Since this is a search application let's create a new page called [Search](https://raw.githubusercontent.com/aaronpowell/aaronpowell.github.io/fac2ae4c8db58f6b4b010522769fc928eb0e1983/src/content/search.md) and put in our required HTML:

```html
<app></app>

<script src="/_framework/blazor.webassembly.js"></script>
```
Now generate your static site (or whatever host you're using) and navigate to the `/search` router.

If everything has gone correctly you'll have just received an error!

>Sorry, there's nothing at this address.

![D'oh](https://www.aaron-powell.com/images/doh.gif)

## Blazor Routing

If you remember back to [our last post](https://www.aaron-powell.com/posts/2019-11-29-implementing-search-in-blazor-webassembly-with-lucenenet) we learnt about the `@page` directive in Razor Components. Here you specify the route that the page will match on and up until now we've had `@page "/"` there. But, we're now on `/search` and Blazor's routing engine has looked at the URL and executed your `App.razor` component:

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
Since the `Router` didn't find a matched route to use `RouteView` against it's fallen through to `NotFound` and that is why we have this error!

Don't worry, it's an easy fix, just update the `@page` directive to match the route that you want it to match on in your published site _or_ simplify your `App.razor` to not care about routing.

Once a new publish is done and the files copied across it'll be happy.

## Conclusion

Blazor is a great way which we can build rich applications, but there is value in generating static content upfront and using Blazor to enhance an application rather than own it.

Here we've taken a bit of a look at the important files used to run a Blazor application within an HTML page and we've also looked at what it takes to drop it into some other kind of application.

