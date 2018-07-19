const schedule = require("node-schedule"); //定时器
const { userData } = require('./config');
const suningSign = require('./suning_vip');
const jdSign = require('./jd_vip');
const { sendMailForImage } = require('./lib/mail');
const { getRandom } = require('./lib/utils');


//延迟执行签到
let setTimeSign = (userinfo) => {
	setTimeout(() => {
		// 执行签到
		if(userinfo.type == 'jd'){
			jdSign(userinfo.username, userinfo.password);
		}else if(userinfo.type == 'suning'){
			suningSign(userinfo.username, userinfo.password);
		}
	}, getRandom(1000, 100000));
}


//每天6点30执行 定时执行签到
schedule.scheduleJob('30 30 6 * * *', () => {
	try {
		
		for (var i = 0; i < userData.length; i++) {
			setTimeSign(userData[i]);
		}

	} catch(e) {
		//TODO handle the exception
		console.log(e);
	}
});

// 立即执行 签到
for (var i = 0; i < userData.length; i++) {
	setTimeSign(userData[i]);
}


//每天17点40执行 发邮件 发送签到截图
schedule.scheduleJob('10 40 17 * * *', () => {
	//发邮件 签到截图
	sendMailForImage('签到截图');
});