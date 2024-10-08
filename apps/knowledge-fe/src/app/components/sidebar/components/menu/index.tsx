import { Motion, Tooltip } from '@youknown/react-ui/src'
import { cls, DeepRequired, pick, storage } from '@youknown/utils/src'
import { Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { TbNotes } from 'react-icons/tb'

import TransitionNavLink from '@/components/transition-nav-link'
import { useWallpaperAccessible } from '@/hooks/use-wallpaper'
import type { RouteItem } from '@/router/routes'
import { routes } from '@/router/routes'
import { is_dark_theme_getter, useSpaceStore, useUIStore } from '@/stores'

const OPEN_MAP_KEY = 'sub-menu-open-map'

type MenuRouteItem = Omit<RouteItem, 'children'> & {
  meta: DeepRequired<RouteItem>['meta']
  children: MenuRouteItem[]
}
interface MenuProps {
  expand: boolean
}
export default function Menu({ expand }: MenuProps) {
  const is_dark_theme = useUIStore(is_dark_theme_getter)
  const space_list = useSpaceStore(state => state.space_list)

  const get_nav = (path: string) => {
    const route = routes.find(route => route.path === path)!
    return pick(route, 'path', 'meta')
  }

  const get_library_nav = useCallback(() => {
    const route = routes.find(route => route.path === 'library')!
    return {
      ...pick(route, 'path', 'meta'),
      children: space_list.map(space => {
        return {
          path: space.space_id,
          meta: {
            title: () => space.name,
            icon: <TbNotes />
          }
        }
      })
    }
  }, [space_list])

  const wallpaper_accessible = useWallpaperAccessible()

  const nav_list = useMemo(() => {
    const result = [get_nav('browse'), get_library_nav(), get_nav('collection'), get_nav('history')]
    if (wallpaper_accessible) {
      result.splice(2, 0, get_nav('wallpapers'))
    }
    return result as MenuRouteItem[]
  }, [get_library_nav, wallpaper_accessible])

  const [open_map, set_open_map] = useState<Record<string, boolean>>(
    () => storage.local.get<Record<string, boolean>>(OPEN_MAP_KEY) ?? {}
  )
  useEffect(() => {
    storage.local.set(OPEN_MAP_KEY, open_map)
  }, [open_map])

  const set_open = (name: string, open: boolean) => {
    set_open_map(p => ({
      ...p,
      [name]: open
    }))
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar scrollbar-rounded select-none p-12px">
      {nav_list.map(menu_item => {
        const { path, meta } = menu_item
        const { children = [] } = menu_item
        const has_sub_nav = children.length > 0

        const toggle_sub_menu = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          set_open(path, !open_map[path])
        }
        const chevron_down_icon = (
          <BiChevronDown
            className={cls('text-16px color-text-2 transition-all', open_map[path] ? 'rotate--90' : 'rotate-0')}
          />
        )
        const nav_content = (
          <>
            <div className="leading-0 text-18px color-primary">{meta.icon}</div>
            <Motion.Fade in={expand} mountOnEnter unmountOnExit>
              <div className="ml-8px flex-1 break-all ws-nowrap truncate">{meta.title()}</div>
            </Motion.Fade>
            {has_sub_nav && (
              <>
                {expand ? (
                  <div
                    className={cls(
                      'rd-radius-s w-22px h-22px flex items-center justify-center text-12px bg-inherit',
                      is_dark_theme
                        ? 'active-brightness-120 [@media(hover:hover)]-hover-brightness-110'
                        : 'active-brightness-90 [@media(hover:hover)]-hover-brightness-95'
                    )}
                    onClick={toggle_sub_menu}
                  >
                    {chevron_down_icon}
                  </div>
                ) : (
                  <div
                    className={cls(
                      'flex items-center text-12px bg-inherit h-100% rd-tr-radius-m rd-br-radius-m',
                      is_dark_theme
                        ? 'active-brightness-120 [@media(hover:hover)]-hover-brightness-110'
                        : 'active-brightness-90 [@media(hover:hover)]-hover-brightness-95'
                    )}
                    onClick={toggle_sub_menu}
                  >
                    {chevron_down_icon}
                  </div>
                )}
              </>
            )}
          </>
        )

        return (
          <Fragment key={path}>
            <Tooltip title={meta.title()} placement="right" spacing={20} disabled={expand}>
              <TransitionNavLink
                to={`/${path}`}
                end={open_map[path]}
                className={({ isActive }) =>
                  cls(
                    'w-100% h-28px flex items-center pl-12px pr-4px rd-radius-m mb-8px decoration-none color-inherit',
                    'active-bg-secondary-active [@media(hover:hover)]-hover-not-active-bg-secondary-hover',
                    {
                      'bg-secondary-hover': isActive
                    }
                  )
                }
                onClick={() => {
                  set_open(path, true)
                }}
              >
                {nav_content}
              </TransitionNavLink>
            </Tooltip>

            {has_sub_nav && (
              <Motion.Collapse in={open_map[path]} className="w-100% mt-0! mb-0!" mountOnEnter unmountOnExit>
                <Motion.Fade in={open_map[path]}>
                  <div
                    className={cls({
                      'ml-28px': expand
                    })}
                  >
                    {children.map(child => {
                      const { title, icon } = child.meta
                      const sub_nav_title = title()
                      return (
                        <Tooltip
                          key={child.path}
                          title={sub_nav_title}
                          placement="right"
                          spacing={20}
                          disabled={expand}
                        >
                          <TransitionNavLink
                            to={`/${path}/${child.path}`}
                            className={({ isActive }) =>
                              cls(
                                'w-100% h-28px flex items-center pl-12px pr-4px rd-radius-m mb-8px decoration-none color-inherit',
                                'active-bg-secondary-active [@media(hover:hover)]-hover-not-active-bg-secondary-hover',
                                {
                                  'bg-secondary-hover': isActive
                                }
                              )
                            }
                          >
                            <div className="leading-0 text-18px color-primary">{icon}</div>
                            <Motion.Fade in={expand} mountOnEnter unmountOnExit>
                              <div className="flex-1 break-all ws-nowrap truncate ml-8px" title={sub_nav_title}>
                                {sub_nav_title}
                              </div>
                            </Motion.Fade>
                          </TransitionNavLink>
                        </Tooltip>
                      )
                    })}
                  </div>
                </Motion.Fade>
              </Motion.Collapse>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
