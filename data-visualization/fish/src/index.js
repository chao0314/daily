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
    let bulletSpeed = 6;
    let fishes = [];
    let capturedFishes = [];
    let fishnets = [];
    const fishFrameSwitchSpeed = 8;
    const bulletValidFactor = 2;
    const fishnetScaleSpeed = 0.02;

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


        // isFiring = false;
        // button
        buttonMinus.drawButton();
        buttonPlus.drawButton();

        // fish
        // 2% 的生成概率
        if (Math.random() < 0.02) {

            // 来鱼方向
            const from = Math.random() < 0.5 ? 'left' : 'right';

            const type = Math.floor(Math.random() * 10 + 1);

            const x = from === 'left' ? -50 : W + 50;

            const y = 200 + Math.random() * (H - 200 * 2);

            // -15 ~ +15
            let arc = angToArc(Math.random() * 30 - 15);
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
                speed: fishFrame.speed + Math.random() * 2 - 1,
                moveFrame: fishFrame.moveFrame,
                captureFrame: fishFrame.captureFrame,
                r: fishFrame.r

            })

        }

        // draw fish

        if (fishes.length > 0) {

            //clear out of screen  fish

            fishes = fishes.filter(({x, y}) => {


                return x >= -50 && x <= W + 50 && y >= -50 && y <= H + 50;
            })

            // console.log("---fish----", fishes.length);

            fishes.forEach(fish => {


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
                    dx: -img.width / 2,
                    dy: -fh / 2,
                    dh: fh

                })

                fish.x += speed * Math.cos(arc);

                fish.y += speed * Math.sin(arc);

            })


        }


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

        // draw fishnet

        if (fishnets.length > 0) {

            fishnets = fishnets.filter(fishnet => {

                fishnet.scale += fishnetScaleSpeed;

                return fishnet.scale <= 1;

            })

            console.log("fishnet length---", fishnets.length);
            fishnets.forEach(fishnet => {

                const {type, x, y, scale} = fishnet;
                const {img} = data[`fishnet${type}`];

                drawImage(ctx, img, {

                    translateX: x,
                    translateY: y,
                    scale: [scale, scale],
                    dx: -img.width / 2,
                    dy: -img.height / 2

                })

            })


        }

        // draw captured fish

        if (capturedFishes.length > 0) {


            capturedFishes = capturedFishes.filter(({
                                                        frame,
                                                        moveFrame,
                                                        captureFrame
                                                    }) => frame < moveFrame + captureFrame)


            console.log("capture fish length ---", capturedFishes.length);


            capturedFishes.forEach(fish => {

                if (++fish.switchFrameCounter === fishFrameSwitchSpeed * 3) {

                    fish.switchFrameCounter = 0;

                    if (fish.frame < fish.moveFrame + fish.captureFrame) {
                        fish.frame++
                    }
                }


                const {type, x, y, arc, scale, frame, moveFrame, captureFrame} = fish;

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
                    dx: -img.width / 2,
                    dy: -fh / 2,
                    dh: fh

                })
            })
        }

        //check bullet and fish,crash

        fishes = fishes.filter(fish => {

            let isCaptured = false;

            bullets = bullets.filter(bullet => {

                if (isInCrashCircle(fish.x, fish.y, bullet.x, bullet.y, fish.r)) {

                    // fishnet
                    fishnets.push({

                        type: bullet.type,
                        x: bullet.x,
                        y: bullet.y,
                        scale: 0

                    })

                    // bullet is valid ,capture success
                    if (Math.random() < bullet.type / (fish.type * bulletValidFactor)) {

                        isCaptured = true;
                        // switch to capture frame
                        fish.frame = fish.moveFrame + 1;
                        capturedFishes.push(fish);

                    }

                    return false;
                }

                return true;
            })

            return !isCaptured;

        })


        requestAnimationFrame(draw);


    }


});


