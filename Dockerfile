# 选择一个包含Node.js的基础镜像
FROM node:18-alpine
# 设置工作目录
WORKDIR /usr/src/app
# 安装依赖
# 利用Docker的分层缓存，只有当package.json文件变化时才重新安装依赖
COPY package*.json ./
# 添加中文字体支持
RUN apk add --no-cache \
    fontconfig \
    freetype \
    freetype-dev \
    ttf-freefont \
    font-noto \
    font-noto-cjk #添加 CJK 字体支持
RUN npm install
# 将你的应用代码拷贝到容器中
COPY . .
# 对外暴露13130端口
EXPOSE 13130
# 运行应用
CMD [ "node", "app.js" ]
