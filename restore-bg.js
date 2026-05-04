const { Jimp } = require("jimp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "public", "images", "menu");

async function restoreImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith(".png") || file.endsWith(".jpg")) {
      console.log(`Restoring ${file}...`);
      const filePath = path.join(dir, file);
      try {
        const image = await Jimp.read(filePath);
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
          const r = this.bitmap.data[idx + 0];
          const g = this.bitmap.data[idx + 1];
          const b = this.bitmap.data[idx + 2];
          const a = this.bitmap.data[idx + 3];
          
          // If the pixel was made transparent (alpha = 0) and is close to white
          if (a === 0 && r > 230 && g > 230 && b > 230) {
            this.bitmap.data[idx + 3] = 255; // Restore alpha to full
          }
        });
        await image.write(filePath);
        console.log(`Done: ${file}`);
      } catch (err) {
        console.error(`Error restoring ${file}:`, err);
      }
    }
  }
}

restoreImages();
