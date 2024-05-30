import presetRemToPx from '@unocss/preset-rem-to-px'
import type { UserConfig } from 'unocss'
import { presetUno } from 'unocss'
import presetAutoprefixer from 'unocss-preset-autoprefixer'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'

export const presets: UserConfig['presets'] = [
  presetUno(),
  presetAutoprefixer(),
  presetRemToPx(),
  presetScrollbar(),
  presetScrollbarHide()
]

export const theme: UserConfig['theme'] = {
  colors: {
    text: {
      1: 'var(--ui-text-1)',
      2: 'var(--ui-text-2)',
      3: 'var(--ui-text-3)'
    },
    focus: 'var(--ui-color-focus)',
    hover: 'var(--ui-color-hover)',
    active: 'var(--ui-color-active)',
    'secondary-hover': 'var(--ui-color-secondary-hover)',
    'secondary-active': 'var(--ui-color-secondary-active)',
    primary: 'var(--ui-color-primary)',
    'primary-hover': 'var(--ui-color-primary-hover)',
    'primary-active': 'var(--ui-color-primary-active)',
    danger: 'var(--ui-color-danger)',
    'danger-hover': 'var(--ui-color-danger-hover)',
    'danger-active': 'var(--ui-color-danger-active)',
    divider: 'var(--ui-divider)',
    'pop-bd': 'var(--ui-pop-bd)',
    bg: {
      0: 'var(--ui-bg-0)',
      1: 'var(--ui-bg-1)',
      2: 'var(--ui-bg-2)',
      3: 'var(--ui-bg-3)'
    }
  },
  borderRadius: {
    'radius-s': 'var(--ui-radius-s)',
    'radius-m': 'var(--ui-radius-m)',
    'radius-l': 'var(--ui-radius-l)'
  },
  boxShadow: {
    'shadow-s': 'var(--ui-shadow-s)',
    'shadow-m': 'var(--ui-shadow-m)',
    'shadow-l': 'var(--ui-shadow-l)'
  }
}

export const shortcuts: UserConfig['shortcuts'] = {
  'custom-focus-outline':
    'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-color-focus focus-visible:outline-offset--2px',
  'custom-scrollbar':
    'scrollbar:w-8px scrollbar:h-8px scrollbar-thin scrollbar-thumb:rounded hover:scrollbar-thumb:bg-[rgba(var(--ui-scrollbar),0.4)]'
}
