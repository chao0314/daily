const rect = {
    onStart(x, y) {
        return {};
    },
    onMove(data, x, y, startX, startY) {
        let l = Math.min(startX, x);
        let t = Math.min(startY, y);

        let w = Math.abs(x - startX);
        let h = Math.abs(y - startY);

        return {x: l, y: t, w, h};
    },
    draw(data) {
        const {x, y, w, h} = data;
        gd.rect(x, y, w, h);
    },
};

