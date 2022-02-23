const PI2 = Math.PI * 2;

class GradientParticle {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.fixedRadius = radius;
    this.rgb = rgb;
    this.sinValue = 1.5708;
    this.xSpeed = 10 * (Math.random() - 0.5);
    this.ySpeed = 10 * (Math.random() - 0.5);
  }

  animate(ctx) {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.x = 5;
      this.xSpeed = -this.xSpeed;
    } else if (this.x > this.stageWidth) {
      this.x = this.stageWidth - 5;
      this.xSpeed = -this.xSpeed;
    }
    if (this.y < 0) {
      this.y = 5;
      this.ySpeed = -this.ySpeed;
    } else if (this.y > this.stageHeight) {
      this.y = this.stageHeight - 5;
      this.ySpeed = -this.ySpeed;
    }
    this.sinValue -= 0.00001;
    this.newRadius =
      this.fixedRadius * (Math.abs(Math.sin(this.sinValue) * 0.5) + 0.5);

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.newRadius * 0.01,
      this.x,
      this.y,
      this.newRadius
    );
    g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`);
    g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`);
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.newRadius, 0, PI2);
    ctx.fill();
    ctx.closePath();
  }
}

export { GradientParticle };
