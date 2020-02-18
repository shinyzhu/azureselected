
module.exports = {
    title: "Azure Selected",
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico'}],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'Azure 中文精选'
      },
      '/zh-tw/': {
        lang: 'zh-TW',
        title: 'Azure 中文精選'
      }
    },
    themeConfig: {
      displayAllHeaders: true,
      searchMaxSuggestions: 10,
      repo: 'azureselected/azureselected',
      repoLabel: 'GitHub',
      editLinks: true,
      smoothScroll: true,
      logo: '/img/logo_azure.svg',
      locales: {
        '/': {
          selectText: '选择语言',
          label: '简体中文',
          editLinkText: '在 GitHub 编辑本页',
          lastUpdated: '最近更新于',
          serviceWorker: {
            updatePopup: {
              message: "有新的内容了，请：",
              buttonText: "刷新"
            }
          },
          nav: [
            { text: '首页', link: '/' },
            { text: '内容列表', link: '/content/' },
            { text: '标签', link: '/tags.html' },
            { text: '参加翻译', link: 'https://wj.qq.com/s2/5227985/7213/' }
          ]
        },
        '/zh-tw/': {
          selectText: '選擇語言',
          label: '繁體中文',
          editLinkText: '在 GitHub 編輯本頁',
          lastUpdated: '最近更新於',
          serviceWorker: {
            updatePopup: {
              message: "有新的內容了，請：",
              buttonText: "刷新"
            }
          },
          nav: [
            { text: '首頁', link: '/' },
            { text: '內容列表', link: '/content/' },
            { text: '標籤', link: '/tags.html' },
            { text: '參加翻譯', link: 'https://wj.qq.com/s2/5227985/7213/' }
          ]
        }
      }
    },
    plugins: [
      ['@vuepress/back-to-top', true],
      ['@vuepress/nprogress'],
      ['@vuepress/google-analytics', {
          'ga': 'UA-1645044-9'
      }],
      ['@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: true
      }],
      ['@vuepress/last-updated']
    ]
  }