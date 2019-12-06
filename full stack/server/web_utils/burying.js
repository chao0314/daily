import {Base64} from 'js-base64';
document.addEventListener('click', function (e) {
    let bUrl = 'http://localhost:8082';
    let element = e.target || e.srcElement;
    let aData = [];
    while (element) {
        if (element.dataset && element.dataset.bid) {
            let {bid, bdata} = element.dataset;
            aData.push(
                {
                    bid,
                    bdata,
                    uid: document.cookie.match(/uid=(\w{32})/i)[1]
                }
            )

        }

        element = element.parentElement;
    }
    if (aData.length > 0) {
        let oImg = new Image();
        oImg.src = `${bUrl}/da?d=${Base64.encode(JSON.stringify(aData))}&rm=${Math.random()}`;
    }


}, false);