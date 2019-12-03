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
                    uid: document.cookie.match(/uid=(\w{32})/g)[0]
                }
            )

        }

        element = element.parentElement;
    }
    if (aData.length > 0) {
        let oImg = new Image();
        oImg.src = `${bUrl}/da?d=${JSON.stringify(aData)}`;
    }

    console.log(aData);

}, false);