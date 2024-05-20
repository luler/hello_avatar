const express = require('express')
const sharp = require('sharp')
const { GenerateUglyAvatar } = require('ugly-avatar')
const app = express()
const port = 3000
app.get('/avatar', (req, res) => {
  const avatar = new GenerateUglyAvatar()
  const svg = avatar.generateFace()
  sharp(Buffer.from(svg))
    // .resize(256, 256)
    .toFormat('png') // 或使用 'jpeg' 转换为JPEG
    .toBuffer()
    .then((data) => {
      res.type('png') // 如果你转换为'jpeg', 这里就应该是 'image/jpeg'
      res.send(data)
    })
    .catch((err) => {
      console.error('Error converting SVG to PNG: ', err)
      res.status(500).send('Error processing image.')
    })
})
app.listen(port, () => {
  console.log(`Avatar service listening at http://localhost:${port}`)
})