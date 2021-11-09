const express = require('express')

const router = express.Router()

// 导入路由处理函数模块
const user_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')
// 导入密码的验证规则
const { update_password_schema } = require('../schema/user')
const { update_avatar_schema } = require('../schema/user')
// 挂载路由
// 获取用户基本信息的路由
router.get('/userinfo', user_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), user_handler.updateUserInfo)

// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), user_handler.updatePassword)

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), user_handler.updateAvatar)

module.exports = router