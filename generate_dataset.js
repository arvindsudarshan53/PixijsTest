const fs = require('fs');

const count = 10000;
const data = [];

// Category → tint map
const tintMap = {
  1: 0xFF0000,  // red
  2: 0xADD8E6,  // light blue
  3: 0x00FF00,  // green
  4: 0xFFFF00   // yellow
};

for (let i = 1; i <= count; i++) {
  // pick category first
  const category = Math.floor(Math.random() * 4) + 1; // 1–4
  
  data.push({
    id: i,
    value: `maggot_${i}`,
    scale: 0.8 + Math.random() * 0.3,           // Random scale between 0.8 and 1.1
    tint: tintMap[category],                    // Fixed tint based on category
    speed: Math.random() * 1 + 0.5,             // Random speed between 0.5 and 1.5
    category: category
  });
}

fs.writeFileSync('dataset.json', JSON.stringify(data, null, 2));
console.log('dataset.json generated.');

