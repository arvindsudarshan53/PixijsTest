import { Sprite, Container, Texture } from 'https://cdn.skypack.dev/pixi.js';

export class ParticleSystem {
  constructor(app, texture, container) {
    this.app = app;
    this.texture = texture;
    this.container = container;
    this.maggots = [];
    this.datasetIndex = 0;
    this.batchSize = 200;
    this.isLoading = false;
    this.activeCategory = null; // Track selected category for corner placement

    this.maggotBoundsPadding = 100;
    this.maggotBounds = {
      x: -this.maggotBoundsPadding,
      y: -this.maggotBoundsPadding,
      width: app.screen.width + this.maggotBoundsPadding * 2,
      height: app.screen.height + this.maggotBoundsPadding * 2,
    };

    this.mousePosition = { x: 0, y: 0 };
    this.radius = 150;
    this.container.interactive = true;

    this.cornerPositions = {
      1: { x: 0, y: 0 },
      2: { x: this.app.screen.width, y: 0 },
      3: { x: 0, y: this.app.screen.height },
      4: { x: this.app.screen.width, y: this.app.screen.height },
    };

    this.app.view.addEventListener('mousemove', (event) => {
      const rect = this.app.view.getBoundingClientRect();
      this.mousePosition.x = event.clientX - rect.left;
      this.mousePosition.y = event.clientY - rect.top;
    });
  }

  addMaggotsFromBatch(datasetBatch) {
    for (const entry of datasetBatch) {
      this.addMaggot(entry);
    }
  }

  addMaggot(entry) {
    const maggot = new Sprite(this.texture);
    maggot.anchor.set(0.5);
    maggot.x = Math.random() * this.app.screen.width;
    maggot.y = Math.random() * this.app.screen.height;
    maggot.scale.set(0.8 + Math.random() * 0.3);
    maggot.direction = Math.random() * Math.PI * 2;
    maggot.turningSpeed = Math.random() - 0.8;
    maggot.speed = (2 + Math.random() * 2) * 0.2;
    maggot.offset = Math.random() * 100;
    maggot.tint = entry.tint;
    maggot.category = entry.category;

    this.maggots.push(maggot);
    this.container.addChild(maggot);
  }

  async loadDatasetInBatches(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load dataset.json');
    const data = await response.json();

    this.isLoading = true;
    while (this.datasetIndex < data.length) {
      const batch = data.slice(this.datasetIndex, this.datasetIndex + this.batchSize);
      this.addMaggotsFromBatch(batch);
      this.datasetIndex += this.batchSize;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    this.isLoading = false;
  }

  moveMaggotsToCategoryCorner(category) {
    const corner = this.cornerPositions[category];
    if (!corner) return;

    // Move matching maggots to the corner
    for (let maggot of this.maggots) {
      if (maggot.category === category) {
        maggot.x = corner.x;
        maggot.y = corner.y;
      }
    }

    // Unlock all maggots so they can move again
    this.activeCategory = null;
  }

  updateMaggots() {
    for (let maggot of this.maggots) {
      maggot.direction += maggot.turningSpeed * 0.01;
      maggot.x += Math.sin(maggot.direction) * maggot.speed;
      maggot.y += Math.cos(maggot.direction) * maggot.speed;
      maggot.rotation = -maggot.direction + Math.PI;

      const distX = maggot.x - this.mousePosition.x;
      const distY = maggot.y - this.mousePosition.y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < this.radius) {
        const angleAway = Math.atan2(distY, distX) + Math.PI;
        const moveAwayDistance = this.radius - distance;
        maggot.x += Math.cos(angleAway) * moveAwayDistance * 0.1;
        maggot.y += Math.sin(angleAway) * moveAwayDistance * 0.1;
      }

      if (maggot.x < this.maggotBounds.x) maggot.x += this.maggotBounds.width;
      else if (maggot.x > this.maggotBounds.x + this.maggotBounds.width) maggot.x -= this.maggotBounds.width;

      if (maggot.y < this.maggotBounds.y) maggot.y += this.maggotBounds.height;
      else if (maggot.y > this.maggotBounds.y + this.maggotBounds.height) maggot.y -= this.maggotBounds.height;
    }
  }

  removeAllMaggots() {
    this.container.removeChildren();
    this.maggots.length = 0;
    this.activeCategory = null;
  }
}
