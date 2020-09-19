import '../styles/index.scss';

import Mouse from "./classes/Mouse";
import Dot from "./classes/Dot";

const canvas = document.getElementById("canvas");
canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const pos = new Mouse(canvas);
const dots = [];

const mouse = new Dot(0, 0, 30, "green");

for (let i = 0; i < window.innerWidth * window.innerHeight / 2500; i++) {
    dots.push(
        new Dot(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
        )
    );
}

function Render() {
    window.requestAnimationFrame(Render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mouse.setPos(pos.x, pos.y);
    mouse.draw(ctx);

    dots.forEach(dot => {
        dot.update(pos);
        dot.draw(ctx);
    });
}

Render();