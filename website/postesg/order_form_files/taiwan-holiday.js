/*-------------------------------------------------------
taiwan-holiday.js
目前已更新到2023，建議保留今年與明年陣列即可

更新步驟
1. 上政府網站下載CSV行事曆 https://data.gov.tw/dataset/14718
2. 打開CSV移除沒有備註的日期、更新表格標題，依序為：date(西元日期), day(星期), off(是否放假), memo(備註)
3. 用線上工具(ex:https://www.aconvert.com/tw/document/csv-to-json/)將 CSV 轉為 JSON 格式
4. 壓縮一下 JSON 長度 https://codebeautify.org/jsonminifier
5. 把壓縮好的 JSON 貼到下面的 taiwanArr 內 ~ DONE!
-------------------------------------------------------*/

const taiwanHoliday = {
    taiwanArr:[
        [{"date":"20230101","day":"日","off":"2","memo":"開國紀念日"},{"date":"20230102","day":"一","off":"2","memo":"補假"},{"date":"20230107","day":"六","off":"0","memo":"補行上班"},{"date":"20230120","day":"五","off":"2","memo":"小年夜"},{"date":"20230121","day":"六","off":"2","memo":"農曆除夕"},{"date":"20230122","day":"日","off":"2","memo":"春節"},{"date":"20230123","day":"一","off":"2","memo":"春節"},{"date":"20230124","day":"二","off":"2","memo":"春節"},{"date":"20230125","day":"三","off":"2","memo":"補假"},{"date":"20230126","day":"四","off":"2","memo":"補假"},{"date":"20230127","day":"五","off":"2","memo":"調整放假"},{"date":"20230204","day":"六","off":"0","memo":"補行上班"},{"date":"20230218","day":"六","off":"0","memo":"補行上班"},{"date":"20230227","day":"一","off":"2","memo":"調整放假"},{"date":"20230228","day":"二","off":"2","memo":"和平紀念日"},{"date":"20230325","day":"六","off":"0","memo":"補行上班"},{"date":"20230403","day":"一","off":"2","memo":"調整放假"},{"date":"20230404","day":"二","off":"2","memo":"兒童節"},{"date":"20230405","day":"三","off":"2","memo":"民族掃墓節"},{"date":"20230617","day":"六","off":"0","memo":"補行上班"},{"date":"20230622","day":"四","off":"2","memo":"端午節"},{"date":"20230623","day":"五","off":"2","memo":"調整放假"},{"date":"20230923","day":"六","off":"0","memo":"補行上班"},{"date":"20230929","day":"五","off":"2","memo":"中秋節"},{"date":"20231009","day":"一","off":"2","memo":"調整放假"},{"date":"20231010","day":"二","off":"2","memo":"國慶日"}],
        [{"date":"20240101","day":"一","off":"2","memo":"開國紀念日"},{"date":"20240208","day":"四","off":"2","memo":"小年夜"},{"date":"20240209","day":"五","off":"2","memo":"農曆除夕"},{"date":"20240210","day":"六","off":"2","memo":"春節"},{"date":"20240211","day":"日","off":"2","memo":"春節"},{"date":"20240212","day":"一","off":"2","memo":"春節"},{"date":"20240213","day":"二","off":"2","memo":"補假"},{"date":"20240214","day":"三","off":"2","memo":"補假"},{"date":"20240217","day":"六","off":"0","memo":"補行上班"},{"date":"20240228","day":"三","off":"2","memo":"和平紀念日"},{"date":"20240404","day":"四","off":"2","memo":"兒童節及民族掃墓節"},{"date":"20240405","day":"五","off":"2","memo":"補假"},{"date":"20240610","day":"一","off":"2","memo":"端午節"},{"date":"20240917","day":"二","off":"2","memo":"中秋節"},{"date":"20241010","day":"四","off":"2","memo":"國慶日"}]
    ],
    dateInArr: function(date){
        let dateObj = typeof date != 'object' ? new Date(date) : date;
        let dateStr = '';
        let m = String(dateObj.getMonth() + 1);
        let d = String(dateObj.getDate());

        dateStr = dateObj.getFullYear();
        dateStr += m.padStart(2, '0');
        dateStr += d.padStart(2, '0');

        let obj = {};
        for(let i=0; i < this.taiwanArr.length; i++ ){
            obj = this.taiwanArr[i].find(function(el){
                return el.date == dateStr;
            });

            if(obj != undefined){
                break;
            }
        }

        return obj;
    },
    checkDate: function(date){
        return this.dateInArr(date);
    }
}