/**
 * 项目配置表
 * 邮件推荐使用qq邮箱，其他邮箱可能协议方面要自行设置
 * xuess<wuniu2010@126.com>
 * 2018-7-19
 */

// email 登陆账号 如：xxxx@qq.com
const emailName = '1000@126.com';
// email 登陆密码
const emailPassword = 'password';
// 接收者 邮箱
const toEmail = '1000@qq.com';

// 账号信息
const userData = [
	{
		type:'jd',
		username: '账号',
		password: '密码'
	},
	{
		type:'jd',
		username: '账号',
		password: '密码'
	},
	{
		type:'suning',
		username: '账号',
		password: '密码'
	},
];

module.exports = {
	emailName,
	emailPassword,
	toEmail,
	userData
};