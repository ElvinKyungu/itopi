<script setup>
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.PlaneGeometry( 1.5, 2 )
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: 700
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

onMounted(() => {
  // Renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('canvas.webgl')
  })
  renderer.setClearColor(0x000000, 0.0)
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
})
</script>

<template>
<div class="animation-background">
  <canvas id="header-animation" class="webgl">
</canvas>
</div>
</template>

<style scoped>
.animation-background {
  background: linear-gradient(217deg, #FF5F7E, rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, #FBFD71, rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, #9C63FD, rgba(0,0,255,0) 70.71%);
}
</style>