// 导入 joi 验证数据的模块
const joi = require('joi')

// 定义标题、分类Id、内容发布状态 的验证规则
// allow('') 允许内容为空字符串
// valid('已发布','草稿') 指定允许的合法值
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
const id = joi.number().integer().min(1).required()


// 定义分页数据的验证规则
const total = joi.number().integer().min(1)
// 验证对象-发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}

// 验证对象-分页数据
exports.list_article_schema = {
    body: {
        total
    }
}

// 验证规则对象-根据id 删除文章分类
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 验证规则对象-根据 id 获取文章详情
exports.content_cate_schema = {
    params: {
        id
    }
}