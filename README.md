# 🚀 PIXI Visualization - High-Performance Particle Rendering

An interactive particle system built using [Pixi.js](https://pixijs.com/) where animated sprites ("maggots") move across the canvas with mouse repulsion and category-based behavior. This project demonstrates real-time rendering, UI controls, and data-driven visuals in a performant and modular architecture.

## 🚀 Features

- 🧠 **Data-driven generation** of maggots from a `dataset.json` file
- 🕹️ **UI Controls**:
  - **Slider** to adjust the number of maggots
  - **Dropdown** to move category-specific maggots to screen corners
- 🌀 **Real-time animation** using Pixi.js
- 📦 Modular architecture with classes for UI, particle behavior, shaders, and data management
- ⚡ GPU-accelerated rendering with high performance

## 🖼️ Demo
#Playable Demo
> https://arvindsudarshan53.github.io/PixijsTest/

#Video link
> https://youtu.be/3FkdGMTS60c

> https://youtu.be/e0gRPVcvPXs

## Important Scripts

-  **generate_dataset to create 10000 dataset, run `node generate_dataset.js` to generate dataset.json
-  **UICotroller.js
-  **ParticleSystem.js
-  **DataManager.js, provision for fetching dataset from URL

