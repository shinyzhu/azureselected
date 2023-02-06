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
    "revision": "9f8d8b70693ff968251e9a55520d40a0"
  },
  {
    "url": "assets/css/0.styles.fe1e9048.css",
    "revision": "67b887a0763944c54ac3a3ff84d58d6c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.fa73f6fc.js",
    "revision": "2c5458f70d7e334c690ea996332a750a"
  },
  {
    "url": "assets/js/11.e07babbc.js",
    "revision": "dd5e385eb36a32a95e50de4c98c20402"
  },
  {
    "url": "assets/js/12.12214fd4.js",
    "revision": "78b76fd64d3bbdb63d4b66b2d3bb04a1"
  },
  {
    "url": "assets/js/13.b7275e3f.js",
    "revision": "b9fc8534925abf9cc62a5390a2a58fd0"
  },
  {
    "url": "assets/js/14.d6b8a728.js",
    "revision": "3c7b8b0054d38ad5bf930ad8b14a8c7f"
  },
  {
    "url": "assets/js/15.31a19f47.js",
    "revision": "936f2d7cfd33264f997f8abfe0b9fad4"
  },
  {
    "url": "assets/js/16.c3ccb867.js",
    "revision": "3f6b4b0617300d5465587a14df36400b"
  },
  {
    "url": "assets/js/17.7d290d04.js",
    "revision": "2aec4de4e0a2c6b7b616fd12d02c07f3"
  },
  {
    "url": "assets/js/18.4cc5d13c.js",
    "revision": "967869944c70c2542bf2755ce3471d6b"
  },
  {
    "url": "assets/js/19.01296b5f.js",
    "revision": "05b462fb6346c5b42fb1bcdcaee4d743"
  },
  {
    "url": "assets/js/2.8d021b4d.js",
    "revision": "ec08ecb27746aa07b2ce2b43f759d6ff"
  },
  {
    "url": "assets/js/20.84db9ad2.js",
    "revision": "5dfc7c09e2d7b38cdcf7e62b85f6e34a"
  },
  {
    "url": "assets/js/21.6a1d22b6.js",
    "revision": "5ed0a38acf19981b9e27829adfef4fd8"
  },
  {
    "url": "assets/js/22.b38195a7.js",
    "revision": "8793dc5708d3837d6c94ce7abb8b7ca2"
  },
  {
    "url": "assets/js/23.53dea98b.js",
    "revision": "3ce48144f42411a2bedeccd7aa2a36ac"
  },
  {
    "url": "assets/js/24.67816702.js",
    "revision": "491832448bb4a7857b91985b6d3bf3ab"
  },
  {
    "url": "assets/js/25.8e0307d1.js",
    "revision": "dfc68c47d6af00e940d97eb4f08d8fe8"
  },
  {
    "url": "assets/js/26.fb128a8f.js",
    "revision": "eb77e978d84b96bea1a414d20aaf7ad2"
  },
  {
    "url": "assets/js/27.e8b0b7a9.js",
    "revision": "4157cf0ae52d59053caf0791f3d1681b"
  },
  {
    "url": "assets/js/28.e625e9de.js",
    "revision": "883fef6931d92d732eb822baf2c4adeb"
  },
  {
    "url": "assets/js/29.aeb087ba.js",
    "revision": "e2700fd3b07daf64976bb84f5509a3b9"
  },
  {
    "url": "assets/js/3.32c85e2e.js",
    "revision": "747bb16f6e20b1657abe261eefffb53b"
  },
  {
    "url": "assets/js/30.8ef68534.js",
    "revision": "3d8eafe07b4d004c571c809fe01749f4"
  },
  {
    "url": "assets/js/31.6b43ffde.js",
    "revision": "ef14e425ce151d05aa271e2cc0a04249"
  },
  {
    "url": "assets/js/32.b2f60498.js",
    "revision": "590fe46088993745b7294542aee51780"
  },
  {
    "url": "assets/js/33.ef0db925.js",
    "revision": "b075b5895a497acf75000ba651cee8b6"
  },
  {
    "url": "assets/js/34.c990c7e7.js",
    "revision": "62d393ced6fcdf225a52a53a04b070d2"
  },
  {
    "url": "assets/js/35.177548dd.js",
    "revision": "bfe834f845bcfc98bbab87b2fef5b1de"
  },
  {
    "url": "assets/js/36.be924c7e.js",
    "revision": "0c9d37e061123aa26a62cf6adbf95bfa"
  },
  {
    "url": "assets/js/37.c4a329a3.js",
    "revision": "55bd3038483d17b0a66e27af5b7f7574"
  },
  {
    "url": "assets/js/38.88502f70.js",
    "revision": "bce20519c5ef10302063d11eb0fb603a"
  },
  {
    "url": "assets/js/39.b70a599f.js",
    "revision": "9242eebbf4809668a28f3f5188dc907e"
  },
  {
    "url": "assets/js/4.f7cbda98.js",
    "revision": "9e3205c4651852fa706ffb3c1e9bfa54"
  },
  {
    "url": "assets/js/40.af1f7c88.js",
    "revision": "2235f1fbbaec4e710b4dc0364ce4dee7"
  },
  {
    "url": "assets/js/41.09f3637f.js",
    "revision": "f1ace5b073cb4cd2b7fbde9da26486ad"
  },
  {
    "url": "assets/js/42.91268a34.js",
    "revision": "c31f2cffe38a1983680447cdacf981a9"
  },
  {
    "url": "assets/js/43.8bc4e597.js",
    "revision": "8ede8f543205b89c05484df1741be22f"
  },
  {
    "url": "assets/js/44.e75fe39d.js",
    "revision": "af115212d393a2161a38f0ca99b78a3f"
  },
  {
    "url": "assets/js/45.36f7e780.js",
    "revision": "70a5143b94afa80ebca757ec5198293c"
  },
  {
    "url": "assets/js/46.d83d96f0.js",
    "revision": "427a3681994ec1b9fe3131edffad8bcc"
  },
  {
    "url": "assets/js/47.b54cc2ca.js",
    "revision": "273e3662da589b511becdbe520d34f07"
  },
  {
    "url": "assets/js/48.9b7655b1.js",
    "revision": "55b3011a18d3d0ae533de2d20037e82b"
  },
  {
    "url": "assets/js/49.dc3e7585.js",
    "revision": "9f7e73188356b248c650e883595d7b2f"
  },
  {
    "url": "assets/js/5.554b9b17.js",
    "revision": "3cbb22619d21f3762e4cb1300626e3b9"
  },
  {
    "url": "assets/js/50.44491727.js",
    "revision": "8e5b6b21440213caec6a4691c2c9c56c"
  },
  {
    "url": "assets/js/51.b3cc832a.js",
    "revision": "920710c806218225f6da05f1c3dff40c"
  },
  {
    "url": "assets/js/52.4b3f7433.js",
    "revision": "fb8504cf575d3657bef5d027253a3b5d"
  },
  {
    "url": "assets/js/53.d0efb5a8.js",
    "revision": "4ecf4cd66790ada4fafb02ff93ede9a5"
  },
  {
    "url": "assets/js/54.41189e23.js",
    "revision": "e629c9bfadb31133b44b15f28cc2ae0f"
  },
  {
    "url": "assets/js/55.0604b61d.js",
    "revision": "7d6b9af57ac124f2a5c0b9144383323c"
  },
  {
    "url": "assets/js/56.d1bb56be.js",
    "revision": "e950d4a10b720378ea65a84c85db63c7"
  },
  {
    "url": "assets/js/57.2ae826e1.js",
    "revision": "bcd27ef465711947789fb3ef622a54fa"
  },
  {
    "url": "assets/js/58.fcca3b58.js",
    "revision": "f8ffc44b7019d7bef7b50ba3b3b0111a"
  },
  {
    "url": "assets/js/59.3da7d882.js",
    "revision": "c5cc198366223945ba981ce38e88713f"
  },
  {
    "url": "assets/js/6.ef320c88.js",
    "revision": "a38854e83e1979de6f35875954df9121"
  },
  {
    "url": "assets/js/60.3f06229c.js",
    "revision": "b0fb2d886cda0a331148e48e49ba2e71"
  },
  {
    "url": "assets/js/61.6e57367f.js",
    "revision": "a0790160a666d0e83fcdfad3481cf48d"
  },
  {
    "url": "assets/js/62.3b222c6c.js",
    "revision": "c2c436e6eaef10a7179bf44804d59208"
  },
  {
    "url": "assets/js/63.8a7f0932.js",
    "revision": "639ece9cebcdf642b2655a389ec2898d"
  },
  {
    "url": "assets/js/7.51b986da.js",
    "revision": "24c16cb73d186a4f209d1aaebf416f9f"
  },
  {
    "url": "assets/js/8.a9358b51.js",
    "revision": "52dc82a5646803d8fa02347b88cd8941"
  },
  {
    "url": "assets/js/9.b8eed478.js",
    "revision": "fd21d48802617b4f515b4025b61e987e"
  },
  {
    "url": "assets/js/app.8a0b7483.js",
    "revision": "f4ec2bed1b7838bc1c103c1204a32432"
  },
  {
    "url": "CODE_OF_CONDUCT.html",
    "revision": "67f0ded4ebef10baa41de0277a9652cf"
  },
  {
    "url": "content/cloud-advocate/2019-12/deploying-java-ee-apps-to-azure-part-1.html",
    "revision": "a94c36792d77763349765b8f5a670363"
  },
  {
    "url": "content/cloud-advocate/2019-12/getting-the-latest-array-item-with-inline-script-in-logic-app.html",
    "revision": "b32b9a68ff727df11f094d54a365a3b4"
  },
  {
    "url": "content/cloud-advocate/2019-12/Manage-multiple-Azure-tenancies-with-Azure-Lighthouse.html",
    "revision": "cbd2c8596dbbb9bbd44ea8f92c95c22b"
  },
  {
    "url": "content/cloud-advocate/2019-12/what-i-learned-about-azure-arc-and-other-services-at-microsoft-ignite-2019.html",
    "revision": "ff712e3e3ff84a6d76afa956a7cb1236"
  },
  {
    "url": "content/cloud-advocate/2020-01/can-you-use-blazor-for-only-part-of-an-app.html",
    "revision": "c10b7b28ef4bb734825577c1fdce9eba"
  },
  {
    "url": "content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-2.html",
    "revision": "167809d5c149317699f5d0fe902cfbb6"
  },
  {
    "url": "content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-3.html",
    "revision": "49fbd5b22d2bed39cd964e8af0e9de11"
  },
  {
    "url": "content/cloud-advocate/2020-01/how-to-learn-microsoft-azure-in-2020.html",
    "revision": "bbfaacd98324fe948edbc7f88a07292f"
  },
  {
    "url": "content/cloud-advocate/2020-01/managing-security-with-azure-lighthouse-and-azure-arc.html",
    "revision": "62d244905e84f6e1f11f01dde99aab8f"
  },
  {
    "url": "content/cloud-advocate/2020-02/how-to-reduce-the-costs-of-your-azure-iaas-vms.html",
    "revision": "79be58a07bfddbc8a9036567fa896b75"
  },
  {
    "url": "content/cloud-advocate/2020-02/how-to-use-github-actions-to-deploy-an-azure-virtual-machine.html",
    "revision": "0b0b60e3ae9a584de7bb524a1faed304"
  },
  {
    "url": "content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "cd468a87c6521f3bd7c3ece311306a5a"
  },
  {
    "url": "content/cloud-advocate/2020-02/the-secret-art-of-debugging.html",
    "revision": "c506a209bc23134e619c323bc904b125"
  },
  {
    "url": "content/cloud-advocate/2020-03/9-advanced-tips-for-production-machine-learning.html",
    "revision": "d8c12c906c1590d8c871c3ff8e1b6b31"
  },
  {
    "url": "content/cloud-advocate/2020-03/a-modern-developer-s-workflow-for-twine.html",
    "revision": "2bd01ba14c4e3731e981b69043e41c97"
  },
  {
    "url": "content/cloud-advocate/2020-03/create-your-first-model-with-azure-custom-vision-and-python.html",
    "revision": "f7dea7ade779708e33b70c4ae3bb43be"
  },
  {
    "url": "content/cloud-advocate/2020-03/getting-started-with-azureml-notebook-vms.html",
    "revision": "f994529c75a4a1d33f2fbc21dd45ef30"
  },
  {
    "url": "content/cloud-advocate/2020-04/creating-generative-art-using-gan-on-azureml.html",
    "revision": "31212f40e5ca19914df8f6a358c69fba"
  },
  {
    "url": "content/cloud-advocate/2020-05/build-aspnet-apps-with-dotnet-framework.html",
    "revision": "3c4f0d88db3349303126343184b6c4f8"
  },
  {
    "url": "content/cloud-advocate/2020-05/build-test-and-deploy-dotnet-core-apps.html",
    "revision": "2e329399fc916624a58771789122e837"
  },
  {
    "url": "content/cloud-advocate/2020-05/great-new-features-in-c-for-a-returning-net-dev.html",
    "revision": "de4ed827f791eef50464d627a4910773"
  },
  {
    "url": "content/cloud-advocate/how-to-sync-azure-blob-storage-with-azcopy.html",
    "revision": "93858bb85d045e498a46e9d8443dcde4"
  },
  {
    "url": "content/index.html",
    "revision": "61cf38949c6a80c418dc39ecfb7d7f9f"
  },
  {
    "url": "CONTRIBUTING.html",
    "revision": "819c0ca9dddbdf56644c53be06a70631"
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
    "revision": "36077d537a0c8363cfe0dc5d0884ab55"
  },
  {
    "url": "LICENSE.html",
    "revision": "2168955620cb94e627a3fdb94bb538a4"
  },
  {
    "url": "tags.html",
    "revision": "41a8d89ac6f0016cd40c7ebdac5cfc2c"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2019-12/deploying-java-ee-apps-to-azure-part-1.html",
    "revision": "c6521f4c194b1a55cb9d41d203f649a3"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2019-12/getting-the-latest-array-item-with-inline-script-in-logic-app.html",
    "revision": "8f8787f023208ecd54ed8aa3554441cd"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/can-you-use-blazor-for-only-part-of-an-app.html",
    "revision": "90c0ba3a1326aefd8892fe3c511bbf11"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-2.html",
    "revision": "bee6dd7c88c8517aba93876b8992764f"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/deploying-java-ee-apps-to-azure-part-3.html",
    "revision": "1dae850609d73caacbbbfbd02d2ca9e4"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/how-to-learn-microsoft-azure-in-2020.html",
    "revision": "76ce056e2afd6c5e7f7423d50064a696"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-01/managing-security-with-azure-lighthouse-and-azure-arc.html",
    "revision": "163f1eec08f12d11ba833e9612f505bd"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/how-to-reduce-the-costs-of-your-azure-iaas-vms.html",
    "revision": "061404305915b5bf7151f255a70afbc0"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/how-to-use-github-actions-to-deploy-an-azure-virtual-machine.html",
    "revision": "54b9d7047a473bd8c0358776e3712260"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "c725a75f4005f2b9250877f485c0dac9"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-02/the-secret-art-of-debugging.html",
    "revision": "58a96a215abd0f8a3a5f045853093fa3"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/a-modern-developer-s-workflow-for-twine.html",
    "revision": "9ec928ba5af0d81327c56c6cbabcf76d"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/create-your-first-model-with-azure-custom-vision-and-python.html",
    "revision": "b1a0a275debf2c1e82a178e48610e053"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-03/getting-started-with-azureml-notebook-vms.html",
    "revision": "6a5c5191b561d52e5db326eacac0828a"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-04/creating-generative-art-using-gan-on-azureml.html",
    "revision": "0fe7e3ba2b536130ba80709f3c3af45f"
  },
  {
    "url": "zh-cn/content/cloud-advocate/2020-05/great-new-features-in-c-for-a-returning-net-dev.html",
    "revision": "bdd87fc0cd839ef09fe536181f02f9bf"
  },
  {
    "url": "zh-cn/content/cloud-advocate/how-to-sync-azure-blob-storage-with-azcopy.html",
    "revision": "d4806779d33b03e451431c2b46c851bd"
  },
  {
    "url": "zh-cn/content/index.html",
    "revision": "d48018d6d30e55ecefee387b2f192116"
  },
  {
    "url": "zh-cn/index.html",
    "revision": "d2e8407d4588282f2bbc914335af06ea"
  },
  {
    "url": "zh-cn/tags.html",
    "revision": "cd2dbdb2b928e4898ce36784509cc753"
  },
  {
    "url": "zh-tw/content/cloud-advocate/2020-02/the-best-way-to-start-with-azure-machine-learning.html",
    "revision": "1eb36f753da6deb5a30fc86acf182e86"
  },
  {
    "url": "zh-tw/content/index.html",
    "revision": "6e0258949894dd75a5611030a3b59472"
  },
  {
    "url": "zh-tw/index.html",
    "revision": "baf99cf6c43fae3f91cf01998b93ce64"
  },
  {
    "url": "zh-tw/tags.html",
    "revision": "b4a7f1212f1910b4d6318837c616f202"
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
