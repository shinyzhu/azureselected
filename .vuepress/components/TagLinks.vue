<!-- .vuepress/components/TagLinks.vue -->
<template lang="html">
  <div class="tags-head">
    Tags:
    <span>
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}`}">
      {{tag}}
    </router-link>
    </span>
  </div>
</template>

<style>
.tags-head span a{margin:0 3px;padding:0 3px;background:#eee;line-height:1.5em}
</style>