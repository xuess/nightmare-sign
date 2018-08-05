const Nightmare = require('nightmare');
const { sendMailErr } = require('./lib/mail.js');
//const nightmare = Nightmare({
//	show: true, //显示electron窗口 浏览器
//});

let sign = (username, password) => {
	let nightmare = new Nightmare({ show: true });
	nightmare
		.viewport(375,667)
		//加载页面 苏宁签到 领云钻
		.goto('https://passport.suning.com/ids/login?service=https%3A%2F%2Faq.suning.com%2Fasc%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fsign.suning.com%252Fm%252Fsign%252Fwelcome.do&loginTheme=wap_new')
		.wait(10000)
		
		.click("li[name='WAP_login_message_paslog']") //账号密码登陆
		
		.wait(10000)
		.type('#username', username)
		.type('#password', password)
		.click('.login-btn') //登陆按钮
		//等待页面加载ok
		.wait(() => {
			return document.querySelectorAll(".tp-btn").length > 0;
		})
		.wait(10000)
		.click('.tp-btn') //签到按钮
		.wait(16000)
		//截屏
		.screenshot('./screenshot/static-suning-' + username + '.png')
		//提取信息
		.evaluate(() => {
			return '苏宁签到成功！';
		})
		.end()
		.then((res) => {
			console.log(res, res.length);
		})
		.catch((error) => {
			console.error('failed:', error);
			// 发送错误邮件
			let errStr = `苏宁报错信息:${error}`;
			sendMailErr('苏宁签到报错了', errStr);
			
		});
}

module.exports = sign;