const express = require('express')
const sharp = require('sharp')
const { GenerateUglyAvatar } = require('ugly-avatar')
const jdenticon = require('jdenticon')

const { createAvatar } = require('@dicebear/avatars')
const styleMale = require('@dicebear/avatars-male-sprites')
const styleFemale = require('@dicebear/avatars-female-sprites')
const styleAvataaars = require('@dicebear/avatars-avataaars-sprites')
const styleBottts = require('@dicebear/avatars-bottts-sprites')
const styleGridy = require('@dicebear/avatars-gridy-sprites')
const styleHuman = require('@dicebear/avatars-human-sprites')
const styleIdenticon = require('@dicebear/avatars-identicon-sprites')
const styleInitials = require('@dicebear/avatars-initials-sprites')

const { generate, faceToSvgString } = require('facesjs')

const multiavatar = require('@multiavatar/multiavatar')

const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'web', 'dist')))
const port = 13130

app.get('/avatar', (req, res) => {
  let type = req.query.type
  switch (type) {
    case 'multiavatar':
      responseImage(multiavatar(uuidv4()), res)
      break
    case 'jdenticon':
      jdenticon.configure({
        lightness: {
          color: [0.40, 0.80],
          grayscale: [0.30, 0.90]
        },
        saturation: {
          color: 0.50,
          grayscale: 0.00
        },
        backColor: '#0000'
      })
      responseImage(jdenticon.toPng(uuidv4(), 500), res)
      break
    case 'dicebear':
      let style = req.query.style
      let seed = req.query.seed || ''
      let styleAvatar
      switch (style) {
        case 'male':
          styleAvatar = styleMale
          break
        case 'female':
          styleAvatar = styleFemale
          break
        case 'avataaars':
          styleAvatar = styleAvataaars
          break
        case 'bottts':
          styleAvatar = styleBottts
          break
        case 'gridy':
          styleAvatar = styleGridy
          break
        case 'human':
          styleAvatar = styleHuman
          break
        case 'identicon':
          styleAvatar = styleIdenticon
          break
        case 'initials':
          styleAvatar = styleInitials
          break
      }

      const dicebear = createAvatar(styleAvatar, {
        seed: seed ? seed : uuidv4(),
      })
      responseImage(dicebear, res)
      break
    case 'facesjs':
      let gender = req.query.gender
      const face = generate(undefined, { gender: gender })
      responseImage(faceToSvgString(face), res)
      break
    case 'ugly-avatar':
    default:
      const avatar = new GenerateUglyAvatar()
      responseImage(avatar.generateFace(), res)
      break
  }
})

/**
 * 转换图片并返回
 * @param imageData
 * @param response
 */
function responseImage (imageData, response) {
  sharp(Buffer.from(imageData))
    .resize(500, 500)
    .toFormat('png') // 或使用 'jpeg' 转换为JPEG
    .toBuffer()
    .then((data) => {
      response.type('png') // 如果你转换为'jpeg', 这里就应该是 'image/jpeg'
      response.send(data)
    })
    .catch((err) => {
      console.error('Error converting SVG to PNG: ', err)
      response.status(500).send('Error processing image.')
    })
}

app.listen(port, () => {
  console.log(`Avatar service listening at http://localhost:${port}`)
})