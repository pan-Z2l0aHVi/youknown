<template>
  <div class="bg-#000 min-h-[calc(100vh-48px)] flex">
    <div
      class="relative bg-no-repeat bg-contain bg-center bg-[url('https://tc-new.z.wiki/autoupload/f/YSAcNxEQIrhJ3sK5BaBKqDooqgm6EgyAVHk94dwbpyayl5f0KlZfm6UsKj-HyTuv/20250822/jEwz/2560X1440/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2025-08-20_183902.png/webp')]"
      :style="{
        width: `${bgRect.width}px`,
        height: `${bgRect.height}px`
      }"
    >
      <Crosshair
        class="absolute translate--50%"
        :disabled="climbing || running"
        :is-jumping="isJumping"
        :style="{
          left: `${bgRect.width / 2}px`,
          top: `${bgRect.height / 2}px`
        }"
      />

      <GrayEllipseContainer class="absolute! left-16px bottom-24px z-20 flex items-end">
        <div
          class="w-46px h-46px box-border mr-6px b-b-1px b-r-1px b-b-solid b-r-solid b-#fff bg-[rgb(0,0,0,0.2)] backdrop-filter"
        >
          <img
            class="w-full h-full"
            src="https://tc-new.z.wiki/autoupload/f/YSAcNxEQIrhJ3sK5BaBKqDooqgm6EgyAVHk94dwbpyayl5f0KlZfm6UsKj-HyTuv/20250919/PV2y/768X768/kanami_upscayl_4x_high-fidelity-4x.png/webp"
          />
        </div>
        <div>
          <ArmorBar
            v-if="settingsForm.apEnabled"
            class="mb-2px"
            ref="armorBarRef"
            :border-radius="`${settingsForm.resourceBarBorderRadius}px`"
            :padding="settingsForm.resourceBarPadding"
            :max="maxArmor"
            :auto-regen-rate="settingsForm.armorAutoRegenRate"
            :auto-regen-c-d="settingsForm.armorAutoRegenCD"
            :chunk-num="settingsForm.armorLevel"
            :width="settingsForm.resourceBarWidth * (settingsForm.armorLevel / FULL_ARMOR_LEVEL)"
          />
          <HealthBar
            v-if="settingsForm.hpEnabled"
            ref="healthBarRef"
            :border-radius="`${settingsForm.resourceBarBorderRadius}px`"
            :padding="settingsForm.resourceBarPadding"
            v-model:max="maxHealth"
            v-model:full-max="fullMaxHealth"
            :auto-regen-rate="settingsForm.hpAutoRegenRate"
            :auto-regen-c-d="settingsForm.hpAutoRegenCD"
            :width="settingsForm.resourceBarWidth"
            @empty="onDead"
          />
          <EnergyBar
            v-if="settingsForm.mpEnabled"
            class="mt-2px"
            ref="energyBarRef"
            :border-radius="`${settingsForm.resourceBarBorderRadius}px`"
            :padding="settingsForm.resourceBarPadding"
            v-model:max="maxEnergy"
            v-model:full-max="fullMaxEnergy"
            :auto-regen-rate="settingsForm.mpAutoRegenRate"
            :auto-regen-c-d="settingsForm.mpAutoRegenCD"
            :width="settingsForm.resourceBarWidth"
          />
          <StaminaBar
            v-if="settingsForm.staEnabled"
            class="mt-2px"
            ref="staminaBarRef"
            :border-radius="`${settingsForm.resourceBarBorderRadius}px`"
            :padding="settingsForm.resourceBarPadding"
            v-model:max="maxStamina"
            v-model:running="running"
            v-model:climbing="climbing"
            :auto-regen-rate="settingsForm.staAutoRegenRate"
            :auto-regen-c-d="settingsForm.staAutoRegenCD"
            :width="settingsForm.resourceBarWidth"
          />
        </div>
      </GrayEllipseContainer>

      <Package />
    </div>

    <div class="fixed right-20px top-64px flex flex-col">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button class="bg-#fff!" circle @click="isOptionDrawerOpen = true"
            ><template #icon>
              <n-icon> <ClSettings /> </n-icon></template></n-button
        ></template>
        设置(Esc)
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button class="bg-#fff! mt-16px" circle @click="isActionDrawerOpen = true"
            ><template #icon>
              <n-icon> <AkCommand /> </n-icon></template></n-button
        ></template>
        指令(Command)
      </n-tooltip>
    </div>

    <n-drawer v-model:show="isOptionDrawerOpen" resizable default-width="50%" placement="right" :show-mask="false">
      <n-drawer-content title="设置" closable>
        <div class="">
          <h3 class="flex items-center justify-between mt-0">
            资源数据栏 <n-button @click="resetSettings">重置选项</n-button>
          </h3>

          <n-form ref="settingsFormRef" class="flex-wrap" inline :show-feedback="true" :model="settingsForm">
            <n-form-item path="armorLevel" label="圆角半径">
              <n-input-number v-model:value="settingsForm.resourceBarBorderRadius" button-placement="both" :min="0" />
            </n-form-item>
            <n-form-item path="resourceBarPadding" label="边缘内间距">
              <n-input-number
                v-model:value="settingsForm.resourceBarPadding"
                button-placement="both"
                :min="0"
                :max="2"
              />
            </n-form-item>
            <n-form-item path="resourceBarWidth" label="宽度">
              <n-input-number v-model:value="settingsForm.resourceBarWidth" button-placement="both" :min="0" />
            </n-form-item>
            <n-divider class="mt-0!" />

            <n-form-item path="apEnabled" label="护盾条">
              <n-switch v-model:value="settingsForm.apEnabled" />
            </n-form-item>
            <n-form-item path="hpEnabled" label="生命条">
              <n-switch v-model:value="settingsForm.hpEnabled" />
            </n-form-item>
            <n-form-item path="mpEnabled" label="能量条">
              <n-switch v-model:value="settingsForm.mpEnabled" />
            </n-form-item>
            <n-form-item path="staEnabled" label="体力条">
              <n-switch v-model:value="settingsForm.staEnabled" />
            </n-form-item>
            <n-divider class="mt-0!" />
            <n-form-item path="armorLevel" label="护盾等级">
              <n-input-number
                v-model:value="settingsForm.armorLevel"
                button-placement="both"
                :precision="0"
                :min="1"
                :max="5"
              />
            </n-form-item>
            <n-form-item path="armorAutoRegenRate" label="护盾自动恢复速率(/s)">
              <n-input-number
                v-model:value="settingsForm.armorAutoRegenRate"
                button-placement="both"
                :show-button="false"
                clearable
              />
            </n-form-item>
            <n-form-item path="armorAutoRegenRate" label="护盾自动恢复受击冷却(ms)">
              <n-input-number
                v-model:value="settingsForm.armorAutoRegenCD"
                button-placement="both"
                :show-button="false"
                clearable
              />
            </n-form-item>
          </n-form>
        </div>
      </n-drawer-content>
    </n-drawer>

    <n-drawer v-model:show="isActionDrawerOpen" resizable :default-width="500" placement="right" :show-mask="false">
      <n-drawer-content title="指令" closable>
        <div class="flex flex-wrap gap-10px">
          <n-button type="error" @click="damage(25)">受到25伤害</n-button>
          <n-button type="error" @click="dotDamage(10, 3000)">3s内每秒受到10伤害</n-button>
          <n-button type="info" @click="armorBarRef?.resourceBar.inc(maxArmor, 4000)">4s + 100%AR</n-button>
          <n-button type="success" @click="heals(25, 2000)">2s + 25%HP</n-button>
          <n-button type="success" @click="healsFull">5s + 100%HP</n-button>
          <n-button type="success" @click="recoveryStaminaFull">3s + 100%STA</n-button>
          <n-button type="warning" @click="staminaBarRef?.toggleRunning">{{
            running ? '取消疾跑' : '开始疾跑'
          }}</n-button>
          <n-button type="warning" :disabled="climbing" @click="climb">{{ climbing ? '攀爬中' : '攀爬 2s' }} </n-button>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { AkCommand, ClSettings } from '@kalimahapps/vue-icons'
import { useEventListener, useMagicKeys } from '@vueuse/core'
import { FormInst, useDialog, useMessage } from 'naive-ui'

import ArmorBar, { ArmorBarExposed } from './armor-bar.vue'
import Crosshair from './crosshair.vue'
import EnergyBar, { EnergyBarExposed } from './energy-bar.vue'
import GrayEllipseContainer from './gray-ellipse-container.vue'
import HealthBar, { HealthBarExposed } from './health-bar.vue'
import Package from './package.vue'
import StaminaBar, { StaminaBarExposed } from './stamina-bar.vue'

const BG_RATIO = 16 / 9
const TAB_H = 48

const rect = reactive({
  w: window.innerWidth,
  h: window.innerHeight - TAB_H
})

useEventListener(window, 'resize', () => {
  rect.w = window.innerWidth
  rect.h = window.innerHeight - TAB_H
  console.log(rect.w, rect.h)
})

const message = useMessage()
const dialog = useDialog()

const bgRect = computed(() => {
  if (rect.w / rect.h > BG_RATIO) {
    return {
      width: Math.floor(rect.h * BG_RATIO),
      height: rect.h
    }
  }
  return {
    width: rect.w,
    height: Math.floor(rect.w / BG_RATIO)
  }
})

const maxHealth = ref(100)
const fullMaxHealth = ref(100)

const healthBarRef = ref<HealthBarExposed>()
const heals = (val: number, delay: number) => {
  healthBarRef.value?.resourceBar.inc(val, delay)
}
const healsFull = () => {
  healthBarRef.value?.resourceBar.inc(maxHealth.value, 6000)
}
const damage = (val: number) => {
  const armorBar = armorBarRef.value

  if (!armorBar?.resourceBar.value) {
    healthBarRef.value?.resourceBar.dec(val)
    return
  }

  const diff = armorBar.resourceBar.value - val
  if (diff >= 0) {
    armorBar.resourceBar.dec(val)
    return
  }
  armorBar.resourceBar.dec(val)
  const remain = Math.abs(diff)
  healthBarRef.value?.resourceBar.dec(remain)
}
// 持续衰减 TODO: 盾血来回切换的情况
const dotDamage = (val: number, duration: number) => {
  const armorBar = armorBarRef.value

  if (!armorBar?.resourceBar.value) {
    healthBarRef.value?.resourceBar.dot(val, duration, () => {
      const end = armorBarRef.value?.resourceBar.value
      console.log('end: ', end)
      return !!end
    })
    return
  }

  if (armorBar) {
    // const startTime = Date.now()
    // const diff = armorBar.resourceBar.value - val
    // armorBar.resourceBar.dot(val, duration, undefined, () => {
    //   const remainDuration = duration - (Date.now() - startTime)
    //   const diff = armorBar.resourceBar.value - val
    //   const remain = Math.abs(diff)
    //   const startTime1 = Date.now()
    //   healthBarRef.value?.resourceBar.dot(
    //     remain,
    //     remainDuration,
    //     () => !!armorBarRef.value?.resourceBar.value,
    //     () => {
    //       const remainDuration = duration - (Date.now() - startTime1)
    //       const diff = armorBar.resourceBar.value - val
    //       const remain = Math.abs(diff)
    //       armorBar.resourceBar.dot(remain, remainDuration, undefined, () => {})
    //     }
    //   )
    // })
    // if (diff > 0) {
    //   return
    // }
  }
}

const maxStamina = ref(100)
const running = ref(false)
const climbing = ref(false)
const staminaBarRef = ref<StaminaBarExposed>()

const recoveryStaminaFull = () => {
  staminaBarRef.value?.resourceBar.inc(maxStamina.value, 3000)
}

const climb = () => {
  staminaBarRef.value?.climb(2000)
}

const maxEnergy = ref(100)
const fullMaxEnergy = ref(100)
const energyBarRef = ref<EnergyBarExposed>()

const FULL_ARMOR_LEVEL = 5
const FULL_WIDTH_ARMOR = 100
const maxArmor = computed(() => FULL_WIDTH_ARMOR * (settingsForm.value.armorLevel / FULL_ARMOR_LEVEL))
const armorBarRef = ref<ArmorBarExposed>()

const AR_COLOR_MAP: Record<number, string> = {
  1: 'color-green-3',
  2: 'color-blue-3',
  3: 'color-purple-3',
  4: 'color-yellow-3',
  5: 'color-red-3'
}
const armorColorCls = computed(() => AR_COLOR_MAP[settingsForm.value.armorLevel] ?? AR_COLOR_MAP[5])

// setTimeout(() => {
//   maxHealth.value = 50
//   setTimeout(() => {
//     maxHealth.value = 100
//   }, 3000)
// }, 5000)

const onDead = () => {
  dialog.error({
    title: 'YOU DIE',
    content: '立即刷新页面',
    maskClosable: false,
    closable: false,
    closeOnEsc: false,
    positiveText: '刷新',
    onPositiveClick: () => {
      location.reload()
    }
  })
}

const isJumping = ref(false)
const jump = () => {
  if (isJumping.value) {
    return
  }
  isJumping.value = true
  setTimeout(() => {
    isJumping.value = false
  }, 500)
}

const { space, escape, tab, meta, shift } = useMagicKeys()

watch(escape, val => {
  if (val) isOptionDrawerOpen.value = !isOptionDrawerOpen.value
})
watch(meta, val => {
  if (val) isActionDrawerOpen.value = !isActionDrawerOpen.value
})
watch(space, val => {
  if (val) jump()
})
watch(shift, val => {
  if (val) staminaBarRef.value?.toggleRunning()
})
watch(tab, val => {
  if (val) {
    // Toggle bag
  }
})

const isOptionDrawerOpen = ref(false)
const isActionDrawerOpen = ref(false)

const settingsFormRef = ref<FormInst>()
const initialSettings = {
  resourceBarBorderRadius: 0,
  resourceBarPadding: 1,
  resourceBarWidth: 180,

  hpEnabled: true,
  apEnabled: true,
  mpEnabled: true,
  staEnabled: true,

  armorLevel: 5,
  armorAutoRegenRate: 2,
  armorAutoRegenCD: 2000,

  hpAutoRegenRate: 0,
  hpAutoRegenCD: 2000,

  mpAutoRegenRate: 1,
  mpAutoRegenCD: 2000,

  staAutoRegenRate: 10,
  staAutoRegenCD: 1000
}
const settingsForm = ref({ ...initialSettings })
const resetSettings = () => {
  settingsForm.value = { ...initialSettings }
}
</script>

<style scoped lang="scss"></style>
