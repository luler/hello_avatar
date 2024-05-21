# 选择一个包含Node.js的基础镜像
FROM node:18
# 设置工作目录
WORKDIR /usr/src/app
# 安装依赖
# 利用Docker的分层缓存，只有当package.json文件变化时才重新安装依赖
COPY package*.json ./
RUN npm install
# 将你的应用代码拷贝到容器中
COPY . .
# 对外暴露13130端口
EXPOSE 13130
# 运行应用
CMD [ "node", "app.js" ]