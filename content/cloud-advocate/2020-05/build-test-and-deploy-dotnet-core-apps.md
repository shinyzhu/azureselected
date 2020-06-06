---
type: post
status: new
sidebar: auto
title: "Build, test, and deploy .NET Core apps"
description: "Use .NET Core to build apps with Azure Pipelines, Azure DevOps, & Team Foundation Server"
tags: ['Azure DevOps', '.NET Core']
author: 'Abel Wang'
date: 2020-05-06
url: 'https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/dotnet-core'
translator: ''
reviewer: ''
pub_date: 
---

# Build, test, and deploy .NET Core apps

<ContentMeta />

Use a pipeline to automatically build and test your .NET Core projects. Learn how to:

- Set up your build environment with [Microsoft-hosted](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) or [self-hosted](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops) agents.
- Restore dependencies, build your project, and test with the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) or a [script](https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/cross-platform-scripting?view=azure-devops).
- Use the [publish code coverage task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops) to publish code coverage results.
- Package and deliver your code with the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) and the [publish build artifacts task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/publish-build-artifacts?view=azure-devops).
- Publish to a [NuGet feed](https://docs.microsoft.com/en-us/azure/devops/pipelines/artifacts/nuget?view=azure-devops).
- Deploy your [web app to Azure](https://docs.microsoft.com/en-us/azure/devops/pipelines/targets/webapp?view=azure-devops).

> Note
>
> For help with .NET Framework projects, see [Build ASP.NET apps with .NET Framework](https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/aspnet/build-aspnet-4?view=azure-devops).

## Create your first pipeline

> Are you new to Azure Pipelines? If so, then we recommend you try this section before moving on to other sections.

### Get the code

Fork this repo in GitHub:

```
https://github.com/MicrosoftDocs/pipelines-dotnet-core
```

### Sign in to Azure Pipelines

Sign in to [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines). After you sign in, your browser goes to `https://dev.azure.com/my-organization-name` and displays your Azure DevOps dashboard.

Within your selected organization, create a *project*. If you don't have any projects in your organization, you see a **Create a project to get started** screen. Otherwise, select the **Create Project** button in the upper-right corner of the dashboard.

### Create the pipeline

1. Sign in to your Azure DevOps organization and navigate to your project.

2. Go to **Pipelines**, and then select **New Pipeline**.

3. Walk through the steps of the wizard by first selecting **GitHub** as the location of your source code.

   ![Select GitHub](https://docs.microsoft.com/en-us/azure/devops/pipelines/media/get-started-yaml/new-pipeline.png?view=azure-devops)

   > Note
   >
   > If this is not what you see, then [make sure the Multi-stage pipelines experience is turned on](https://docs.microsoft.com/en-us/azure/devops/project/navigation/preview-features?view=azure-devops).

4. You might be redirected to GitHub to sign in. If so, enter your GitHub credentials.

5. When the list of repositories appears, select your repository.

6. You might be redirected to GitHub to install the Azure Pipelines app. If so, select **Approve and install**.

> When the **Configure** tab appears, select **ASP.NET Core**.

1. When your new pipeline appears, take a look at the YAML to see what it does. When you're ready, select **Save and run**.

   ![Save and run button in a new YAML pipeline](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/media/save-and-run-button-new-yaml-pipeline.png?view=azure-devops)

2. You're prompted to commit a new *azure-pipelines.yml* file to your repository. After you're happy with the message, select **Save and run** again.

   If you want to watch your pipeline in action, select the build job.

   > You just created and ran a pipeline that we automatically created for you, because your code appeared to be a good match for the [ASP.NET Core](https://github.com/Microsoft/azure-pipelines-yaml/blob/master/templates/asp.net-core.yml) template.

   You now have a working YAML pipeline (`azure-pipelines.yml`) in your repository that's ready for you to customize!

3. When you're ready to make changes to your pipeline, select it in the **Pipelines** page, and then **Edit**the `azure-pipelines.yml` file.

4. See the sections below to learn some of the more common ways to customize your pipeline.

## Build environment

You can use Azure Pipelines to build your .NET Core projects on Windows, Linux, or macOS without needing to set up any infrastructure of your own. The [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) in Azure Pipelines have several released versions of the .NET Core SDKs preinstalled.

Ubuntu 18.06 is set here in the YAML file.

```yaml
pool:
  vmImage: 'ubuntu-18.04' # examples of other options: 'macOS-10.15', 'windows-2019'
```

See [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops) for a complete list of images and [Pool](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema#pool) for further examples.

The Microsoft-hosted agents don't include some of the older versions of the .NET Core SDK. They also don't typically include prerelease versions. If you need these kinds of SDKs on Microsoft-hosted agents, add the [UseDotNet@2](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/tool/dotnet-core-tool-installer?view=azure-devops) task to your YAML file.

To install the preview version of the 5.0.x SDK for building and 3.0.x for running tests that target .NET Core 3.0.x, add this snippet:

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

## Restore dependencies

NuGet is a popular way to depend on code that you don't build. You can download NuGet packages and project-specific tools that are specified in the project file by running the `dotnet restore` command either through the [.NET Core](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops) task or directly in a script in your pipeline.

You can download NuGet packages from Azure Artifacts, NuGet.org, or some other external or internal NuGet repository. The **.NET Core** task is especially useful to restore packages from authenticated NuGet feeds.

This pipeline uses an artifact feed for `dotnet restore` in the [.NET Core CLI task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/build/dotnet-core-cli?view=azure-devops).

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

In .NET Core SDK version 2.0 and newer, packages are restored automatically when running other commands such as `dotnet build`. However, you might still need to use the **.NET Core** task to restore packages if you use an authenticated feed.

If your builds occasionally fail when restoring packages from NuGet.org due to connection issues, you can use Azure Artifacts in conjunction with [upstream sources](https://docs.microsoft.com/en-us/azure/devops/artifacts/concepts/upstream-sources?view=azure-devops) and cache the packages. The credentials of the pipeline are automatically used when connecting to Azure Artifacts. These credentials are typically derived from the **Project Collection Build Service** account.

If you want to specify a NuGet repository, put the URLs in a `NuGet.config` file in your repository. If your feed is authenticated, manage its credentials by creating a NuGet service connection in the **Services** tab under **Project Settings**.

If you use Microsoft-hosted agents, you get a new machine every time your run a build, which means restoring the packages every time. This restoration can take a significant amount of time. To mitigate this issue, you can either use Azure Artifacts or a self-hosted agent, in which case, you get the benefit of using the package cache.

To restore packages from an external custom feed, use the **.NET Core** task:

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

## Build your project

You build your .NET Core project either by running the `dotnet build` command in your pipeline or by using the .NET Core task.

To build your project by using the .NET Core task, add the following snippet to your `azure-pipelines.yml`file:

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

If you have test projects in your repository, then use the **.NET Core** task to run unit tests by using testing frameworks like MSTest, xUnit, and NUnit. For this functionality, the test project must reference [Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK) version 15.8.0 or higher. Test results are automatically published to the service. These results are then made available to you in the build summary and can be used for troubleshooting failed tests and test-timing analysis.

Add the following snippet to your `azure-pipelines.yml` file:

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

If you're building on the Windows platform, code coverage metrics can be collected by using the built-in coverage data collector. For this functionality, the test project must reference [Microsoft.NET.Test.SDK](https://www.nuget.org/packages/Microsoft.NET.Test.SDK)version 15.8.0 or higher. If you use the **.NET Core** task to run tests, coverage data is automatically published to the server. The **.coverage** file can be downloaded from the build summary for viewing in Visual Studio.

Add the following snippet to your `azure-pipelines.yml` file:

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

If you're building on Linux or macOS, you can use [Coverlet](https://github.com/tonerdo/coverlet) or a similar tool to collect code coverage metrics.

Code coverage results can be published to the server by using the [Publish Code Coverage Results](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops) task. To leverage this functionality, the coverage tool must be configured to generate results in Cobertura or JaCoCo coverage format.

To run tests and publish code coverage with Coverlet, add this snippet to your `azure-pipelines.yml` file:

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

After you've built and tested your app, you can upload the build output to Azure Pipelines or TFS, create and publish a NuGet package, or package the build output into a .zip file to be deployed to a web application.

### Publish artifacts to Azure Pipelines

To publish the output of your .NET **build**,

- Run `dotnet publish --output $(Build.ArtifactStagingDirectory)` on CLI or add the DotNetCoreCLI@2 task with publish command.
- Publish the artifact by using Publish artifact task.

Add the following snippet to your `azure-pipelines.yml` file:

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

To copy additional files to Build directory before publishing, use [Utility: copy files](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/copy-files?view=azure-devops).

### Publish to a NuGet feed

To create and publish a NuGet package, add the following snippet:

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

### Deploy a web app

To create a .zip file archive that's ready for publishing to a web app, add the following snippet:

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

## Build an image and push to container registry

For your app, you can also [build an image](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/build-image?view=azure-devops) and [push it to a container registry](https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/containers/push-image?view=azure-devops).

## Troubleshooting

If you're able to build your project on your development machine, but you're having trouble building it on Azure Pipelines or TFS, explore the following potential causes and corrective actions:

- We don't install prerelease versions of the .NET Core SDK on Microsoft-hosted agents. After a new version of the .NET Core SDK is released, it can take a few weeks for us to roll it out to all the datacenters that Azure Pipelines runs on. You don't have to wait for us to finish this rollout. You can use the **.NET Core Tool Installer**, as explained in this guidance, to install the desired version of the .NET Core SDK on Microsoft-hosted agents.

- Check that the versions of the .NET Core SDK and runtime on your development machine match those on the agent. You can include a command-line script `dotnet --version` in your pipeline to print the version of the .NET Core SDK. Either use the **.NET Core Tool Installer**, as explained in this guidance, to deploy the same version on the agent, or update your projects and development machine to the newer version of the .NET Core SDK.
- You might be using some logic in the Visual Studio IDE that isn't encoded in your pipeline. Azure Pipelines or TFS runs each of the commands you specify in the tasks one after the other in a new process. Look at the logs from the Azure Pipelines or TFS build to see the exact commands that ran as part of the build. Repeat the same commands in the same order on your development machine to locate the problem.
- If you have a mixed solution that includes some .NET Core projects and some .NET Framework projects, you should also use the **NuGet** task to restore packages specified in `packages.config` files. Similarly, you should add **MSBuild** or **Visual Studio Build** tasks to build the .NET Framework projects.
- If your builds fail intermittently while restoring packages, either NuGet.org is having issues, or there are networking problems between the Azure datacenter and NuGet.org. These aren't under our control, and you might need to explore whether using Azure Artifacts with NuGet.org as an upstream source improves the reliability of your builds.
- Occasionally, when we roll out an update to the hosted images with a new version of the .NET Core SDK or Visual Studio, something might break your build. This can happen, for example, if a newer version or feature of the NuGet tool is shipped with the SDK. To isolate these problems, use the **.NET Core Tool Installer** task to specify the version of the .NET Core SDK that's used in your build.

## Q&A

### Where can I learn more about Azure Artifacts and the TFS Package Management service?

[Package Management in Azure Artifacts and TFS](https://docs.microsoft.com/en-us/azure/devops/artifacts/?view=azure-devops)

### Where can I learn more about .NET Core commands?

[.NET Core CLI tools](https://docs.microsoft.com/en-us/dotnet/core/tools/)

### Where can I learn more about running tests in my solution?

[Unit testing in .NET Core projects](https://docs.microsoft.com/en-us/dotnet/core/testing/)

### Where can I learn more about tasks?

[Build and release tasks](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/?view=azure-devops)