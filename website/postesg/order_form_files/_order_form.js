//////////////////////////////////////
// PLUGIN
function init(tour) {
    const flatpickrArea = document.querySelector('.flatpickr-input');
    if(flatpickrArea){
        let weekObj = {}, minObj = {};
        let date = new Date();
        let maxdate = tour.lmWeek != undefined && tour.lmWeek.maxDate != undefined ? tour.lmWeek.maxDate : "2024/12/31";
        let hotelDate = null;

        if(tour.hotelDate){
            hotelDate = tour.hotelDate;
            maxdate = hotelDate[hotelDate.length-1].date;
            minObj.minDate = hotelDate[0].date;

            let disabledArr = hotelDate.filter(el => el.price < 0);
            let arr = [];
            for(let i=0; i < disabledArr.length; i++){
                arr.push(disabledArr[i].date);
            }
            weekObj = {
                disable: arr,
            }
        }else{
            if(tour.lmWeek.minDate.length > 5){
                minObj.minDate = new Date(tour.lmWeek.minDate);
            }else if(tour.lmWeek.minDate == "m") {
                minObj.minDate = date.setMonth( date.getMonth() + 1 );
            }else{
                minObj.minDate = new Date().fp_incr( tour.lmWeek.minDate );
            }
    
            if(tour.lmWeek.mode == 0){
                // Disabled 日期
                weekObj = {
                    disable: [
                        function(date) {
                            // 0 = SUN, 1 = MON
                            if (tour.lmWeek.arr == "holiday") {

                                // 限平日週一到週五、不含國定假日
                                let dateObj = taiwanHoliday.checkDate(date);

                                if (date.getDay() === 0 || date.getDay() === 6) {
                                    return true;
                                } else if (dateObj != undefined) {
                                    return Number(dateObj.off) == 2;
                                } else {
                                    return false;
                                }

                            } else { 
                                return tour.lmWeek.arr.includes( date.getDay() );
                            }
                        }
                    ]
                }
            }else if(tour.lmWeek.mode == 1){
                // enable 日期
                weekObj = {
                    // enable: tour.lmWeek.arr,
                    enable: [
                        function(date) {
                            if(typeof tour.lmWeek.arr[0] === 'string'){

                                // 指定日期
                                let d = date.getDate().toString();
                                let m = (date.getMonth() + 1).toString();

                                let dateStr = date.getFullYear() + '/';
                                dateStr += m.length < 2 ? '0'+m+'/' : m+'/';
                                dateStr += d.length < 2 ? '0'+d : d;

                                return tour.lmWeek.arr.includes( dateStr );

                            }else if(typeof tour.lmWeek.arr[0] == 'object'){
                                let enabled = false;

                                for(let i=0; i < tour.lmWeek.arr.length; i++){
                                    const beginDate = new Date(tour.lmWeek.arr[i].from)
                                    const endDate = new Date(tour.lmWeek.arr[i].to)

                                    if(date >= beginDate && date <= endDate) {

                                        if(tour.lmWeek.arr[i].disable != undefined) {

                                            if(tour.lmWeek.arr[i].disable == 'holiday') {
                                                // 限平日週一到週五、不含國定假日
                                                let dateObj = taiwanHoliday.checkDate( date );

                                                if(date.getDay() === 0 || date.getDay() === 6){
                                                    enabled = false;
                                                }else if( dateObj != undefined ){
                                                    enabled = Number(dateObj.off) == 0;
                                                }else{
                                                    enabled = true;
                                                }

                                            }else{
                                                enabled = !tour.lmWeek.arr[i].disable.includes( date.getDay() );
                                            }

                                        }else{
                                            enabled = true;
                                        }

                                        break;
                                    }
                                }

                                return enabled;
                            }
                        }
                    ]
                }
            }else if(tour.lmWeek.mode == 2){
                // enable 第N個 星期N
                weekObj = {
                    enable: [
                        function(date) {
                            // return true to enable
                            let check = false;
    
                            for(let i = 0; i < tour.lmWeek.arr.length; i++){
                                const ar = tour.lmWeek.arr[i];
                                for(let j = 0; j < ar.last.length; j++){
                                    if(date.getDay() == ar.last[j]){
                                        const nth = date.getDate();
    
                                        if(Math.floor(nth / 7) == ar.wk ){
                                            check = true;
                                        }else if(Math.floor(nth / 7) == (ar.wk + 1) && (nth % 7) == 0){
                                            check = true;
                                        }
                                    }
                                }
                            }
                            return check;
                        }
                    ]
                }
            }
        }

        weekObj = Object.assign(weekObj, minObj);
        
        let flatpickrInput = flatpickr(".flatpickr-input", {
            position: "below",
            ariaDateFormat: "Y/m/d",
            locale: "zh",
            dateFormat: "Y/m/d",
            disableMobile: "true",
            maxDate: maxdate,  //new Date( date.setMonth( date.getMonth() + 3 ) )

            ...weekObj,

            onOpen: function(selectedDates, dateStr, instance){
                const input = document.querySelector('.flatpickr-input');
                input.blur();

                const wiw = window.innerWidth;
                if(wiw <= 768) {
                    const closeBack = document.createElement('div');
                    closeBack.classList.add('flatpickr-closeback');
                    document.querySelector('.page').append(closeBack);
                }
            },
            onClose: function(selectedDates, dateStr, instance){
                const input = document.querySelector('.flatpickr-input');
                input.blur();

                const closeBack = document.querySelector('.flatpickr-closeback');
                if(closeBack){
                    closeBack.remove();
                }
            },
            onDayCreate: function(dObj, dStr, fp, dayElem){
                if(hotelDate){
                    let d = dayElem.getAttribute('aria-label');
                    let hd = hotelDate.find(el => el.date == d);
                    if(hd && hd.price >= 0){
                        dayElem.setAttribute('aria-price', hd.price)
                    }
                }
            }
        });
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
        FormsName,
        FormsSex,
        FormsPhone,
        FormsEmail,
        FormsIdcode,
        FormsBirth,
        FormsOrderdate,
        FormsMemoTrip,
        FormsMemoHotel,
        FormsCreditcode,
        FormsCreditlimit,
        FormsCreditsecurity,
        FormsReceipt,

        UiOrder,
        UiCheckOrder,
        UiSteps,
    },
    data() {
        return {
            item: {},
            confirmPage: false,

            HFBtn: 'BtnOK',
            HFlist: [],

            ...FormSetting    // formID, HFTitle, HFLabel
        }
    },
    created() {
        this.item = productsData;
        this.HFlist = orderForm;
        
        // 取得預約日期限制
        this.getAllData();
        
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
    },
    methods: {
        fortmatResponse(res) {
            return JSON.stringify(res, null, 2);
        },
        async getAllData() {
            const url = '_ajax/tours.json';
            const p = this.item.puid;

            try {
                const res = await fetch(url);
      
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }

                let tours = await res.json();
                let tour = {};

                tour = tours.find(function(el){
                    // console.log(el.puid)
                    return el.puid == p
                });

                if(tour != undefined) {
                    this.item = Object.assign(this.item, tour);
                }
                
               
                    init(this.item); // 設定日曆 
              
                
            } catch (err) {
                this.getResult = err.message;
            }
        },

        itemImg(it) {
            return it.gallery ? it.gallery[0] : '';
        },
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
                    if(el.req && el.value.length < 16){
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

            // 設定不可見欄位
            const hfHoliday = document.getElementById(tit + 'HFHoliday');
            if(hfHoliday) {
                hfHoliday.value = this.isHoliday ? 1 : 0;
            }

            if(isOK) {
                loaderBox.open();

                if(!this.confirmPage){
                    document.getElementById(this.formID).submit();
                    // this.setConfirmPage();
                }else{
                    document.getElementById(this.HFTitle + this.HFBtn).click();
                    // window.location='success.aspx';
                }
            }
        },

        setConfirmPage() {
            this.confirmPage = true;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        btnBack() {
            if(this.confirmPage){
                this.confirmPage = !this.confirmPage;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }else{
                history.go(-1);
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
    },
    computed: {
        isHoliday() {

            if (this.item.addPrice == undefined) {
                return false;
            }

            let ret;
            let dateObj;
            let od;
            let orderdate = this.getHF('orderdate').value;
            let checkDays = this.item.checkDays != undefined ? this.item.checkDays : 1;

            for (let i = 0; i < checkDays; i++) {
                od = orderdate;

                if(od != NaN){
                    dateObj = taiwanHoliday.checkDate( od );
                }

                if( dateObj != undefined ){
                    // 特殊日期
                    if( Number(dateObj.off) ) {
                        ret = true;
                    }else{
                        ret = ret ? true : false;
                    }
                }else{
                    // 一般六日
                    od = new Date(od);
                    od = od.getDay();

                    if(od === 0 || od === 6) {
                        ret = true;
                    }else{
                        ret = ret ? true : false;
                    }
                }

                if (i + 1 < checkDays) {
                    var inputDate = new Date(orderdate);
                    inputDate.setDate(inputDate.getDate() + 1);
                    var year = inputDate.getFullYear();
                    var month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
                    var day = inputDate.getDate().toString().padStart(2, '0');
                    orderdate = year + '/' + month + '/' + day;
                }
            }

            return ret
        },
        totalPrice() {
            let str = Number(this.item.total);

            if(this.item.hotelDate){
                let d = this.getHF('orderdate');
                let dp = this.item.hotelDate.find(el => el.date == d.value);

                if(dp){
                    str = dp.price * this.item.num;
                }
            }else{
                if(this.isHoliday && this.item.addPrice){
                    str = str + Number(this.item.addPrice) * Number(this.item.num);
                }
            }

            str = str.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return str.join(".");
        },
        HFlistArr: function() {
            let arr = this.HFlist.filter((item) => {
                return item.value != '';
            });

            arr.forEach(function(el){
                let no = el.value;
                if(el.id == 'sex' || el.id == 'receipt' ){
                    el.showValue = el.titarr[no];
                }
                if(el.id == 'creditcode'){
                    el.showValue = no.match(/.{1,4}/g).join('-');
                }
                if(el.id == 'orderdate'){
                    let weekArr = ['日','一','二','三','四','五','六'];
                    let week = new Date(el.value).getDay();
                    el.showValue = el.value + ' (' + weekArr[week] + ')';
                }
            });

            return arr;
        },
        btnTxt() {
            let txt = this.confirmPage ? '確認預約' : '下一步';
            return txt;
        },
        nowSteps() {
            return this.confirmPage ? 4 : 3;
        }
    }
}).mount('#app');