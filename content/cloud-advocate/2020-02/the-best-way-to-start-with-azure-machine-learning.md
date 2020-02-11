---
type: post
status: new
title: 'The Best Way to Start With Azure Machine Learning'
description: 'Dmitry recently discovered a way how to get started using Azure ML more effectively. The main secret is the Visual Studio Code extension for Azure ML. It allows you to develop training scripts directly in VS Code, using all the advantages of the environment. You can even run the script locally, and then just send it for training in the Azure ML cluster with a few clicks of the mouse. Convenient, isn't it?'
tags: ['Debug']
author: 'Dmitry Soshnikov'
date: 2020-01-27
url: 'https://dev.to/azure/the-best-way-to-start-with-azure-machine-learning-17jl'
translator: ''
---

# The Best Way to Start With Azure Machine Learning

<ContentMeta />

I know many data scientists, including myself, who do most of their work on a GPU-enabled machine, either locally or in the cloud, through Jupyter Notebooks or some Python IDE. During my two years as AI/ML software engineer that is exactly what I was doing, preparing data on one machine without GPU, and then using GPU VM in the cloud to do the training.

On the other hand, you have probably heard of [Azure Machine Learning](https://docs.microsoft.com/azure/machine-learning/?WT.mc_id=devto-blog-dmitryso) - a special platform service for doing ML. However, if you start looking at some [getting started tutorials](https://docs.microsoft.com/azure/machine-learning/tutorial-train-models-with-aml/?WT.mc_id=devto-blog-dmitryso), you will have the impression that using Azure ML creates a lot of unnecessary overhead, and the process is not ideal. For example, the training script in the example above is created as a text file in one Jupyter cell, without code completion, or any convenient ways of executing it locally or debugging. This extra overhead was the reason we did not use it as much in our projects.

However, I recently found out that there is a [Visual Studio Code Extension for Azure ML](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai#overview). With this extension, you can develop your training code right in the VS Code, run it locally, and then submit the same code to be trained on a cluster with just a few clicks of a button. By doing so, you achieve several important benefits:

- You can spend most of the time locally on your machine, and **use powerful GPU resources only for training**. The training cluster can be automatically resized on demand, and by setting the min amount of machines to 0 you can spin up the VM on demand.
- You **keep all results of your training**, including metrics and created models, in one central location - no need to keep the record of your accuracy for each experiment manually. 
- If **several people work on the same project** - they can use the same cluster (all experiments will be queued), and they can view each other's experiment result. For example, you can use **Azure ML in a classroom environment**, and instead of giving each student an individual GPU machine you can create one cluster that will serve everyone, and foster the competition between students on model accuracy. 
- If you need to perform many trainings, for example for **hyperparameter optimization** - all that can be done with just few commands, no need to run series of experiments manually.

I hope you are convinced to try Azure ML yourself! Here is the best way to start:

- Install [Visual Studio Code](http://code.visualstudio.com/?WT.mc_id=devto-blog-dmitryso), [Azure Sign In](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) and [Azure ML](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.vscode-ai#overview) Extensions
- Clone the repository https://github.com/CloudAdvocacy/AzureMLStarter - it contains some sample code to train the model to recognize MNIST digits. You can then open the cloned repository in VS Code.
- Read on!

## Azure ML Workspace and Portal

Everything in Azure ML is organized around a **Workspace**. It is a central point where you submit your experiments, store your data and resulting models. There is also a special [**Azure ML Portal**](http://ml.azure.com/?WT.mc_id=devto-blog-dmitryso) that provides web interface for your workspace, and from there you can perform a lot of operations, monitor your experiments and metrics, and so on.

You can either create a workspace through [Azure Portal](https://portal.azure.com/?WT.mc_id=devto-blog-dmitryso) web interface (see [step-by-step instructions](https://docs.microsoft.com/azure/machine-learning/how-to-manage-workspace/?WT.mc_id=devto-blog-dmitryso)), or using Azure CLI ([instructions](https://docs.microsoft.com/en-us/azure/machine-learning/how-to-manage-workspace-cli/?WT.mc_id=devto-blog-dmitryso)):

```
az extension add -n azure-cli-ml
az group create -n myazml -l northeurope
az ml workspace create -w myworkspace -g myazml
```

Workspace contains some **Compute** resources. Once you have a training script, you can **submit experiment** to the workspace, and specify **compute target** - it will make sure the experiment runs there, and stores all the results of the experiment in the workspace for future reference.

## MNIST Training Script

In our example, we will show how to solve very [traditional problem of handwritten digit recognition](https://www.kaggle.com/c/digit-recognizer) using MNIST dataset. In the same manner you will be able to run any other training scripts yourself.

Our sample repository contains simple MNIST training script `train_local.py`. This script downloads MNIST dataset from OpenML, and then uses SKLearn `LogisticRegression` to train the model and print the resulting accuracy:

```
mnist = fetch_openml('mnist_784')
mnist['target'] = np.array([int(x) for x in mnist['target']])

shuffle_index = np.random.permutation(len(mist['data']))
X, y = mnist['data'][shuffle_index], mnist['target'][shuffle_index]

X_train, X_test, y_train, y_test = 
  train_test_split(X, y, test_size = 0.3, random_state = 42)

lr = LogisticRegression()
lr.fit(X_train, y_train)
y_hat = lr.predict(X_test)
acc = np.average(np.int32(y_hat == y_test))

print('Overall accuracy:', acc)
```

Of course, we are using Logistic Regression just as illustration, not implying that it is a good way to solve the problem...

## Running the Script in Azure ML

You can just run this script locally and see the result. If we chose to use Azure ML, however, it will give us two major benefits:

- Scheduling and running training on a centralized compute resource, which is typically more powerful than a local computer. Azure ML will take care of packaging our script into a docker container with appropriate configuration
- Logging the results of training into a centralized location inside Azure ML Workspace. To do so, we need to add the following lines of code to our script, to record the metrics:

```
from azureml.core.run import Run
...
try:    
    run = Run.get_submitted_run()
    run.log('accuracy', acc)
except:
    pass
```

Modified version of our script is called `train_universal.py` (it is just a bit more complicated than the code presented above), and it can be run both locally (without Azure ML), and on remote compute resource.

To run it on Azure ML from VS Code, follow those steps:

1. Make sure your Azure Extension is connected to your cloud account. Select Azure icon in the left menu. If you are not connected, you will see a notification on the right bottom offering you to connect ([see picture](https://habrastorage.org/webt/7b/ii/u6/7biiu6ktpygayub0ff17-u36om4.png)). Click on it, and sign in through browser. You can also press **Ctrl-Shift-P** to bring up command palette, and type in **Azure Sign In**.
2. After that, you should be able to see your workspace in the **MACHINE LEARNING** section of Azure bar:
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--db7R9m4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uf/yu/da/ufyudahlxeed3roay5yppqu_cwq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--db7R9m4s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uf/yu/da/ufyudahlxeed3roay5yppqu_cwq.png)
   Here you should see different objects inside your workspace: compute resources, experiments, etc.
3. Go back to the list of files, and right-click on `train_universal.py`and select **Azure ML: Run as experiment in Azure**. 
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--GfBPAe07--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/x7/i7/ex/x7i7exvh6uatgqqmhvtte9u89ae.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--GfBPAe07--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/x7/i7/ex/x7i7exvh6uatgqqmhvtte9u89ae.png)
4. Confirm your Azure subscription and you workspace, and then select **Create new experiment**:
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--yUX026iW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uq/p1/l1/uqp1l1mazrais_juw3zcfegnyds.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--yUX026iW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uq/p1/l1/uqp1l1mazrais_juw3zcfegnyds.png)
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--uYXYdSal--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hk/of/ff/hkofffhrmy-mapz-zybagzi5pj4.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--uYXYdSal--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hk/of/ff/hkofffhrmy-mapz-zybagzi5pj4.png)
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--uppA0zaX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hd/nb/0c/hdnb0clmrgnq534iaktd20q8w2u.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--uppA0zaX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/hd/nb/0c/hdnb0clmrgnq534iaktd20q8w2u.png)
5. Create new **Compute** and **compute configuration**:
   - **Compute** defines a computing resource which is used for training/inference. You can use your local machine, or any cloud resources. In our case, we will use AmlCompute cluster. Please create a scalable cluster of STANDARD_DS3_v2 machines, with min=0 and max=4 nodes. You can do that either from VS Code interface, or from [ML Portal](http://ml.azure.com/?WT.mc_id=devto-blog-dmitryso).![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s---rv4Ptrh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/az/qq/tt/azqqttrje6jx8nsepdycwtosh04.png)
   - **Compute Configuration** defines the options for containers which are created to perform training on a remote resource. In particular, it specifies all libraries that should be installed. In our case, select *SkLearn*, and confirm the list of libraries.![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--jmmNby__--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/0x/wv/u_/0xwvu_iu7tovivowbhmrbjkml2m.png)![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--FaXAgED7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/fx/t-/hv/fxt-hvhaeanmz6_ztcoh1q5tc8u.png)
6. You will then see a window with JSON description of the next experiment. You can edit the information there, for example change the experiment or cluster name, and tweak some parameters. When you are ready, click on **Submit Experiment**:
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--joFeivEz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/vj/r0/6_/vjr06_o6idgburn_bs84xtau7qe.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--joFeivEz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/vj/r0/6_/vjr06_o6idgburn_bs84xtau7qe.png)
7. After the experiment has been successfully submitted in VS Code, you will get the link to the [Azure ML Portal](http://ml.azure.com/?WT.mc_id=devto-blog-dmitryso) page with experiment progress and results. 
   [![Azure ML Experiment Result in Azure ML Portal](https://res.cloudinary.com/practicaldev/image/fetch/s--2oWg9AGT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/_2/dc/mg/_2dcmguwlzuegyt8feqtmy2fyfg.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--2oWg9AGT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/_2/dc/mg/_2dcmguwlzuegyt8feqtmy2fyfg.png)
   You can also find your experiment from **Experiments** tab in [Azure ML Portal](http://ml.azure.com/?WT.mc_id=devto-blog-dmitryso), or from **Azure Machine Learning** bar in VS Code:
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--ZOptBzGn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/sf/aj/zi/sfajzixi7onq59cbfgnjzq2ay7u.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--ZOptBzGn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/sf/aj/zi/sfajzixi7onq59cbfgnjzq2ay7u.png)
8. If you want to run the experiment again after adjusting some parameters in your code, this process would be much faster and easier. When you right-click your training file, you will see a new menu option **Repeat last run** - just select it, and the experiment will be submitted right away. 
   [![Azure ML Workspace in VS Code](https://res.cloudinary.com/practicaldev/image/fetch/s--o_ITr5kJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uh/u0/vg/uhu0vgjdtifxczq6saeerxhsdys.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--o_ITr5kJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://habrastorage.org/webt/uh/u0/vg/uhu0vgjdtifxczq6saeerxhsdys.png)
   You will then see the metric results from all runs on Azure ML Portal, as in the screenshot above. 

Now you know that submitting runs to Azure ML is not complicated, and you get some goodies (like storing all statistics from your runs, models, etc.) for free.

You may have noticed that in our case the time it takes for the script to run on the cluster is more than running locally - it may even take several minutes. Of course, there is some overhead in packaging the script and all environment in a container, and sending it to the cloud. If the cluster is set to automatically scale down to 0 nodes - there might be some additional overhead due to VM startup, and all that is noticeable when you have a small sample script that otherwise takes a few seconds to execute. However, in real life scenarios, when training takes tens of minutes and sometimes much more - this overhead becomes barely important, especially given the speed improvements you can expect to get from the cluster. 

## What's Next?

Now that you know how to submit any scripts for execution on a remote cluster, you can start taking advantage of Azure ML in your daily work. It will allow you to develop scripts on a normal PC, and then schedule it for execution on GPU VM or cluster automatically, keeping all the results in one place. 

However, there are more advantages from using Azure ML than just those two. Azure ML can also be used for data storage and dataset handling - making it super-easy for different training scripts to access the same data. Also, you can submit experiments automatically through the API, varying the parameters - and thus performing some hyperparameter optimization. Moreover, there is a specific technology built into Azure ML called [**Hyperdrive**](https://docs.microsoft.com/azure/machine-learning/how-to-tune-hyperparameters/?WT.mc_id=devto-blog-dmitryso), which does more clever hyperparameter search. I will talk more about those features and technologies in my next posts. 

## Useful Resources

You may find the following courses from Microsoft Learn useful, in case you want to know more:

- [Introduction to Azure Machine Learning Service](https://docs.microsoft.com/learn/modules/intro-to-azure-machine-learning-service/?WT.mc_id=devto-blog-dmitryso)
- [Building AI Solutions with Azure ML Service](https://docs.microsoft.com/ru-ru/learn/paths/build-ai-solutions-with-azure-ml-service/?WT.mc_id=devto-blog-dmitryso)
- [Training Local Models with Azure ML Service](https://docs.microsoft.com/ru-ru/learn/modules/train-local-model-with-azure-mls/?WT.mc_id=devto-blog-dmitryso)