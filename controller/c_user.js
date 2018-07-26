const M_user = require('../models/m_user');
exports.showSignin = (req,res) =>{
    res.render('signin.html');
}
exports.handleSignin = (req, res) => {
    const body = req.body;
    console.log(req.body);
    M_user.checkEmail(body.email,(err,results)=>{
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }

        if (!results[0]) {
            return res.send({
                code: 1,
                message: '邮箱不对'
            })
        }

        if (results[0].password!==body.password) {
            return res.send({
                code:2,
                message:'密码错误'
            })
        }
        req.session.user = results[0];
        console.log(req.session.user);
        
        res.send({
            code:200,
            message:'可以登录，跳转到列表页'
        })
    })
}