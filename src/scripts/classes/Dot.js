import config from '../config';

export default class Dot {
    constructor(x = 0, y = 0, radius = 5, color = 'black') {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;

        this.vx = 0;
        this.vy = 0;
        this.friction = config.friction;
        this.springFactor = config.springFactor;

        this.radius = radius;
        this.color = color;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    update(mouse) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

        let dist = Math.sqrt(dx * dx + dy * dy);
        // interaction
        if (dist < 30) {
            let angle = Math.atan2(dy, dx);
            let tx = mouse.x + Math.cos(angle) * 30;
            let ty = mouse.y + Math.sin(angle) * 30;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
        }

        // spring back
        let dx1 = -(this.x - this.originalX);
        let dy1 = -(this.y - this.originalY);

        this.vx += dx1 * this.springFactor;
        this.vy += dy1 * this.springFactor;


        // friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // actual move
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}