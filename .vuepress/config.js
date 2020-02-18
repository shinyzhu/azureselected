
module.exports = {
    title: "Azure 中文精选",
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico'}],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
    ],
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    themeConfig: {
      displayAllHeaders: true,
      searchMaxSuggestions: 10,
      repo: 'azureselected/azureselected',
      repoLabel: 'GitHub',
      editLinks: true,
      editLinkText: '在 GitHub 编辑本页',
      lastUpdated: '最近更新于',
      smoothScroll: true,
      logo: '/img/logo_azure.svg',
      nav: [
        { text: '首页', link: '/' },
        { text: 'Cloud Advocate', link: '/content/cloud-advocate/' },
        { text: 'Tips & Tricks', link: '/content/tips-tricks/' },
        { text: '标签', link: '/tags.html' },
        { text: '参加翻译', link: 'https://wj.qq.com/s2/5227985/7213/' }
      ]
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