(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zh = {}));
}(this, (function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
      };
  var Mandarin = {
      weekdays: {
          shorthand: ["日", "一", "二", "三", "四", "五", "六"],
          longhand: [
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六",
          ],
      },
      months: {
          shorthand: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
          ],
          longhand: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
      },
      rangeSeparator: " 至 ",
      weekAbbreviation: "周",
      scrollTitle: "滾動切換",
      toggleTitle: "點選切換 12/24 小時制",
  };
  fp.l10ns.zh = Mandarin;
  var zh = fp.l10ns;

  exports.Mandarin = Mandarin;
  exports.default = zh;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
