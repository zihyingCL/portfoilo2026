//////////////////////////////////////
// PROJECT UI
const UiOrder = {
    props: ['uidata', 'btn', 'price', 'uiClass'],
    template: `
    <div :class="'order ' + uiClass">
        <div class="order__num" v-if="uidata.no!=undefined">訂單編號 <span class="ms-2">{{ uidata.no }}</span></div>
        <div class="order__time" v-if="uidata.date!=undefined">訂單日期 {{ uidata.date }}</div>
        <div class="order__info">
            <div class="order__info-pic" :style="'background-image: url(' + uidata.gallery[0] + ');'"></div>
            <div class="order__info-txt">
                <div>
                    <div class="tit">預約行程</div>
                    <div class="txt fz-2"><a :href="'page.aspx?puid=' + uidata.puid" target="_blenk">{{ uidata.tit }}</a></div>
                </div>
                <div>
                    <div class="tit">組數</div>
                    <div class="txt">{{ uidata.num }} 組</div>
                </div>
                <div>
                    <div class="tit">預約人數</div>
                    <div class="txt">{{ uidata.totalPeople }} 位</div>
                </div>
                <div v-if="uidata.addPrice">
                    <div class="tit">假日加價</div>
                    <div class="txt">NT$ {{ uidata.addPrice.toLocaleString('en-US') }} / 組</div>
                </div>
            </div>
            <div>
                <div class="order__info-price jsAnchor">
                    總金額 
                    <div class="ms-2 d-inline-block">NT$ 
                        <span class="fz-1">{{ price ? price : uidata.total.toLocaleString('en-US') }}</span>
                    </div>
                </div>
                <div class="order__info-state" v-if="uidata.step!=undefined">{{ uidata.step }}</div>
            </div>
            <div class="order__info-ctrl row justify-content-center px-4" v-if="btn">
                <a class="btn btn-2" :href="'detail.aspx?tk=' + uidata.tk">查看訂單</a>
                <a class="btn btn-2 no-bg mt-3" :href="'detail_cancel.aspx?tk=' + uidata.tk" v-if="uidata.step!='訂單已取消'">取消訂單</a>
            </div>
        </div>
    </div>
    `
}
const UiOrderList = {
    props: ['uidata', 'btn', 'price', 'uiClass'],
    template: `
    <div :class="'order ' + uiClass">
        <div class="order__num" v-if="uidata.no!=undefined">訂單編號 <span class="ms-2">{{ uidata.no }}</span></div>
        <div class="order__time" v-if="uidata.date!=undefined">訂單日期 {{ uidata.date }}</div>
        <div class="order__info">
            <div class="order__info-pic" :style="'background-image: url(' + uidata.gallery[0] + ');'"></div>
            <div class="order__info-txt">
                <div>
                    <div class="tit">預約行程</div>
                    <div class="txt fz-2"><a :href="'page.aspx?puid=' + uidata.puid" target="_blenk">{{ uidata.tit }}</a></div>
                </div>
                <div>
                    <div class="tit">組數</div>
                    <div class="txt">{{ uidata.num }} 組</div>
                </div>
                <div>
                    <div class="tit">預約人數</div>
                    <div class="txt">{{ uidata.totalPeople }} 位</div>
                </div>
                <div v-if="uidata.addPrice">
                    <div class="tit">假日加價</div>
                    <div class="txt">NT$ {{ uidata.addPrice.toLocaleString('en-US') }} / 組</div>
                </div>
                <div>
                    <div class="tit">預約日期</div>
                    <div class="txt">{{ uidata.orderdate }}</div>
                </div>
            </div>
                <div class="order__info-price jsAnchor">
                    總金額 
                    <div class="ms-2 d-inline-block">NT$ 
                        <span class="fz-1">{{ price ? price : uidata.total.toLocaleString('en-US') }}</span>
                    </div>
                <div class="order__info-state" v-if="uidata.step!=undefined">{{ uidata.step }}</div>
                </div>
            <div class="order__info-ctrl row justify-content-center px-4 gap-3" v-if="btn">
                <a class="btn btn-2 col-md-12 col order-md-1 order-2" :href="'detail.aspx?tk=' + uidata.tk">查看訂單</a>
                <a class="btn btn-2 no-bg col-md-12 col order-md-2 order-1" :href="'detail_cancel.aspx?tk=' + uidata.tk" v-if="uidata.step!='訂單已取消'">取消訂單</a>
            </div>
        </div>
    </div>
    `
}
const UiCheckOrder = {
    props: ['uidata', 'holiday'],
    template: `
    <div class="detail-wrap__order">
        <ul v-for="item in uidata">
            <div class="grid-full" v-if="item.id == 'creditcode'"><hr><h4 class="py-3 color-text">付款資訊</h4></div>
            <div class="grid-full" v-else-if="item.id == 'receipt'"><hr><h4 class="py-3 color-text">發票資訊</h4></div>
            <li>
                {{ item.tit }}
            </li>
            <li>
                {{ item.showValue ? item.showValue : item.value }}
                <div class="mt-2 mt-sm-0 ms-sm-2 d-sm-inline-block" v-if="item.id == 'orderdate' && holiday"><small class="info-tag">適用 假日加價</small></div>
            </li>        
        </ul>
    </div>
    `
}
const UiSteps = {
    props: ['uidata'],
    template: `
    <div class="step-process">
        <div :class="{active: uidata >= 1}"><span>選擇行程</span></div>
        <div :class="{active: uidata >= 2}"><span>注意事項</span></div>
        <div :class="{active: uidata >= 3}"><span>填寫資料</span></div>
        <div :class="{active: uidata >= 4}"><span>確認資料</span></div>
        <div :class="{active: uidata >= 5}"><span>完成預約</span></div>
    </div>
    `
}
const UiSpecs = {
    props: ['uidata', 'check'],
    emits: ['update:check'],
    data() {
        return {
            tit: "specs",
        }
    },
    template: `
    <div class="form-specs">
        <div class="form-specs__item" v-for="(ui, idx) in uidata">
            <input type="radio" :id="tit + idx" :value="idx" :name="tit" :checked="check == idx" @change="$emit('update:check', $event.target.value)">
            <label :for="tit + idx">{{ ui.specname }}</label>
        </div>
    </div>
    `
}


//////////////////////////////////////
// FORM SETTING
// var FormSetting = {
//     formID: 'form1',
//     HFTitle:'ContentPlaceHolder1_',
//     HFLabel: [
//         {
//             id: "name",
//             tit: "持卡人姓名"
//         }
//     ]
// }

///////////////////////////////////////
// TOUR
const FormListTour = [
    {
        id: "name",
        HFid: "HFName",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "sex",
        HFid: "HFSex",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "phone",
        HFid: "HFPhone",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "email",
        HFid: "HFEMail",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "idcode",
        HFid: "HFIDCode",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "birth",
        HFid: "HFBirth",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "orderdate",
        HFid: "HFOrderDate",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "memotrip",
        HFid: "HFMemoTrip",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "creditcode",
        HFid: "HFCreditCode",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "creditlimit",
        HFid: "HFCreditLimit",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "creditsecurity",
        HFid: "HFCreditSecurity",
        value: "",
        invalid: false,
        req: true,
    },
    
    {
        id: "receipt",
        HFid: "HFReceipt",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "barcode",
        HFid: "HFReceiptBarcode",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "gui",
        HFid: "HFReceiptGUI",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "guitit",
        HFid: "HFReceiptGUITitle",
        value: "",
        invalid: false,
        req: false,
    }
];

///////////////////////////////////////
// HOTEL
const FormListHotel = [
    {
        id: "name",
        HFid: "HFName",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "sex",
        HFid: "HFSex",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "phone",
        HFid: "HFPhone",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "email",
        HFid: "HFEMail",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "idcode",
        HFid: "HFIDCode",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "orderdate",
        HFid: "HFOrderDate",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "memohotel",
        HFid: "HFMemoHotel",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "creditcode",
        HFid: "HFCreditCode",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "creditlimit",
        HFid: "HFCreditLimit",
        value: "",
        invalid: false,
        req: true,
    },
    
    {
        id: "receipt",
        HFid: "HFReceipt",
        value: "",
        invalid: false,
        req: true,
    },
    {
        id: "barcode",
        HFid: "HFReceiptBarcode",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "gui",
        HFid: "HFReceiptGUI",
        value: "",
        invalid: false,
        req: false,
    },
    {
        id: "guitit",
        HFid: "HFReceiptGUITitle",
        value: "",
        invalid: false,
        req: false,
    }
];