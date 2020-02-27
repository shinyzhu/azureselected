<!-- /.vuepress/components/ContentMeta.vue -->

<template lang="html">
<div class="content-meta">
  <hr />
  
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
  <div class="content-meta-head custom-block tip">
    <p>{{$site.locales[$localePath].uitext.meta.url}}<a :href="$page.frontmatter.url">{{$page.frontmatter.url}}</a></p>
    <p>{{$site.locales[$localePath].uitext.meta.author}}{{ $page.frontmatter.author }}</p>
    <p>{{$site.locales[$localePath].uitext.meta.translator}}{{ $page.frontmatter.translator }}</p>
    <p>{{$site.locales[$localePath].uitext.meta.reviewer}}{{ $page.frontmatter.reviewer }}</p>
  </div>

  <hr />
</div>
</template>

<style>
.content-meta{font-size:.9em;}
.content-meta-head{font-size:.9em;line-height:1em;color:#333;border:1px solid #ccc}
.tags-head span a{margin:0 3px;padding:0 3px;background:#eee;line-height:1.5em}
</style>

<script>
</script>