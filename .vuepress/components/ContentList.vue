<!-- /.vuepress/components/ContentList.vue -->

<template>
<div>
    <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>

        <p><a :href="post.frontmatter.url">{{$site.locales[$localePath].uitext.list.origin}} {{ post.frontmatter.author }} {{$site.locales[$localePath].uitext.list.published}} {{ new Date(post.frontmatter.date).toLocaleDateString() }} 。</a></p>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">{{$site.locales[$localePath].uitext.list.continue}} &rarr;</router-link></p>
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