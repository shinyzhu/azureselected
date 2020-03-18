---
type: post
status: new
sidebar: auto
title: "9 Advanced Tips for Production Machine Learning"
description: "Incorporating a new state of the art machine learning model into a production application is a rewarding yet often frustrating experience. The following post provides tips for production Machine Learning, with examples using the Azure Machine Learning Service."
tags: ['Azure Cognitive Services', 'Azure Machine Learning', 'Azure Storage', 'Azure Event Bus', 'Azure Data Explorer']
author: 'Ari Bornstein'
date: 2019-9-13
url: 'https://medium.com/microsoftazure/9-advanced-tips-for-production-machine-learning-6bbdebf49a6f'
translator: ''
reviewer: ''
pub_date: 
---

# 9 Advanced Tips for Production Machine Learning

<ContentMeta />

![img](https://miro.medium.com/max/2962/1*MRAj-ClZpkfuB_u0Tfualg.gif)

TLDR; Incorporating a new state of the art machine learning model into a production application is a rewarding yet often frustrating experience. The following post provides tips for production Machine Learning, with examples using the Azure Machine Learning Service.

If you are new to Azure you can get a free subscription here.

[Create your Azure free account today](https://azure.microsoft.com/en-us/free/?WT.mc_id=7tips-medium-abornst)

While the tips in the following post, transcend Azure, the Azure Machine Learning Service provides structured tooling for training, deploying, automating, and managing machine learning workflows at production scale.

## 1) Do not Reinvent the Wheel

Before writing the first line of AI code ask whether the problem you are solving really needs a state of the art model? Many scenarios already have existing solutions that are managed and maintained by the top cloud providers.

[Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/?WT.mc_id=7tips-medium-abornst)

These services are supported, industry compliant, constantly updated, and already integrate into the language and platforms your customers are using. Many of them can be run offline in docker environments and many of these services such as custom vision, custom speech and language understanding can even be customized.

Before reinventing the wheel check to see if these services fit your scenario, you may find that by the time your company puts a state of the art model into production the performance of a managed service will have caught up.

![img](https://miro.medium.com/max/60/1*CDjxxnKreBZGzKMCZeY0pQ.png?q=20)

![img](https://miro.medium.com/max/792/1*CDjxxnKreBZGzKMCZeY0pQ.png)

The 80:20 Rule for AI

I have found there to be a Pareto 80:20 rule where around 80 percent of the AI tools required by a company at a given time are already in a managed service. However while 80% of scenarios may be covered by cognitive services, the remaining 20% of scenarios tend to be the ones with the most disruptive potential. By not reinventing the wheel you can focus your production efforts on these critical scenarios.

## 2) Centralize Your Data Pipeline

In research datasets are often provided. but in production managing, securing and wrangling data is much more challenging. Before putting the next state of the art model into production, it’s important to understand your data and use case. The diagram below outlines considerations when ingesting, processing data for production machine learning.

![img](https://miro.medium.com/max/60/1*b0JwrOo1D2NcPCT05OfyzA.png?q=20)

![img](https://miro.medium.com/max/1894/1*b0JwrOo1D2NcPCT05OfyzA.png)

Services such as [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-introduction?WT.mc_id=7tips-medium-abornst), [Azure Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/?WT.mc_id=7tips-medium-abornst), and [Azure Data Explorer](https://docs.microsoft.com/en-us/azure/data-explorer/?WT.mc_id=7tips-medium-abornst)enable scalable ingestion and processing of your data.

The Azure Machine Learning Service directly integrates with these services through the [MLOps SDK](https://docs.microsoft.com/en-us/azure/machine-learning/service/concept-model-management-and-deployment?WT.mc_id=7tips-medium-abornst). I won’t dive to deeply into these concepts in this post, but check out more about how to centralize and a manage access to data in documentation below.

[Create datasets to access data with azureml-datasets](https://docs.microsoft.com/en-us/azure/machine-learning/service/how-to-create-register-datasets?WT.mc_id=7tips-medium-abornst)

## 3) Keep Track of your Team’s Work

In a research setting, it easy to get used to working on a model alone. In production keeping track of work done across distributed teams can be challenging.

Luckily, the Azure Machine Learning workspace enables teams to manage experiments and keep track of their work.

![img](https://miro.medium.com/max/60/0*njN25URFpDYB15FR.png?q=20)

![img](https://miro.medium.com/max/2022/0*njN25URFpDYB15FR.png)

From this workspace, teams can define monitor both classical and custom task metrics across all the given runs on a given to keep track of top performance over time.

![img](https://miro.medium.com/max/60/1*9Pv0FACRAYPuys6juV1Fkg.png?q=20)

![img](https://miro.medium.com/max/3456/1*9Pv0FACRAYPuys6juV1Fkg.png)

When one team member gets stuck another can quickly get access to the logs and help get their team member back on track.

![img](https://miro.medium.com/max/60/1*rei5V-ixNXAfV4n25dmTHw.png?q=20)

![img](https://miro.medium.com/max/3502/1*rei5V-ixNXAfV4n25dmTHw.png)

For each run, all code and hyper parameters are snapshotted so that work can be instantly recovered and reverted.

![img](https://miro.medium.com/max/60/1*Sx1SqIUtomUwebSmUIyI1w.png?q=20)

![img](https://miro.medium.com/max/3510/1*Sx1SqIUtomUwebSmUIyI1w.png)

Having the tools to scale a team and keep track of your work is critical to getting a state of the art model into production as fast as possible.

## 4) Deploy a Solid Baseline

![img](https://miro.medium.com/freeze/max/60/1*4SMvRBvLBjxJmmIoNI0_Ew.gif?q=20)

Before deploying a complex state of the art model to production, it makes sense to deploy a solid baseline model.

Having a solid baseline model provides significant advantages. a strong baseline helps to:

- Better understand the deployment process for getting a model into production.
- Evaluate impact of a given solution, if you see that there is a quantifiable return on investment on your baseline then you can use that to justify pouring more resources into a more complex model.
- Provide a point of comparison — for example if the baseline gives an F1 score of 87% on your data but your State of the Art implementation returns 85% the baseline can help you better understand that there is likely a bug in your implementation even though the metrics seem good.

The Azure AutoML service helps generate strong baselines for many tasks without the need to even write a single line of ML code. AutoML automates the process of selecting the best algorithm to use for your specific data, so you can generate a machine learning baseline quickly. To get started check out the AutoML documentation below to learn more about how the service works.

[Create automated ML experiments](https://docs.microsoft.com/en-us/azure/machine-learning/service/how-to-configure-auto-train?WT.mc_id=7tips-medium-abornst)

Also check out this great post on Auto ML from the talented Francesca Lazzeri to learn more about the interpreting the results of the service.

[Automated and Interpretable Machine Learning](https://medium.com/microsoftazure/automated-and-interpretable-machine-learning-d07975741298)

## 5) Use Low Priority Compute and AutoScaling

![img](https://miro.medium.com/max/60/1*ZM8sD7BcttWpTA_OBGXgvQ.png?q=20)

Training large state of the art models can be computationally expensive however taking advantage of low priority compute can lead to significant savings by an order of magnitude.

![img](https://miro.medium.com/max/60/1*nXDYcSk1n0Y1MODkFniCmg.png?q=20)

Additionally the Azure Machine Learning Service Supports Auto Scaling which means that if your model at any point eats up all your allocated resources instead of crashing and causing you to loose all your work and spent compute resources, it will automatically scale to your needs and then scale back down when the resources are released.

With these cost savings you can choose to either train your models longer or reduce waste with as little as two lines of code over a traditional deployment.

```python
from azureml.core.compute import ComputeTarget, AmlCompute
from azureml.core.compute_target import ComputeTargetException

cluster_name = "cluster"
compute_config = AmlCompute.provisioning_configuration(vm_size='STANDARD_D3_V2', # VM Size N series have GPU
                                                       vm_priority='lowpriority', # Cheap Computer
                                                       min_nodes=0, # Auto Scale Min Limit
                                                       max_nodes=5) #Auto Scale Max Limit
cluster = ComputeTarget.create(ws, cluster_name, compute_config)
cluster.wait_for_completion(show_output=True)
```

## 6) Leverage Distributed Training

There are two traditional approaches to distributed training, **distributed batching** and **distributed hyperparameter optimization**. Without distributed training it will be difficult to scale your state of model to production performance.

Traditionally distributed training is hard to manage due to the following issues:

![img](https://miro.medium.com/freeze/max/60/1*zT026rDD_okEt9feX-RzzQ.gif?q=20)

Distributed Training is Hard to Manage with out a Cloud Service

Azure Machine Learning service manages distributed batching with direct integration with MPI and Hovorod.

![img](https://miro.medium.com/max/60/1*TqvJywXC29XsIjcD4XlkYw.png?q=20)

Additionally the Azure ML service provides [HyperDrive](https://docs.microsoft.com/en-us/azure/machine-learning/service/how-to-tune-hyperparameters?WT.mc_id=7tips-medium-abornst), a hyperparameter optimization service that uses state of the art methods for hyperparamater tuning.

Hyperparameters are adjustable parameters, chosen prior to training that govern model training. Model performance heavily depends on hyperparameters and in the state of the art models they are often fined tuned to research data-sets.

It can be hard to find optimal hyperparameters on a new data distribution, since the parameter search space is large, there are very few optimal values and evaluating the whole parameter space is resource and time consuming.

Often in research these parameters are checked manually, one at a time which is inefficient:

![img](https://miro.medium.com/freeze/max/60/1*q0OZh8dsPllyjGSyvqHduw.gif?q=20)

The Hyperdrive Service enables the configuration of hyperparameter search space:

![img](https://miro.medium.com/max/60/1*Ij1ufoiChx2j9eKgouG6LQ.png?q=20)

Given a metric it will then run many distributed parameter searches, using state of the art sampling methods and perform early stopping on parameters that do not converge on optimal performance. This results in much more robust state of the art machine learning models.

![img](https://miro.medium.com/max/60/1*L5bSDG_MRPYv5V0ulny8gQ.png?q=20)

Learn more about the service below:

[Tune hyperparameters for your model](https://docs.microsoft.com/en-us/azure/machine-learning/service/how-to-tune-hyperparameters?WT.mc_id=7tips-medium-abornst)

## 7) When Possible Deploy to the Edge

Models can be deployed as scalable cloud webservice, hosted on premise or deployed directly to edge devices.

![img](https://miro.medium.com/max/60/1*51lDlWpIWYmZQBF9sEWQYw.png?q=20)

While certain models have restrictive computation and memory requirements whenever possible it’s extremely cost effective to deploy directly to edge devices using either edge modules like in the example below, or web frameworks such as [onnx.js](https://github.com/microsoft/onnxjs) or [tensorflow.js](https://www.tensorflow.org/js).

[Deploy Azure Machine Learning to a device - Azure IoT Edge](https://docs.microsoft.com/en-us/azure/iot-edge/tutorial-deploy-machine-learning?WT.mc_id=7tips-medium-abornst)

The savings can be reinvested into iterating your model.

## 8) Perform AB Testing of Different Models

The Azure ML Service makes it easy to manage version and if necessary roll back models. While it may to seem that a model performs better in the training environment in production you may see a different result.

An A/B test enables you to test different model versions across different audiences. Based on conversion rates, KPIs or other metrics, you can decide which one performs best or if it’s time to iterate the next version of the model.

Azure ML Piplelines can help manage these tests and metrics.

[What are ML Pipelines](https://docs.microsoft.com/en-us/azure/machine-learning/service/concept-ml-pipelines?WT.mc_id=7tips-medium-abornst)

## 9) Monitor Data Drift

Data drift happens when data served to a model in production is different from the data used to train the model. It is one of the top reasons where model accuracy degrades over time, thus monitoring data drift helps detect model performance issues.

With Azure Machine Learning service, you can monitor the inputs to a model deployed on AKS and compare this data to the training dataset for the model. At regular intervals, the inference data is [snapshot and profiled](https://docs.microsoft.com/en-us/python/api/azureml-core/azureml.core.dataset.dataset?view=azure-ml-py?WT.mc_id=7tips-medium-abornst), then computed against the baseline dataset to produce a data drift analysis

[Detect data drift (Preview) on AKS deployments](https://docs.microsoft.com/en-us/azure/machine-learning/service/how-to-monitor-data-drift/?WT.mc_id=7tips-medium-abornst)

Hope you enjoyed these tips and that they help you with your Azure Journey in future posts I will be diving deeper into different subjects explored here and other topics in AI and Machine Learning.

If you have any questions, comments, or topics you would like me to discuss feel free to follow me on [Twitter](https://twitter.com/pythiccoder) if there is a milestone you feel I missed please let me know.

## Next Steps

If AI/ML interests you check out these amazing open source best practice repos as well.

[microsoft/nlp](https://github.com/microsoft/nlp/)

[microsoft/ComputerVision](https://github.com/microsoft/ComputerVision)

[microsoft/recommenders](https://github.com/Microsoft/Recommenders)

## About the Author

[Aaron (Ari) Bornstein](https://www.linkedin.com/in/aaron-ari-bornstein-22aa7a77/) is an avid AI enthusiast with a passion for history, engaging with new technologies and computational medicine. As an Open Source Engineer at Microsoft’s Cloud Developer Advocacy team, he collaborates with Israeli Hi-Tech Community, to solve real world problems with game changing technologies that are then documented, open sourced, and shared with the rest of the world.

