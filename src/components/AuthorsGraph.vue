<template>
    <div>
        <cytoscape id="cy-authors" ref="cy" :config="cy_config" v-if="docs.length"/>
    </div>
</template>

<script>
    export default {
        name: "AuthorsGraph",
        props: {
            docs: {
                type: Array,
                required: true
            }
        },
        computed: {
            cy_config() {
                return {
                    elements: this.cy_elements,
                    style: [ // the stylesheet for the graph
                        {
                            selector: 'node',
                            style: {
                                'background-color': '#01008e',
                                'label': 'data(id)',
                                'text-wrap': 'wrap',
                                'text-max-width': 200
                            }
                        },
                        {
                            selector: 'edge',
                            style: {
                                'width': 3,
                                'line-color': '#ccc',
                                'target-arrow-color': '#ccc',
                                'target-arrow-shape': 'triangle'
                            }
                        }
                    ],
                    layout: {
                        name: 'cose',
                        componentSpacing: 100,
                        nodeOverlap: 10,
                        idealEdgeLength: () => 50,
                        nodeRepulsion: () => 4096
                    }
                };
            },
            cy_elements() {
                let els = {nodes: [], edges: []};
                let linkCounter = 0;
                let authorList = {};

                for (let doc of this.docs) {
                    for (let author of doc.authors) {
                        let authorName = author.first_name + ' ' + author.last_name;
                        if (!authorList[authorName]) {
                            authorList[authorName] = true;
                            els.nodes.push({data: {id: authorName}});
                        }
                        for (let authorLinked of doc.authors) {
                            let authorLinkedName = authorLinked.first_name + ' ' + authorLinked.last_name;
                            if (!authorList[authorName]) {
                                authorList[authorName] = true;
                                els.nodes.push({data: {id: authorName}});
                            }
                            if(authorLinkedName !== authorName) {
                                els.edges.push({
                                    data: {
                                        id: 'link_' + linkCounter,
                                        source: authorName,
                                        target: authorLinkedName
                                    }
                                });
                                linkCounter++;
                            }
                        }
                    }
                }

                return els;
            }
        }
    }
</script>