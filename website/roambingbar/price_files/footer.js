// create new link tag
const link = document.createElement('link');
// set properties of link tag
link.href = 'https://cdn.canlead.com.tw/footer/footer.css?v=20230207';
link.rel = 'stylesheet';
link.type = 'text/css';
/*// Loaded successfully
link.onload = function() {
	console.log('success');
};
// Loading failed
link.onerror = function() {
	console.log('error');
};*/
// append link element to html
document.getElementsByTagName( "head" )[0].appendChild(link);

const footer = document.createElement('footer');
footer.className = "canleadFooter";
document.body.appendChild(footer);
footer.innerHTML = `
<div class="canleadFooter-warning">
    <div class="container canleadFooter-warning__wrap">
        <div class="canleadFooter-warning__title">謹慎理財 信用無價</div>
        <ul class="canleadFooter-warning__text">
            <li>信用卡暨預借現金之各級別循環信用年利率為6.75％~15％（依本行信用評分制度定期評估，循環利率之基準日為104年9月1日）。</li>
            <li>預借現金手續費：預借現金金額乘以3％加上新臺幣150元或美元5元，其他相關費用係依本行網站公告。</li>
        </ul>
    </div>
</div>
<div class="canleadFooter-top">
    <div class="container canleadFooter-top__wrap">
        <div class="canleadFooter-top__logo"><img src="https://cdn.canlead.com.tw/footer/img/canlead_w2.png" alt="CanLead" width="112" height="51.58" /></div>
        <div class="canleadFooter-top__list">
            <!-- 由 _footerInfo.json 載入資訊 -->
            <ul>
                <li>服務提供商：肯驛國際(股)公司</li>
                <li><a href="https://www.freeliving.com.tw/privacy.html" target="_black">隱私權條款</a></li>
                <li>客服專線：04-2207-9588</li>
            </ul>
        </div>
        <div class="canleadFooter-top__logoList">
            <div><img src="https://cdn.canlead.com.tw/footer/img/QA-LOGO-27001.png" alt="ISO_27001" width="60" height="71.48" />ISO 27001 認證</div>
            <div><img src="https://cdn.canlead.com.tw/footer/img/QA-LOGO-27701.png" alt="ISO_27701" width="60" height="71.48" />ISO 27701 認證</div>
            <div><img src="https://cdn.canlead.com.tw/footer/img/QA-LOGO-9001.png" alt="ISO_9001" width="60" height="71.48" />ISO 9001 認證</div>
        </div>
    </div>
</div>
<div class="canleadFooter-bottom">
    <div class="canleadFooter-bottom__wrap">
        <p class="canleadFooter-bottom__text">肯驛國際所屬品牌</p>
        <div class="canleadFooter-bottom__logo-wrap">
            <i class="canleadFooter-bottom__logo logo-UFirst-1"></i>
            <i class="canleadFooter-bottom__logo logo-UFirst-2"></i>
            <i class="canleadFooter-bottom__logo logo-DragonPass"></i>
            <i class="canleadFooter-bottom__logo logo-CallCarBar"></i>
            <i class="canleadFooter-bottom__logo logo-RoamingBar"></i>
            <i class="canleadFooter-bottom__logo logo-FreeLiving"></i>
            <i class="canleadFooter-bottom__logo logo-ARS"></i>
            <i class="canleadFooter-bottom__logo logo-Movie"></i>
            <i class="canleadFooter-bottom__logo logo-SmartTicket"></i>
            <i class="canleadFooter-bottom__logo logo-Help"></i>
            <i class="canleadFooter-bottom__logo logo-VIP"></i>
        </div>
    </div>
    <div class="canleadFooter-bottom__wrap">
        <p class="canleadFooter-bottom__text">肯驛國際集團關係企業</p>
        <div class="canleadFooter-bottom__logo-wrap">
            <i class="canleadFooter-bottom__logo logo-CanleadTravel"></i>
            <i class="canleadFooter-bottom__logo logo-HeyCar"></i>
        </div>
    </div>
</div>
`;

// 設定 _footerInfo.json Footer 資訊
if(footerInfoURL) {
    fetch(footerInfoURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (footerInfo) {
        // 是否顯示集團logo
        if (!footerInfo.showGroupLogo) {
            const logos = document.querySelector('.canleadFooter-bottom');
            logos.parentElement.removeChild(logos);
        }

        // Canlead 文字訊息列表
        const canleadFooter = document.querySelector('.canleadFooter-top__list');
        let footerText = '';
        footerInfo.infoList.forEach((element) => {
            footerText += '<ul>';
            element.forEach((el) => {
                const [text, link, target] = [el.text, el.link, el.target];
                const settarget = target ? target : '_blank';
                const relSetting= target ? "" : 'rel="noopener noreferrer"';
                if (link) {
                    footerText += `<li><a href="${link}" target="${settarget}" ${relSetting}>${text}</a></li>`;
                } else {
                    footerText += `<li>${text}</li>`;
                }
            });
            footerText += '</ul>';
        });
        canleadFooter.innerHTML = footerText;

        // 謹慎理財警語
        const warn = document.querySelector('.canleadFooter-warning');
        if(footerInfo.warningText) {
            const warnTit = document.querySelector('.canleadFooter-warning__title');
            const warnTxt = document.querySelector('.canleadFooter-warning__text');
            
            // 設定文字
            warnTit.innerHTML= footerInfo.warningText.warningTextTitle;
            let footerWarnText = '';
            footerInfo.warningText.warningTextInfo.forEach((element) => {
                footerWarnText += `<li>${element}</li>`;
            });
            warnTxt.innerHTML= footerWarnText;

            // 設定顏色
            warn.style.background = footerInfo.warningText.warningTextBgColor;
            warnTit.style.borderColor = footerInfo.warningText.warningTextColor;
            warnTit.style.color = footerInfo.warningText.warningTextColor;
            warnTxt.style.color = footerInfo.warningText.warningTextColor;
        }else{
            warn.parentElement.removeChild(warn);
        }

        // 顏色設定 - 上方
        const top = document.querySelector('.canleadFooter-top');
        if(footerInfo.topBgColor){
            top.style.background = footerInfo.topBgColor;
        }

        // 顏色設定 - 下方
        const bottom = document.querySelector('.canleadFooter-bottom');
        if(footerInfo.bottomBgColor){
            bottom.style.background = footerInfo.bottomBgColor;
        }

        // 精簡模式
        const footer = document.querySelector('.canleadFooter');
        if(footerInfo.infoSimpleMode){
            footer.classList.add('canleadFooterSimpleMode');
        }
    });
}
