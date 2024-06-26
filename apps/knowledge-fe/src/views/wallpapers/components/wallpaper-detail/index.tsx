import { Tag } from '@youknown/react-ui/src'
import { cls, QS } from '@youknown/utils/src'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import type { Wallpaper, WallpaperTag } from '@/apis/wallpaper'
import { format_file_size, format_time } from '@/utils'

interface WallpaperDetailProps {
  wallpaper: Wallpaper
}

export default function WallpaperDetail(props: WallpaperDetailProps) {
  const { wallpaper } = props
  const { category, created_at, file_size, dimension_x, dimension_y, views, favorites, tags = [] } = wallpaper
  const { t } = useTranslation()

  const search_tag = (tag: WallpaperTag) => {
    const tag_keywords = `id:${tag.id}`
    window.open(
      QS.stringify({
        base: '/wallpapers',
        query: {
          keywords: tag_keywords
        }
      }),
      '_blank'
    )
  }
  const format_tag_color_cls = (tag: WallpaperTag) => {
    return (
      {
        sfw: 'color-emerald!',
        sketchy: 'color-yellow!',
        nsfw: 'color-red!'
      }[tag.purity] ?? ''
    )
  }
  const format_cate = () => {
    return {
      general: t('form.general'),
      anime: t('form.anime'),
      people: t('form.people')
    }[category]
  }

  const info_list = [
    {
      label: t('created_at'),
      value: format_time(created_at)
    },
    {
      label: t('size'),
      value: format_file_size(file_size)
    },
    {
      label: t('cate'),
      value: format_cate()
    },
    {
      label: t('form.views'),
      value: views
    },
    {
      label: t('form.favorites'),
      value: favorites
    }
  ]

  return (
    <div className="p-24px">
      <div className="text-center font-600 text-18px mb-16px">
        {dimension_x} x {dimension_y}
      </div>

      <div className="grid grid-cols-2 items-center gap-x-12px gap-y-4px text-12px mb-8px">
        {info_list.map(({ label, value }) => (
          <Fragment key={label}>
            <div className="w2-50% text-right color-text-3">{label}</div>
            <div className="w2-50% text-left color-text-2">{value}</div>
          </Fragment>
        ))}
      </div>

      <div className="font-600 text-16px mb-8px">{t('tags')}</div>
      <div className="flex flex-wrap m--4px">
        {tags.map(tag => (
          <Tag
            key={tag.id}
            className={cls('m-4px cursor-pointer [@media(hover:hover)]-hover-underline', format_tag_color_cls(tag))}
            onClick={() => search_tag(tag)}
          >
            {tag.name}
          </Tag>
        ))}
      </div>
    </div>
  )
}
