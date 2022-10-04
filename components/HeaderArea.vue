<script setup>
import { useStore } from '../store/index'

const store = useStore()
const router = useRouter()

const goHome = () => {
  router.push({ path: '/search/' + '', query: { filter: store.filter, favorite: false }})
}
</script>

<template>
  <section id="header-area" class="h-[500px] bg-bottom header-background overflow-hidden">
    <div class="absolute z-10 top-5 inset-x-10 flex items-center justify-between">
      <div class="h-10 w-10 flex gap-1">
        <img src="~/assets/img/itopi-logo.png" class="h-full w-full object-cover object-bottom"/>
        <p class="font-semibold self-center">itopi</p>
      </div>
      <div>
        <ul class="xs:flex xs:flex-row xs:list-style-none xs:mr-auto xs:font-medium xs:text-black xs:p-0 xs:gap-10 xs:text-lg">
          <li class="xs:p-2 xs:hover:text-gray-200 xs:focus:text-gray-200 xs:cursor-pointer">
            <p @click="goHome">{{$t('home')}}</p>
          </li>
          <li class="xs:p-2 xs:hover:text-gray-200 xs:focus:text-gray-200 xs:cursor-pointer">
            <a href="#">{{$t('favorites')}}</a>
          </li>
          <li class="xs:p-2 xs:hover:text-gray-200 xs:focus:text-gray-200 xs:cursor-pointer">
            <a href="#">{{$t('about')}}</a>
          </li>
        </ul>
      </div>
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