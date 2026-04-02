//////////////////////////////////////
// PLUGIN
let thumbnails;

function init() {
    const splideArea = document.getElementById('image-carousel');
    if(splideArea){
        const mainSplide = new Splide( '#image-carousel', {
            // arrowPath: 'M14.2635 36.234C14.654 36.6245 15.2871 36.6245 15.6777 36.234L31.234 20.6776C31.6246 20.2871 31.6246 19.654 31.234 19.2634L15.6777 3.70708C15.2872 3.31656 14.654 3.31654 14.2635 3.70708C13.8729 4.09762 13.873 4.73078 14.2635 5.1213L29.1127 19.9705L14.2635 34.8198C13.8729 35.2103 13.873 35.8435 14.2635 36.234Z',
            arrows     : false,
            // gap: '1rem',
            type       : 'loop',
            rewind     : 'true',
            pagination : false,
            type: 'fade',
            breakpoints : {
                576: {
                  arrows : true,
                  pagination : true,
                },
              },
        });
    
        thumbnails = new Splide( '#thumbnail-carousel', {
            // arrowPath: 'M14.2635 36.234C14.654 36.6245 15.2871 36.6245 15.6777 36.234L31.234 20.6776C31.6246 20.2871 31.6246 19.654 31.234 19.2634L15.6777 3.70708C15.2872 3.31656 14.654 3.31654 14.2635 3.70708C13.8729 4.09762 13.873 4.73078 14.2635 5.1213L29.1127 19.9705L14.2635 34.8198C13.8729 35.2103 13.873 35.8435 14.2635 36.234Z',
            //arrows: false,
    
            fixedWidth: 60,
            fixedHeight: 60,
            gap: 10,
            rewind: true,
            pagination: false,
            isNavigation: true,
        });
    
        mainSplide.sync( thumbnails );
        mainSplide.mount();
        thumbnails.mount();
    }
}

// document.addEventListener( 'DOMContentLoaded', function () {
//     init();
// });


//////////////////////////////////////
// VUE
const { createApp } = Vue;

const app = createApp({
    components: {
        UiSteps,
        UiSpecs,
    },
    data() {
        return {
            item: {},
            pname:['行程時間','成團人數', '永續意涵', '行程內容','注意事項'],

            spec: 0,
            imgarr:[],

            HFlist: [
                {
                    id: "num",
                    HFid: "HFTotalNum",
                    value: 1
                },
                {
                    id: "specid",
                    HFid: "HFSpecId",
                    value: ""
                },
                {
                    id: "specname",
                    HFid: "HFSpecName",
                    value: ""
                }
            ],

            ...FormSetting    // formID, HFTitle, HFLabel
        }
    },
    created() {
        let queryString = window.location.search;

        this.item = productsData;
        
        for(let i = 0; i < this.item.gallery.length; i++){
            let pd = this.item.gallery[i];
            for(let j = 0; j < pd.imgs.length; j++){
                let img = {
                    specid: pd.specid,
                    url: pd.imgs[j],
                };
                this.imgarr.push(img);
            }
        }

        for (const key in this.item.info) {
            let str = this.item.info[key];
            str = str.replace('{{price}}', this.itemPrice );
            this.item.info[key] = str;
        }

        const num = this.getHF('num');
        num.value = this.item.baseNum
    },
    mounted() {

        init(); // 產品圖
        
    },
    methods: {
        plus() {
            const num = this.getHF('num');
            num.value = num.value + this.item.variable >= this.item.max ? this.item.max : num.value + this.item.variable;
            document.getElementById(this.HFTitle + "HFTotalNum").value = num.value / this.item.baseNum;
        },
        minus() {
            const num = this.getHF('num');
            num.value = num.value - this.item.variable <= this.item.baseNum ? this.item.baseNum : num.value - this.item.variable;
            document.getElementById(this.HFTitle + "HFTotalNum").value = num.value / this.item.baseNum;
        },
        getHF(id){
            return this.HFlist.find(el => el.id == id);
        },
        submit() {
            const tit = this.HFTitle;
            this.HFlist.forEach(function(el){
                const hf = document.getElementById(tit + el.HFid);
                hf.value = el.value;
            });

            loaderBox.open();
            document.getElementById(this.formID).submit();
            // window.location = 'tc.aspx';
        },
        checkDiscount() {
            const num = this.getHF('num');
            if(this.item.discount){
                return (num.value >= this.item.discount.num);
            }else{
                return false;
            }
        },
    },
    watch: {
        spec: function(){
            let id = this.getHF('specid');
            let name = this.getHF('specname');

            id.value = this.item.tags[this.spec].specid;
            name.value = this.item.tags[this.spec].specname;

            // 設定型號圖片
            const specImgs = document.querySelectorAll("[data-specid]");
            let idx = 0;
            for(let i=0; i < specImgs.length; i++){
                if(specImgs[i].dataset.specid == this.item.tags[this.spec].specid){
                    idx = i;
                    break;
                }
            }
            if(idx > 0){
                thumbnails.go(idx);
            }
        }
    },
    computed: {
        itemMarketPrice() {
            const num = this.getHF('num');
            let str = this.item.tags[this.spec].market_price * num.value;

            str = str.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return str.join(".");
        },
        itemPrice() {
            const num = this.getHF('num');
            let str = this.item.tags[this.spec].price * num.value;

            if(this.checkDiscount()){
                str = this.item.discount.price * num.value
            }

            document.getElementById(this.HFTitle + "HFTotal").value = str;

            str = str.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return str.join(".");
        },
        itemPeople() {
            const num = this.getHF('num');
            document.getElementById(this.HFTitle + "HFTotalPeople").value = this.item.people * num.value;
            return this.item.people * num.value;
        },
        isClosed() {
            return this.item.closed;
        },
        discountTxt() {
            let txt = ''
            if(this.checkDiscount()){
                txt = this.item.discount.num + '人以上優惠價'
            }
            return txt;
        }
    },
}).mount('#app');