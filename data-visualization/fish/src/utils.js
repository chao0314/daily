function loadImg(src) {

    return new Promise((resolve, reject) => {

        const oImg = new Image();

        oImg.onload = () => resolve(oImg);

        oImg.onerror = err => reject(err);

        oImg.src = src;
    })

}


function loadImages(sources) {

    const maxErrorTimes = 3;

    return new Promise((resolve, reject) => {

        const result = [];
        const error = [];
        let completed = 0;

        for (let i = 0; i < sources.length; i++) {

            load(sources[i], i, 0);
        }


        function load(src, index = 0, errorTimes = 0) {

            loadImg(src).then(oImg => {

                result[index] = oImg;

                if (++completed === sources.length) resolve(result);

            }, err => {

                if (errorTimes < maxErrorTimes) {

                    load(src, index, errorTimes++);

                } else {

                    error.push(src);

                    if (completed + error.length === sources.length) reject(error);
                }

            })


        }

    })


}

function drawImage(ctx, img, options = {}) {

    if (!img) throw new Error('need img');
    if (!ctx) throw new Error("need context");

    const w = img.width;
    const h = img.height;

    const {
        translateX = 0,
        translateY = 0,
        sx = 0,
        sy = 0,
        sw = w,
        sh = h,
        dx = 0,
        dy = 0,
        dw = w,
        dh = h,
        arc = 0
    } = options;


    ctx.save();

    ctx.translate(translateX, translateY);

    ctx.rotate(arc);

    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

    ctx.restore();


}


function calcArc(x1, y1, x2, y2) {

    // 屏幕画布坐标系 y向下递增，与数学课本相反,因此第一象限为负值
    //X 轴正方向角度为 0
    //此时原点相当于 （x1,y1）
    return Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;


}


function getData(filenames, base_url = "http://localhost:3000/public") {

    return new Promise(((resolve, reject) => {
        const data = {};

        const promises = filenames.map(filename => axios.get(`${base_url}/data/${filename}`));
        Promise.all(promises).then(results => {

            let imageNames = [];
            results.forEach(({data: {frames}}) => {

                imageNames = imageNames.concat(Object.keys(frames));

            })

            loadImages(imageNames.map(key => `${base_url}/images/${key}.png`)).then(images => {

                images.forEach((img, i) => {

                    data[imageNames[i]] = {
                        img,
                        w: img.width,
                        h: img.height
                    }

                    resolve(data);

                })

            }).catch(err => reject(err));


        }, err => reject(err));

    }))

}



