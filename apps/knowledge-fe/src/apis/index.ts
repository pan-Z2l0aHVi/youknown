import { delay } from '@youknown/utils/src'

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
