// 导入 joi 验证数据的模块
const joi = require('joi')

// 定义 name 和 alias 的验证规则
// alphanum() 值只能是包含 a - zA - Z0 - 9 的字符串
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义 id 的验证规则
const id = joi.number().integer().min(1).required()


// 3. 向外共享验证规则对象
// 验证规则对象-添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 验证规则对象-删除分类
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 验证规则对象-根据id 获取文章分类
exports.get_cate_schema = {
    params: {
        id
    }
}

// 验证规则对象-根据id 更新文章分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}

