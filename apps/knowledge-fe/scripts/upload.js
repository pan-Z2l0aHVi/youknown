import path from 'path'
import fs from 'fs'
import qiniu from 'qiniu'

// 七牛云cdn配置信息
const QINIU_CONF = {
	prefix: '', // 七牛目录
	accessKey: 'ZJAw5p66HbXlJQbXjDV5Y_qLAQXEirlm8MXcG-l2', //七牛accessKey
	secretKey: 'JOR_yrHI5nxg1SbZ1DF0i0BmkHYW45UH9FAXXx3m', //七牛secretKey
	space: 'testyouknown' //七牛空间名
}

//自己七牛云的秘钥
const accessKey = QINIU_CONF.accessKey
const secretKey = QINIU_CONF.secretKey
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const config = new qiniu.conf.Config()
const formUploader = new qiniu.form_up.FormUploader(config)
//文件前缀
const prefix = QINIU_CONF.prefix
main()

function main() {
	displayFile('./dist')
}

function upload(key, localFile) {
	const Bucket = key
	const options = {
		scope: Bucket
	}
	const putPolicy = new qiniu.rs.PutPolicy(options)
	const uploadToken = putPolicy.uploadToken(mac)
	let str = ''
	if (localFile.indexOf('./dist\\') >= 0) {
		str = localFile.replace('./dist\\', '')
	} else if (localFile.indexOf('./dist/') >= 0) {
		str = localFile.replace('./dist/', '')
	} else {
		str = localFile
	}
	key = prefix + str
	key = key.replace('\\', '/')
	formUploader.putFile(uploadToken, key, localFile, null, (respErr, respBody, respInfo) => {
		if (respErr) {
			console.log(localFile + '文件上传失败,正在重新上传-----------', QINIU_CONF)
			return
			// upload(qiniuConf.space, localFile)
		} else {
			if (respInfo.statusCode == 200) {
				console.log(respBody, '文件上传成功！')
			} else {
				console.log(respInfo.statusCode)
				console.log(respBody)
				if (respBody.error) {
					console.log(respBody.error)
				}
			}
		}
	})
}

function displayFile(param) {
	//转换为绝对路径
	fs.stat(param, (_, stats) => {
		//如果是目录的话，遍历目录下的文件信息
		if (stats.isDirectory()) {
			fs.readdir(param, (_, file) => {
				file.forEach(e => {
					//遍历之后递归调用查看文件函数
					//遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
					const absolutePath = path.join(param, e)
					displayFile(absolutePath)
				})
			})
		} else {
			//file2/这里是空间里的文件前缀
			const key = QINIU_CONF.space
			const localFile = './' + param
			if (!localFile.endsWith('.gz')) {
				upload(key, localFile)
			}
		}
	})
}
