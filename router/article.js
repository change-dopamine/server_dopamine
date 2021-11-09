// 文章的路由模块
const express = require('express')

const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

// 导入解析 form-data 的 multer 包
const multer = require('multer')
// 导入 path 核心模块
const path = require('path')
// 创建 multer 实例
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema, list_article_schema, delete_cate_schema, content_cate_schema } = require('../schema/article')

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中

// 发布文章的路由
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

// 获取文章的列表数据的路由
router.get('/list', expressJoi(list_article_schema), article_handler.listArticle)

// 根据 Id 删除文章数据的路由
router.get('/delete/:id', expressJoi(delete_cate_schema), article_handler.deleteArticle)

// 根据 Id 获取文章详情的路由
router.get('/:id', expressJoi(content_cate_schema), article_handler.contentArticle)


module.exports = router