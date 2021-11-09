// 路由处理模块

// 导入 path 模块
const path = require('path')

// 导入数据库模块
const db = require('../db/index')

// 发布文章的处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')

    //处理文章的信息对象
    const articleInfo = {
        // 文章的标题，文章的内容，文章的发布状态，所属分类的id 
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章的发布时间
        pub_date: new Date(),
        // 文章作者的id 
        author_id: req.user.id
    }

    // console.log(articleInfo);
    // 定义发布文章的 SQL 语句
    const sql = 'insert into ev_articles set ?'
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('发布新文章失败')
        res.cc('发布新文章成功', 0)
    })

}

// 获取文章列表数据的处理函数
exports.listArticle = (req, res) => {
    // 定义获取文章列表数据的 SQL 语句
    const sql = `select ev_articles.Id,title,pub_date,state,name as cate_name from ev_articles,ev_article_cate where cate_id = ev_article_cate.Id`
    // 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length <= 0) return res.cc('获取文章的列表失败')
        res.send({
            status: 0,
            message: '获取文章的列表成功',
            data: results
        })
    })
}

// 根据 Id 删除文章数据的处理函数
exports.deleteArticle = (req, res) => {
    // 定义 根据 Id 删除文章列表的 SQL 语句
    const sql = 'update ev_articles set is_delete = 1 where Id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文列表失败')
        res.cc('删除文列表成功', 0)
    })
}

// 根据 Id 获取文章详情的处理函数
exports.contentArticle = (req, res) => {
    // 定义根据 Id 获取文章详情的 SQL 语句
    const sql = 'select * from ev_articles where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章内容失败')
        res.send({
            status: 0,
            message: '获取文章内容成功',
            Id: results[0].Id,
            title: results[0].title,
            content: `<p><span style=\"color: #0000ff;\"><em><strong>${results[0].content}</strong></em></span></p>`,
            cover_img: results[0].cover_img,
            pub_date: results[0].pub_date,
            state: results[0].state,
            is_delete: results[0].is_delete,
            cate_id: results[0].cate_id,
            author_id: results[0].author_id
        })
    })
}
