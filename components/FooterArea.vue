<script setup>
import pkg from '../package.json'

const version = ref(pkg.version)
</script>

<template>
<section id="footer-area" class="h-20 w-full p-5 mb-0 text-black text-xs flex justify-between">
  <p class='h-full'>Proposé par <span class="font-semibold text-sm">Itopi</span>, conçu par <a href="https://www.soixantecircuits.fr/" class="text-sm font-semibold underline">Soixante circuits</a></p>
  <p class='h-full'>v{{ version }}</p>
</section>
</template>