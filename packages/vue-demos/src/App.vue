<template>
	<header class="sticky top-0 w-100% h-48px bg-#fff">
		<van-tabs v-if="route.name" v-model:active="active" swipeable>
			<van-tab v-for="tab in tabList" :key="tab.name" :title="tab.title" :to="tab.path"></van-tab>
		</van-tabs>
	</header>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tabList = ref([
	{
		name: 'page_list',
		title: 'Page List',
		path: '/page_list'
	},
	{
		name: 'editor',
		title: 'Editor',
		path: '/editor'
	},
	{
		name: 'hello',
		title: 'Hello',
		path: '/hello'
	},
	{
		name: 'tab_bar',
		title: 'Tab Bar',
		path: '/tab_bar'
	}
])
const active = ref(0)
watchEffect(() => {
	if (route.name) {
		active.value = tabList.value.findIndex(tab => tab.name === route.name)
	}
})
</script>
