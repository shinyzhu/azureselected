(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{321:function(e,t,a){"use strict";a.r(t);var r=a(12),n=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"creating-generative-art-using-gans-on-azure-ml"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#creating-generative-art-using-gans-on-azure-ml"}},[e._v("#")]),e._v(" Creating Generative Art using GANs on Azure ML")]),e._v(" "),t("ContentMeta"),e._v(" "),t("p",[e._v("Deep Learning can look like Magic! I get the most magical feeling when watching neural network doing something creative, for example learning to produce paintings like an artist. Technology behind this is called Generative Adversarial Networks, and in this post we will look at how to train such a network on Azure Machine Learning Service.")]),e._v(" "),t("blockquote",[t("p",[e._v("This post is a part of "),t("a",{attrs:{href:"http://aka.ms/AIApril",target:"_blank",rel:"noopener noreferrer"}},[e._v("AI April"),t("OutboundLink")],1),e._v(" initiative, where each day of April my colleagues publish new original article related to AI, Machine Learning and Microsoft. Have a look at the "),t("a",{attrs:{href:"http://aka.ms/AIApril",target:"_blank",rel:"noopener noreferrer"}},[e._v("Calendar"),t("OutboundLink")],1),e._v(" to find other interesting articles that have already been published, and keep checking that page during the month.")])]),e._v(" "),t("p",[e._v("If you have seen my previous posts on Azure ML (about "),t("a",{attrs:{href:"https://soshnikov.com/azure/best-way-to-start-with-azureml/",target:"_blank",rel:"noopener noreferrer"}},[e._v("using it from VS Code"),t("OutboundLink")],1),e._v(" and "),t("a",{attrs:{href:"https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/",target:"_blank",rel:"noopener noreferrer"}},[e._v("submitting experiments and hyperparameter optimization"),t("OutboundLink")],1),e._v("), you should know that it is quite convenient to use Azure ML for almost any training tasks. However, all examples up to now have been done using toy MNIST dataset. Today we will focus on real problem: creating artificial paintings like those:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/Flo1.jpg",alt:"Flowers"}})]),e._v(" "),t("th",[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/Port1.jpg",alt:"Portrait"}})])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("Flowers, 2019, "),t("em",[e._v("Art of the Artificial")]),e._v(" "),t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(" trained on "),t("a",{attrs:{href:"https://www.wikiart.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt"),t("OutboundLink")],1),e._v(" Flowers")]),e._v(" "),t("td",[e._v("Queen of Chaos, 2019, "),t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(" trained on "),t("a",{attrs:{href:"https://www.wikiart.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt"),t("OutboundLink")],1),e._v(" Portraits")])])])]),e._v(" "),t("p",[e._v("Those painting are produced after training the network on paintings from "),t("a",{attrs:{href:"https://www.wikiart.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt"),t("OutboundLink")],1),e._v(". If you want to reproduce the same results, you may need to collect the dataset yourself, for example by using "),t("a",{attrs:{href:"https://github.com/lucasdavid/wikiart",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt Retriever"),t("OutboundLink")],1),e._v(", or borrowing existing collections from [WikiArt Dataset](https://github.com/cs-chan/ArtGAN/blob/master/WikiArt Dataset/README.md) or "),t("a",{attrs:{href:"https://github.com/rkjones4/GANGogh",target:"_blank",rel:"noopener noreferrer"}},[e._v("GANGogh Project"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("Place images you want to train on somewhere in "),t("code",[e._v("dataset")]),e._v(" directory. For training on flowers, here is how some of those images might look like:")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://soshnikov.com/images/blog/gan_dataset_flowers.png",alt:"Flowers Dataset"}})]),e._v(" "),t("p",[e._v("We need our neural network model to learn both high-level composition of flower bouquet and a vase, as well as low-level style of painting, with smears of paint and canvas texture.")]),e._v(" "),t("h2",{attrs:{id:"generative-adversarial-networks"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generative-adversarial-networks"}},[e._v("#")]),e._v(" Generative Adversarial Networks")]),e._v(" "),t("p",[e._v("Those painting were generated using "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Generative_adversarial_network",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Generative Adversarial Network")]),t("OutboundLink")],1),e._v("), or GAN for short. In this example, we will use my simple GAN implementation in Keras called "),t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(", and I will show some simplified code parts from it.")]),e._v(" "),t("p",[e._v("GAN consists of two networks:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Generator")]),e._v(", which generates images given some input "),t("strong",[e._v("noise vector")])]),e._v(" "),t("li",[t("strong",[e._v("Discriminator")]),e._v(", whose role is to differentiate between real and “fake” (generated) paintings")])]),e._v(" "),t("p",[t("img",{attrs:{src:"https://soshnikov.com/images/blog/gan_architecture.png",alt:"GAN Architecture"}})]),e._v(" "),t("p",[e._v("Training the GAN involves the following steps:")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("Getting a bunch of generated and real images:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("noise = np.random.normal(0, 1, (batch_size, latent_dim))\ngen_imgs = generator.predict(noise)   \nimgs = get_batch(batch_size)\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Training discriminator to better differentiate between those two. Note, how we provide vector with")]),e._v(" "),t("div",{staticClass:"language-plaintext extra-class"},[t("pre",{pre:!0,attrs:{class:"language-plaintext"}},[t("code",[e._v("ones\n")])])]),t("p",[e._v("and")]),e._v(" "),t("div",{staticClass:"language-plaintext extra-class"},[t("pre",{pre:!0,attrs:{class:"language-plaintext"}},[t("code",[e._v("zeros\n")])])]),t("p",[e._v("as expected answer:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("d_loss_r = discriminator.train_on_batch(imgs, ones)\nd_loss_f = discriminator.train_on_batch(gen_imgs, zeros)\nd_loss = np.add(d_loss_r , d_loss_f)*0.5\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Training the combined model, in order to improve the generator:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("g_loss = combined.train_on_batch(noise, ones)\n")])])])])]),e._v(" "),t("p",[e._v("During this step, discriminator is not trained, because its weights are explicitly frozen during creation of combined model:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("discriminator = create_discriminator()\ngenerator = create_generator()\ndiscriminator.compile(loss='binary_crossentropy', optimizer=optimizer, \n                      metrics=['accuracy'])\ndiscriminator.trainable = False\n\nz = keras.models.Input(shape=(latent_dim,))\nimg = generator(z)\nvalid = discriminator(img)\n\ncombined = keras.models.Model(z, valid) \ncombined.compile(loss='binary_crossentropy', optimizer=optimizer)\n")])])]),t("h2",{attrs:{id:"discriminator-model"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#discriminator-model"}},[e._v("#")]),e._v(" Discriminator Model")]),e._v(" "),t("p",[e._v("To differentiate between real and fake image, we use traditional "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Convolutional_neural_network",target:"_blank",rel:"noopener noreferrer"}},[t("strong",[e._v("Convolutional Neural Network")]),t("OutboundLink")],1),e._v(" (CNN) architecture. So, for the image of size 64x64, we will have something like this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("discriminator = Sequential()\n\nfor x in [16,32,64]: # number of filters on next layer\n    discriminator.add(Conv2D(x, (3,3), strides=1, padding=\"same\"))\n    discriminator.add(AveragePooling2D())\n    discriminator.addBatchNormalization(momentum=0.8))\n    discriminator.add(LeakyReLU(alpha=0.2))\n    discriminator.add(Dropout(0.3))\n\ndiscriminator.add(Flatten())\ndiscriminator.add(Dense(1, activation='sigmoid'))\n")])])]),t("p",[e._v("We have 3 convolution layers, which do the following:")]),e._v(" "),t("ul",[t("li",[e._v("Original image of shape 64x64x3 is passed over by 16 filters, resulting in a shape 32x32x16. To decrease the size, we use "),t("code",[e._v("AveragePooling2D")]),e._v(".")]),e._v(" "),t("li",[e._v("Next step converts 32x32x16 tensor into 16x16x32")]),e._v(" "),t("li",[e._v("Finally, after the next convolution layer, we end up with tensor of shape 8x8x64.")])]),e._v(" "),t("p",[e._v("On top of this convolutional base, we put simple logistic regression classifier (AKA 1-neuron dense layer).")]),e._v(" "),t("h2",{attrs:{id:"generator-model"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generator-model"}},[e._v("#")]),e._v(" Generator Model")]),e._v(" "),t("p",[e._v("Generator model is slightly more complicated. First, imagine if we wanted to convert an image to some sort of feature vector of length "),t("code",[e._v("latent_dim=100")]),e._v(". We would use convolutional network model similar to the discriminator above, but final layer would be a dense layer with size 100.")]),e._v(" "),t("p",[e._v("Generator does the opposite — converts vector of size 100 to an image. This involves a process called "),t("strong",[e._v("deconvolution")]),e._v(", which is essentially a "),t("em",[e._v("reversed convolution")]),e._v(". Together with "),t("code",[e._v("UpSampling2D")]),e._v(" they cause the size of the tensor to increase at each layer:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('generator = Sequential()\ngenerator.add(Dense(8 * 8 * 2 * size, activation="relu", \n                                      input_dim=latent_dim))\ngenerator.add(Reshape((8, 8, 2 * size)))\n\nfor x in [64;32;16]:\n    generator.add(UpSampling2D())\n    generator.add(Conv2D(x, kernel_size=(3,3),strides=1,padding="same"))\n    generator.add(BatchNormalization(momentum=0.8))\n    generator.add(Activation("relu"))\n\ngenerator.add(Conv2D(3, kernel_size=3, padding="same"))\ngenerator.add(Activation("tanh"))\n')])])]),t("p",[e._v("At the last step, we end up with tensor size 64x64x3, which is exactly the size of the image that we need. Note that final activation function is "),t("code",[e._v("tanh")]),e._v(", which gives an output in the range of [-1;1] — which means that we need to scale original training images to this interval. All those steps for preparing images is handled by "),t("code",[e._v("ImageDataset")]),e._v(" class, and I will not go into detail there.")]),e._v(" "),t("h2",{attrs:{id:"training-script-for-azure-ml"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#training-script-for-azure-ml"}},[e._v("#")]),e._v(" Training script for Azure ML")]),e._v(" "),t("p",[e._v("Now that we have all pieces for training the GAN together, we are ready to run this code on Azure ML as an experiment!")]),e._v(" "),t("p",[e._v("There is one important thing to be noted, however: normally, when running an experiment in Azure ML, we want to track some metrics, such as accuracy or loss. We can log those values during training using "),t("code",[e._v("run.log")]),e._v(", as described in my "),t("a",{attrs:{href:"https://soshnikov.com/azure/best-way-to-start-with-azureml/",target:"_blank",rel:"noopener noreferrer"}},[e._v("previous post"),t("OutboundLink")],1),e._v(", and see how this metric changes during training on "),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure ML Portal"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("In our case, instead of numeric metric, we are interested in the visual images that our network generates at each step. Inspecting those images while experiment is running can help us decide whether we want to end our experiment, alter parameters, or continue.")]),e._v(" "),t("p",[e._v("Azure ML supports logging images in addition to numbers, as described "),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/how-to-track-experiments/?WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),t("OutboundLink")],1),e._v(". We can log either images represented as np-arrays, or any plots produced by "),t("code",[e._v("matplotlib")]),e._v(", so what we will do is plotting three sample images on one plot. This plotting will be handled in "),t("code",[e._v("callbk")]),e._v(" callback function that gets called by "),t("code",[e._v("keragan")]),e._v(" after each training epoch:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('def callbk(tr):\n    if tr.gan.epoch % 20 == 0:\n        res = tr.gan.sample_images(n=3)\n        fig,ax = plt.subplots(1,len(res))\n        for i,v in enumerate(res):\n            ax[i].imshow(v[0])\n        run.log_image("Sample",plot=plt)\n')])])]),t("p",[e._v("So, the actual training code will look like this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("gan = keragan.DCGAN(args)\nimsrc = keragan.ImageDataset(args)\nimsrc.load()\ntrain = keragan.GANTrainer(image_dataset=imsrc,gan=gan,args=args)\n\ntrain.train(callbk)\n")])])]),t("p",[e._v("Note that "),t("code",[e._v("keragan")]),e._v(" supports automatic parsing of many command-line parameters that we can pass to it through "),t("code",[e._v("args")]),e._v(" structure, and that is what makes this code so simple.")]),e._v(" "),t("h2",{attrs:{id:"starting-the-experiment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#starting-the-experiment"}},[e._v("#")]),e._v(" Starting the Experiment")]),e._v(" "),t("p",[e._v("To submit the experiment to Azure ML, we will use the code similar to the one discussed in the "),t("a",{attrs:{href:"https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/",target:"_blank",rel:"noopener noreferrer"}},[e._v("previous post on Azure ML"),t("OutboundLink")],1),e._v(". The code is located inside [submit_gan.ipynb][https://github.com/CloudAdvocacy/AzureMLStarter/blob/master/submit_gan.ipynb], and it starts with familiar steps:")]),e._v(" "),t("ul",[t("li",[e._v("Connecting to the Workspace using "),t("code",[e._v("ws = Workspace.from_config()")])]),e._v(" "),t("li",[e._v("Connecting to the Compute cluster: "),t("code",[e._v("cluster = ComputeTarget(workspace=ws, name='My Cluster')")]),e._v(". Here we need a cluster of GPU-enabled VMs, such as "),t("a",{attrs:{href:"https://docs.microsoft.com/azure/virtual-machines/sizes-gpu/?WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[e._v("NC6"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("li",[e._v("Uploading our dataset to the default datastore in the ML Workspace")])]),e._v(" "),t("p",[e._v("After that has been done, we can submit the experiment using the following code:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("exp = Experiment(workspace=ws, name='KeraGAN')\nscript_params = {\n    '--path': ws.get_default_datastore(),\n    '--dataset' : 'faces',\n    '--model_path' : './outputs/models',\n    '--samples_path' : './outputs/samples',\n    '--batch_size' : 32,\n    '--size' : 512,\n    '--learning_rate': 0.0001,\n    '--epochs' : 10000\n}\nest = TensorFlow(source_directory='.',\n    script_params=script_params,\n    compute_target=cluster,\n    entry_script='train_gan.py',\n    use_gpu = True,\n    conda_packages=['keras','tensorflow','opencv','tqdm','matplotlib'],\n    pip_packages=['git+https://github.com/shwars/keragan@v0.0.1']\n\nrun = exp.submit(est)\n")])])]),t("p",[e._v("In our case, we pass "),t("code",[e._v("model_path=./outputs/models")]),e._v(" and "),t("code",[e._v("samples_path=./outputs/samples")]),e._v(" as parameters, which will cause models and samples generated during training to be written to corresponding directories inside Azure ML experiment. Those files will be available through Azure ML Portal, and can also be downloaded programmatically afterwards (or even during training).")]),e._v(" "),t("p",[e._v("To create the estimator that can run on GPU without problems, we use built-in "),t("a",{attrs:{href:"https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.dnn.tensorflow?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("Tensorflow")]),t("OutboundLink")],1),e._v(" estimator. It is very similar to generic "),t("a",{attrs:{href:"https://docs.microsoft.com/python/api/azureml-train-core/azureml.train.estimator.estimator?view=azure-ml-py&WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[t("code",[e._v("Estimator")]),t("OutboundLink")],1),e._v(", but also provides some out-of-the-box options for distributed training. You can read more about using different estimators "),t("a",{attrs:{href:"https://docs.microsoft.com/azure/machine-learning/how-to-train-ml-models?WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[e._v("in the official documentation"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("Another interesting point here is how we install "),t("code",[e._v("keragan")]),e._v(" library — directly from GitHub. While we can also install it from PyPI repository, I wanted to demonstrate you that direct installation from GitHub is also supported, and you can even indicate a specific version of the library, tag or commit ID.")]),e._v(" "),t("p",[e._v("After the experiment has been running for some time, we should be able to observe the sample images being generated in the "),t("a",{attrs:{href:"http://ml.azure.com/?WT.mc_id=aiapril-blog-dmitryso",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure ML Portal"),t("OutboundLink")],1),e._v(":")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://soshnikov.com/images/blog/AzML/AzMLPortalGAN.PNG",alt:"GAN Training Experiment Results"}})]),e._v(" "),t("h2",{attrs:{id:"running-many-experiments"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#running-many-experiments"}},[e._v("#")]),e._v(" Running Many Experiments")]),e._v(" "),t("p",[e._v("The first time we run GAN training, we might not get excellent results, for several reasons. First of all, learning rate seems to be an important parameter, and too high learning rate might lead to poor results. Thus, for best results we might need to perform a number of experiments.")]),e._v(" "),t("p",[e._v("Parameters that we might want to vary are the following:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("--size")]),e._v(" determines the size of the picture, which should be power of 2. Small sizes like 64 or 128 allow for fast exprimentation, while large sizes (up to 1024) are good for creating higher quality images. Anything above 1024 will likely not produce good results, because special techniques are required to train large resolutions GANs, such as "),t("a",{attrs:{href:"https://arxiv.org/abs/1710.10196",target:"_blank",rel:"noopener noreferrer"}},[e._v("progressive growing"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("code",[e._v("--learning_rate")]),e._v(" is surprisingly quite an important parameter, especially with higher resolutions. Smaller learning rate typically gives better results, but training happens very slowly.")]),e._v(" "),t("li",[t("code",[e._v("--dateset")]),e._v(". We might want to upload pictures of different styles into different folders in the Azure ML datastore, and start training multiple experiments simultaneously.")])]),e._v(" "),t("p",[e._v("Since we already know how to submit the experiment programmatically, it should be easy to wrap that code into a couple of "),t("code",[e._v("for")]),e._v("-loops to perform some parametric sweep. You may then check manually through Azure ML Portal which experiments are on their way to good results, and terminate all other experiments to save costs. Having a cluster of a few VMs gives you the freedom to start a few experiments at the same time without waiting.")]),e._v(" "),t("h2",{attrs:{id:"getting-experiment-results"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-experiment-results"}},[e._v("#")]),e._v(" Getting Experiment Results")]),e._v(" "),t("p",[e._v("Once you are happy with results, it makes sense to get the results of the training in the form or model files and sample images. I have mentioned that during the training our training script stored models in "),t("code",[e._v("outputs/models")]),e._v(" directory, and sample images — to "),t("code",[e._v("outputs/samples")]),e._v(". You can browse those directories in the Azure ML Portal and download the files that you like manually:")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://soshnikov.com/images/blog/AzML/AzMLPortalGANRes.PNG",alt:"Azure Portal with Experiment Results"}})]),e._v(" "),t("p",[e._v("You can also do that programmatically, especially if you want to download "),t("em",[e._v("all")]),e._v(" images produced during different epochs. "),t("code",[e._v("run")]),e._v(" object that you have obtained during experiment submission gives you access to all files stored as part of that run, and you can download them like this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("run.download_files(prefix='outputs/samples')\n")])])]),t("p",[e._v("This will create the directory "),t("code",[e._v("outputs/samples")]),e._v(" inside the current directory, and download all files from remote directory with the same name.")]),e._v(" "),t("p",[e._v("I you have lost the reference to the specific run inside your notebook (it can happen, because most of the experiments are quite long-running), you can always create it by knowing the "),t("em",[e._v("run id")]),e._v(", which you can look up at the portal:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("run = Run(experiment=exp,run_id='KeraGAN_1584082108_356cf603')\n")])])]),t("p",[e._v("We can also get the models that were trained. For example, let’s download the final generator model, and use it for generating a bunch of random images. We can get all filenames that are associated with the experiment, and filter out only those that represent generator models:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("fnames = run.get_file_names()\nfnames = filter(lambda x : x.startswith('outputs/models/gen_'),fnames)\n")])])]),t("p",[e._v("They will all look like "),t("code",[e._v("outputs/models/gen_0.h5")]),e._v(", "),t("code",[e._v("outputs/models/gen_100.h5")]),e._v(" and so on. We need to find out the maximum epoch number:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("no = max(map(lambda x: int(x[19:x.find('.')]), fnames))\nfname = 'outputs/models/gen_{}.h5'.format(no)\nfname_wout_path = fname[fname.rfind('/')+1:]\nrun.download_file(fname)\n")])])]),t("p",[e._v("This will download the file with the highers epoch number to local directory, and also store the name of this file (w/out directory path) into "),t("code",[e._v("fname_wout_path")]),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"generating-new-images"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generating-new-images"}},[e._v("#")]),e._v(" Generating new Images")]),e._v(" "),t("p",[e._v("Once we have obtained the model, we can just need load it in Keras, find out the input size, and give the correctly sized random vector as the input to produce new random painting generated by the network:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("model = keras.models.load_model(fname_wout_path)\nlatent_dim=model.layers[0].input.shape[1].value\nres = model.predict(np.random.normal(0,1,(10,latent_dim)))\n")])])]),t("p",[e._v("Output of the generator network is in the range [-1,1], so we need to scale it linearly to the range [0,1] in order to be correctly displayed by "),t("code",[e._v("matplotlib")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("res = (res+1.0)/2\nfig,ax = plt.subplots(1,10,figsize=(15,10))\nfor i in range(10):\n    ax[i].imshow(res[i])\n")])])]),t("p",[e._v("Here is the result we will get: "),t("img",{attrs:{src:"https://soshnikov.com/images/blog/AzML/AzMLGANPix.PNG",alt:"GAN Result"}})]),e._v(" "),t("p",[e._v("Have a look at some of the best pictures produced during this experiment:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/ColorfulSpring.jpg",alt:"Colourful Spring"}})]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/CountrySide.jpg",alt:"Countryside"}})])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[t("em",[e._v("Colourful Spring")]),e._v(", 2020")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("em",[e._v("Countryside")]),e._v(", 2020")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(" trained on "),t("a",{attrs:{href:"https://www.wikiart.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt"),t("OutboundLink")],1),e._v("Impressionism")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}})]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/ThruIcyGlass.jpg",alt:"Summer Landscape"}})]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("img",{attrs:{src:"https://soshnikov.com/images/artartificial/SummerLandscape.jpg",alt:"Summer Landscape"}})])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[t("em",[e._v("Through the Icy Glass")]),e._v(", 2020")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("em",[e._v("Summer Landscape")]),e._v(", 2020")])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(" trained on "),t("a",{attrs:{href:"https://www.wikiart.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("WikiArt"),t("OutboundLink")],1),e._v(" Impressionism")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}})])])]),e._v(" "),t("blockquote",[t("p",[e._v("If you want to get fresh images produced by the network every day (well, almost every day) - we (together with my daughter) have created "),t("a",{attrs:{href:"http://instagram.com/art_of_artificial",target:"_blank",rel:"noopener noreferrer"}},[e._v("@art_of_artificial"),t("OutboundLink")],1),e._v(" Instagram account where we will post those images.")])]),e._v(" "),t("h2",{attrs:{id:"observing-the-process-of-learning"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#observing-the-process-of-learning"}},[e._v("#")]),e._v(" Observing The Process of Learning")]),e._v(" "),t("p",[e._v("It is also interesting to look at the process of how GAN network gradually learns. I have explored this notion of learning in my exhibition "),t("a",{attrs:{href:"https://soshnikov.com/art/artofartificial",target:"_blank",rel:"noopener noreferrer"}},[e._v("Art of the Artificial"),t("OutboundLink")],1),e._v(". Here are a couple of videos that show this process:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("GAN Flower Generation")]),e._v(" "),t("th",[e._v("GAN Portrait Generation")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[t("a",{attrs:{href:"https://youtu.be/hnwbnt2Q9Iw",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://youtu.be/hnwbnt2Q9Iw"),t("OutboundLink")],1)]),e._v(" "),t("td",[t("a",{attrs:{href:"https://youtu.be/j2wpUFxyrEs",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://youtu.be/j2wpUFxyrEs"),t("OutboundLink")],1)])])])]),e._v(" "),t("h2",{attrs:{id:"food-for-thought"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#food-for-thought"}},[e._v("#")]),e._v(" Food for Thought")]),e._v(" "),t("p",[e._v("In this post, I have described how GAN works, and how to train it using Azure ML. This definitely opens up a lot of room for experimentation, but also a lot of room for thought. During this experiment we have created original artworks, generated by Artificial Intelligence. But can they be considered "),t("strong",[e._v("ART")]),e._v("? I will discuss this in one of my next posts…")]),e._v(" "),t("h2",{attrs:{id:"acknowledgements"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#acknowledgements"}},[e._v("#")]),e._v(" Acknowledgements")]),e._v(" "),t("p",[e._v("When producing "),t("a",{attrs:{href:"https://github.com/shwars/keragan",target:"_blank",rel:"noopener noreferrer"}},[e._v("keragan"),t("OutboundLink")],1),e._v(" library, I was largely inspired by "),t("a",{attrs:{href:"https://towardsdatascience.com/generating-modern-arts-using-generative-adversarial-network-gan-on-spell-39f67f83c7b4",target:"_blank",rel:"noopener noreferrer"}},[e._v("this article"),t("OutboundLink")],1),e._v(", and also by "),t("a",{attrs:{href:"https://github.com/Maximellerbach/Car-DCGAN-Keras",target:"_blank",rel:"noopener noreferrer"}},[e._v("DCGAN implementation"),t("OutboundLink")],1),e._v(" by Maxime Ellerbach, and partly by "),t("a",{attrs:{href:"https://github.com/rkjones4/GANGogh",target:"_blank",rel:"noopener noreferrer"}},[e._v("GANGogh"),t("OutboundLink")],1),e._v(" project. A lot of different GAN architectures implemented in Keras are presented "),t("a",{attrs:{href:"https://github.com/eriklindernoren/Keras-GAN",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"other-posts-in-azure-ml-series"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#other-posts-in-azure-ml-series"}},[e._v("#")]),e._v(" Other Posts in Azure ML Series")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://soshnikov.com/azure/best-way-to-start-with-azureml/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Best Way to Start with Azure ML"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("a",{attrs:{href:"https://soshnikov.com/azure/using-azureml-for-hyperparameter-optimization/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Using Azure ML for Hyperparameter Optimization"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("strong",[e._v("Creating Generative Art using GANs on Azure ML")]),e._v(" (this post)")])])],1)}),[],!1,null,null,null);t.default=n.exports}}]);