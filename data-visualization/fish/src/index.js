const filenames = ['bottom.json', 'cannon.json', 'bullet.json', 'fishnet.json'];

getData(filenames).then(data => {
    // console.log(data);
    const canvas = document.querySelector("#app");
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cannonType = 1;
    const cannonFrame = 1;

    document.addEventListener('mousemove', (ev) => {



    })

    draw();

    function draw() {

        // bottom bar
        const bottomBar = data['bottom-bar'];
        drawImage(ctx, bottomBar.img, {
            dx: W / 2 - bottomBar.w / 2,
            dy: H - bottomBar.h

        })

        //cannon
        const cannon = data[`cannon${cannonType}`];
        const ch = cannon.h / 5;
        drawImage(ctx, cannon.img, {
            sh: cannonFrame * ch,
            dx: W / 2 - cannon.w / 2 + 50,
            dy: H - ch,
            dh: cannonFrame * ch

        })


    }


});


