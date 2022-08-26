<script setup>

const title = ref("1000 installations,\nAccédez à 100 gratuitement !")

const animationDelay = (index) => {
  const delay = (1.5 + index / 10) + Math.random() / 2
  return delay + 's'
}
</script>

<template>
  <div id="header-title" class="h-fit w-full flex justify-center pt-16 absolute top-0">
    <h1
      class="h-fit w-full font-semibold text-black text-center text-4xl md:text-6xl whitespace-pre-wrap inline-block">
      <span v-for="(char, index) in title" :key="char" class="fade-in opacity-0" :style="{'animation-delay': animationDelay(index) }" >{{ char }}</span>
    </h1>
  </div>
</template>

<style scoped>
@keyframes bottomFadeIn {
  0% {
    position: relative;
    bottom: -50px;
    opacity: 0;
  }
  
  50% {
    position: relative;
    opacity: 50%;
    bottom: 15px;
  }

  100% {
    position: relative;
    bottom: 0.0em;
    opacity: 1;
  }
}

.fade-in {
  animation-name: bottomFadeIn;
  animation-fill-mode: forwards;
  animation-duration: 2s;
}


</style>