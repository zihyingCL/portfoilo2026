//////////////////////////////////////
// VUE
const { createApp } = Vue;

const app = createApp({
    components: {
        // FormsName,
        // FormsCreditcode,
        FormsPhone,
        FormsIdcodeVerify
    },
    data() {
        return {
            HFBtn: 'BtnOK',
            HFlist: [
                {
                    id: "phone",
                    HFid: "HFPhone",
                    value: "",
                    invalid: false,
                    req: true,
                },
                {
                    id: "idcodeverify",
                    HFid: "HFIdcodeVerify",
                    value: "",
                    invalid: false,
                    req: true,
                },
            ],

            ...FormSetting    // formID, HFTitle, HFLabel
        }
    },
    created() {
        const tit = this.HFTitle;
        const hfLabels = this.HFLabel;

        this.HFlist.forEach(function(el){
            const hf = document.getElementById(tit + el.HFid);
            el.value = hf.value;

            // 全域預設lable
            const label = FormsLabel.find(lb => lb.id == el.id);
            el = label ? Object.assign(el, label) : el;

            // 專案自訂lable
            const hfLabel = hfLabels.find(lb => lb.id == el.id);
            el = hfLabel ? Object.assign(el, hfLabel) : el;
        });

        // 設定錯誤訊息
        this.setError();

        console.log('created!!!!!!')
    },
    methods: {
        getHF(id) {
            // console.log('id:', id);
            return this.HFlist.find(el => el.id == id);
        },
        submit() {
            const tit = this.HFTitle;
            let isOK = new Boolean(true);

            for(let i = 0; i < this.HFlist.length; i++) {
                const el = this.HFlist[i];
                const hf = document.getElementById(tit + el.HFid);
    
                if( el.id == 'creditcode' ){
                    if(el.req && el.value.length < 12){
                        isOK = this.openError(0, el.tit, el.HFid);
                        break;
                    }
                }

                if( el.req && el.value == '' ){
                    if(el.id == 'sex' || el.id == 'orderdate' || el.id == 'receipt'){
                        isOK = this.openError(1, el.tit, el.HFid);
                        break;
                    }else{
                        isOK = this.openError(0, el.tit, el.HFid);
                        break;
                    }
                    
                }else{
                    hf.value = el.value;
                }
            }

            if(isOK) {
                loaderBox.open();
                document.getElementById(this.formID).submit();
            }
        },

        setError() {
            this.HFlist.forEach(function(el){
                el.invalid = errorData.includes(el.HFid);
            });
        },
        openError(type, lb, id) {
            let erMsg = '';

            if(type == 0) { erMsg = '請輸入' + lb; }
            if(type == 1) { erMsg = '請選擇' + lb; }
            if(type == 2) { erMsg = lb + '格式錯誤'; }

            errorData = [];
            errorData.push(id);

            this.setError();
            windowAlert(erMsg);

            return false;
        },
    }
}).mount('#app');