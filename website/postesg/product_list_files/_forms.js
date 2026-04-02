const FormsLabel = [
    {
        id: "name",
        tit: "姓名"
    },
    {
        id: "sex",
        tit: "性別",
        titarr:['小姐', '先生']
    },
    {
        id: "phone",
        tit: "手機號碼",
    },
    {
        id: "email",
        tit: "電子郵件",
    },
    {
        id: "idcode",
        tit: "身分證字號／護照號碼／統一證號",
    },
    {
        id: "idcodeverify",
        tit: "身分證末五碼／護照號碼末五碼／統一證號末五碼",
    },
    {
        id: "birth",
        tit: "生日",
    },
    {
        id: "orderdate",
        tit: "預約日期",
    },
    {
        id: "creditcode",
        tit: "信用卡號",
    },
    {
        id: "creditlimit",
        tit: "有效期限",
    },
    {
        id: "creditsecurity",
        tit: "卡片背面末3碼",
    },
    {
        id: "receipt",
        tit: "開立發票",
        // 0:手機載具 / 1:公司戶電子發票 / 2:我同意捐贈發票給：創世基金會 / 3:???? / 4:電子發票
        titarr:['手機載具', '公司戶電子發票', '我同意捐贈發票給：創世基金會', '', '電子發票' ]
    },
    {
        id: "barcode",
        tit: "手機載具條碼",
    },
    {
        id: "gui",
        tit: "發票統編",
    },
    {
        id: "guitit",
        tit: "發票抬頭",
    },
    {
        id: "account",
        tit: "帳號"
    },
    {
        id: "password",
        tit: "密碼"
    },
    {
        id: "memotrip",
        tit: "備註"
    },
    {
        id: "memohotel",
        tit: "備註"
    }
];
const FormsName = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control" maxlength="50"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsSex = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <div class="form-check m-0 p-0">
        <input type="radio" id="sex1" value="1" name="sex" v-model="val.value">
        <label for="sex1">{{ val.titarr[1] }}</label>
    </div>
    <div class="form-check m-0">
        <input type="radio" id="sex0" value="0" name="sex" v-model="val.value">
        <label for="sex0">{{ val.titarr[0] }}</label>
    </div>
    `
}
const FormsPhone = {
    props: ['val'],
    emits: ['update:val'],
    methods: {
        checkVal: function(evt) {
            let value = evt.target.value
            let fmVal = this.val;
            fmVal.value = value.replace(/[^0-9]/g, '');
            this.$emit('update:val', fmVal)
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    },
    template: `
    <input type="text" class="form-control" inputmode="numeric" maxlength="10"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}"
    @keypress="isNumber" @change="checkVal" >
    `
}
const FormsEmail = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control" inputmode="email" maxlength="100"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsIdcode = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control" inputmode="url" maxlength="10"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsIdcodeVerify = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control" inputmode="url" maxlength="5"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsBirth = {
    props: ['val'],
    emits: ['update:val'],
    data() {
        return {
            years:[],
            months:[],
            dates:[],

            year: -1,
            month: -1,
            date: -1
        }
    },
    created() {
        let thisyear = new Date().getFullYear();
        let min = thisyear - 120;
        for (let i = min; i <= thisyear; i++) {
            this.years.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            this.months.push(i);
        }
        for (let i = 1; i <= 31; i++) {
            this.dates.push(i);
        }

        let date = this.val.value == "" ? new Date() : new Date(this.val.value);
        this.year = date.getFullYear();
        this.month = this.formatNum(date.getMonth() + 1);
        this.date = this.formatNum(date.getDate());

        let fmVal = this.val;
        fmVal.value = this.year + '/' + this.month + '/' + this.date;
        this.$emit('update:val', fmVal);
    },
    methods: {
        dateSelect(){
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let dat = this.date;
            let num = monthDays[this.month - 1];

            if(this.month == 2 && this.isLeapYear(this.year)) {
                num++;
            }

            this.dates = [];
            for(let i = 1; i <= num; i++) {
                this.dates.push(i);
            }

            if(dat > num){ this.date = num; }

            let fmVal = this.val;
            fmVal.value = this.year + '/' + this.month + '/' + this.date;
            this.$emit('update:val', fmVal);
        },
        isLeapYear(year) {
            return (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0));
        },
        formatNum(num) {
            return num < 10 ? '0' + num : num;
        },
    },
    template: `
    <div class="d-flex flex-wrap align-items-center">
        <select class="form-select col" :class="{invalid:val.invalid}" v-model="year" @change="dateSelect" >
            <option v-for="y in years" :value="y">{{ y }}</option>
        </select>
        <span class="col-auto mx-2">年</span>
        <select class="form-select col" :class="{invalid:val.invalid}" v-model="month" @change="dateSelect">
            <option v-for="m in months" :value="formatNum(m)">{{ formatNum(m) }}</option>
        </select>
        <span class="col-auto mx-2">月</span>
        <select class="form-select col" :class="{invalid:val.invalid}" v-model="date" @change="dateSelect">
            <option v-for="d in dates" :value="formatNum(d)">{{ formatNum(d) }}</option>
        </select>
        <span class="col-auto ms-2">日</span>
    </div>
    `
}
const FormsOrderdate = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control flatpickr-input"
    v-model="val.value" :placeholder="'請選擇'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsMemoTrip = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control"
    v-model="val.value" placeholder="請輸入備註內容，如：同行人姓名、備用聯絡電話、備用郵件...等" :class="{invalid:val.invalid}">
    `
}
const FormsMemoHotel = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control"
    v-model="val.value" placeholder="請輸入備註內容，如：不佔床孩童人數...等" :class="{invalid:val.invalid}">
    `
}
const FormsCreditcode = {
    props: ['val', 'area'],
    emits: ['update:val'],
    data() {
        return {
            no0: "",
            no1: "",
            no2: "",
            no3: ""
        }
    },
    created() {
        if(this.val.value != "" ){
            let str = this.val.value;
            let arr = str.match(/.{1,4}/g);
            for(let i = 0; i < 4; i++) {
                if(i <= this.area) {
                    this['no'+i] = arr[i] ? arr[i] : '';
                }
            }
        }
    },
    methods: {
        checkVal: function(evt) {
            let input = evt.target;
            let str = evt.target.value;
            const num = input.dataset.fromsNo;

            if(str){
                str = str.replace(/[^0-9]/g, '');

                if(num == 0 && str.length >= 16){
                    str = str.substring(0, 16);
                    let arr = str.match(/.{1,4}/g);
                    for(let i = num; i < 4; i++) {
                        if(i <= this.area) {
                            this['no'+i] = arr[i];
                        }
                    }

                    input.blur();
                }else{
                    str = str.substring(0, 4);
                    this['no'+num] = str;

                    if(str.length >= 4){
                        let nextInput = input.nextElementSibling;
                        if(nextInput){
                            nextInput = nextInput.nextElementSibling;
                            nextInput.focus();
                        }
                    }
                }
            }

            let fmVal = this.val;
            fmVal.value = this.no0 + this.no1 + this.no2 + this.no3;
            this.$emit('update:val', fmVal);
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        nextInput: function(evt){
            let input = evt.target;
            let str = evt.target.value;
            if(evt.code == 'Backspace' && str.length == 0){
                let prevInput = input.previousElementSibling;
                if(prevInput){
                    prevInput = prevInput.previousElementSibling;
                    prevInput.focus();
                }
            }
        }
    },
    template: `
    <input type="text" class="form-control col" inputmode="numeric" placeholder="0000" data-froms-no="0"
    :class="{invalid:val.invalid}" v-model="no0" @keypress="isNumber" @input="checkVal" @change="checkVal" @keyup="nextInput">
    <span class="d-none d-sm-inline-block">-</span>
    <input type="text" class="form-control col" inputmode="numeric" placeholder="0000" data-froms-no="1"
    :class="{invalid:val.invalid}" v-model="no1" @keypress="isNumber" @input="checkVal" @change="checkVal" @keyup="nextInput">
    <span class="d-none d-sm-inline-block">-</span>
    <input type="text" class="form-control col" inputmode="numeric" placeholder="0000" data-froms-no="2"
    :class="{invalid:val.invalid}" v-model="no2" @keypress="isNumber" @input="checkVal" @change="checkVal" @keyup="nextInput">
    <span class="d-none d-sm-inline-block">-</span>
    <input v-if="area>=3" type="text" class="form-control col" inputmode="numeric" placeholder="0000" data-froms-no="3"
    :class="{invalid:val.invalid}" v-model="no3" @keypress="isNumber" @input="checkVal" @change="checkVal" @keyup="nextInput">
    <input v-else type="text" class="form-control w-sm" inputmode="numeric" placeholder="0000" value="XXXX" disabled>
    `
}
const FormsCreditlimit = {
    props: ['val'],
    emits: ['update:val'],
    data() {
        return {
            years:[],
            months:[],

            year: -1,
            month: -1,
        }
    },
    created() {
        let thisyear = new Date().getFullYear();
        for (let i = thisyear; i <= thisyear+7; i++) {
            this.years.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            this.months.push(i);
        }

        let date = this.val.value == "" ? new Date() : new Date(this.val.value + '/01');
        this.year = date.getFullYear();
        this.month = this.formatNum(date.getMonth() + 1);

        let fmVal = this.val;
        fmVal.value = this.year + '/' + this.month;
        this.$emit('update:val', fmVal)
    },
    methods: {
        dateSelect(){
            let fmVal = this.val;
            fmVal.value = this.year + '/' + this.month;
            this.$emit('update:val', fmVal)
        },
        formatNum(num) {
            return num < 10 ? '0' + num : num;
        },
    },
    template: `
    <select class="form-select col" :class="{invalid:val.invalid}" v-model="month" @change="dateSelect">
        <option v-for="m in months" :value="formatNum(m)">{{ formatNum(m) }}</option>
    </select>
    <span class="mx-2 col-auto">月</span>
    <select class="form-select col" :class="{invalid:val.invalid}" v-model="year" @change="dateSelect">
        <option v-for="y in years" :value="y">{{ y }}</option>
    </select>
    <span class="ms-2 col-auto">年</span>
    `
}
const FormsCreditsecurity = {
    props: ['val'],
    emits: ['update:val'],
    methods: {
        checkVal: function(evt) {
            let value = evt.target.value
            let fmVal = this.val;
            fmVal.value = value.replace(/[^0-9]/g, '');
            this.$emit('update:val', fmVal)
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    },
    template: `
    <input type="text" class="form-control col-auto" inputmode="numeric" maxlength="3"
    v-model="val.value" placeholder="000" :class="{invalid:val.invalid}"
    @keypress="isNumber" @change="checkVal" >
    `
}
const FormsReceipt = {
    props: ['val', 'valBarcode', 'valGui', 'valGuitit'],
    emits: ['update:val', 'update:valBarcode', 'update:valGui', 'update:valGuitit'],
    methods: {
        setReceipt(evt) {
            let fmValBarcode = this.valBarcode;
            let fmValGui = this.valGui;
            let fmValGuitit = this.valGuitit;

            if(this.val.value == 0){
                fmValBarcode.req = true;
            }else{
                fmValBarcode.value = "";
                fmValBarcode.req = false;
            }

            if(this.val.value == 1){
                fmValGui.req = true;
                fmValGuitit.req = true;
            }else{
                fmValGui.value = "";
                fmValGuitit.value = "";
                fmValGui.req = false;
                fmValGuitit.req = false;
            }

            this.$emit('update:valBarcode', fmValBarcode);
            this.$emit('update:valGui', fmValGui);
            this.$emit('update:valGuitit', fmValGuitit);
        }
    },
    template: `

    <div class="col-md-auto d-none">
        <div class="form-check">
            <input type="radio" name="invoice" id="radio0" value="0" v-model="val.value" @change="setReceipt">
            <label for="radio0">{{ val.titarr[0] }}</label>
        </div>
    </div>
    <div class="col-md-auto">
        <div class="form-check">
            <input type="radio" name="invoice" id="radio1" value="4" v-model="val.value" @change="setReceipt">
            <label for="radio1">{{ val.titarr[4] }}</label>
        </div>
    </div>
    <div class="col-md-auto">
        <div class="form-check">
            <input type="radio" name="invoice" id="radio2" value="2" v-model="val.value" @change="setReceipt">
            <label for="radio2">{{ val.titarr[2] }}</label>
        </div>
    </div>
    <div class="col-md-auto">
        <div class="form-check">
            <input type="radio" name="invoice" id="radio3" value="1" v-model="val.value" @change="setReceipt">
            <label for="radio3">{{ val.titarr[1] }}</label>
        </div>
    </div>

    <div class="wrap-blue mt-2 d-none" v-if="val.value=='0'">
        <div class="row">
            <div class="col-12 col-md-6">
                <label class="col-form-label">{{ valBarcode.tit }}</label>
                <input type="text" class="form-control" placeholder="/AAAA000" inputmode="url" maxlength="8"
                v-model="valBarcode.value" :class="{invalid:valBarcode.invalid}">
            </div>
        </div>
    </div>

    <div class="wrap-blue mt-2" v-if="val.value=='4'">
        <p class="mb-0 fw-bold">開立說明：</p>
        <p>本網站提供電子發票，若中獎將於當月底發出Email通知。</p>
        <p class="mb-0 fw-bold">取消訂單說明：</p>
        <p>本人同意訂單取消或金額調整由肯驛國際代為處理銷售憑證。(例如：營業人銷貨退回，進貨退出，或折讓證明單)，以加速辦理退款作業，如有問題請致電肯驛國際客服專線。</p>
    </div>

    <div class="wrap-blue mt-2" v-if="val.value=='1'">
        <div class="row">
            <div class="col-12 col-md-6 mb-2 mb-md-0">
                <label class="col-form-label">{{ valGui.tit }}</label>
                <input type="text" class="form-control" inputmode="numeric" maxlength="8"
                v-model="valGui.value" :placeholder="'請輸入'+valGui.tit" :class="{invalid: valGui.invalid}">
            </div>
            <div class="col-12 col-md-6">
                <label class="col-form-label">{{ valGuitit.tit }}</label>
                <input type="text" class="form-control" maxlength="50"
                v-model="valGuitit.value" :placeholder="'請輸入'+valGuitit.tit" :class="{invalid: valGuitit.invalid}">
            </div>
        </div>
    </div>
    `
}

const FormsAccount = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="text" class="form-control" maxlength="20" inputmode="email"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}
const FormsPassword = {
    props: ['val'],
    emits: ['update:val'],
    template: `
    <input type="password" class="form-control" maxlength="20"
    v-model="val.value" :placeholder="'請輸入'+val.tit" :class="{invalid:val.invalid}">
    `
}