import { GradientParticle } from "./gradient.js";

const colors = [
  { r: 45, g: 49, b: 250 }, // blue
  { r: 46, g: 176, b: 134 }, // green
  { r: 247, g: 110, b: 17 }, // orange
  { r: 242, g: 82, b: 135 }, // deep-pink
  { r: 255, g: 211, b: 40 }, // yellow
];

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.totalParticle = 13;
    this.particles = [];
    this.minRadius = 600;
    this.maxRadius = 900;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    for (let i = 0; i < this.totalParticle; i++) {
      const particle = new GradientParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * this.minRadius + (this.maxRadius - this.minRadius),
        colors[`${Math.floor(Math.random() * 5)}`]
      );
      this.particles.push(particle);
    }
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.globalCompositeOperation = "saturation";
    window.requestAnimationFrame(this.animate.bind(this));

    for (let i = 0; i < this.totalParticle; i++) {
      this.particles[i].animate(this.ctx);
    }
  }
}

window.onload = () => {
  new App();
};
