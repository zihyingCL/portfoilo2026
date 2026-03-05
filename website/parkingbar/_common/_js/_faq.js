$.getJSON("_common/_js/_faq.json", function(data){

    var faqList = "";
    var faqNo = 0;
    for (var i in data) {
        faqNo += 1;
        faqList += 
        '<div class="form__faq" data-aos="fade-right" data-aos-duration="1500"><h2><span>Q' + faqNo + '</span><span>' + data[i].question + '</span></h2><p>' + data[i].answer + '</p></div>'
    }
    document.getElementById("faq").innerHTML = faqList;

})