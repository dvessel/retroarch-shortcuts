// Define all required icon sizes and their filenames.
// https://developer.apple.com/design/human-interface-guidelines/app-icons#macOS-app-icon-sizes
//
// +---------------------+------------+
// | filename            | resolution |
// +---------------------+------------+
// | icon_16x16.png      | 16x16      |
// | icon_16x16@2x.png   | 32x32      |
// | icon_32x32.png      | 32x32      |
// | icon_32x32@2x.png   | 64x64      |
// | icon_128x128.png    | 128x128    |
// | icon_128x128@2x.png | 256x256    |
// | icon_256x256.png    | 256x256    |
// | icon_256x256@2x.png | 512x512    |
// | icon_512x512.png    | 512x512    |
// | icon_512x512@2x.png | 1024x1024  |
// +---------------------+------------+
//
// For use with sips, "scriptable image processing system".
// Unofficial Documentation: https://manicmaniac.github.io/sips-js-api/

const iconConfig = [
  { name: 'icon_16x16.png',      size: 16,   shadowBlur: 0 },
  { name: 'icon_16x16@2x.png',   size: 32,   shadowBlur: 0 },
  { name: 'icon_32x32.png',      size: 32,   shadowBlur: 0 },
  { name: 'icon_32x32@2x.png',   size: 64,   shadowBlur: 0 },
  { name: 'icon_128x128.png',    size: 128,  shadowBlur: 2 },
  { name: 'icon_128x128@2x.png', size: 256,  shadowBlur: 4 },
  { name: 'icon_256x256.png',    size: 256,  shadowBlur: 4 },
  { name: 'icon_256x256@2x.png', size: 512,  shadowBlur: 10 },
  { name: 'icon_512x512.png',    size: 512,  shadowBlur: 10 },
  { name: 'icon_512x512@2x.png', size: 1024, shadowBlur: 20 }
]

iconConfig.forEach(cfg => {
  try {

    const canvas = new Canvas(cfg.size, cfg.size)
    canvas.shadowColor = 'rgba(0, 0, 0, 0.6)'
    canvas.shadowBlur = cfg.shadowBlur
    canvas.shadowOffsetY = -cfg.shadowBlur / 2 // Downward offset at half the blur radius.

    // sips.images is an array.
    const image = sips.images.pop()

    // Scale image to fit within the canvas minus 2x shadow blur to avoid clipping.
    const imageDimension = image.scaledSizeWithLongestEdge(cfg.size - (cfg.shadowBlur * 2))

    // Center horizontally and bottom vertically with space for blurring.
    canvas.drawImage(
      image,
      (canvas.width - imageDimension.width) / 2,
      (canvas.height - imageDimension.height) - (cfg.shadowBlur * 1.5),
      imageDimension.width,
      imageDimension.height
    )

    const output = new Output(canvas, sips.outputPath)
    output.name = cfg.name
    output.addToQueue()

  } catch (error) {
    print(`Error processing ${cfg.name}:\n - ${error}`)
  }
})
