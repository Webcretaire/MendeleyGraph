<template>
    <div>
        <button @click="loadDocs">Load documents</button>
        <h3>Documents</h3>
        <ul>
            <li v-for="(doc, index) in docs" :key="index">{{ doc.title }}</li>
        </ul>
    </div>
</template>

<script>
    import mendeley from "@/util/mendeley";

    export default {
        name: 'Home',
        data: () => ({
            docs: []
        }),
        methods: {
            loadDocs() {
                mendeley.listDocuments().then(response => this.docs = response.items);
            }
        },
        mounted() {
            if (!mendeley.isLoggedIn())
                mendeley.login();
        }
    }
</script>

