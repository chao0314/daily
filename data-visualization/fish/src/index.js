const filenames = ['bottom.json', 'cannon.json', 'bullet.json', 'fishnet.json'];

getData(filenames).then(data => {
    // console.log(data);
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
    let bulletSpeed = 4;


    document.addEventListener('mousemove', (ev) => {

        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;

        cannonRotateArc = calcArc(cannonX, cannonY, x, y);

    })


    document.addEventListener("click", () => {
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
                console.log("bullet", type, arc, x, y)
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


        requestAnimationFrame(draw);


    }


});


