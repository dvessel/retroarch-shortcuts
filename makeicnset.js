

// Define all required icon sizes and their filenames
// https://developer.apple.com/design/human-interface-guidelines/app-icons#macOS-app-icon-sizes
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

const iconSizes = [
  { name: 'icon_16x16.png',      length: 16,   shadowBlur: 0 },
  { name: 'icon_16x16@2x.png',   length: 32,   shadowBlur: 0 },
  { name: 'icon_32x32.png',      length: 32,   shadowBlur: 0 },
  { name: 'icon_32x32@2x.png',   length: 64,   shadowBlur: 0 },
  { name: 'icon_128x128.png',    length: 128,  shadowBlur: 2 },
  { name: 'icon_128x128@2x.png', length: 256,  shadowBlur: 4 },
  { name: 'icon_256x256.png',    length: 256,  shadowBlur: 4 },
  { name: 'icon_256x256@2x.png', length: 512,  shadowBlur: 8 },
  { name: 'icon_512x512.png',    length: 512,  shadowBlur: 10 },
  { name: 'icon_512x512@2x.png', length: 1024, shadowBlur: 20 }
]

iconSizes.forEach(img => {

  const scaled = sips.images[0].scaledSizeWithLongestEdge(img.length-(img.shadowBlur*2))
  const canvas = new Canvas(img.length, img.length)

  canvas.shadowColor = 'rgba(0, 0, 0, 0.6)'
  canvas.shadowBlur = img.shadowBlur
  canvas.shadowOffsetY = -img.shadowBlur/2

  canvas.drawImage(
    sips.images[0],
   (canvas.width-scaled.width)/2,
   (canvas.height-scaled.height)-(img.shadowBlur*1.5),
    scaled.width,
    scaled.height
  )

  const output = new Output(canvas, sips.outputPath)
  output.name = img.name
  output.addToQueue()

})
