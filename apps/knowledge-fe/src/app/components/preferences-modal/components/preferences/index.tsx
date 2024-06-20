import { Form, Select, Switch } from '@youknown/react-ui/src'
import { isEqual } from 'lodash-es'
import { useTranslation } from 'react-i18next'

import { I18N_LANG, THEME, useUIStore } from '@/stores'

import Hue from '../hue'
import RadiusStyle, { RadiusStyleItem, style_options } from '../radius-style'

export default function Preferences() {
  const { t } = useTranslation()
  const theme = useUIStore(state => state.theme)
  const primary_color = useUIStore(state => state.primary_color)
  const radius = useUIStore(state => state.radius)
  const i18n_lang = useUIStore(state => state.i18n_lang)
  const compress_upload = useUIStore(state => state.compress_upload)
  const set_radius = useUIStore(state => state.set_radius)
  const set_primary_color = useUIStore(state => state.set_primary_color)
  const set_theme = useUIStore(state => state.set_theme)
  const set_i18n_lang = useUIStore(state => state.set_i18n_lang)
  const set_compress_upload = useUIStore(state => state.set_compress_upload)

  const form = Form.useForm({
    defaultState: {
      style: style_options.find(opt => isEqual(opt.radius, radius)) as RadiusStyleItem,
      hue: primary_color,
      theme,
      lang: i18n_lang,
      compress_upload
    },
    onStateChange(org) {
      const state = form.getState()

      switch (org.label) {
        case 'style':
          set_radius(state.style.radius)
          break

        case 'hue':
          set_primary_color(state.hue)
          break

        case 'theme':
          set_theme(state.theme)
          break

        case 'lang':
          set_i18n_lang(state.lang)
          break

        case 'compress_upload':
          set_compress_upload(state.compress_upload)
          break

        default:
          break
      }
    }
  })

  return (
    <Form className="sm:p-[24px_24px_0_24px] <sm:p-[24px_16px_0_16px]" form={form} labelWidth={128}>
      <Form.Field label="style" labelText={t('setting.ui_style')}>
        <RadiusStyle />
      </Form.Field>
      <Form.Field label="hue" labelText={t('setting.hue')}>
        <Hue />
      </Form.Field>
      <Form.Field label="theme" labelText={t('setting.theme')}>
        <Select
          menuList={[
            {
              label: t('setting.light'),
              value: THEME.LIGHT
            },
            {
              label: t('setting.dark'),
              value: THEME.DARK
            },
            {
              label: t('setting.system'),
              value: THEME.SYSTEM
            }
          ]}
        />
      </Form.Field>
      <Form.Field label="lang" labelText={t('setting.language')}>
        <Select
          menuList={[
            {
              label: '简体中文',
              value: I18N_LANG.ZH
            },
            {
              label: 'English',
              value: I18N_LANG.EN
            },
            {
              label: t('setting.system'),
              value: I18N_LANG.SYSTEM
            }
          ]}
        />
      </Form.Field>
      <Form.Field label="compress_upload" labelText={t('setting.compress_upload')}>
        <Switch />
      </Form.Field>
    </Form>
  )
}
