const moment = require('moment');

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
        //{ text: 'Tips & Tricks', link: '/content/tips-tricks/' },
        { text: '标签', link: '/tags.html' },
        { text: '我要参加翻译', link: 'https://forms.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxFo4UL6NOJLq2Kj3ObwvLdUNU04RVo1WU9RMVpTN081RlY2RE00NlJPNC4u' },
        { text: '建议优质内容', link: 'https://forms.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxFo4UL6NOJLq2Kj3ObwvLdUNlBQSklPT001OVhXSEpNS09IV1owSkFJTC4u' }
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
      ['@vuepress/last-updated', {
          transformer: (timestamp, lang) => {
            const moment = require('moment')
            moment.locale(lang)
            return moment(timestamp).fromNow()
          }
      }],
      ['vuepress-plugin-rss', {
          base_url: '/',
          site_url: 'https://azureselected.com',
          filter: frontmatter => frontmatter.date <= new Date(),
          count: 20
      }],
      ['vuepress-plugin-table-of-contents']
    ]
  }