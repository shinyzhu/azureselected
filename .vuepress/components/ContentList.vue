<!-- /.vuepress/components/ContentList.vue -->

<template>
<div>
    <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>

        <p><a :href="post.frontmatter.url"><i>原文由 {{ post.frontmatter.author }} 在 {{ new Date(post.frontmatter.date).toLocaleDateString() }} 发布。</i></a></p>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">继续阅读 &rarr;</router-link></p>
    </div>
</div>
</template>

<script>
export default {
    props:[
        'path',
        'limit'
    ], computed: {
        posts() {
            let posts = this.$site.pages
                .filter(x => x.path.startsWith(this.path) && !x.frontmatter.index_page)
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

            return posts;
        }
    }
}
</script>