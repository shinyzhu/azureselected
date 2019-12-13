module.exports = {
    title: "Azure 中文精选",
    themeConfig: {
      domain: 'https://azureselected.com',
      displayAllHeaders: true,
      searchMaxSuggestions: 10,
      repo: 'azureselected/azureselected',
      repoLabel: 'GitHub',
      editLinks: true,
      editLinkText: '在 GitHub 编辑本页',
      lastUpdated: '最近更新于',
      logo: '/img/logo_azure.svg',
      nav: [
        { text: '首页', link: '/' },
        { text: 'Cloud Advocate', link: '/content/cloud-advocate/' },
        { text: 'Tips & Tricks', link: '/content/tips-tricks/' },
        { text: '我要参加翻译', link: 'https://forms.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxFo4UL6NOJLq2Kj3ObwvLdUNU04RVo1WU9RMVpTN081RlY2RE00NlJPNC4u' },
        { text: '建议优质内容', link: 'https://forms.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxFo4UL6NOJLq2Kj3ObwvLdUNlBQSklPT001OVhXSEpNS09IV1owSkFJTC4u' }
      ]
    },
    plugins: [
      '@vuepress/back-to-top',
      [
        '@vuepress/google-analytics',
        {
          'ga': 'UA-1645044-9'
        }
      ]
    ]
  }