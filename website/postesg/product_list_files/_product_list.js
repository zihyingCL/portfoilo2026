//////////////////////////////////////
// VUE
const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            data: null,
            defaultData: [
                // {
                //     tit: "活動辦法",
                //     url: "event",
                //     hero: "hero__1",
                //     active: false,
                //     heading: "活動辦法",
                //     txt: "邀請您透過行動支持台灣的地方永續發展。"
                // },
                {
                    tit: "永續行程",
                    url: "everyday",
                    hero: "hero__2",
                    active: false,
                    heading: "永續行程",
                    txt: "享受清淨獨有的旅遊高品質，減輕對地方環境的衝擊，透過行動支持台灣的地方永續發展。"
                },
                {
                    tit: "永續飯店",
                    url: "hotel",
                    hero: "hero__3",
                    active: false,
                    heading: "永續飯店",
                    txt: "精選獲獎認證永續飯店以及單車友好飯店，讓永續成為你我旅行中的正向力量。"
                }
            ],
            nowpage: {},

            logoData: [
                {
                    id: 0,
                    img: "l1",
                },
                {
                    id: 1,
                    img: "l2",
                },
                {
                    id: 2,
                    img: "l3",
                },
                {
                    id: 3,
                    img: "l4",
                }
            ]
        }
    },
    created() {
        this.data = productsData;

        // 取得飯店logo
        this.getAllData();
        
        const queryString = window.location.search;
        for(let i=0; i < this.defaultData.length; i++){
            this.defaultData[i].active = queryString.includes(this.defaultData[i].url);
        }
    },
    mounted() {
        this.nowpage = this.defaultData.find(function(el){
            return el.active == true;
        });
    },
    methods: {
        fortmatResponse(res) {
            return JSON.stringify(res, null, 2);
        },
        async getAllData() {
            const url = '_ajax/tours.json';

            try {
                const res = await fetch(url);
      
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }

                let hotel = await res.json();

                this.data.forEach(function(el){
                    let logos = hotel.find(logo => logo.puid == el.puid)
                    el.logo = logos.logo;
                });
                
            } catch (err) {
                this.getResult = err.message;
            }
        },

        itemImg(it) {
            return it.gallery ? it.gallery[0] : '';
        },
        gotoPage(event) {
            const box = event.target.closest('.products__item')
            const a = box.getElementsByTagName('a')
            a[0].click();
        },
        getLogo(lid) {
            let logo = this.logoData.find(el => el.id == lid);
            return logo.img;
        }
    },
    computed: {
    }
    
}).mount('#app');