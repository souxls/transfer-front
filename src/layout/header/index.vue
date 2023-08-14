<script setup lang="ts">
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import ThemeMode from './components/ThemeMode.vue'
import TopMenu from './components/TopMenu.vue'
import Logo from './components/Logo.vue'
</script>

<template>
  <div flex items-center>
    <Logo/>
    <TopMenu/>
  </div>
  <div ml-auto flex items-center>
    <ThemeMode />
    <FullScreen />
    <UserAvatar />
  </div>
</template>
