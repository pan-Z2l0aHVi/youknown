import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'
import path from 'path'

const BUCKET = 'youknown'
const ACCOUNT_ID = '70bc20cd210d1c9e762acb3786056b90'
const ACCESS_KEY_ID = 'eff6f464c82bf6f773a57d4e5428ad4e'
const ACCESS_KEY_SECRET = '44f4bee6c901a4c7793f462a1f9941091101f1bf11b50778d1a22a0e29865608'

const client = new S3Client({
	region: 'auto',
	endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: ACCESS_KEY_SECRET
	}
})

main()

function main() {
	displayFile('./dist')
}

function upload(localFile) {
	let key = ''
	if (localFile.indexOf('./dist\\') >= 0) {
		key = localFile.replace('./dist\\', '')
	} else if (localFile.indexOf('./dist/') >= 0) {
		key = localFile.replace('./dist/', '')
	} else {
		key = localFile
	}
	key = key.replace('\\', '/')
	const fileExtension = localFile.split('.').pop()
	const contentType = mime.contentType(fileExtension)

	client
		.send(
			new PutObjectCommand({
				Bucket: BUCKET,
				Key: key,
				Body: fs.readFileSync(localFile),
				ContentType: contentType
			})
		)
		.then(res => {
			console.log(key, res, '文件上传成功！')
		})
		.catch(err => {
			console.error(localFile + '文件上传失败-----------', err)
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
			const localFile = './' + param
			if (!localFile.endsWith('.gz')) {
				upload(localFile)
			}
		}
	})
}
