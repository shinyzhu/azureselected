(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{326:function(e,t,r){"use strict";r.r(t);var o=r(12),s=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"build-asp-net-apps-with-net-framework"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#build-asp-net-apps-with-net-framework"}},[e._v("#")]),e._v(" Build ASP.NET apps with .NET Framework")]),e._v(" "),t("ContentMeta"),e._v(" "),t("blockquote",[t("p",[e._v("Note")]),e._v(" "),t("p",[e._v("This article focuses on building .NET Framework projects with Azure Pipelines. For help with .NET Core projects, see "),t("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/dotnet-core?view=azure-devops",target:"_blank",rel:"noopener noreferrer"}},[e._v(".NET Core"),t("OutboundLink")],1),e._v(".")])]),e._v(" "),t("h2",{attrs:{id:"create-your-first-pipeline"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#create-your-first-pipeline"}},[e._v("#")]),e._v(" Create your first pipeline")]),e._v(" "),t("blockquote",[t("p",[e._v("Are you new to Azure Pipelines? If so, then we recommend you try this section before moving on to other sections.")])]),e._v(" "),t("h3",{attrs:{id:"get-the-code"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#get-the-code"}},[e._v("#")]),e._v(" Get the code")]),e._v(" "),t("p",[e._v("Fork this repo in GitHub:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("https://github.com/Microsoft/devops-project-samples.git\n")])])]),t("p",[e._v("The sample repo includes several different projects, and the sample application for this article is located in the following path:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("https://github.com/Microsoft/devops-project-samples/tree/master/dotnet/aspnet/webapp/Application\n")])])]),t("p",[e._v("Your "),t("code",[e._v("azure-pipelines.yml")]),e._v(" file needs to run from within the "),t("code",[e._v("dotnet/aspnet/webapp/Application")]),e._v("folder for the build to complete successfully.")]),e._v(" "),t("p",[e._v("The sample app is a Visual Studio solution that has two projects:")]),e._v(" "),t("ul",[t("li",[e._v("An ASP.NET Web Application project that targets .NET Framework 4.5")]),e._v(" "),t("li",[e._v("A Unit Test project")])]),e._v(" "),t("h3",{attrs:{id:"sign-in-to-azure-pipelines"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sign-in-to-azure-pipelines"}},[e._v("#")]),e._v(" Sign in to Azure Pipelines")]),e._v(" "),t("p",[e._v("Sign in to "),t("a",{attrs:{href:"https://azure.microsoft.com/services/devops/pipelines",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Pipelines"),t("OutboundLink")],1),e._v(". After you sign in, your browser goes to "),t("code",[e._v("https://dev.azure.com/my-organization-name")]),e._v(" and displays your Azure DevOps dashboard.")]),e._v(" "),t("p",[e._v("Within your selected organization, create a "),t("em",[e._v("project")]),e._v(". If you don't have any projects in your organization, you see a "),t("strong",[e._v("Create a project to get started")]),e._v(" screen. Otherwise, select the "),t("strong",[e._v("Create Project")]),e._v(" button in the upper-right corner of the dashboard.")]),e._v(" "),t("ul",[t("li",[e._v("After you have the sample code in your own repository, create a pipeline using the instructions in "),t("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops",target:"_blank",rel:"noopener noreferrer"}},[e._v("Create your first pipeline"),t("OutboundLink")],1),e._v(" and select the "),t("strong",[e._v("ASP.NET")]),e._v(" template. This automatically adds the tasks required to build the code in the sample repository.")]),e._v(" "),t("li",[e._v("Save the pipeline and queue a build to see it in action.")])]),e._v(" "),t("h2",{attrs:{id:"build-environment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#build-environment"}},[e._v("#")]),e._v(" Build environment")]),e._v(" "),t("p",[e._v("You can use Azure Pipelines to build your .NET Framework projects without needing to set up any infrastructure of your own. The "),t("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops",target:"_blank",rel:"noopener noreferrer"}},[e._v("Microsoft-hosted agents"),t("OutboundLink")],1),e._v(" in Azure Pipelines have several released versions of Visual Studio pre-installed to help you build your projects.")]),e._v(" "),t("ul",[t("li",[e._v("Use "),t("code",[e._v("windows-2019")]),e._v(" for Windows Server 2019 with Visual Studio 2019")]),e._v(" "),t("li",[e._v("Use "),t("code",[e._v("vs2017-win2016")]),e._v(" for Windows Server 2016 with Visual Studio 2017")])]),e._v(" "),t("p",[e._v("You can also use a "),t("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install",target:"_blank",rel:"noopener noreferrer"}},[e._v("self-hosted agent"),t("OutboundLink")],1),e._v(" to run your builds. This is particularly helpful if you have a large repository and you want to avoid downloading the source code to a fresh machine for every build.")])],1)}),[],!1,null,null,null);t.default=s.exports}}]);