class Modal extends ProxyClass {
    _root;
    _parent;
    _oLis;

    constructor(parent, dataFactory) {
        assert(parent instanceof HTMLElement);
        assert(dataFactory instanceof Function);
        let data = dataFactory();
        assert(Array.isArray(data.list));
        super();
        this._parent = parent;
        this._root = this._create('div');
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }

        }
        this.show = false;

    }

    click(handler) {
        this._oLis = this._oLis || Array.from(this._root.querySelectorAll("ul.column li"));
        console.log(this._oLis)
        this._oLis.forEach(li => {
            console.log("--e")
            li.onclick = null;
            li.addEventListener("click", function() {
                console.log("click")
                // this._oLis.forEach(li => {
                //     li.className = "row aic";
                // });
                li.className = "row aic active";
                handler instanceof Function && handler(this.childNodes[1].nodeValue);
            })
        })


    };

    render() {
        let lis = this.list.reduce((acc, v, i) => {
            let className = i === 0 ? "row aic active" : "row aic";
            let li = v.src ? ` <li class="${className}"><img class="img" src=${v.src} alt="">${v.title}</li>` :
                `<li class="${className}"><i class="iconfont icon-heart-fill active-h"></i>${v.title}</li>`;
            acc.push(li);
            return acc;
        }, []);

        this._root.innerHTML = `<div><div class="wave s">
            <div class="_2MUigC9rTs5TkYEURNVt2q">
            </div>
            <div class="JvceXUqvhLlL6h0qs-nzk">
            </div>
            <div class="_3DmB-mG2d4JJdAo4ugPaTU">
            </div>
            <div class="_3GgHqQVPiHBR5MylzyjNls">
            </div>
        </div>
        <div class="container">
            <ul class="column">
                ${lis.join("")}
            </ul>

            <hr class="_24GcLdJnvrJ23aKnPCasbJ">

            <div class="row aic collect-link">
                <p class="flex-1">${this.nav}</p>

                <svg class="icon icon-angle-right" width="18" height="18" viewBox="0 0 18 18" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     style="transform: rotate(270deg); position: absolute; right: 28px; bottom: 20px;">
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path
                                d="M13.8074785,10.809253 C14.0641738,11.0815536 14.0641738,11.5228421 13.8074785,11.7958146 C13.5501613,12.0680618 13.1339704,12.0680618 12.8766432,11.7958146 L9.00000502,7.68466501 L5.12270484,11.7958146 C4.86599947,12.0680618 4.44920681,12.0680618 4.19249141,11.7958146 C3.9358362,11.5228421 3.9358362,11.0815536 4.19249141,10.809253 L8.53426641,6.20422541 C8.79158361,5.93192486 9.20776444,5.93192486 9.46510169,6.20422541 L13.8074785,10.809253 Z"
                                id="Shape" fill="#C6C6C6"
                                transform="translate(9.000000, 9.000000) scale(1, -1) translate(-9.000000, -9.000000)"></path>
                    </g>
                </svg>
            </div>
        </div></div>`;
        if (this.show) {
            this._root.style.display = "block";
        } else {
            this._root.style.display = "none";
        }


    }

    _create(el) {
        let oDiv = document.createElement(el);
        oDiv.className = "live-tab";
        this._parent.appendChild(oDiv);
        return oDiv;
    }

}
