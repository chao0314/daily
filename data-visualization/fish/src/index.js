const filenames = ['bottom.json', 'cannon.json', 'bullet.json', 'fish.json', 'fishnet.json'];


Promise.all([getData(filenames), getFishFrame()]).then(([data, fishFrameData]) => {

    console.log("--data--", data);
    console.log("--fish frame--", fishFrameData);

    const canvas = document.querySelector("#app");
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cannonSwitchSpeed = 4;
    let cannonCounter = 0;
    let cannonType = 1;
    let cannonFrame = 1;
    let cannonRotateArc = 0;
    let cannonX = 0;
    let cannonY = 0;
    let isFiring = false;
    let bullets = [];
    let bulletSpeed = 8;
    let fishes = [];
    const fishFrameSwitchSpeed = 5;

    const buttonMinus = new ImgButton(canvas, {
        normal: data['cannon_minus'].img,
        down: data['cannon_minus_down'].img,
        x: W / 2 - 50,
        y: H - 50
    })

    const buttonPlus = new ImgButton(canvas, {
        normal: data['cannon_plus'].img,
        down: data['cannon_plus_down'].img,
        x: W / 2 + 100,
        y: H - 50
    })

    buttonMinus.click(() => {

        if (cannonType > 1) cannonType--;

    })

    buttonPlus.click(() => {
        if (cannonType < 7) cannonType++;
    })


    document.addEventListener('mousemove', (ev) => {

        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;

        cannonRotateArc = calcArc(cannonX, cannonY, x, y);

    })


    document.addEventListener("click", (ev) => {

        const x = ev.offsetX;
        const y = ev.offsetY;
        if (buttonMinus.isPointIn(x, y) || buttonPlus.isPointIn(x, y)) return false;

        isFiring = true;
        bullets.push({
            type: cannonType,
            arc: cannonRotateArc,
            x: cannonX,
            y: cannonY
        })


        console.log("length", bullets.length)
    });


    requestAnimationFrame(draw);

    function draw() {

        ctx.clearRect(0, 0, W, H);

        // bottom bar
        const bottomBar = data['bottom-bar'];
        drawImage(ctx, bottomBar.img, {
            dx: W / 2 - bottomBar.w / 2,
            dy: H - bottomBar.h

        })


        //bullet
        if (bullets.length > 0) {


            bullets = bullets.filter(v => v.x >= 0 && v.x <= W && v.y >= 0 && v.y <= H);

            bullets.forEach(v => {
                const {type, arc, x, y} = v;
                const bullet = data[`bullet${type}`];
                drawImage(ctx, bullet.img, {
                    translateX: x,
                    translateY: y,
                    dx: -bullet.w / 2,
                    dy: -bullet.h * 2,
                    arc

                })

                // 在转换角度的时候 cannon 角度向上，多加了 90
                v.x += bulletSpeed * Math.cos(arc - Math.PI / 2);
                v.y += bulletSpeed * Math.sin(arc - Math.PI / 2);

            })


        }


        //cannon
        const cannon = data[`cannon${cannonType}`];
        const ch = cannon.h / 5;
        cannonX = W / 2 + 50;
        cannonY = H;
        drawImage(ctx, cannon.img, {
            sx: 0,
            sy: (cannonFrame - 1) * ch,
            sh: ch,
            translateX: cannonX,
            translateY: cannonY,
            dx: -cannon.w / 2,
            dy: -ch,
            dh: ch,
            arc: cannonRotateArc

        })

        if (isFiring) {
            cannonCounter++;
            if (cannonCounter === cannonSwitchSpeed) {
                cannonCounter = 0;
                cannonFrame++;
            }
            if (cannonFrame > 5) {
                cannonFrame = 1;
                isFiring = false;

            }


        }

        // isFiring = false;
        // button
        buttonMinus.drawButton();
        buttonPlus.drawButton();

        // fish
        // 1% 的生成概率
        if (Math.random() < 0.01) {

            // 来鱼方向
            const from = Math.random() < 0.5 ? 'left' : 'right';

            const type = Math.floor(Math.random() * 10 + 1);

            const x = from === 'left' ? -100 : W + 100;

            const y = 200 + Math.random() * (H - 200 * 2);

            // -15 ~ +15
            let arc = Math.floor(Math.random() * angToArc(30) - angToArc(15));
            let scale = [1, 1];
            if (from === 'right') {

                arc += angToArc(-180);
                scale = [1, -1];
            }

            const fishFrame = fishFrameData[`fish${type}`];
            fishes.push({
                from,
                type,
                x, y,
                arc,
                scale,
                frame: 1,
                switchFrameCounter: 0,
                speed: fishFrame.speed + Math.random() * 3 - 1.5,
                moveFrame: fishFrame.moveFrame,
                captureFrame: fishFrame.captureFrame,
                r: fishFrame.r

            })

        }

        // draw fish

        if (fishes.length > 0) {

            //clear out of screen  fish

            fishes = fishes.filter(({x, y}) => {

                return (x > -100 || x < W + 100) && (y > -100 || y < H + 100);
            })

            console.log("---fish----",fishes.length)
            fishes.forEach(fish => {

                console.log("fish", fish)

                if (++fish.switchFrameCounter === fishFrameSwitchSpeed) {

                    fish.switchFrameCounter = 0;

                    if (fish.frame < fish.moveFrame) {
                        fish.frame++
                    } else fish.frame = 1;
                }


                const {type, x, y, arc, scale, frame, moveFrame, captureFrame, speed} = fish;

                const {img} = data[`fish${type}`];
                const frames = moveFrame + captureFrame;
                const fh = img.height / frames;

                drawImage(ctx, img, {

                    translateX: x,
                    translateY: y,
                    arc,
                    scale,
                    sx: 0,
                    sy: (frame - 1) * fh,
                    sh: fh,
                    dx: -img.with / 2,
                    dy: -fh / 2
                })

                fish.x += speed * Math.cos(arc);

                fish.y += speed * Math.sin(arc);

            })


        }


        requestAnimationFrame(draw);


    }


});


