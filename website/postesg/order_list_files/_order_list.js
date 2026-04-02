//////////////////////////////////////
// VUE
const { createApp } = Vue;

const app = createApp({
    components: {
        UiOrderList,
    },
    data() {
        return {
            data: null,
        }
    },
    created() {
        this.data = productsData;
    },
}).mount('#app');