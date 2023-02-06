(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{312:function(e,t,r){"use strict";r.r(t);var a=r(12),o=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"开始-azure-机器学习的最佳方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开始-azure-机器学习的最佳方式"}},[e._v("#")]),e._v(" 开始 Azure 机器学习的最佳方式")]),e._v(" "),t("ContentMeta"),e._v(" "),t("p",[e._v("我知道许多数据科学家，包括我自己，都通过 Jupyter Notebooks 或某些 Python IDE 在支持 GPU 的计算机上，包括本地或在云中完成大部分工作。近两年来，作为 AI/ML 软件工程师，我正在做的事情是——在一台没有 GPU 的机器上准备数据，然后在云中使用 GPU 虚拟机做训练。")]),e._v(" "),t("p",[e._v("另一方面，您可能已经听说过"),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure 机器学习"),t("OutboundLink")],1),e._v("——一个特殊的用于机器学习的平台服务。但是，如果您开始寻找一些"),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/tutorial-train-models-with-aml/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("入门教程"),t("OutboundLink")],1),e._v("，您将意识到，使用 Azure 的 ML 会创建很多不必要的开销，并且这个过程不是很理想。例如，在前面提到的例子中训练脚本是作为一个 Jupyter Cell 的文本文件创建的，没有代码补全，也没有任何方便地在本地执行或调试的方式。这些额外的开销也是我们并没有在我们的项目中尽可能多的使用它的原因。")]),e._v(" "),t("p",[e._v("不过，最近我发现有一个"),t("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai&WT.mc_id=azureselected-content31-xinglzhu#overview",target:"_blank",rel:"noopener noreferrer"}},[e._v("Visual Studio Code Extension for Azure ML"),t("OutboundLink")],1),e._v("。有了这个扩展，您可以在 VS Code 中直接开发您的的训练代码，并在本地运行，然后将相同的代码提交到集群上进行训练，只需点击几下按钮。这样的方式有几个重要的优势：")]),e._v(" "),t("ul",[t("li",[e._v("您可以将大部分的时间花在本地机器上，并"),t("strong",[e._v("仅为训练使用强大的GPU资源")]),e._v("。训练集群可以根据需求自动调整大小，通过将机器的最小量设置为0，可以根据需要调整 VM。")]),e._v(" "),t("li",[e._v("您"),t("strong",[e._v("将训练的所有结果")]),e._v("维护在一个中心位置，包括指标和创建模型——没有必要为手工为每个实验保留精确度记录。")]),e._v(" "),t("li",[e._v("如果"),t("strong",[e._v("几个人在同一项目上工作")]),e._v("——他们可以使用同一个集群（所有实验将进行排队），并且可以查看彼此的实验结果。例如，您可以使用"),t("strong",[e._v("教室环境中的 Azure ML")]),e._v("，创建一个集群供所有人使用，而不是给每个学生创建一个单独的 GPU 机器，并促进学生之间为模型精确度进行竞争。")]),e._v(" "),t("li",[e._v("如果您需要进行大量训练，例如用于"),t("strong",[e._v("超参数优化")]),e._v("——所有这些可以通过几个命令来完成，无需手动运行一系列的实验。")])]),e._v(" "),t("p",[e._v("我希望已经说服您来尝试一下 Azure ML！下面是如何开始使用的最佳方式：")]),e._v(" "),t("ul",[t("li",[e._v("安装"),t("a",{attrs:{href:"http://code.visualstudio.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Visual Studio Code"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account&WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Sign In"),t("OutboundLink")],1),e._v(" 和 "),t("a",{attrs:{href:"https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai&WT.mc_id=azureselected-content31-xinglzhu#overview",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure ML"),t("OutboundLink")],1),e._v(" 扩展")]),e._v(" "),t("li",[e._v("克隆库 "),t("a",{attrs:{href:"https://github.com/CloudAdvocacy/AzureMLStarter",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/CloudAdvocacy/AzureMLStarter"),t("OutboundLink")],1),e._v(" ——它包含了一些示例代码来训练识别 MNIST 数字模型。然后，您可以在 VS Code 中打开该克隆库。")]),e._v(" "),t("li",[e._v("继续阅读！")])]),e._v(" "),t("h2",{attrs:{id:"azure-ml-的工作区和门户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#azure-ml-的工作区和门户"}},[e._v("#")]),e._v(" Azure ML 的工作区和门户")]),e._v(" "),t("p",[e._v("Azure ML 中的一切都围绕着一个"),t("strong",[e._v("工作区")]),e._v("进行组织。这是您提交实验、存储数据和结果模型的中心位置。还有一个特殊的"),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Azure ML Portal")]),t("OutboundLink")],1),e._v("，为您的工作区提供 Web 界面，从这里您可以执行很多操作，如监视您的实验和指标等等。")]),e._v(" "),t("p",[e._v("您可以通过 "),t("a",{attrs:{href:"https://portal.azure.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Portal"),t("OutboundLink")],1),e._v(" 的 Web 界面创建一个工作区（可参考"),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/how-to-manage-workspace/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("步骤说明"),t("OutboundLink")],1),e._v("），或使用 Azure CLI（"),t("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/machine-learning/how-to-manage-workspace-cli/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("介绍"),t("OutboundLink")],1),e._v("）。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("az extension add -n azure-cli-ml\naz group create -n myazml -l northeurope\naz ml workspace create -w myworkspace -g myazml\n")])])]),t("p",[e._v("工作区包含了一些"),t("strong",[e._v("计算")]),e._v("资源。一旦您有了一个训练脚本，可以"),t("strong",[e._v("提交实验")]),e._v("到工作区，并指定"),t("strong",[e._v("计算目标")]),e._v("——这将确保实验在指定的位置运行，并将实验的所有结果存储在工作区，以供将来参考。")]),e._v(" "),t("h2",{attrs:{id:"mnist-训练脚本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mnist-训练脚本"}},[e._v("#")]),e._v(" MNIST 训练脚本")]),e._v(" "),t("p",[e._v("在我们的示例中，我们将展示如何使用 MNIST 数据集来解决非常"),t("a",{attrs:{href:"https://www.kaggle.com/c/digit-recognizer",target:"_blank",rel:"noopener noreferrer"}},[e._v("传统的手写数字识别问题"),t("OutboundLink")],1),e._v("。以同样的方式，您将能够运行其他任何训练脚本。")]),e._v(" "),t("p",[e._v("我们的样本库包含简单的 MNIST 训练脚本 "),t("code",[e._v("train_local.py")]),e._v("。这个脚本从 OpenML 下载 MNIST 数据集，然后使用 SKLearn "),t("code",[e._v("逻辑回归")]),e._v(" 训练模型并打印结果精确度：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("mnist = fetch_openml('mnist_784')\nmnist['target'] = np.array([int(x) for x in mnist['target']])\n\nshuffle_index = np.random.permutation(len(mist['data']))\nX, y = mnist['data'][shuffle_index], mnist['target'][shuffle_index]\n\nX_train, X_test, y_train, y_test = \n  train_test_split(X, y, test_size = 0.3, random_state = 42)\n\nlr = LogisticRegression()\nlr.fit(X_train, y_train)\ny_hat = lr.predict(X_test)\nacc = np.average(np.int32(y_hat == y_test))\n\nprint('Overall accuracy:', acc)\n")])])]),t("p",[e._v("当然，我们使用逻辑回归仅是为了作为示例，并不意味着这是解决这个问题的最好方式……")]),e._v(" "),t("h2",{attrs:{id:"在-azure-ml-中运行脚本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在-azure-ml-中运行脚本"}},[e._v("#")]),e._v(" 在 Azure ML 中运行脚本")]),e._v(" "),t("p",[e._v("您可以在本地运行此脚本并查看结果。然而，如果我们选择使用 Azure ML，会给我们带来两大好处：")]),e._v(" "),t("ul",[t("li",[e._v("在集中式计算资源上调度和运行训练，其性能通常比本地计算机更强大。Azure ML 会使用合适的配置将脚本打包到 Docker 容器中。")]),e._v(" "),t("li",[e._v("将训练结果记录到 Azure ML 工作区内的集中位置。要做到这一点，我们需要将下面的代码添加到脚本中，用来记录指标：")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("from azureml.core.run import Run\n...\ntry:    \n    run = Run.get_submitted_run()\n    run.log('accuracy', acc)\nexcept:\n    pass\n")])])]),t("p",[e._v("此脚本修改后的版本被称为"),t("code",[e._v("train_universal.py")]),e._v("（它比上面呈现的代码更复杂一些），它既可以在本地运行（不使用 Azure ML），也可以运行在远程计算资源上。")]),e._v(" "),t("p",[e._v("为了从 VS Code 中将其运行在 Azure ML 上，请遵循这些步骤：")]),e._v(" "),t("ol",[t("li",[e._v("确保您的 Azure 扩展连接到您的云帐户。选择左侧菜单的 Azure 图标。如果您没有连接，您会看到在右下角显示一个通知以便您连接（"),t("a",{attrs:{href:"https://habrastorage.org/webt/7b/ii/u6/7biiu6ktpygayub0ff17-u36om4.png",target:"_blank",rel:"noopener noreferrer"}},[e._v("见图"),t("OutboundLink")],1),e._v("）。点击它，并通过浏览器登录。您也可以按下 "),t("strong",[e._v("Ctrl-Shift-P")]),e._v("，将弹出命令面板，输入 "),t("strong",[e._v("Azure Sign In")]),e._v(" 进行登录。")]),e._v(" "),t("li",[e._v("然后，您应该能够在 Azure 栏部分的 "),t("strong",[e._v("MACHINE LEARNING")]),e._v(" 中看见您的工作区：\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--db7R9m4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uf/yu/da/ufyudahlxeed3roay5yppqu_cwq.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--db7R9m4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uf/yu/da/ufyudahlxeed3roay5yppqu_cwq.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1),e._v("\n在这里，您会看到工作区中的不同对象：计算资源，实验等。")]),e._v(" "),t("li",[e._v("回到文件列表，并用鼠标右键点击 "),t("code",[e._v("train_universal.py")]),e._v(" 并选择 "),t("strong",[e._v("Azure ML: Run as experiment in Azure")]),e._v("。\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--GfBPAe07--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/x7/i7/ex/x7i7exvh6uatgqqmhvtte9u89ae.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--GfBPAe07--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/x7/i7/ex/x7i7exvh6uatgqqmhvtte9u89ae.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("确认您的Azure订阅和您的工作区，然后选择"),t("strong",[e._v("创建新实验")]),e._v("：\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--yUX026iW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uq/p1/l1/uqp1l1mazrais_juw3zcfegnyds.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--yUX026iW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uq/p1/l1/uqp1l1mazrais_juw3zcfegnyds.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1),e._v(" "),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--uYXYdSal--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hk/of/ff/hkofffhrmy-mapz-zybagzi5pj4.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--uYXYdSal--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hk/of/ff/hkofffhrmy-mapz-zybagzi5pj4.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1),e._v(" "),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--uppA0zaX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hd/nb/0c/hdnb0clmrgnq534iaktd20q8w2u.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--uppA0zaX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hd/nb/0c/hdnb0clmrgnq534iaktd20q8w2u.png",alt:"Azure ML Workspace in VS Code"}}),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("创建新的 "),t("strong",[e._v("Compute")]),e._v(" 和 "),t("strong",[e._v("compute configuration")]),e._v("：\n"),t("ul",[t("li",[t("strong",[e._v("Compute")]),e._v(" 定义了用于训练/推理的计算资源。您可以使用本地计算机或任何云资源。在我们的示例中，我们将使用 AmlCompute 集群。请建立 STANDARD_DS3_v2 机器的可扩展群集，节点配置为 min=0和max=4。您可以从 VS Code 中，或从"),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("ML 门户"),t("OutboundLink")],1),e._v("中进行配置。"),t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s---rv4Ptrh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/az/qq/tt/azqqttrje6jx8nsepdycwtosh04.png",alt:"VS Code 中的 Azure ML 工作区"}})]),e._v(" "),t("li",[t("strong",[e._v("Compute Configuration")]),e._v(" 定义远程资源上创建的用于执行训练的容器选项。特别是，它指定所有要安装的库。在我们的例子中，选择 "),t("em",[e._v("SkLearn")]),e._v("，并确认库列表。"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--jmmNby__--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/0x/wv/u_/0xwvu_iu7tovivowbhmrbjkml2m.png",target:"_blank",rel:"noopener noreferrer"}},[e._v("VS Code 中的 Azure ML 工作区"),t("OutboundLink")],1),t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--FaXAgED7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/fx/t-/hv/fxt-hvhaeanmz6_ztcoh1q5tc8u.png",alt:"VS Code 中的 Azure ML 工作区"}})])])]),e._v(" "),t("li",[e._v("然后您会看到一个窗口，显示下一个实验的 JSON 描述。您可以在其中编辑信息，例如改变实验或集群名称，并调整一些参数。当您准备好后，点击 "),t("strong",[e._v("Submit Experiment")]),e._v("：\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--joFeivEz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/vj/r0/6_/vjr06_o6idgburn_bs84xtau7qe.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--joFeivEz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/vj/r0/6_/vjr06_o6idgburn_bs84xtau7qe.png",alt:"Azure ML Workspace in VS Code"}}),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("在 VS Code 中成功提交实验后，您会得到一个链接，指向"),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure ML 门户"),t("OutboundLink")],1),e._v("中的实验进度和结果。\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--2oWg9AGT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/_2/dc/mg/_2dcmguwlzuegyt8feqtmy2fyfg.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--2oWg9AGT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/_2/dc/mg/_2dcmguwlzuegyt8feqtmy2fyfg.png",alt:"Azure ML 门户中的 Azure ML 实验结果"}}),t("OutboundLink")],1),e._v("\n您还可以从 "),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure ML 门户"),t("OutboundLink")],1),e._v(" 中的 "),t("strong",[e._v("Experiments")]),e._v(" 选项卡，或 VS Code 中的"),t("strong",[e._v("Azure Machine Learning")]),e._v(" 栏找到您的实验：\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--ZOptBzGn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/sf/aj/zi/sfajzixi7onq59cbfgnjzq2ay7u.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--ZOptBzGn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/sf/aj/zi/sfajzixi7onq59cbfgnjzq2ay7u.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("在您的代码调整一些参数后，如果要再次运行实验，这个过程会更快、更容易。用鼠标右键单击您的训练文件，您会看到一个新的菜单选项 "),t("strong",[e._v("Repeat last run")]),e._v(" ——只需选择它，实验将立即被提交。\n"),t("a",{attrs:{href:"https://res.cloudinary.com/practicaldev/image/fetch/s--o_ITr5kJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uh/u0/vg/uhu0vgjdtifxczq6saeerxhsdys.png",target:"_blank",rel:"noopener noreferrer"}},[t("img",{attrs:{src:"https://res.cloudinary.com/practicaldev/image/fetch/s--o_ITr5kJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uh/u0/vg/uhu0vgjdtifxczq6saeerxhsdys.png",alt:"VS Code 中的 Azure ML 工作区"}}),t("OutboundLink")],1),e._v("\n然后，您将在 Azure ML 门户中看到所有运行的指标结果，如上面的截图所示。")])]),e._v(" "),t("p",[e._v("现在您已了解，将运行提交到 Azure ML 并不复杂，而且一些功能（如从您的运行、模型等存储所有的统计数据）是免费的。")]),e._v(" "),t("p",[e._v("您可能已经注意到，对我们的示例来说，在集群上运行脚本所花费的时间比本地运行要长——它甚至可能需要几分钟。当然，还有一些开销，如将脚本和所有环境打包到容器中，并将其发送到云端。如果群集被设置为自动缩放到0节点——可能还会有一些额外的开销，如虚拟机的启动，并且当这个示例脚本小到仅需要几秒钟来执行的时候，这些开销都是显而易见的。然而，在现实的场景中，当训练需要几十分钟，有时甚至更多的时候——这种开销变得几乎不再重要，尤其是对从集群中获得的速度提升来说。")]),e._v(" "),t("h2",{attrs:{id:"下一步是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#下一步是什么"}},[e._v("#")]),e._v(" 下一步是什么？")]),e._v(" "),t("p",[e._v("现在您已经了解了如何将脚本提交到远程群集上来执行，可以开始在您的日常工作中使用 Azure ML了。您可以在普通 PC 上开发脚本，然后在 GPU 虚拟机或集群上自动计划执行，并在一个地方保存所有的结果。")]),e._v(" "),t("p",[e._v("不过，使用 Azure ML 不仅仅只有这两个优势。Azure ML 也可用于数据存储和数据集处理——使用不同的训练脚本来访问相同的数据会更加方便。另外，您还可以通过 API 自动提交实验、改变参数——从而进行一些超参数优化。此外，Azure ML 中内置的称为"),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/how-to-tune-hyperparameters/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Hyperdrive")]),t("OutboundLink")],1),e._v("的特定技术，能够进行更聪明的超参数搜索。我将在下一篇文章中讨论这些功能和技术。")]),e._v(" "),t("h2",{attrs:{id:"有用的资源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#有用的资源"}},[e._v("#")]),e._v(" 有用的资源")]),e._v(" "),t("p",[e._v("如果您想了解更多信息，Microsoft Learn 提供的以下课程可能会很有用：")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://docs.microsoft.com/learn/modules/intro-to-azure-machine-learning-service/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure 机器学习服务介绍"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://docs.microsoft.com/ru-ru/learn/paths/build-ai-solutions-with-azure-ml-service/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("使用 Azure 机器学习服务构建 AI 解决方案"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://docs.microsoft.com/ru-ru/learn/modules/train-local-model-with-azure-mls/?WT.mc_id=azureselected-content31-xinglzhu",target:"_blank",rel:"noopener noreferrer"}},[e._v("使用 Azure 机器学习服务训练本地模型"),t("OutboundLink")],1)])])],1)}),[],!1,null,null,null);t.default=o.exports}}]);