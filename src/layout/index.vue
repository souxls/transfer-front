<script setup lang="ts">
import AppHeader from './header/index.vue'
// import AppTab from './tab/index.vue'
import AppMain from './AppMain.vue'

import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
</script>

<template>
  <n-layout wh-full>
    <article flex-1 flex-col overflow-hidden>
      <header
        bg-white px-15 border-b bc-eee flex items-center dark="bg-dark border-0"
        :style="`height: ${themeStore.header.height}px`"
      >
        <AppHeader />
      </header>
      <section v-if="themeStore.tab.visible" border-b bc-eee dark:border-0 hidden sm:block>
        <AppTab />
      </section>
      <section flex-1 overflow-hidden bg="#f5f6fb" dark:bg-hex-101014>
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

