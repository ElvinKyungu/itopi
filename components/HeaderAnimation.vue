<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

const gui = new lil.GUI()

onMounted(() => {
  // Scene
  const scene = new THREE.Scene()

  // Object

  //Cards 
  const cardGeometry = new THREE.PlaneGeometry( 1.5, 2 )
  const cardMaterial = new THREE.MeshBasicMaterial()
  cardMaterial.color = new THREE.Color(0.9, 0.9, 0.9)

  const numCard = 50
  const cards = [ ]

  for (let i = 0; i < numCard; i++) {
    const mesh = new THREE.Mesh(cardGeometry, cardMaterial)
    cards[i] = { mesh: mesh, speed: (Math.random() * 10) + 10 }
    const movement = Math.random() - 0.5
    cards[i].mesh.rotation.z = -movement * 0.25
    cards[i].mesh.position.x = movement * 13
    cards[i].mesh.position.y = -10 + (Math.random() -0.5) * 10
    scene.add(cards[i].mesh)
  }

  //Particules
  const parameters = {}
  parameters.particulesCount = 1000

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
    const position = new Float32Array(parameters.particulesCount * 3)
    const randomnes = new Float32Array(parameters.particulesCount * 3)
    const color = new Float32Array(parameters.particulesCount * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.particulesCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * parameters.radius
      const randomX = (Math.random() - 0.5)
      const randomY = (Math.random() - 0.5)
      const randomZ = (Math.random() - 0.5)

      position[i3] = randomX * 20
      position[i3 + 1] = randomY * 6 + 14
      position[i3 + 2] = randomZ

      randomnes[i3    ] = randomX
      randomnes[i3 + 1] = randomY * 6
      randomnes[i3 + 2] = randomZ

      color[i3] = 0.9
      color[i3 + 1] = 0.9
      color[i3 + 2] = 0.9
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
          modelPosition.y -= uTime * 0.4;
          modelPosition.x += sin(uTime * aRandomness.y * aRandomness.x ) * 0.1;
          modelPosition.xy += aRandomness.xy;
          modelPosition.y = mod(modelPosition.y, 30.) -5.;
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
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 3
  scene.add(camera)


  const canvas = document.querySelector('canvas.webgl')
  
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  // Renderer
  const renderer = new THREE.WebGLRenderer({
      canvas: canvas
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
    // console.log(controls);
    controls.update()

    if (elapsedTime < 2){
      for(let card of cards) {
        card.mesh.position.y += deltaTime * card.speed
        card.mesh.position.x += deltaTime * (-card.mesh.rotation.z * 7)
      }
    }

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
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
    linear-gradient(127deg, #F9A36D, rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, #9C67FD, rgba(0,0,255,0) 70.71%);
}
</style>