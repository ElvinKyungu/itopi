<script setup>
import pkg from '../package.json'

console.log(pkg)
const version = ref(pkg.version)
</script>

<template>
<section id="footer-area" class="h-20 p-5 mb-0 text-black text-xs">
  <p>v{{ version }} Proposé par <span class="font-semibold text-sm">Itopi</span>, conçu par <a href="https://www.soixantecircuits.fr/" class="text-sm font-semibold underline">Soixante circuits</a></p>
</section>
</template>