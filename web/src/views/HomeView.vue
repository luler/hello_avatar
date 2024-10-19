<style>
/* 基础样式，适用于所有屏幕 */
.card {
  width: 400px; /* 默认情况下，手机宽度 */
}

.paddingContent {
  padding: 0 10px;
}

.imgContainer {
  position: relative;
  height: 290px
}

/* 媒体查询，当屏幕宽度大于768px时，应用以下样式 */
@media (min-width: 768px) {
  .card {
    width: 200px; /* 电脑屏幕宽度 */
  }

  .paddingContent {
    padding: 0 80px;
  }

  .imgContainer {
    position: relative;
    height: 160px
  }
}
</style>
<template>
  <div class="common-layout">
    <el-container>
      <el-header style="border-bottom: 1px solid #f2f2f2">
        <div class="paddingContent">
          <h3 style="line-height: 60px;float: left;">Hell Avatar</h3>
          <a style="line-height: 60px;float: right" href="https://github.com/luler/hello_avatar"
             target="_blank">Github</a>
        </div>
      </el-header>
      <el-main>
        <div class="paddingContent">
          <div style="display: flex;flex-wrap: wrap;justify-content: center;gap: 20px">
            <el-card v-for="(c,index) in card_list1" class="card" shadow="hover">
              <template #header>
                <div style="text-align: center;">{{ c.title }}</div>
              </template>
              <div class="imgContainer">
                <el-image :ref="`image-${c.title}`" :src="c.url" fit="contain" crossorigin="anonymous"/>
              </div>
              <template #footer>
                <div style="text-align: center">
                  <a href="#" @click.prevent="refreshImage(1,index)">刷新</a>
                  <el-divider direction="vertical"/>
                  <a href="#" @click.prevent="downloadImage(c.title)">下载</a>
                </div>
              </template>
            </el-card>
          </div>
          <div style="display: flex;flex-wrap: wrap;justify-content: center;gap: 20px;margin-top: 20px">
            <el-card v-for="(c,index) in card_list2" class="card" shadow="hover">
              <template #header>
                <div style="text-align: center;">{{ c.title }}</div>
              </template>
              <div class="imgContainer">
                <el-image :ref="`image-${c.title}`" :src="c.url" fit="contain" crossorigin="anonymous"/>
              </div>
              <template #footer>
                <div style="text-align: center">
                  <a href="#" @click.prevent="refreshImage(2,index)">刷新</a>
                  <el-divider direction="vertical"/>
                  <a href="#" @click.prevent="downloadImage(c.title)">下载</a>
                </div>
              </template>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  data () {
    return {
      card_list1: [
        { url: `/avatar?type=ugly-avatar&r=`, title: 'ugly-avatar' },
        { url: `/avatar?type=multiavatar&r=`, title: 'multiavatar' },
        { url: `/avatar?type=jdenticon&r=`, title: 'jdenticon' },
        { url: `/avatar?type=facesjs&gender=male&r=`, title: 'facesjs+male' },
        { url: `/avatar?type=facesjs&gender=female&r=`, title: 'facesjs+female' },
      ],
      card_list2: [
        { url: `/avatar?type=dicebear&style=male&r=`, title: 'dicebear+male' },
        { url: `/avatar?type=dicebear&style=female&r=`, title: 'dicebear+female' },
        { url: `/avatar?type=dicebear&style=avataaars&r=`, title: 'dicebear+avataaars' },
        { url: `/avatar?type=dicebear&style=bottts&r=`, title: 'dicebear+bottts' },
        { url: `/avatar?type=dicebear&style=gridy&r=`, title: 'dicebear+gridy' },
        { url: `/avatar?type=dicebear&style=human&r=`, title: 'dicebear+human' },
        { url: `/avatar?type=dicebear&style=identicon&r=`, title: 'dicebear+identicon' },
        { url: `/avatar?type=dicebear&style=initials&r=`, title: 'dicebear+initials+uuid' },
      ]
    }
  },
  methods: {
    downloadImage (id) {
      const imgRef = `image-${id}`
      const elImageComponent = this.$refs[imgRef][0]
      const img = elImageComponent.$el.querySelector('img')
      // console.log(img)
      // 创建canvas并绘制图片
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      canvas.toBlob((blob) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `downloaded_image_${id}.png`
        link.click()
        URL.revokeObjectURL(link.href)
      }, 'image/png')
    },
    refreshImage (type, index) {
      if (type === 1) {
        this.card_list1[index].url = this.card_list1[index].url.replace(/&r=.*/, '&r=' + Math.random())
      } else {
        this.card_list2[index].url = this.card_list2[index].url.replace(/&r=.*/, '&r=' + Math.random())
      }
    }
  }
}
</script>