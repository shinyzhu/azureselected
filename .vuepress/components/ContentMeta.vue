<!-- /.vuepress/components/ContentMeta.vue -->

<template lang="html">
<div class="content-meta">
  <p class="original-info"><a :href="$page.frontmatter.url">原文由 {{ $page.frontmatter.author }} 在 {{ new Date($page.frontmatter.date).toLocaleDateString() }} 发布。</a></p>
  <div class="tags-head">
    <span>
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}`}">
      {{tag}}
    </router-link>
    </span>
  </div>
  <hr />
</div>
</template>

<style>
.content-meta{font-size:.9em;}
.tags-head span a{margin:0 3px;padding:0 3px;background:#eee;line-height:1.5em}
</style>

<script>
</script>