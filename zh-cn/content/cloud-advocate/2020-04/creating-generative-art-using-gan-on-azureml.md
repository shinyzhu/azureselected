---
type: post
status: review
sidebar: auto
title: "Creating Generative Art using GANs on Azure ML"
title: "使用Azure ML的GANS进行艺术创作"
description: "How you can train GANs on pictures of flowers and portraits. This technical post should be first, because the AI Art challenge would depend on it."
description: "关于如何训练花卉和肖像类图片的的GANs。这篇技术文章应该是第一篇，因为AI艺术的挑战依赖于它。"
tags: ['Azure Machine Learning']
author: 'Dmitry Soshnikov'
date: 2020-03-06
url: 'https://soshnikov.com/scienceart/creating-generative-art-using-gan-on-azureml/'
translator: 'DuanShaolong'
reviewer: ''
pub_date: 
---

# Creating Generative Art using GANs on Azure ML
# 使用Azure ML的GANS进行艺术创作

<ContentMeta />

Deep Learning can look like Magic! I get the most magical feeling when watching neural network doing something creative, for example learning to produce paintings like an artist. Technology behind this is called Generative Adversarial Networks, and in this post we will look at how to train such a network on Azure Machine Learning Service. 

深度学习就像魔法一样！当看到神经网络进行一些创造性的工作时，比如学习艺术家的风格去绘画，这时候我会有一种神奇的感觉。这背后的技术叫做生成对抗网络，本文中我们将了解如何在Azure的机器学习服务上训练这样一个网络。

> This post is a part of [AI April](http://aka.ms/AIApril) initiative, where each day of April my colleagues publish new original article related to AI, Machine Learning and Microsoft. Have a look at the [Calendar](http://aka.ms/AIApril) to find other interesting articles that have already been published, and keep checking that page during the month.

> 这篇文章是[AI April](http：//aka.ms/AIApril)计划的一部分,所谓AI April计划是我的同事会在四月的每一天发布新的有关AI,机器学习和微软的原创文章。可以点击 [日历](http://aka.ms/AIApril) 以查看更多已经发布的文章，找到你感兴趣的内容。

If you have seen my previous posts on Azure ML (about [using it from VS Code](https://soshnikov.com/azure/best-way-to-start-with-azureml/) and [submitting experiments and hyperparameter optimization](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/)), you should know that it is quite convenient to use Azure ML for almost any training tasks. However, all examples up to now have been done using toy MNIST dataset. Today we will focus on real problem: creating artificial paintings like those:

如果你我之前发布的有关Azure ML的文章（关于[在VS Code内部使用Azure ML](https://soshnikov.com/azure/best-way-to-start-with-azureml/) and [提交实验和超参数优化](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/)）。你应该会知道，将Azure ML用于几乎任何训练任务都很方便。但是，到目前为止，所有的示例都是用的MNIST测试数据集。如今我们将致力于解决现实问题：创造像这样的人工智能绘画作品：

| ![花卉](https://soshnikov.com/images/artartificial/Flo1.jpg) | ![肖像](https://soshnikov.com/images/artartificial/Port1.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 鲜花, 2019, *人工艺术* [keragan](https://github.com/shwars/keragan) 训练自 [维基艺术](https://www.wikiart.org/) 鲜花 | 混沌女王, 2019, [keragan](https://github.com/shwars/keragan) 训练自 [维基艺术](https://www.wikiart.org/) 肖像 |

Those painting are produced after training the network on paintings from [WikiArt](https://www.wikiart.org/). If you want to reproduce the same results, you may need to collect the dataset yourself, for example by using [WikiArt Retriever](https://github.com/lucasdavid/wikiart), or borrowing existing collections from [WikiArt Dataset](https://github.com/cs-chan/ArtGAN/blob/master/WikiArt Dataset/README.md) or [GANGogh Project](https://github.com/rkjones4/GANGogh).

这些绘画作品是在使用维基艺术进行绘画网络训练后被制作出来的。如果你想重现相同的结果，那你可能需要自己收集数据集，你可以使用[维基艺术检索器](https://github.com/lucasdavid/wikiart), 或者浏览现有的来自[维基艺术数据集](https://github.com/cs-chan/ArtGAN/blob/master/WikiArt Dataset/README.md) 的收藏集。还可以通过[GANGogh Project](https://github.com/rkjones4/GANGogh)来获得.

Place images you want to train on somewhere in  directory. For training on flowers, here is how some of those images might look like:
将需要训练的图像放在`数据集`目录下的任意位置：

![Flowers Dataset](https://soshnikov.com/images/blog/gan_dataset_flowers.png)

We need our neural network model to learn both high-level composition of flower bouquet and a vase, as well as low-level style of painting, with smears of paint and canvas texture.

我们需要使用神经网络模型去学习花束和花瓶的高层次组成，以及低层次的油漆上色和画布纹理等绘画风格。

## Generative Adversarial Networks

## 生成对抗网络

Those painting were generated using [**Generative Adversarial Network**](https://en.wikipedia.org/wiki/Generative_adversarial_network)), or GAN for short. In this example, we will use my simple GAN implementation in Keras called [keragan](https://github.com/shwars/keragan), and I will show some simplified code parts from it.

那些绘画作品是使用[**生成对抗网络**](https://en.wikipedia.org/wiki/Generative_adversarial_network)（简称GAN)生成的。在此示例中，我们将在Keras中使用我的简单GAN实现，称为[keragan](https://github.com/shwars/keragan)，同时我将展示一部分简化的代码。

GAN consists of two networks:

GAN由两个网络组成：

- **Generator**, which generates images given some input **noise vector**
- **Discriminator**, whose role is to differentiate between real and "fake" (generated) paintings

- **生成器**, 根据给定的输入**噪声矢量**生成图片
- **识别器**, 区分真实绘画和“假”（生成的）绘画的不同点

![GAN Architecture](https://soshnikov.com/images/blog/gan_architecture.png)

Training the GAN involves the following steps:

培训 GAN 涉及以下几个步骤：


1. Getting a bunch of generated and real images:
1. 获取一堆生成的和真实的图片：

   ```
   noise = np.random.normal(0, 1, (batch_size, latent_dim))
   gen_imgs = generator.predict(noise)   
   imgs = get_batch(batch_size)
   ```

2. Training discriminator to better differentiate between those two. Note, how we provide vector with
2. 训练识别器以更好的区分两者。注意：我们是提供向量值的方法

    

   ```plaintext
   ones
   ```

    

   and
   和

    

   ```plaintext
   zeros
   ```

    

   as expected answer:
   如期的答案：

   ```
   d_loss_r = discriminator.train_on_batch(imgs, ones)
   d_loss_f = discriminator.train_on_batch(gen_imgs, zeros)
   d_loss = np.add(d_loss_r , d_loss_f)*0.5
   ```

3. Training the combined model, in order to improve the generator:
3. 训练组合模型，以提升生成器

   ```
   g_loss = combined.train_on_batch(noise, ones)
   ```

During this step, discriminator is not trained, because its weights are explicitly frozen during creation of combined model:
在此步骤中，不训练识别器，因为在创建组合模型期间，其权重被显式冻结：

```
discriminator = create_discriminator()
generator = create_generator()
discriminator.compile(loss='binary_crossentropy', optimizer=optimizer, 
                      metrics=['accuracy'])
discriminator.trainable = False

z = keras.models.Input(shape=(latent_dim,))
img = generator(z)
valid = discriminator(img)

combined = keras.models.Model(z, valid) 
combined.compile(loss='binary_crossentropy', optimizer=optimizer)
```

## Discriminator Model
## 识别器模型

To differentiate between real and fake image, we use traditional [**Convolutional Neural Network**](https://en.wikipedia.org/wiki/Convolutional_neural_network) (CNN) architecture. So, for the image of size 64x64, we will have something like this:

为了区分真实图像和假图像，我们使用传统的 [**卷积神经网络**](https://en.wikipedia.org/wiki/Convolutional_neural_network)（CNN）架构。因此，对于尺寸为 64x64 的图像，我们将有类似这样的内容：

```
discriminator = Sequential()

for x in [16,32,64]: # number of filters on next layer
    discriminator.add(Conv2D(x, (3,3), strides=1, padding="same"))
    discriminator.add(AveragePooling2D())
    discriminator.addBatchNormalization(momentum=0.8))
    discriminator.add(LeakyReLU(alpha=0.2))
    discriminator.add(Dropout(0.3))

discriminator.add(Flatten())
discriminator.add(Dense(1, activation='sigmoid'))
```

We have 3 convolution layers, which do the following:

- Original image of shape 64x64x3 is passed over by 16 filters, resulting in a shape 32x32x16. To decrease the size, we use `AveragePooling2D`.
- Next step converts 32x32x16 tensor into 16x16x32
- Finally, after the next convolution layer, we end up with tensor of shape 8x8x64.

On top of this convolutional base, we put simple logistic regression classifier (AKA 1-neuron dense layer).

我们有 3 个卷积层，它们负责执行以下操作：

- 形状为64x64x3的原始图像经过16层过滤器，产生一个形状为32x32x16的图像。为了减小文件大小，我们使用 `AveragePooling2D`。
- 下一步转换32x32x16的张量为16x16x32的张量。
- 最后，在下一个卷积层之后，我们最终得到8x8x64形状的张量。

## Generator Model
## 生成器模型

Generator model is slightly more complicated. First, imagine if we wanted to convert an image to some sort of feature vector of length `latent_dim=100`. We would use convolutional network model similar to the discriminator above, but final layer would be a dense layer with size 100.

生成器模型稍微复杂一些。首先，假设我们想要将图像转换为某种长度`latent_dim=100`的要素矢量。我们将使用与上面的识别器类似的卷积网络模型，不同的是，识别器的最终层会是一个大小为100的密集层。

Generator does the opposite — converts vector of size 100 to an image. This involves a process called **deconvolution**, which is essentially a *reversed convolution*. Together with `UpSampling2D` they cause the size of the tensor to increase at each layer:

生成器的作用正好相反 – 将大小为100的矢量转换为图像。这涉及到一个称为**去卷**的过程，它本质上是一个*反向卷积*。与`UpSampling2D`一起使用时会导致每个层的张量尺寸增加：

```
generator = Sequential()
generator.add(Dense(8 * 8 * 2 * size, activation="relu", 
                                      input_dim=latent_dim))
generator.add(Reshape((8, 8, 2 * size)))

for x in [64;32;16]:
    generator.add(UpSampling2D())
    generator.add(Conv2D(x, kernel_size=(3,3),strides=1,padding="same"))
    generator.add(BatchNormalization(momentum=0.8))
    generator.add(Activation("relu"))

generator.add(Conv2D(3, kernel_size=3, padding="same"))
generator.add(Activation("tanh"))
```

At the last step, we end up with tensor size 64x64x3, which is exactly the size of the image that we need. Note that final activation function is `tanh`, which gives an output in the range of [-1;1] — which means that we need to scale original training images to this interval. All those steps for preparing images is handled by `ImageDataset` class, and I will not go into detail there.

在最后一步，我们以64x64x3的张量大小结束，这正是我们需要的图像的大小。请注意，最终的激活函数是 `tanh`，它给出的输出范围为[-1;1] ---- 这意味着我们需要将原始训练图像缩放到此区间。所有这些准备图像的步骤都由`ImageDataset`类来处理，我将不会在此详细介绍。


## Training script for Azure ML
## Azure ML的训练脚本

Now that we have all pieces for training the GAN together, we are ready to run this code on Azure ML as an experiment!
现在，我们已经有了训练GAN的所有组件，接下来我们准备在Azure ML上运行一些实验代码！

There is one important thing to be noted, however: normally, when running an experiment in Azure ML, we want to track some metrics, such as accuracy or loss. We can log those values during training using `run.log`, as described in my [previous post](https://soshnikov.com/azure/best-way-to-start-with-azureml/), and see how this metric changes during training on [Azure ML Portal](http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso).

然而，有非常重要的一点需要特别注意：当我们在Azure ML中运行实验时，通常希望追踪准确性或丢失等指标。我们可以在训练期间使用`run.log`来记录那些值，就像我的[上一篇文章](https://soshnikov.com/azure/best-way-to-start-with-azureml/)中描述的那样，同时可以在[Azure ML Portal](http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso)中看到这些指标的变化情况。

In our case, instead of numeric metric, we are interested in the visual images that our network generates at each step. Inspecting those images while experiment is running can help us decide whether we want to end our experiment, alter parameters, or continue.

但是在我们这个案例中，我们感兴趣的不是数字指标，而是网络在每个步骤中生成的可以看到的图像，在训练运行的状态下检查这些图像可以帮助我们决定是否结束实验，更高参数，或者是继续运行。

Azure ML supports logging images in addition to numbers, as described [here](https://docs.microsoft.com/azure/machine-learning/how-to-track-experiments/?WT.mc_id=aiapril-blog-dmitryso). We can log either images represented as np-arrays, or any plots produced by `matplotlib`, so what we will do is plotting three sample images on one plot. This plotting will be handled in `callbk` callback function that gets called by `keragan` after each training epoch:

Azure ML除了支持记录数值之外还支持记录图像，具体请看[此处](https://docs.microsoft.com/azure/machine-learning/how-to-track-experiments/?WT.mc_id=aiapril-blog-dmitryso)。我们可以记录呈现为np数组的图像，或者是由`matplotlib`生成的任何图表，因此我们将在一个图表上绘制三个示例图像。这个绘图过程将在每次训练之后由`keragan`调用的回调函数`callbk`中处理：

```
def callbk(tr):
    if tr.gan.epoch % 20 == 0:
        res = tr.gan.sample_images(n=3)
        fig,ax = plt.subplots(1,len(res))
        for i,v in enumerate(res):
            ax[i].imshow(v[0])
        run.log_image("Sample",plot=plt)
```

So, the actual training code will look like this:

因此，实际的训练代码将看起来如下所示：

```
gan = keragan.DCGAN(args)
imsrc = keragan.ImageDataset(args)
imsrc.load()
train = keragan.GANTrainer(image_dataset=imsrc,gan=gan,args=args)

train.train(callbk)
```

Note that `keragan` supports automatic parsing of many command-line parameters that we can pass to it through `args` structure, and that is what makes this code so simple.

注意：这代码之所以如此简单，是因为`keragan`支持自动解析多个命令行参数，我们可以通过`args`结构体来传递给它。

## Starting the Experiment
## 开始实验

To submit the experiment to Azure ML, we will use the code similar to the one discussed in the [previous post on Azure ML](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/). The code is located inside [submit_gan.ipynb][https://github.com/CloudAdvocacy/AzureMLStarter/blob/master/submit_gan.ipynb], and it starts with familiar steps:

- Connecting to the Workspace using `ws = Workspace.from_config()`
- Connecting to the Compute cluster: `cluster = ComputeTarget(workspace=ws, name='My Cluster')`. Here we need a cluster of GPU-enabled VMs, such as [NC6](https://docs.microsoft.com/azure/virtual-machines/sizes-gpu/?WT.mc_id=aiapril-blog-dmitryso).
- Uploading our dataset to the default datastore in the ML Workspace

After that has been done, we can submit the experiment using the following code:

提交实验到Azure ML时，我们将使用一段类似于在[上一篇关于Azure ML的文章](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/)中讨论过的代码。代码位于[submit_gan.ipynb][https://github.com/CloudAdvocacy/AzureMLStarter/blob/master/submit_gan.ipynb]，它从熟悉的步骤开始：

- 使用 `ws = Workspace.from_config()`连接到工作空间
- 连接到计算集群： `cluster = ComputeTarget(workspace=ws, name='My Cluster')`。此处我们需要一个带有GPU的虚拟机集群，例如[NC6](https://docs.microsoft.com/azure/virtual-machines/sizes-gpu/?WT.mc_id=aiapril-blog-dmitryso)。
- 上传我们的数据集到ML工作区默认的数据存储里

在这些步骤完成后，我们就可以使用如下代码提交我们的实验：

```
exp = Experiment(workspace=ws, name='KeraGAN')
script_params = {
    '--path': ws.get_default_datastore(),
    '--dataset' : 'faces',
    '--model_path' : './outputs/models',
    '--samples_path' : './outputs/samples',
    '--batch_size' : 32,
    '--size' : 512,
    '--learning_rate': 0.0001,
    '--epochs' : 10000
}
est = TensorFlow(source_directory='.',
    script_params=script_params,
    compute_target=cluster,
    entry_script='train_gan.py',
    use_gpu = True,
    conda_packages=['keras','tensorflow','opencv','tqdm','matplotlib'],
    pip_packages=['git+https://github.com/shwars/keragan@v0.0.1']

run = exp.submit(est)
```

In our case, we pass `model_path=./outputs/models` and `samples_path=./outputs/samples` as parameters, which will cause models and samples generated during training to be written to corresponding directories inside Azure ML experiment. Those files will be available through Azure ML Portal, and can also be downloaded programmatically afterwards (or even during training).

在我们这个示例中，我们传递`model_path=./outputs/models`和`samples_path=./outputs/samples`作为参数，它们会指定训练期间生成的模型和样本数据写入到Azure ML实验的相应目录里。而那些文件将可以通过Azure ML Portal访问到，也可以在训练结束后（甚至是训练进行期间）通过编写程序来下载到本地。

To create the estimator that can run on GPU without problems, we use built-in [`Tensorflow`](https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.dnn.tensorflow?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso) estimator. It is very similar to generic [`Estimator`](https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.estimator.estimator?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso), but also provides some out-of-the-box options for distributed training. You can read more about using different estimators [in the official documentation](https://docs.microsoft.com/azure/machine-learning/how-to-train-ml-models?WT.mc_id=aiapril-blog-dmitryso).

为了创建可以在GPU上顺利运行的estimator，我们使用内建的[`Tensorflow`](https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.dnn.tensorflow?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso)estimator。它和通用[`Estimator`](https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.estimator.estimator?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso)非常类似，但是可以为分布式训练提供开箱即用的选项。你可以去了解更多关于使用不同估算器的[官方文档](https://docs.microsoft.com/azure/machine-learning/how-to-train-ml-models?WT.mc_id=aiapril-blog-dmitryso)。

Another interesting point here is how we install `keragan` library — directly from GitHub. While we can also install it from PyPI repository, I wanted to demonstrate you that direct installation from GitHub is also supported, and you can even indicate a specific version of the library, tag or commit ID.

另外一个有趣的点是我们可以直接从GitHun安装`keragan`库。尽管我们也可以从PyPI存储库安装，但我想向你展示它也支持直接从GitHub安装，你甚至可以指定库文件的特定版本，标签或者是提交ID。

After the experiment has been running for some time, we should be able to observe the sample images being generated in the [Azure ML Portal](http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso):

实验运行一段时间后，我们应该就可以在[Azure ML Portal](http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso)中看到样本图片：

![GAN Training Experiment Results](https://soshnikov.com/images/blog/AzML/AzMLPortalGAN.PNG)

## Running Many Experiments
## 运行多个实验

The first time we run GAN training, we might not get excellent results, for several reasons. First of all, learning rate seems to be an important parameter, and too high learning rate might lead to poor results. Thus, for best results we might need to perform a number of experiments.

首次运行GAN训练的时候，由于某些原因我们可能无法得到优异的结果。首先，学习速率似乎是一个重要的参数，过高的学习速率可能会导致不良的结果。因此，为了获得最佳效果，我们需要进行大量的实验。

Parameters that we might want to vary are the following:

- `--size` determines the size of the picture, which should be power of 2. Small sizes like 64 or 128 allow for fast exprimentation, while large sizes (up to 1024) are good for creating higher quality images. Anything above 1024 will likely not produce good results, because special techniques are required to train large resolutions GANs, such as [progressive growing](https://arxiv.org/abs/1710.10196)
- `--learning_rate` is surprisingly quite an important parameter, especially with higher resolutions. Smaller learning rate typically gives better results, but training happens very slowly.
- `--dateset`. We might want to upload pictures of different styles into different folders in the Azure ML datastore, and start training multiple experiments simultaneously.

Since we already know how to submit the experiment programmatically, it should be easy to wrap that code into a couple of `for`-loops to perform some parametric sweep. You may then check manually through Azure ML Portal which experiments are on their way to good results, and terminate all other experiments to save costs. Having a cluster of a few VMs gives you the freedom to start a few experiments at the same time without waiting.

可能想要修改的参数如下：

- `--大小` 这决定了图片的大小，数值应该是2的指数级。像64或者128这样的小型号可以让实验更迅速，然而大型号（最高可达1024）有利于生成高质量的图片。超过1024可能就无法产生一个好的结果，因为高分辨率的GANs需要特殊的技术来训练，比如 [progressive growing](https://arxiv.org/abs/1710.10196)。
- `--学习速率` 是一个（令人惊讶的）相当主要的参数，尤其是对于高分辨率图像的训练。学习速率越小，训练的结果就越好，但同时也会非常的慢。
- `--数据集` 我们可能会上传不同风格的图片到Azure ML数据存储中的不同文件夹里面，并同时开始训练多个实验。

## Getting Experiment Results
## 获得实验结果

Once you are happy with results, it makes sense to get the results of the training in the form or model files and sample images. I have mentioned that during the training our training script stored models in `outputs/models` directory, and sample images — to `outputs/samples`. You can browse those directories in the Azure ML Portal and download the files that you like manually:

当你对结果满意的时候，这些训练结果才有意义。如我之前提到的一样训练时我们的训练脚本会存储模型在`outputs/models`路径下，并存储示例图片在`outputs/samples`路径下。你可以在Azure ML Portal里面浏览这些路径，也可以手动将其下载下来：

![Azure Portal with Experiment Results](https://soshnikov.com/images/blog/AzML/AzMLPortalGANRes.PNG)

You can also do that programmatically, especially if you want to download *all* images produced during different epochs. `run` object that you have obtained during experiment submission gives you access to all files stored as part of that run, and you can download them like this:

你也可以以编程方式执行此操作，特别是要下载不同时刻生成的*所有*图像。`run`表示在实验提交期间某一刻获得的对象，允许你访问运行期间某一刻的全部文件，而且你可以运行如下的脚本下载这些文件：

```
run.download_files(prefix='outputs/samples')
```

This will create the directory `outputs/samples` inside the current directory, and download all files from remote directory with the same name.

这将在当前路径下创建一个`outputs/samples`路径，并以相同的名称下载远程路径下的全部文件。

If you have lost the reference to the specific run inside your notebook (it can happen, because most of the experiments are quite long-running), you can always create it by knowing the *run id*, which you can look up at the portal:

如果丢失了对笔记本内特定运行进程的引用（这可能会发生，因为大多数实验运行很长的时间），那么你始终可以通过Azure ML Portal上已知的*run id*来重新创建引用。

```
run = Run(experiment=exp,run_id='KeraGAN_1584082108_356cf603')
```

We can also get the models that were trained. For example, let's download the final generator model, and use it for generating a bunch of random images. We can get all filenames that are associated with the experiment, and filter out only those that represent generator models:

我们也可以获得经过训练的模型。比如，下载最终的生成器模型，并将其用于生成一组随机图片。我们可以获取与实验有关的所有文件名，然后筛选出生成器模型的文件名：

```
fnames = run.get_file_names()
fnames = filter(lambda x : x.startswith('outputs/models/gen_'),fnames)
```

They will all look like `outputs/models/gen_0.h5`, `outputs/models/gen_100.h5` and so on. We need to find out the maximum epoch number:

她们看起来类似于`outputs/models/gen_0.h5`, `outputs/models/gen_100.h5`。我们需要找出最大阶段的数：

```
no = max(map(lambda x: int(x[19:x.find('.')]), fnames))
fname = 'outputs/models/gen_{}.h5'.format(no)
fname_wout_path = fname[fname.rfind('/')+1:]
run.download_file(fname)
```

This will download the file with the highers epoch number to local directory, and also store the name of this file (w/out directory path) into `fname_wout_path`.
这将下载具有较高纪元编号的文件到本地目录，并将此文件(w/out directory path)的名称存储在`fname_wout_path`。

## Generating new Images
## 生成新图像

Once we have obtained the model, we can just need load it in Keras, find out the input size, and give the correctly sized random vector as the input to produce new random painting generated by the network:

获得模型后，我们只需要把模型加载到Keras里，找出输入大小，并给赋一个正确大小的随机矢量作为输入去生成一个新的随机绘画生成网络：

```
model = keras.models.load_model(fname_wout_path)
latent_dim=model.layers[0].input.shape[1].value
res = model.predict(np.random.normal(0,1,(10,latent_dim)))
```

Output of the generator network is in the range [-1,1], so we need to scale it linearly to the range [0,1] in order to be correctly displayed by `matplotlib`:

生成网络的输出区间为[-1,1]，因此我们需要线性缩放到区间[0,1]以便可以通过`matplotlib`准确显示：

```
res = (res+1.0)/2
fig,ax = plt.subplots(1,10,figsize=(15,10))
for i in range(10):
    ax[i].imshow(res[i])
```

Here is the result we will get: 
将会得到的结果：
![GAN Result](https://soshnikov.com/images/blog/AzML/AzMLGANPix.PNG)

Have a look at some of the best pictures produced during this experiment:
这个实验期间产生的最佳图片：

| ![Colourful Spring](https://soshnikov.com/images/artartificial/ColorfulSpring.jpg) | ![Countryside](https://soshnikov.com/images/artartificial/CountrySide.jpg) |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| *Colourful Spring*, 2020                                     | *Countryside*, 2020                                          |
| [keragan](https://github.com/shwars/keragan) trained on [WikiArt](https://www.wikiart.org/)Impressionism |                                                              |
| ![Summer Landscape](https://soshnikov.com/images/artartificial/ThruIcyGlass.jpg) | ![Summer Landscape](https://soshnikov.com/images/artartificial/SummerLandscape.jpg) |
| *Through the Icy Glass*, 2020                                | *Summer Landscape*, 2020                                     |
| [keragan](https://github.com/shwars/keragan) trained on [WikiArt](https://www.wikiart.org/) Impressionism |                                                              |

> If you want to get fresh images produced by the network every day (well, almost every day) - we (together with my daughter) have created [@art_of_artificial](http://instagram.com/art_of_artificial) Instagram account where we will post those images.

> 如果你想每天得到一张全新的来自这个生成网络的图片，我们（和我女儿一起）开通了一个Instagram账号[@art_of_artificial](http://instagram.com/art_of_artificial)来分享这些图片。

## Observing The Process of Learning
## 观察学习的过程

It is also interesting to look at the process of how GAN network gradually learns. I have explored this notion of learning in my exhibition [Art of the Artificial](https://soshnikov.com/art/artofartificial). Here are a couple of videos that show this process:

研究GAN网络逐渐学习的过程也是非常有趣的。我在[人造艺术](https://soshnikov.com/art/artofartificial)展览中有探索这种学习的概念。下面这几个视频可以为你展示这个过程：

| GAN Flower Generation          | GAN Portrait Generation        |
| ------------------------------ | ------------------------------ |
| <https://youtu.be/hnwbnt2Q9Iw> | <https://youtu.be/j2wpUFxyrEs> |

## Food for Thought
## 值得深思的问题

In this post, I have described how GAN works, and how to train it using Azure ML. This definitely opens up a lot of room for experimentation, but also a lot of room for thought. During this experiment we have created original artworks, generated by Artificial Intelligence. But can they be considered **ART**? I will discuss this in one of my next posts…
本文中，我描述了GAN是如何工作的，以及如何使用Azure ML来训练它。这无疑为实验开辟了很多的空间，同时也引发了很大的思考空间。在这个实验中，我们创造了由人工智能生成的原创艺术品，但是它们真的可以被认为是**艺术**吗？我将会在下一篇文章中进行讨论……

## Acknowledgements
##致谢

When producing [keragan](https://github.com/shwars/keragan) library, I was largely inspired by [this article](https://towardsdatascience.com/generating-modern-arts-using-generative-adversarial-network-gan-on-spell-39f67f83c7b4), and also by [DCGAN implementation](https://github.com/Maximellerbach/Car-DCGAN-Keras) by Maxime Ellerbach, and partly by [GANGogh](https://github.com/rkjones4/GANGogh) project. A lot of different GAN architectures implemented in Keras are presented [here](https://github.com/eriklindernoren/Keras-GAN).

创造[keragan](https://github.com/shwars/keragan)库的时候，我深受一些文章的启发：[this article](https://towardsdatascience.com/generating-modern-arts-using-generative-adversarial-network-gan-on-spell-39f67f83c7b4)，来自Maxime Ellerbach的[DCGAN implementation](https://github.com/Maximellerbach/Car-DCGAN-Keras)。并且有一部分来自[GANGogh](https://github.com/rkjones4/GANGogh)项目。[此处](https://github.com/eriklindernoren/Keras-GAN)介绍了Keras实现的很多不同的GAN体系架构。

## Other Posts in Azure ML Series
## 其它关于Azure ML系列的文章

- [Best Way to Start with Azure ML](https://soshnikov.com/azure/best-way-to-start-with-azureml/)
- [Using Azure ML for Hyperparameter Optimization](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/)
- **Creating Generative Art using GANs on Azure ML** (this post)

- [开始Azure ML的最佳方式](https://soshnikov.com/azure/best-way-to-start-with-azureml/)
- [使用Azure ML进行超参数优化](https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/)
- **使用Azure ML的GANs进行艺术创作** (本文)