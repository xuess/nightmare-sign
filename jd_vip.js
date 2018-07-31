const Nightmare = require('nightmare');
const { sendMailErr } = require('./lib/mail.js');

let sign = (username, password) => {
	let nightmare = new Nightmare({ show: true });
	nightmare
		//iPhone6/7/8手机尺寸
		.viewport(375,667)
		//加载页面 京东金融
		.goto('https://plogin.m.jd.com/user/login.action?appid=100&kpkey=&returnurl=https%3A%2F%2Fvip.m.jd.com%2Fpage%2Fhome')
		.wait(10000)
		.type('#username', username)
		.type('#password', password)
		.click('#loginBtn') //登陆按钮
		.wait(10000)
		
		
		.click('.sign-pop') //签到按钮
		.wait(10000)
		.screenshot('./screenshot/static-jd-' + username + '.png')
		.wait(10000)
		
		//京东钢镚
		.goto('https://m.jr.jd.com/spe/qyy/hzq/index.html?usertype=1176&lanmu&sid=#/')
		.wait(10000)
		.click('.gangbeng') //领钢镚
		.wait(10000)
		.screenshot('./screenshot/static-jd-gangbeng-' + username + '.png')
		.wait(10000)
		
		
		//京东小金库 页面没了 2018-7-31
//		.goto('https://wyyl.jd.com/static/page/html/index.html?sid=')
//		.wait(10000)
//		.click('#J_agree') //同意按钮
//		.wait(5000)
//		.click('.redBtn') //签到按钮
//		.wait(10000)
//		.screenshot('./screenshot/static-jd-jr-' + username + '.png')
		
		
		// 抓娃娃 2018-7-31 新增
		.goto('https://m.jr.jd.com/spe/acs/hymSystem/index.html?contentParam=100000318&actCode=D936B07274651F5C4EA67D9A61142F731E1F3505ADCDB6ED2177DDA10B44426155E0086F2112F4093DD18A508C0C452C#/')
		.wait(10000)
		.click('.wrap .btn')
		.wait(10000)
		.screenshot('./screenshot/static-jd-zhuawawa-' + username + '.png')
		.wait(10000)
		
		//提取信息
		.evaluate(() => {
			return '京东签到执行到最后了！';
		})
		.end()
		.then((res) => {
			console.log(res, res.length);
		})
		.catch((error) => {
			console.error('failed:', error);
			let errStr = `京东签到报错信息: ${error}`;
			sendMailErr('京东签到签到报错了 ', errStr);
		});

}

module.exports = sign;