<template>
    <div>
        <button @click="loadDocs">Load documents</button>
        <h3>Authors Graph</h3>
        <authors-graph :docs="docs"/>
        <h3>Complete Graph</h3>
        <complete-graph :docs="docs"/>
        <h3>Documents</h3>
        <ul>
            <li v-for="(doc, index) in docs" :key="'doc_'+index">{{ doc.title }}</li>
        </ul>
    </div>
</template>

<script>
    import mendeley from '@/util/mendeley';

    const CompleteGraph = () => import('@/components/CompleteGraph');
    const AuthorsGraph = () => import('@/components/AuthorsGraph');

    export default {
        name: 'Home',
        components: {AuthorsGraph, CompleteGraph},
        data: () => ({
            docs: []
        }),
        methods: {
            loadDocs() {
                this.docs = [];
                this.$nextTick(() => mendeley.listDocuments().then(response => this.docs = response.items));
            }
        },
        mounted() {
            if (!mendeley.isLoggedIn())
                mendeley.login();
        }
    }
</script>



