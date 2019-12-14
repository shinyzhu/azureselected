<!-- /.vuepress/components/ContentList.vue -->

<template>
<div>
    <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">继续阅读 &rarr;</router-link></p>
    </div>
</div>
</template>

<script>
export default {
    props:[
        'category',
        'limit'
    ], computed: {
        posts() {
            let posts = this.$site.pages
                .filter(x => x.path.startsWith('/content/') && !x.frontmatter.index_page)
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

            if(this.category){
                posts = posts.filter(x => x.path.startsWith('/content/' + this.category));
            }

            return posts;
        }
    }
}
</script>