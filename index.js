import { Application, Assets } from 'https://cdn.skypack.dev/pixi.js';
import * as PIXI from 'https://cdn.skypack.dev/pixi.js';
import Stats from 'https://cdn.skypack.dev/stats.js';
import { ParticleSystem } from './src/core/ParticleSystem.js';
import { ShaderPipeline } from './src/core/ShaderPipeline.js';
import { UIController } from './src/controllers/UIController.js';
import { DataManager } from './src/core/DataManager.js';

(async () => {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    const app = new Application();
    await app.init({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(app.canvas);
    app.ticker.maxFPS = 60;

    const texture = await Assets.load('https://pixijs.com/assets/maggot_tiny.png');

    const spritesContainer = new PIXI.Container();
    app.stage.addChild(spritesContainer);

    const particleSystem = new ParticleSystem(app, texture, spritesContainer);

    const slider = document.getElementById('maggotSlider');
    const maggotLabel = document.getElementById('maggotCount');
    const categoryDropdown = document.getElementById('categoryDropdown');

    const uiController = new UIController(slider, maggotLabel, categoryDropdown, (count) => {
        particleSystem.removeAllMaggots();
        loadAndPopulateData(count);
    }, (selectedCategory) => {
        if (!isNaN(selectedCategory)) {
            particleSystem.moveMaggotsToCategoryCorner(selectedCategory);
        } else {
            // Optionally handle case where no category is selected
            particleSystem.unlockAllMaggots(); // This can be implemented to reset maggot positions
        }
    });

    const dataset = await DataManager.loadDataset('./dataset.json');
    let targetCount = parseInt(slider.value);

    const loadAndPopulateData = (count) => {
        for (let i = 0; i < count; i++) {
            const entry = dataset[i];
            particleSystem.addMaggot(entry);
            console.log('Maggot created:');
        }
    };

    loadAndPopulateData(targetCount);

    app.ticker.add(() => {
        stats.begin();
        particleSystem.updateMaggots();
        stats.end();
    });
})();
