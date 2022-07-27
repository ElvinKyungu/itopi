<script setup>
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene()

// Object

//Cards
const cardGeometry = new THREE.PlaneGeometry( 1.5, 2 )
const numCard = 50
const cards = [ ]

for (let i = 0; i < numCard; i++) {
  const material = new THREE.MeshBasicMaterial()
  material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const mesh = new THREE.Mesh(cardGeometry, material)
  cards[i] = { mesh: mesh, speed: (Math.random() * 10) + 10 }
  const movement = Math.random() - 0.5
  cards[i].mesh.rotation.z = -movement * 0.25
  cards[i].mesh.position.x = movement * 10
  cards[i].mesh.position.y = -5 + (Math.random() -0.5)
  scene.add(cards[i].mesh)
}

//Particules
const parameters = {}
parameters.count = 1000
parameters.size = 0.05
parameters.radius = 1
parameters.branches = 4
parameters.spin = 0.530
parameters.randomnness = 1
parameters.randomnnessPower = 3
parameters.insideColor = '#fa2500'
parameters.outsideColor = '#81cabe'

let geometry = null
let material = null
let points = null

const generateParticules = (renderer) => {
  if (points != null) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }
  geometry = new THREE.BufferGeometry()
  const position = new Float32Array(parameters.count * 3)
  const randomnes = new Float32Array(parameters.count * 3)
  const color = new Float32Array(parameters.count * 3)

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * parameters.radius
    const randomX = (Math.random() - 0.5) * 20
    const randomY = (Math.random() - 0.5) * 6
    const randomZ = -0.1

    position[i3] = randomX
    position[i3 + 1] = randomY
    position[i3 + 2] = randomZ

    randomnes[i3    ] = randomX
    randomnes[i3 + 1] = randomY
    randomnes[i3 + 2] = randomZ

    color[i3] = 1
    color[i3 + 1] = 1
    color[i3 + 2] = 1 
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
  geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomnes, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 3))

  material = new THREE.ShaderMaterial({
    vertexColors: true,
    fragmentShader: `
      varying vec3 vColor;

      void main()
      {
        
        gl_FragColor = vec4(vColor,  1.0);
      }
    `,
    vertexShader: `
      uniform float uTime;
      uniform float uSize;

      attribute vec3 aRandomness;
      attribute float aScale;

      varying vec3 vColor; 

      void main () {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceToCenter = length(modelPosition.xz);
        modelPosition.y -= uTime * 0.2;
        modelPosition.y = mod(modelPosition.y , 6.) - 3.;
        modelPosition.x += aRandomness.x * uTime * 0.1;
        modelPosition.xy += aRandomness.xy;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        gl_PointSize = uSize;
        gl_PointSize *= (1.0 / - viewPosition.z);
        vColor = color;
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 15 * renderer.getPixelRatio() } 
    }
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}



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
  generateParticules(renderer)
  const clock = new THREE.Clock()

  let previousTime = 0.0
  const tick = () =>
  {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    material.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)
    for(let card of cards) {
      card.mesh.position.y += deltaTime * card.speed
      card.mesh.position.x += deltaTime * (-card.mesh.rotation.z * 7)
    }

    if (elapsedTime < 10){
      window.requestAnimationFrame(tick)
    }
  }

tick()
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