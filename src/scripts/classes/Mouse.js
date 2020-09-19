export default class Mouse {
    constructor(el) {
        this.x = 0;
        this.y = 0;
        const rect = el.getBoundingClientRect();

        el.onmousemove = e => {
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        };
    }
}