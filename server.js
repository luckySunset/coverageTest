const express = require('express')
const path = require('path')

const distDir = path.join(__dirname, 'dist')
const port = process.env.PORT || 3000

const app = express()

// 1. 托管构建产物（dist）
app.use(express.static(distDir))

// 2. SPA 回退：非静态资源请求统一返回 index.html，
//    这样直接访问 /about 等 history 路由也能正常打开。
//    用正则而非 '*'，以兼容 Express 5。
app.get(/.*/, (req, res) => {
  // 构建使用相对路径 base: './'，带尾斜杠的路由（如 /about/）
  // 会让页面内的相对资源解析到 /about/static/... 而 404，这里去掉尾斜杠。
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : ''
    return res.redirect(req.path.replace(/\/+$/, '') + query)
  }
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Express 本地服务已启动: http://localhost:${port}`)
})
