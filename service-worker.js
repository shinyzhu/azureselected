/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6335fdbc9ee5df8f450ac1e53d521a11"
  },
  {
    "url": "assets/css/0.styles.0ef7dd12.css",
    "revision": "67b887a0763944c54ac3a3ff84d58d6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5672e093.js",
    "revision": "d56ec222bcad25f364df745e5ae1a215"
  },
  {
    "url": "assets/js/11.864ac900.js",
    "revision": "a03cba507a6800f21accfc9afc362b87"
  },
  {
    "url": "assets/js/12.be25e572.js",
    "revision": "33c967c56713077648ae69bc2121d7ac"
  },
  {
    "url": "assets/js/13.dc91c473.js",
    "revision": "c0ee3e3f92fc760d383f591fd00d91c3"
  },
  {
    "url": "assets/js/14.ea6cb504.js",
    "revision": "76a5e2df603db4e8e8076dfbce8f88d3"
  },
  {
    "url": "assets/js/15.df82ccb9.js",
    "revision": "f17b33076026cc213ba3c7b4348c3143"
  },
  {
    "url": "assets/js/16.c94077be.js",
    "revision": "f59370b7f7fec2f7783d5c97d4f17026"
  },
  {
    "url": "assets/js/17.30499810.js",
    "revision": "af4fe1fac048261843dd182b90fcacfe"
  },
  {
    "url": "assets/js/18.b924a796.js",
    "revision": "1b1a82d46b060b0497308d452dedad4d"
  },
  {
    "url": "assets/js/19.c2cbcc7a.js",
    "revision": "f829e329621be4ec79d38302f873a494"
  },
  {
    "url": "assets/js/2.8d021b4d.js",
    "revision": "ec08ecb27746aa07b2ce2b43f759d6ff"
  },
  {
    "url": "assets/js/20.544a5e2a.js",
    "revision": "11d4ce2cb32c910df0bf2137cade018c"
  },
  {
    "url": "assets/js/21.c4b8f6b4.js",
    "revision": "31b40bf47b1d9fd3824ffde7c25e7b2b"
  },
  {
    "url": "assets/js/22.85eb1028.js",
    "revision": "3b232aad6dbaaaeeb54941b6dcd1f7a4"
  },
  {
    "url": "assets/js/23.54224729.js",
    "revision": "d0a038da9dc41cc38ee73b0fafa8622b"
  },
  {
    "url": "assets/js/24.ec8e8123.js",
    "revision": "cbe45ea39e4ab4b48cb7617d0ce2179d"
  },
  {
    "url": "assets/js/25.3dbc14be.js",
    "revision": "8000f0fad0e1d9f9b179671da114c5de"
  },
  {
    "url": "assets/js/26.147da5d0.js",
    "revision": "ac274645266918006d07328886f48b9b"
  },
  {
    "url": "assets/js/27.897a949b.js",
    "revision": "b1f552c89a8edf1832044d2547503576"
  },
  {
    "url": "assets/js/28.ab337682.js",
    "revision": "4b542fa45299cf21168fb476c181bcd9"
  },
  {
    "url": "assets/js/29.174cc67e.js",
    "revision": "77cd5846d6391d5d6f6454e079914a8b"
  },
  {
    "url": "assets/js/3.32c85e2e.js",
    "revision": "747bb16f6e20b1657abe261eefffb53b"
  },
  {
    "url": "assets/js/30.18b56bd6.js",
    "revision": "c26cd459c13319f8b02831adb7c33cb3"
  },
  {
    "url": "assets/js/31.471b129d.js",
    "revision": "9b74fa7743825c9c80990f3b5c5244eb"
  },
  {
    "url": "assets/js/32.40e51d05.js",
    "revision": "acf88da4e461bea97c7b607cb46567cb"
  },
  {
    "url": "assets/js/33.5acbc493.js",
    "revision": "296f9583b638c53df1f604225582d851"
  },
  {
    "url": "assets/js/34.3a79c813.js",
    "revision": "ceb18aa91e5bed4cc659d4016ff6d9dd"
  },
  {
    "url": "assets/js/35.039f16cf.js",
    "revision": "112139e42fa3fdc2871ac3757f5fe88f"
  },
  {
    "url": "assets/js/36.a991d355.js",
    "revision": "d8bc47b613028de9878debcb0e0664a9"
  },
  {
    "url": "assets/js/37.36ecad37.js",
    "revision": "e0fd4673826c9d60e13b990f53f434da"
  },
  {
    "url": "assets/js/38.126ec78f.js",
    "revision": "f945b96bf632fc630ca901ed6b3a0ff7"
  },
  {
    "url": "assets/js/39.845abfb4.js",
    "revision": "f13cbcd5f6f8e78db45009e983e5808b"
  },
  {
    "url": "assets/js/4.d941c314.js",
    "revision": "fad146437c6820499306fb1c62045a1f"
  },
  {
    "url": "assets/js/40.fa994d3c.js",
    "revision": "af0d6d210947cf9a08cf7d92109bc818"
  },
  {
    "url": "assets/js/41.806501cd.js",
    "revision": "f8971fe4a574031df83d21e5742f0c80"
  },
  {
    "url": "assets/js/42.c25def53.js",
    "revision": "ffdb999fe308e166bba327dbfc58d5ea"
  },
  {
    "url": "assets/js/43.92f5ad75.js",
    "revision": "561aaa8611e380ca90ea2ceb1505b829"
  },
  {
    "url": "assets/js/44.b4150448.js",
    "revision": "61e3047ccd06ecec03a89b1581069b56"
  },
  {
    "url": "assets/js/45.76898265.js",
    "revision": "e5d5172c432ecccd27330bf51f6adb5d"
  },
  {
    "url": "assets/js/46.9567cc75.js",
    "revision": "3704f9000b17f029811e4d2e730ef1de"
  },
  {
    "url": "assets/js/47.6e3f6f7b.js",
    "revision": "53db247eb584a72bb471c538a0f77e25"
  },
  {
    "url": "assets/js/48.0aab1ef5.js",
    "revision": "b2f258b176abaf1388ed81b5150a0277"
  },
  {
    "url": "assets/js/49.d2e18a13.js",
    "revision": "5544c4d31599fb01560252397018c238"
  },
  {
    "url": "assets/js/5.554b9b17.js",
    "revision": "3cbb22619d21f3762e4cb1300626e3b9"
  },
  {
    "url": "assets/js/50.abfc31f4.js",
    "revision": "e85bd82072e17aa7aff56124f4107ef5"
  },
  {
    "url": "assets/js/51.d0dc7856.js",
    "revision": "a3468fbf40e8e3429679ba4c0e0fdb87"
  },
  {
    "url": "assets/js/52.6ca21436.js",
    "revision": "3694f64f4a2655e293d585df3b0adb7b"
  },
  {
    "url": "assets/js/53.2017e103.js",
    "revision": "848a2e348d642eb300f357b0fc462678"
  },
  {
    "url": "assets/js/54.30dd48a8.js",
    "revision": "fdc9c3c09dadf8a17b43441c505e3caf"
  },
  {
    "url": "assets/js/55.4040c71d.js",
    "revision": "a2fa60c5b6d3e2fa7117ac54954c78fd"
  },
  {
    "url": "assets/js/56.03d47ef0.js",
    "revision": "8ba59200ad162e0adcc784e27a3ab851"
  },
  {
    "url": "assets/js/57.d0a35b71.js",
    "revision": "3f6ebcaaf88334be12b7680b4ca410c3"
  },
  {
    "url": "assets/js/58.4132889d.js",
    "revision": "23d04fe35eb25b0bf107c594bdbb104c"
  },
  {
    "url": "assets/js/59.588c8a6e.js",
    "revision": "a64e3dee08dcba212dec235b39d5e521"
  },
  {
    "url": "assets/js/6.cf5c7aeb.js",
    "revision": "4ba276c3954d861d099ea856d716d9c7"
  },
  {
    "url": "assets/js/60.865c0573.js",
    "revision": "9c492f24a466e7a87787dc7ed26c9e54"
  },
  {
    "url": "assets/js/61.ee38e38c.js",
    "revision": "142b9a29d184d8a09c186dac29a3b497"
  },
  {
    "url": "assets/js/62.1b7853e1.js",
    "revision": "3a946978077324ae64e42a614a220781"
  },
  {
    "url": "assets/js/63.8a7f0932.js",
    "revision": "639ece9cebcdf642b2655a389ec2898d"
  },
  {
    "url": "assets/js/7.4820b7ff.js",
    "revision": "a7375f31b095fd4675d32167f5b19621"
  },
  {
    "url": "assets/js/8.77f01ec8.js",
    "revision": "4295be3d26b23954fb4ef8cd155b2d69"
  },
  {
    "url": "assets/js/9.27b0a692.js",
    "revision": "2432f6cc9c4e03f6b698bcab715b6b5b"
  },
  {
    "url": "assets/js/app.413a610c.js",
    "revision": "d04211fb914a755b8341299cc5141ec2"
  },
  {
    "url": "CODE_OF_CONDUCT.html",
    "revision": "24b363f9c7d997d34aca85c837a898bb"
  },
  {
    "url": "content/cloud-advocate/2019-12/deploying-java-ee-apps-to-azure-part-1.html",
    "revision": "3013671582c991f97fbbd635d651f6cc"
  },
  {
    "url": "content/cloud-advocate/2019-12/getting-the-latest-array-item-with-inline-script-in-logic-app.html",
    "revision": "9e20be47a5ad58090a6499edc7f97ba7"
  },
  {
    "url": "content/cloud-advocate/2019-12/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse.html",
    "revision": "5edb1d7b41a7e0f9300ce8c66a29b5aa"
  },
  {
    "url": "content/cloud-advocate/2019-12/what-i-learned-about-azure-arc-and-other-services-at-microsoft-ignite-2019.html",
    "revision": "f27303d235f202d35d1258f0111c6d1b"
  },
  {
    "url": "content/cloud-advocate/2020-01/can-you-use-blazor-for-only-part-of-an-app.html",
    "revision": "a2cf0ab05618839710cd865d401f0300"
  },
  {
    "url": "content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-2.html",
    "revision": "3cbeea13210b7ca0757bd73ad6ac8933"
  },
  {
    "url": "content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-3.html",
    "revision": "5efb361cb930df72778c7bc2a4bea910"
  },
  {
    "url": "content/cloud-advocate/2020-01/how-to-learn-microsoft-azure-in-2020.html",
    "revision": "562f9f1a0fcaceed636912c418ab542d"
  },
  {
    "url": "content/cloud-advocate/2020-01/managing-security-with-azure-lighthouse-and-azure-arc.html",
    "revision": "d8dc37543b59f5dcfde6628041a48749"
  },
  {
    "url": "content/cloud-advocate/2020-02/how-to-reduce-the-costs-of-your-azure-iaas-vms.html",
    "revision": "f1e6515734382e86ee97530398c729c0"
  },
  {
    "url": "content/cloud-advocate/2020-02/how-to-use-github-actions-to-deploy-an-azure-virtual-machine.html",
    "revision": "4ee5a3ab3a63e994512d924067f44ac2"
  },
  {
    "url": "content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "5836329162097462dbbbec81f774871f"
  },
  {
    "url": "content/cloud-advocate/2020-02/the-secret-art-of-debugging.html",
    "revision": "aac549d4a8f3ab7a0b04a4f4d4f08c50"
  },
  {
    "url": "content/cloud-advocate/2020-03/9-advanced-tips-for-production-machine-learning.html",
    "revision": "6bd3852f8e1294273834eff1e0f94164"
  },
  {
    "url": "content/cloud-advocate/2020-03/a-modern-developer-s-workflow-for-twine.html",
    "revision": "7fc6cff85fa59e2ca4f374c1fbafad3d"
  },
  {
    "url": "content/cloud-advocate/2020-03/create-your-first-model-with-azure-custom-vision-and-python.html",
    "revision": "617af25c06ab94cb178b9be60892eb47"
  },
  {
    "url": "content/cloud-advocate/2020-03/getting-started-with-azureml-notebook-vms.html",
    "revision": "8f858a3b80d27792b30c8830a10cab5d"
  },
  {
    "url": "content/cloud-advocate/2020-04/creating-generative-art-using-gan-on-azureml.html",
    "revision": "c78f64822ed1ee6f5fa25513324d695d"
  },
  {
    "url": "content/cloud-advocate/2020-05/build-aspnet-apps-with-dotnet-framework.html",
    "revision": "5fdbdacc1b5d649e04a7cb9d1ac747d8"
  },
  {
    "url": "content/cloud-advocate/2020-05/build-test-and-deploy-dotnet-core-apps.html",
    "revision": "5f0835e43446d8f14a20533e7cc7fa31"
  },
  {
    "url": "content/cloud-advocate/2020-05/great-new-features-in-c-for-a-returning-net-dev.html",
    "revision": "14e064190ecceb7ad62da16cf4f80eb7"
  },
  {
    "url": "content/cloud-advocate/how-to-sync-azure-blob-storage-with-azcopy.html",
    "revision": "a9b09681e346f34fe6cbd58b2d0ea2ad"
  },
  {
    "url": "content/index.html",
    "revision": "f3bdebcdf133026487382a656e8eaef0"
  },
  {
    "url": "CONTRIBUTING.html",
    "revision": "c26707e220741d6d8b7c8f8bd37e2bce"
  },
  {
    "url": "img/azure-bit.png",
    "revision": "162128b495a62b636fb9f217ecd71785"
  },
  {
    "url": "img/logo_azure.svg",
    "revision": "ee96dfb4ed5fa38ab074f7e6257f2250"
  },
  {
    "url": "index.html",
    "revision": "6635736271a1a0e4b79c5719dab965b0"
  },
  {
    "url": "LICENSE.html",
    "revision": "5cead2abc09ab5e4d8ef58a799cb77a2"
  },
  {
    "url": "tags.html",
    "revision": "cd2c7bd8ba96b2fff2ecc7bc9f4b8940"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2019-12/deploying-java-ee-apps-to-azure-part-1.html",
    "revision": "95a07c8eeeacfaafadf3ec8b65243f16"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2019-12/getting-the-latest-array-item-with-inline-script-in-logic-app.html",
    "revision": "0aae3c75f43799e71c739b5fae4f5222"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/can-you-use-blazor-for-only-part-of-an-app.html",
    "revision": "4c65d1fa2b576133ee63c976d0bd0c06"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-2.html",
    "revision": "d69b665d88305349ba4cc99c6d21525d"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-3.html",
    "revision": "6a9371e413d8d76cce2ddbf02d5c790d"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/how-to-learn-microsoft-azure-in-2020.html",
    "revision": "a1f3967f3f87a9475bba74dd0609f573"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/managing-security-with-azure-lighthouse-and-azure-arc.html",
    "revision": "d1f5f1b76a8ccbfca611ce3307f8e83c"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/how-to-reduce-the-costs-of-your-azure-iaas-vms.html",
    "revision": "c0d2634757981d36fd12833fb1ccae1d"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/how-to-use-github-actions-to-deploy-an-azure-virtual-machine.html",
    "revision": "060d0eb61df5c5f34d0569a2d5a98e02"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "4be9618ea06fcddd20e6158838bd2773"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/the-secret-art-of-debugging.html",
    "revision": "92cc695d50951cfd00fa6452421d9d97"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/a-modern-developer-s-workflow-for-twine.html",
    "revision": "f1659061b243bdbcc4bf026459876e6d"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/create-your-first-model-with-azure-custom-vision-and-python.html",
    "revision": "1d3db0d6398a413a9faf4bbd12e47279"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/getting-started-with-azureml-notebook-vms.html",
    "revision": "88cd6db85f6fdbdead472fb4d786f6cb"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-04/creating-generative-art-using-gan-on-azureml.html",
    "revision": "d4150d3ab804dd8fc5256c45e38b47f6"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-05/great-new-features-in-c-for-a-returning-net-dev.html",
    "revision": "edcc436afa87231517e48a25374c61e6"
  },
  {
    "url": "zh-cn/content/cloud-advocate/how-to-sync-azure-blob-storage-with-azcopy.html",
    "revision": "8a34a25f551aca5420f7a76fe7600d27"
  },
  {
    "url": "zh-cn/content/index.html",
    "revision": "ffbe5dc6c9b8fc1a58957ea45d3cc35a"
  },
  {
    "url": "zh-cn/index.html",
    "revision": "f83a0bc0315c06bf56baa04de5297d78"
  },
  {
    "url": "zh-cn/tags.html",
    "revision": "34a7e54d03ccf3e830ae8317047db8e8"
  },
  {
    "url": "zh-tw/content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "2ce1e3bd209e39e1243102d44aa7af23"
  },
  {
    "url": "zh-tw/content/index.html",
    "revision": "ec5810cfb068fbc506cfe329c2058b5d"
  },
  {
    "url": "zh-tw/index.html",
    "revision": "23a779d8dcd8b58eb8f63928369d7306"
  },
  {
    "url": "zh-tw/tags.html",
    "revision": "59dcbd830d79fe49736ade920b079fc1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
