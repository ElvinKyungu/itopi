<script setup>

const title = ref("1000 installations,\nAccédez à 100 gratuitement !")
</script>

<template>
  <div id="header-title" class="h-fit w-full flex justify-center pt-32 absolute top-0">
    <h1
      class="lineUp typewriter font-semibold text-black text-center text-4xl md:text-6xl whitespace-pre-wrap overflow-hidden">
      {{ title }}
    </h1>
  </div>
</template>

<style scoped>


.typewriter {
  animation: type 2s steps(40, end);
  animation-fill-mode: forwards;
}

@keyframes type {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/* .typewriter {
  animation: 4sgrow ease-out;
} */

/* @keyframes anim-lineUp {
  0% {
    opacity: 0;
    max-height: var(--lineHeight);
    transform: translateY(80%);
  }
  10% {
    opacity: 0;
    transform: translateY(80%);
  }
  40% {
    opacity: 0;
  }
  70% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    max-height: calc(var(--lineHeight) * var(--lines));
    transform: translateY(0%);
  }
} */


</style>