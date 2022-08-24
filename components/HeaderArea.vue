<script setup>
import { useStore } from '../store/index'

const store = useStore()
</script>

<template>
  <section id="header-area" class="h-[500px] bg-bottom header-background overflow-x-hidden">
    <div class="absolute z-10 top-7 inset-x-10 flex items-center">
      <div class="h-10 w-10">
        <img src="~/assets/img/itopi-logo.png" class="h-full w-full object-cover object-bottom"/>
      </div>
      <p class="pl-4 font-semibold">itopi</p>
    </div>
    <div class="h-full w-full relative">
      <HeaderAnimation v-if="store.loading === false"/>
      <div class="h-1/2 w-full absolute bottom-10 z-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      <div class="h-10 w-full absolute bottom-0 z-20 bg-gradient-to-t from-white to-slate-50"></div>
    </div>
    <HeaderTitle v-if="store.loading === false"/>
  </section>
</template>

<style scoped>
.header-background {
  background: linear-gradient(217deg, #FF5F7E, rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, #F9A36D, rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, #9C67FD, rgba(0,0,255,0) 70.71%);
}
</style>