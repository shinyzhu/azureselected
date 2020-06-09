---
type: post
status: new
sidebar: auto
title: "Build ASP.NET apps with .NET Framework"
description: "Use .NET Framework to build ASP.NET apps in Azure Pipelines"
tags: ['Azure DevOps', '.NET Framework']
author: 'Abel Wang'
date: 2020-04-15
url: 'https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/aspnet/build-aspnet-4'
translator: ''
reviewer: ''
pub_date: 
---

# Build ASP.NET apps with .NET Framework

<ContentMeta />

> Note
>
> This article focuses on building .NET Framework projects with Azure Pipelines. For help with .NET Core projects, see [.NET Core](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/dotnet-core?view=azure-devops).

## Create your first pipeline

> Are you new to Azure Pipelines? If so, then we recommend you try this section before moving on to other sections.

### Get the code

Fork this repo in GitHub:

```
https://github.com/Microsoft/devops-project-samples.git
```

The sample repo includes several different projects, and the sample application for this article is located in the following path:

```
https://github.com/Microsoft/devops-project-samples/tree/master/dotnet/aspnet/webapp/Application
```

Your `azure-pipelines.yml` file needs to run from within the `dotnet/aspnet/webapp/Application`folder for the build to complete successfully.

The sample app is a Visual Studio solution that has two projects:

- An ASP.NET Web Application project that targets .NET Framework 4.5
- A Unit Test project

### Sign in to Azure Pipelines

Sign in to [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines). After you sign in, your browser goes to `https://dev.azure.com/my-organization-name` and displays your Azure DevOps dashboard.

Within your selected organization, create a *project*. If you don't have any projects in your organization, you see a **Create a project to get started** screen. Otherwise, select the **Create Project** button in the upper-right corner of the dashboard.

- After you have the sample code in your own repository, create a pipeline using the instructions in [Create your first pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops) and select the **ASP.NET** template. This automatically adds the tasks required to build the code in the sample repository.
- Save the pipeline and queue a build to see it in action.

## Build environment

You can use Azure Pipelines to build your .NET Framework projects without needing to set up any infrastructure of your own. The [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) in Azure Pipelines have several released versions of Visual Studio pre-installed to help you build your projects.

- Use `windows-2019` for Windows Server 2019 with Visual Studio 2019
- Use `vs2017-win2016` for Windows Server 2016 with Visual Studio 2017

You can also use a [self-hosted agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install) to run your builds. This is particularly helpful if you have a large repository and you want to avoid downloading the source code to a fresh machine for every build.