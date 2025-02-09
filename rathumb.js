// Drop shadow size relative to 512 pixels on its longest dimension.
const scaled = sips.images[0].scaledSizeWithLongestEdge(512);
const canvas = new Canvas(scaled.width + 20, scaled.height + 20);

canvas.shadowColor = 'rgba(0, 0, 0, 0.6)';
canvas.shadowBlur = 10;
canvas.shadowOffsetY = -5;
canvas.drawImage(sips.images[0], 10, 6, scaled.width, scaled.height);

const output = new Output(canvas, sips.outputPath);
output.addToQueue();
