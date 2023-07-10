import { net } from '@/utils'
import { delay } from '@youknown/utils/src'

export interface ResError {
	code: number
	msg: string
	data: any
}

type FeedListRes = Promise<
	{
		id: number
		heading: string
		content: {
			html: string
		}
		cover: string
		user: {
			uid: number
			nickname: string
			avatar: string
		}
		last_modify_at: string
		first_published_at: string
		private: boolean
		likes_count: number
	}[]
>
export const get_feed_list = ({ feed_tab }: { feed_tab: number }): FeedListRes => {
	console.log('fake request get_feed_list', feed_tab)
	return delay(200).then(() =>
		feed_tab === 0
			? [
					{
						id: 1,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 2,
						heading: 'ChatGPT 被锁中国区 ip ？别慌，看这篇ChatGPT & OpenAI 注册使用指北',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 3,
						heading:
							'我记得去年脉脉的论调还都是 客户端已死，前后端还都是一片祥和，有秀工资的，有咨询客户端转前端的，怎么最近打开脉脉一看，风向变了？',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 4,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 5,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 6,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					}
			  ]
			: [
					{
						id: 1,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					},
					{
						id: 2,
						heading: '知识管理的 IPO 模型',
						content: {
							html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
						},
						cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
						user: {
							uid: 12312323,
							nickname: '匿名',
							avatar: ''
						},
						last_modify_at: '2022/12/11',
						first_published_at: '2022/12/02',
						private: false,
						likes_count: 23
					}
			  ]
	)
}

type DocDetailRes = Promise<{
	id: number
	heading: string
	content: {
		html: string
	}
	cover: string
	user: {
		uid: number
		nickname: string
		avatar: string
	}
	last_modify_at: string
	first_published_at: string
	private: boolean
	likes_count: number
} | null>
export const get_doc_detail = ({ doc_id }: { doc_id: string }): DocDetailRes => {
	console.log('fake request get_doc_detail', doc_id)
	return delay(200).then(() => ({
		id: 1,
		heading: '知识管理的 IPO 模型',
		content: {
			html: '<h1>2313232132</h1><p>💡 根据 <a target="_blank" rel="noopener noreferrer nofollow" class="ne-link" href="https://baike.baidu.com/item/%E9%81%97%E5%BF%98%E6%9B%B2%E7%BA%BF/7278665?fr=aladdin">遗忘曲线</a>：如果没有记录和回顾，6天后便会忘记75%的内容</p><h2>读书笔记正是帮助你记录和回顾的工具，不必拘泥于形式，其核心是：记录、翻看、思考</h2><p><span style="color: rgb(245, 34, 45)">sdfdfd</span></p><table><tbody><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table><table><tbody><tr><td colspan="1" rowspan="1"><p><strong>书名</strong></p></td><td colspan="1" rowspan="1"><p style="text-align: right">高效能人士的七个习惯</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>作者</strong></p></td><td colspan="1" rowspan="1"><h1>史蒂芬·柯维</h1></td></tr><tr><td colspan="1" rowspan="1"><p><strong>状态</strong></p></td><td colspan="1" rowspan="1"><p><span style="color: rgb(130, 0, 20)">待开始</span> <span style="color: rgb(97, 71, 0)">阅读中</span> <span style="color: rgb(19, 82, 0)">已读完</span></p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>简介</strong></p></td><td colspan="1" rowspan="1"><p>本书精选柯维博士“七个习惯”的最核心思想和方法，为忙碌人士带来超价值的自我提升体<span style="color: rgb(245, 34, 45)">验。用最</span><span style="color: rgb(146, 84, 222)">少的</span><span style="color: rgb(245, 34, 45)">时间，参透高效能人士的持续成功之路</span>。</p></td></tr></tbody></table><h2>思维导图</h2><p>用思维导图，结构化记录本书的核心观点。</p><img class="g-editor-image" src="https://intranetproxy.alipay.com/skylark/lark/0/2022/jpeg/14156358/1643091747291-b480f5c3-522d-4e82-bb6d-4f2be770d5e6.jpeg"><h2><span style="color: rgb(232, 50, 60)">读后感</span></h2><h3 style="text-align: center"><span style="color: rgb(232, 50, 60)">观点1</span></h3><p><span style="color: rgb(232, 50, 60)">读完该书后，受益的核心观点与说明...</span></p><h3><span style="color: rgb(232, 50, 60)">观点2</span></h3><h4>读完<code>该书后，</code>受益的核心观点与说明....</h4><h3>读完该书后，受益的核心观点与说明...</h3><p>书摘</p><ul><li><p><span style="color: rgb(140, 140, 140)">该书的金句摘录...</span></p></li><li><p><span style="color: rgb(140, 140, 140)">该书的金句摘录...</span></p></li><li><p><span style="color: rgb(140, 140, 140)">该书的金句摘录...</span></p></li></ul><h2>相关资料<a target="_blank" rel="noopener noreferrer nofollow" class="ne-link" href="s">链接</a></h2><p><span style="color: rgb(140, 140, 140)">可通过“⌘+K”插入引用链接，或使用“本地文件”引入源文件。</span></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://book.douban.com/subject/5325618/">https://book.douban.com/subject/5325618/</a></p><p><span style="color: rgb(130, 0, 20)">123232</span></p><p>sdfsd<strong>fd</strong>s</p><p>sdfdsf<code>fsfdsfs</code></p><pre><code>const arr = [1,2,3] function a as afsdfadsfsdf sdfadfdsfasd asfdsdfsd asdfsfd</code></pre><p></p><p>sdfsdf</p>'
		},
		cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
		user: {
			uid: 12312323,
			nickname: '匿名',
			avatar: ''
		},
		last_modify_at: '2022/12/11',
		first_published_at: '2022/12/02',
		private: false,
		likes_count: 23
	}))
}

type DocListRes = Promise<
	{
		id: number
		heading: string
		content: {
			html: string
		}
		cover: string
		user: {
			uid: number
			nickname: string
			avatar: string
		}
		last_modify_at: string
		first_published_at: string
		private: boolean
		likes_count: number
	}[]
>
export const get_doc_list = ({ uid }: { uid: string }): DocListRes => {
	console.log('fake request get_doc_list', uid)
	return delay(200).then(() => [
		{
			id: 1,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		},
		{
			id: 2,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		},
		{
			id: 3,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		},
		{
			id: 4,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		},
		{
			id: 5,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		},
		{
			id: 6,
			heading: '知识管理的 IPO 模型',
			content: {
				html: '<p>从前面知道，要想做到有效的知识管理，其中一个通用的方法就是 “IPO 模型”，其中 IPO 是 Input- Process- Output 的缩写，意即知识管理的“输入-处理-输出”过程。这个知识管理 IPO 模型是知识管理 3.0 的核心，也是语雀数字花园的根基。那么，IPO 模型到底是什</p>'
			},
			cover: 'https://gw.alipayobjects.com/mdn/prod_resource/afts/img/A*fvnmR7gwpGIAAAAAAAAAAAAAARQnAQ',
			user: {
				uid: 12312323,
				nickname: '匿名',
				avatar: ''
			},
			last_modify_at: '2022/12/11',
			first_published_at: '2022/12/02',
			private: false,
			likes_count: 23
		}
	])
}

export interface SearchWallpaperParams {
	q: string
	ai_art_filter: number
	categories: string
	purity: string
	atleast: string
	ratios: string
	sorting: string
	topRange: string
	order: string
	page: number
}

export interface Wallpaper {
	id: string
	url: string
	short_url: string
	views: number
	purity: string
	category: string
	dimension_x: number
	dimension_y: number
	ratio: string
	resolution: string
	file_size: number
	file_type: string
	created_at: string
	colors: string[]
	path: string
	thumbs: {
		large: string
		original: string
		small: string
	}
	tags: null
}

export const search_wallpapers = (params: SearchWallpaperParams) =>
	net.fetch<Wallpaper[]>('/proxy/wallpaper/search', {
		params
	})
