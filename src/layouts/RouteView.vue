<template>
  <div :style="multiTab ? 'margin-top: 30px' : 'margin-top: -30px'">
    <router-view v-slot="{ Component }">
      <transition name="fade-right">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import config from "@/utils/config";
const multiTab = config.multiTab
</script>

