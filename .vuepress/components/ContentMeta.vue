<!-- /.vuepress/components/ContentMeta.vue -->

<template lang="html">
<div class="content-meta">
  <hr />
  <p>{{$site.locales[$localePath].uitext.meta.url}} <a :href="$page.frontmatter.url">{{ $page.frontmatter.url }}</a></p>
  <p>{{$site.locales[$localePath].uitext.meta.author}} {{ $page.frontmatter.author }} | {{ new Date($page.frontmatter.date).toLocaleDateString() }}</p>
  <p v-if="$page.frontmatter.translator">
    <span>{{$site.locales[$localePath].uitext.meta.translator}} {{ $page.frontmatter.translator }} </span>
    <span v-if="$page.frontmatter.reviewer">| {{$site.locales[$localePath].uitext.meta.reviewer}} {{ $page.frontmatter.reviewer }} </span>
    <span v-if="$page.frontmatter.pub_date">| {{ new Date($page.frontmatter.pub_date).toLocaleDateString() }}</span>
  </p>

  <div class="tags-head">
    <span>
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: $localePath + `tags.html#${tag}`}">
      {{tag}}
    </router-link>
    </span>
  </div>

  <hr />
</div>
</template>

<style>
.content-meta{font-size:.9em;color:#333}
.content-meta p{margin:.5em 0;}
.tags-head span a{margin:0 3px;padding:0 3px;background:#eee;line-height:1.5em}
</style>

<script>
</script>