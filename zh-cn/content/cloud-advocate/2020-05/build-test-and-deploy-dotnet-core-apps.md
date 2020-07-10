---
type: post
status: translating
sidebar: auto
title: "Build, test, and deploy .NET Core apps"
title: "构建, 测试, 部署 .NET Core 应用"
description: "Use .NET Core to build apps with Azure Pipelines, Azure DevOps, & Team Foundation Server"
description: "使用Azure Pipelines，Azure DevOps 和TFS构建.NET Core应用"
tags: ['Azure DevOps', '.NET Core']
author: 'Abel Wang'
date: 2020-05-06
url: 'https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/dotnet-core'
translator: 'DuanShaolong'
reviewer: ''
pub_date: 
---

# Build, test, and deploy .NET Core apps
# 构建，测试，部署.NET Core应用程序

<ContentMeta />

Use a pipeline to automatically build and test your .NET Core projects. Learn how to:
使用Pipeline自动化构建和测试你的.NET Core项目，学习如何：

- Set up your build environment with [Microsoft-hosted](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) or [self-hosted](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops) agents.
- 使用微软托管或者自己托管的agents设置你的构建环境。
- Restore dependencies, build your project, and test with the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) or a [script](https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/cross-platform-scripting?view=azure-devops).
- 使用[.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) 或者 [script](https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/cross-platform-scripting?view=azure-devops)还原依赖包，构建并测试项目。
- Use the [publish code coverage task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops) to publish code coverage results.
- 使用[publish code coverage task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops)发布代码覆盖率结果。
- Package and deliver your code with the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) and the [publish build artifacts task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azure-devops).
- 使用[.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) 和 [publish build artifacts task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azure-devops)打包并交付你的代码。
- Publish to a [NuGet feed](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops).
- 发布一个[NuGet feed](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops)。
- Deploy your [web app to Azure](https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops).
- 部署你的[web app 到 Azure](https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops)。

> Note
>
> For help with .NET Framework projects, see [Build ASP.NET apps with .NET Framework](https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/aspnet/build-aspnet-4?view=azure-devops).

> 备注
>
> 关于的.NET Framework项目的帮助信息，可以参阅[Build ASP.NET apps with .NET Framework](https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/aspnet/build-aspnet-4?view=azure-devops)。

## Create your first pipeline
## 创建你的第一个pipeline

> Are you new to Azure Pipelines? If so, then we recommend you try this section before moving on to other sections.
> 如果你的初次接触Azure Pipelines，我们建议你首先阅读这个部分。

### Get the code
### 获取代码

Fork this repo in GitHub:
从GitHub fork这个仓库：

```
https://github.com/MicrosoftDocs/pipelines-dotnet-core
```

### Sign in to Azure Pipelines
### 登录到Azure Pipelines

Sign in to [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines). After you sign in, your browser goes to `https://dev.azure.com/my-organization-name` and displays your Azure DevOps dashboard.
首先登录到[Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines)。登录成功后，你的浏览器会跳转到`https://dev.azure.com/my-organization-name`并展示你的Azure DevOps dashboard。

Within your selected organization, create a *project*. If you don't have any projects in your organization, you see a **Create a project to get started** screen. Otherwise, select the **Create Project** button in the upper-right corner of the dashboard.
在你选中的组织内，创建一个*项目*。如果你的组织内还没有项目，你将看到一个**Create a project to get started**的画面。否则，就在dashboard的右上角选择**Create Project**按钮。

### Create the pipeline
### 创建pipeline

1. Sign in to your Azure DevOps organization and navigate to your project.
1. 登录到你的Azure DevOps 组织并导航到你的项目。

2. Go to **Pipelines**, and then select **New Pipeline**.
2. 选择 **Pipelines**，然后选择**New Pipeline**。

3. Walk through the steps of the wizard by first selecting **GitHub** as the location of your source code.

   ![Select GitHub](https://docs.microsoft.com/en-us/azure/devops/pipelines/media/get-started-yaml/new-pipeline.png?view=azure-devops)

   > Note
   >
   > If this is not what you see, then [make sure the Multi-stage pipelines experience is turned on](https://docs.microsoft.com/en-us/azure/devops/project/navigation/preview-features?view=azure-devops).
3. 首选将 **GitHub** 作为源代码的位置，完成向导的步骤。
   ![Select GitHub](https://docs.microsoft.com/en-us/azure/devops/pipelines/media/get-started-yaml/new-pipeline.png?view=azure-devops)
 
   >备注
   >
   >如果你看到的不是这样的，请先[确认Multi-stage pipelines experience是打开的](https://docs.microsoft.com/en-us/azure/devops/project/navigation/preview-features?view=azure-devops)。

4. You might be redirected to GitHub to sign in. If so, enter your GitHub credentials.
4. 你可能会被跳转到GitHub去登录，只需输入你的GitHub凭证信息即可。

5. When the list of repositories appears, select your repository.
5. 当仓库出现的时候，选择你的仓库。

6. You might be redirected to GitHub to install the Azure Pipelines app. If so, select **Approve and install**.
6. 你可能会被跳转到GitHub去安装Azure Pipeline应用。只需选择**Approve and install**即可。

> When the **Configure** tab appears, select **ASP.NET Core**.
> 当**Configure**选项卡出现的时候，选择**ASP.NET Core**。

1. When your new pipeline appears, take a look at the YAML to see what it does. When you're ready, select **Save and run**.
1. 当你的pipeline出现的时候，打开看看YAML文件做了什么事情。准备好之后，选择**Save and run**即可。

   ![Save and run button in a new YAML pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/media/save-and-run-button-new-yaml-pipeline.png?view=azure-devops)

2. You're prompted to commit a new *azure-pipelines.yml* file to your repository. After you're happy with the message, select **Save and run** again.

   If you want to watch your pipeline in action, select the build job.

   > You just created and ran a pipeline that we automatically created for you, because your code appeared to be a good match for the [ASP.NET Core](https://github.com/Microsoft/azure-pipelines-yaml/blob/master/templates/asp.net-core.yml) template.

   You now have a working YAML pipeline (`azure-pipelines.yml`) in your repository that's ready for you to customize!
2. 此时系统会提示你向仓库提交一个新的*azure-pipelines.yml*文件。当你对commit信息满意后，再次选择**Save and run**。
  
   如果要监视pipeline的运行状态，选择构建job。

   > 你只是创建并运行了一个我们自动为你创建的pipeline，因为你的代码正好和[ASP.NET Core](https://github.com/Microsoft/azure-pipelines-yaml/blob/master/templates/asp.net-core.yml) 模板非常匹配。

3. When you're ready to make changes to your pipeline, select it in the **Pipelines** page, and then **Edit**the `azure-pipelines.yml` file.
3. 当你准备好修改你的pipeline，在**Pipelines**页面选择对应的pipeline，然后**Edit**`azure-pipelines.yml`文件。

4. See the sections below to learn some of the more common ways to customize your pipeline.
4. 阅读下面的部分可以学习一些常用的自定义pipeline的方法。

## Build environment
## 构建环境

You can use Azure Pipelines to build your .NET Core projects on Windows, Linux, or macOS without needing to set up any infrastructure of your own. The [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) in Azure Pipelines have several released versions of the .NET Core SDKs preinstalled.
你可以使用Azure Pipelines在Windows，Linux，或者是macOS上构建你的.NET Core项目，同时还不需要设置任何自己的基础设施。Azure
Pipelines提供了预装一些.NET Core SDKs版本的由[微软托管的agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops)。

Ubuntu 18.06 is set here in the YAML file.
下面的YAML文件指定了Ubuntu 18.06的设置。

```yaml
pool:
  vmImage: 'ubuntu-18.04' # examples of other options: 'macOS-10.15', 'windows-2019'
```

See [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) for a complete list of images and [Pool](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema#pool) for further examples.
参阅[微软托管的agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops)了解完整的镜像和agent池信息列表。

The Microsoft-hosted agents don't include some of the older versions of the .NET Core SDK. They also don't typically include prerelease versions. If you need these kinds of SDKs on Microsoft-hosted agents, add the [UseDotNet@2](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/tool/dotnet-core-tool-installer?view=azure-devops) task to your YAML file.
微软托管的agents既不包含那些旧版本的.NET Core SDK，同时也不包含预发行版本。如果你需要在微软托管的agents中使用这类版本的SDKs，只需添加[UseDotNet@2](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/tool/dotnet-core-tool-installer?view=azure-devops) 类型的task到你的YAML文件里即可。

To install the preview version of the 5.0.x SDK for building and 3.0.x for running tests that target .NET Core 3.0.x, add this snippet:
安装5.0.x 的preview版SDK用于构建项目，3.0.x的SDK用于运行基于.NET Core 3.0.x的测试项目，添加下面的代码段：

```yaml
steps:
- task: UseDotNet@2
  inputs:
    version: '5.0.x'
    includePreviewVersions: true # Required for preview versions

- task: UseDotNet@2
  inputs:
    version: '3.0.x'
    packageType: runtime
```

If you are installing on a Windows agent, it will already have a .NET Core runtime on it. To install a newer SDK, set `performMultiLevelLookup` to `true` in this snippet:
如果你想要安装在一个Windows版的agent上，那么它已经包含一个.NET Core runtime，要安装新版本的SDK的话，只需要在代码里设置`performMultiLevelLookup` 为 `true`即可：

```yaml
steps:
- task: UseDotNet@2
  displayName: 'Install .NET Core SDK'
  inputs:
    version: 5.0.x
    performMultiLevelLookup: true
    includePreviewVersions: true # Required for preview versions
```

> Tip
>
> As an alternative, you can set up a [self-hosted agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install) and save the cost of running the tool installer. See [Linux](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops), [MacOS](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-osx?view=azure-devops), or [Windows](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops). You can also use self-hosted agents to save additional time if you have a large repository or you run incremental builds. A self-hosted agent can also help you in using the preview or private SDKs thats are not officially supported by Azure DevOps or you have available on your corporate or on-premises environments only.
> 提示
>
> 作为替代方案，你可以设置一个[自己托管的agent](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install) 这可以节省运行工具安装程序的时间成本。参阅[Linux](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops), [MacOS](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-osx?view=azure-devops), 或者 [Windows](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-windows?view=azure-devops)。如果有一个大型仓库或者运行增量构建，还可以通过自托管agent节省额外的时间。自托管agent不仅可以帮助你使用Azure DevOps还未正式支持的预览版或者私有SDK，也可以帮助你使用仅在你的企业内部或本地环境中可用的预览版或者私有SDK。

## Restore dependencies
## 还原依赖项

NuGet is a popular way to depend on code that you don't build. You can download NuGet packages and project-specific tools that are specified in the project file by running the `dotnet restore` command either through the [.NET Core](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) task or directly in a script in your pipeline.
NuGet是一种受欢迎的无需构建的代码依赖方式。你可以通过[.NET Core](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) task或者直接在pipeline中的脚本中运行`dotnet restore`命令，下载项目文件中指定的NuGet包和项目指定的特定工具。

You can download NuGet packages from Azure Artifacts, NuGet.org, or some other external or internal NuGet repository. The **.NET Core** task is especially useful to restore packages from authenticated NuGet feeds.
你可以从Azure Artifacts, NuGet.org,或者是一些其它的内部或外部的NuGet仓库。**.NET Core** task对于从未经身份验证的NuGet源进行包还原非常有用。

This pipeline uses an artifact feed for `dotnet restore` in the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops).
这个pipeline在一个 [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops)中使用一个artifact源进行 `dotnet restore`。

```yaml
trigger:
- master

pool:
  vmImage: 'windows-latest'

variables:
  buildConfiguration: 'Release'

steps:
- task: DotNetCoreCLI@2
  inputs:
    command: 'restore'
    feedsToUse: 'select'
    vstsFeed: 'my-vsts-feed' # A series of numbers and letters

- task: DotNetCoreCLI@2
  inputs:
    command: 'build'
    arguments: '--configuration $(buildConfiguration)'
  displayName: 'dotnet build $(buildConfiguration)'
```

`dotnet restore` internally uses a version of `NuGet.exe` that is packaged with the .NET Core SDK. `dotnet restore` can only restore packages specified in the .NET Core project `.csproj` files. If you also have a Microsoft .NET Framework project in your solution or use `package.json` to specify your dependencies, you must also use the **NuGet** task to restore those dependencies.
`dotnet restore`内部使用一个基于.NET Core SDK打包的`NuGet.exe`版本。`dotnet restore`只能还原.NET Core 项目的 `.csproj` 文件中指定的依赖包。如果你的解决方案中包含.NET Framework项目或者有使用`package.json`指定依赖项，那么你必须使用 **NuGet** task来还原这些依赖项。

In .NET Core SDK version 2.0 and newer, packages are restored automatically when running other commands such as `dotnet build`. However, you might still need to use the **.NET Core** task to restore packages if you use an authenticated feed.
在 .NET Core SDK 2.0或者更新的版本中，当运行其它命令例如`dotnet build`的时候就会更自动进行依赖包还原。然而，如果有使用到未验证的源，你可能依然需要使用**.NET Core** task来还原依赖包。

If your builds occasionally fail when restoring packages from NuGet.org due to connection issues, you can use Azure Artifacts in conjunction with [upstream sources](https://docs.microsoft.com/en-us/azure/devops/artifacts/concepts/upstream-sources?view=azure-devops) and cache the packages. The credentials of the pipeline are automatically used when connecting to Azure Artifacts. These credentials are typically derived from the **Project Collection Build Service** account.
如果由于网络连接问题导致从NuGet.org还原依赖包时会出现偶尔的构建失败，你可以把Azure Artifacts与[upstream sources](https://docs.microsoft.com/en-us/azure/devops/artifacts/concepts/upstream-sources?view=azure-devops) 结合使用以缓存依赖包文件。连接到Azure Artifacts时候，pipeline的凭证会自动验证。这些凭证同城派生自**Project Collection Build Service**账户。

If you want to specify a NuGet repository, put the URLs in a `NuGet.config` file in your repository. If your feed is authenticated, manage its credentials by creating a NuGet service connection in the **Services** tab under **Project Settings**.
如果要指定一个NuGet仓库，请将URLs放在仓库中的`NuGet.config`文件中。如果你的源已通过验证，请在**Services**选项卡下的**Project Settings**中创建一个NuGet服务链接以管理其凭证。

If you use Microsoft-hosted agents, you get a new machine every time your run a build, which means restoring the packages every time. This restoration can take a significant amount of time. To mitigate this issue, you can either use Azure Artifacts or a self-hosted agent, in which case, you get the benefit of using the package cache.
如果你使用微软托管的agents，每次运行构建任务时你都会得到一个全新的机器，这就意味着每次都需要还原依赖包，这个还原过程可能需要大量时间。为了缓解这个问题，你可以使用Azure Artifacts或者自托管agent，这样你就可以受益于依赖包的缓存优势。

To restore packages from an external custom feed, use the **.NET Core** task:
使用**.NET Core** task从一个外部自定义源还原依赖包：

```yaml
# do this before your build tasks
steps:
- task: DotNetCoreCLI@2
  displayName: Restore
  inputs:
    command: restore
    projects: '**/*.csproj'
    feedsToUse: config
    nugetConfigPath: NuGet.config    # Relative to root of the repository
    externalFeedCredentials: <Name of the NuGet service connection>
# ...
```

For more information about NuGet service connections, see [publish to NuGet feeds](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops).
更多关于NuGet服务连接的信息，请参见[发布到NuGet源](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops)。

## Build your project
## 构建你的项目

You build your .NET Core project either by running the `dotnet build` command in your pipeline or by using the .NET Core task.、
构建.NET Core项目，既可以通过在pipeline中使用`dotnet build`命令，也可以使用.NET Core task。

To build your project by using the .NET Core task, add the following snippet to your `azure-pipelines.yml`file:
使用.NET Core task构建项目，添加下面的代码段到你的`azure-pipelines.yml`文件中：

YAMLCopy

```yaml
steps:
- task: DotNetCoreCLI@2
  displayName: Build
  inputs:
    command: build
    projects: '**/*.csproj'
    arguments: '--configuration $(buildConfiguration)' # Update this to match your need
```

You can run any custom dotnet command in your pipeline. The following example shows how to install and use a .NET global tool, [dotnetsay](https://www.nuget.org/packages/dotnetsay/):
在pipeline中可以运行任何自定义的dotnet命令，下面的实例展示了如何安装并使用.NET全局工具————[dotnetsay](https://www.nuget.org/packages/dotnetsay/):

```yaml
steps:
- task: DotNetCoreCLI@2
  displayName: 'Install dotnetsay'
  inputs:
    command: custom
    custom: tool
    arguments: 'install -g dotnetsay'
```

## Run your tests
## 运行测试

If you have test projects in your repository, then use the **.NET Core** task to run unit tests by using testing frameworks like MSTest, xUnit, and NUnit. For this functionality, the test project must reference [Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK) version 15.8.0 or higher. Test results are automatically published to the service. These results are then made available to you in the build summary and can be used for troubleshooting failed tests and test-timing analysis.
如果你的仓库里包含测试项目，就可以使用**.NET Core** task借助MSTest， xUnit和NUnit一类的测试框架来运行单元测试。对于此功能，测试项目必须引用[Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK)15.8.0或更高的版本。测试结果将会自动发布到服务。然后这些结果也将在生成的构建摘要中提供给你，以用于失败测试的故障排除和定时测试分析。

Add the following snippet to your `azure-pipelines.yml` file:
添加下面的代码段到你的`azure-pipelines.yml`文件里：

```yaml
steps:
# ...
# do this after other tasks such as building
- task: DotNetCoreCLI@2
  inputs:
    command: test
    projects: '**/*Tests/*.csproj'
    arguments: '--configuration $(buildConfiguration)'
```

An alternative is to run the `dotnet test` command with a specific logger and then use the **Publish Test Results** task:
另一种选择是运行带有指定日志记录器选项的`dotnet test`命令，然后使用**Publish Test Results** task：

```yaml
steps:
# ...
# do this after your tests have run
- script: dotnet test <test-project> --logger trx
- task: PublishTestResults@2
  condition: succeededOrFailed()
  inputs:
    testRunner: VSTest
    testResultsFiles: '**/*.trx'
```

## Collect code coverage
## 收集代码覆盖率

If you're building on the Windows platform, code coverage metrics can be collected by using the built-in coverage data collector. For this functionality, the test project must reference [Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK)version 15.8.0 or higher. If you use the **.NET Core** task to run tests, coverage data is automatically published to the server. The **.coverage** file can be downloaded from the build summary for viewing in Visual Studio.
如果你在Windows平台上构建，可以使用内置的覆盖率数据收集器收集代码覆盖率指标。对于此功能，测试项目必须引用[Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK)15.8.0或更高版本。如果你使用 **.NET Core** task运行测试，覆盖率数据会自动发布到服务器。可以在构建摘要中下载**.coverage**文件，以方便在Visual Studio中查看。

Add the following snippet to your `azure-pipelines.yml` file:
添加下面的代码段到你的`azure-pipelines.yml`文件里：

```yaml
steps:
# ...
# do this after other tasks such as building
- task: DotNetCoreCLI@2
  inputs:
    command: test
    projects: '**/*Tests/*.csproj'
    arguments: '--configuration $(buildConfiguration) --collect "Code coverage"'
```

If you choose to run the `dotnet test` command, specify the test results logger and coverage options. Then use the [Publish Test Results](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-test-results?view=azure-devops) task:
如果你选择运行`dotnet test`命令，并指定了测试结果日志记录器和覆盖率范围选项，然后使用[Publish Test Results](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-test-results?view=azure-devops) task:

```yaml
steps:
# ...
# do this after your tests have run
- script: dotnet test <test-project> --logger trx --collect "Code coverage"
- task: PublishTestResults@2
  inputs:
    testRunner: VSTest
    testResultsFiles: '**/*.trx'
```

### Collect code coverage metrics with Coverlet
### 使用Coverlet收集代码覆盖率指标

If you're building on Linux or macOS, you can use [Coverlet](https://github.com/tonerdo/coverlet) or a similar tool to collect code coverage metrics.
如果你是在Linux或者macOS上构建你的应用，你可以使用[Coverlet](https://github.com/tonerdo/coverlet)或者类似的工具去收集代码覆盖率指标。

Code coverage results can be published to the server by using the [Publish Code Coverage Results](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops) task. To leverage this functionality, the coverage tool must be configured to generate results in Cobertura or JaCoCo coverage format.
代码覆盖率结果可以使用[Publish Code Coverage Results](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops) task发布到服务器。要使用此功能，覆盖率工具必须配置成生成结果为Cobertura 或 JaCoCo的代码覆盖率格式。

To run tests and publish code coverage with Coverlet, add this snippet to your `azure-pipelines.yml` file:
使用Coverlet运行测试并发布代码覆盖率，请添加下面的代码段到你的`azure-pipelines.yml`文件中：

```yaml
- task: DotNetCoreCLI@2
  displayName: 'dotnet test'
  inputs:
    command: 'test'
    arguments: '--configuration $(buildConfiguration) /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=$(Build.SourcesDirectory)/TestResults/Coverage/'
    publishTestResults: true
    projects: '**/test-library/*.csproj' # update with your test project directory

- task: PublishCodeCoverageResults@1
  displayName: 'Publish code coverage report'
  inputs:
    codeCoverageTool: 'Cobertura'
    summaryFileLocation: '$(Build.SourcesDirectory)/**/coverage.cobertura.xml'
```

## Package and deliver your code
## 打包并交付代码

After you've built and tested your app, you can upload the build output to Azure Pipelines or TFS, create and publish a NuGet package, or package the build output into a .zip file to be deployed to a web application.
在应用构建并测试完成后，你可以上传构建的输出结果到Azure Pipelines 或者 TFS，也可以创建并发布一个NuGet包，或者是把输出结果直接打包成一个.zip文件去部署到一个web 应用。

### Publish artifacts to Azure Pipelines
### 发布artifacts到Azure Pipelines

To publish the output of your .NET **build**,
发布.NET **build**的输出结果，

- Run `dotnet publish --output $(Build.ArtifactStagingDirectory)` on CLI or add the DotNetCoreCLI@2 task with publish command.
- Publish the artifact by using Publish artifact task.

Add the following snippet to your `azure-pipelines.yml` file:
添加下面的代码段到你的`azure-pipelines.yml`文件：

```yaml
steps:

- task: DotNetCoreCLI@2
  inputs:
    command: publish
    publishWebProjects: True
    arguments: '--configuration $(BuildConfiguration) --output $(Build.ArtifactStagingDirectory)'
    zipAfterPublish: True

# this code takes all the files in $(Build.ArtifactStagingDirectory) and uploads them as an artifact of your build.
- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.ArtifactStagingDirectory)' 
    artifactName: 'myWebsiteName'
```

> Note
>
> The `dotNetCoreCLI@2` task has a `publishWebProjects` input that is set to **true** by default. This publishes *all* web projects in your repo by default. You can find more help and information in the [open source task on GitHub](https://github.com/microsoft/azure-pipelines-tasks).
>备注
>
>`dotNetCoreCLI@2` task有一个输入选项`publishWebProjects`默认为**true**。这会默认发布你仓库下*全部*web项目。更多信息可以参见[open source task on GitHub](https://github.com/microsoft/azure-pipelines-tasks)

To copy additional files to Build directory before publishing, use [Utility: copy files](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/copy-files?view=azure-devops).
发布前想要复制额外的文件到构建路径下，可以使用[Utility: copy files](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/copy-files?view=azure-devops)。

### Publish to a NuGet feed
### 发布到一个NuGet源

To create and publish a NuGet package, add the following snippet:
要创建并发布一个NuGet包，添加下面的代码段：

```yaml
steps:
# ...
# do this near the end of your pipeline in most cases
- script: dotnet pack /p:PackageVersion=$(version)  # define version variable elsewhere in your pipeline
- task: NuGetAuthenticate@0
  input:
    nuGetServiceConnections: '<Name of the NuGet service connection>'
- task: NuGetCommand@2
  inputs:
    command: push
    nuGetFeedType: external
    publishFeedCredentials: '<Name of the NuGet service connection>'
    versioningScheme: byEnvVar
    versionEnvVar: version
```

For more information about versioning and publishing NuGet packages, see [publish to NuGet feeds](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops).
更多关于NuGet包的发布和版本的信息，请参见[publish to NuGet feeds](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops)。

### Deploy a web app
### 部署一个web应用

To create a .zip file archive that's ready for publishing to a web app, add the following snippet:
当你准备发布到一个web应用的时候要创建.ZIP文件压缩包，添加下面的代码段：

```yaml
steps:
# ...
# do this after you've built your app, near the end of your pipeline in most cases
# for example, you do this before you deploy to an Azure web app on Windows
- task: DotNetCoreCLI@2
  inputs:
    command: publish
    publishWebProjects: True
    arguments: '--configuration $(BuildConfiguration) --output $(Build.ArtifactStagingDirectory)'
    zipAfterPublish: True
```

To publish this archive to a web app, see [Azure Web Apps deployment](https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops).
发布这个压缩包到一个web应用，请参见[Azure Web Apps deployment](https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops)。

## Build an image and push to container registry
## 构建一个镜像并发布到容器注册表

For your app, you can also [build an image](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/build-image?view=azure-devops) and [push it to a container registry](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/push-image?view=azure-devops).
你也可以把你的应用[构建一个镜像](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/build-image?view=azure-devops) 并 [推送到一个容器注册表](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/push-image?view=azure-devops)。

## Troubleshooting
## 故障排除

If you're able to build your project on your development machine, but you're having trouble building it on Azure Pipelines or TFS, explore the following potential causes and corrective actions:
如果你的项目能够在开发机器上构建，但是不能在Azure Pipelines 或 TFS上进行构建。请浏览以下的潜在原因和修改措施：

- We don't install prerelease versions of the .NET Core SDK on Microsoft-hosted agents. After a new version of the .NET Core SDK is released, it can take a few weeks for us to roll it out to all the datacenters that Azure Pipelines runs on. You don't have to wait for us to finish this rollout. You can use the **.NET Core Tool Installer**, as explained in this guidance, to install the desired version of the .NET Core SDK on Microsoft-hosted agents.
- 我们没有安装预发布版的.NET Core SDK到Microsoft-hosted agents上。一个新版本的.NET Core SDK发布后，我们还需要几周时间才能将其部署到Azure Pipelines运行的数据中心。你不必等待我们完成部署，可以直接使用**.NET Core Tool Installer**去安装一个你需要的.NET Core SDK版本到Microsoft-hosted agents。

- Check that the versions of the .NET Core SDK and runtime on your development machine match those on the agent. You can include a command-line script `dotnet --version` in your pipeline to print the version of the .NET Core SDK. Either use the **.NET Core Tool Installer**, as explained in this guidance, to deploy the same version on the agent, or update your projects and development machine to the newer version of the .NET Core SDK.
- 检查你的开发机器上的.NET Core SDK和runtime的版本信息是否和agent上的版本匹配。你可以在你的pipeline中包含一个命令行脚本`dotnet --version`去呈现.NET Core SDK的版本信息。你可以使用**.NET Core Tool Installer**在agent上部署一个相同版本的.NET Core SDK，也可以更新你项目和开发机器的.NET Core SDK到最新版本。
- You might be using some logic in the Visual Studio IDE that isn't encoded in your pipeline. Azure Pipelines or TFS runs each of the commands you specify in the tasks one after the other in a new process. Look at the logs from the Azure Pipelines or TFS build to see the exact commands that ran as part of the build. Repeat the same commands in the same order on your development machine to locate the problem.
- 或许你在Visual Studio IDE中使用了一些特殊逻辑，但没有编码到你的pipeline中。Azure Pipelines或和TFS在一个全新的进程中逐个运行你tasks中指定的每个命令。查看Azure Pipelines或者TFS的构建日志信息可以了解当前运行的每条命令的确切信息。在开发机器上重复这个运行顺序就可以快速定位问题所在。
- If you have a mixed solution that includes some .NET Core projects and some .NET Framework projects, you should also use the **NuGet** task to restore packages specified in `packages.config` files. Similarly, you should add **MSBuild** or **Visual Studio Build** tasks to build the .NET Framework projects.
- 如果你的解决方案混合了.NET Core项目和.NET Framework项目，你需要使用**NuGet** task来还原`packages.config`文件中指定的依赖包。类似的，你应该添加**MSBuild** 或者 **Visual Studio Build** tasks去构建.NET Framework项目。
- If your builds fail intermittently while restoring packages, either NuGet.org is having issues, or there are networking problems between the Azure datacenter and NuGet.org. These aren't under our control, and you might need to explore whether using Azure Artifacts with NuGet.org as an upstream source improves the reliability of your builds.
- 如果你的构建在依赖包还原阶段出现间歇性失败，一种可能原因是NuGet.org出现了故障，也可能是Azure 数据中心与NuGet.org之间的网络连接出现了问题。这些都是我们不可控的因素，你可以考虑使用Azure Artifacts作为NuGet.org的中继来提高你的构建任务的可靠性。
- Occasionally, when we roll out an update to the hosted images with a new version of the .NET Core SDK or Visual Studio, something might break your build. This can happen, for example, if a newer version or feature of the NuGet tool is shipped with the SDK. To isolate these problems, use the **.NET Core Tool Installer** task to specify the version of the .NET Core SDK that's used in your build.
- 有时，当我们更新托管环境镜像到带有新版本.NET Core SDK 或者 Visual Studio的镜像时，可能会打断你的构建任务。比如，当一个新版本的NuGet工具随着SDK发布时，这可能就会发生。要解决这个问题，可以使用**.NET Core Tool Installer** task指定你用来构建项目的.NET Core SDK版本信息。

## Q&A

### Where can I learn more about Azure Artifacts and the TFS Package Management service?
### 我在那里可以了解更多关于Azure Artifacts 和 TFS Package Management service的信息？

[Package Management in Azure Artifacts and TFS](https://docs.microsoft.com/en-us/azure/devops/artifacts/?view=azure-devops)

### Where can I learn more about .NET Core commands?
### 我在那里可以了解更多关于.NET Core commands的信息？

[.NET Core CLI tools](https://docs.microsoft.com/en-us/dotnet/core/tools/)

### Where can I learn more about running tests in my solution?
### 我在那里可以了解更多关于解决方案中运行测试的信息？

[Unit testing in .NET Core projects](https://docs.microsoft.com/en-us/dotnet/core/testing/)

### Where can I learn more about tasks?
### 我在那里可以了解更多关于tasks的信息？

[Build and release tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/?view=azure-devops)