// src/core/DataManager.js
export class DataManager {
    static async loadDataset(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load dataset.json');
      const data = await response.json();
      return data;
    }
  }
  