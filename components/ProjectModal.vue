<script setup>
  import { useStore } from '../store/index.js'
  const firstName = ref('')
  const lastName = ref('')
  const companyName = ref('')
  const email = ref('')
  const store = useStore()

const openModal = () => {
  document.querySelector('#modal').showModal()
  store.modalOpen = true
}

const close = () => {
  document.querySelector('#modal').close()
  const form = document.getElementById("my-form")
  form.reset()
  store.modalOpen = false
}

const props = defineProps({
  projectName: ''
})

const autoMessage = computed(() => {
  const autoMessage = `Hello,
I really like the "${props.projectName}" project.
How much will it cost to remake it for me?`
    return autoMessage
  })

  const handleSubmit = async(event) => {
    const form = document.getElementById("my-form")
    const data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        form.reset()
        close()
        document.querySelector('#successAlert').classList.remove('hidden')
        setTimeout(
          function() {
            document.querySelector('#successAlert').classList.add('hidden')
          }, 3000
        )
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "))
          } else {
            alert("Oops! There was a problem submitting your form")
          }
        })
      }
    }).catch(error => {
      alert("Oops! There was a problem submitting your form")
    });
  }
</script>

<template>
  <!-- Open modal button -->
 <button type="button" class="open-button w-[10rem] md:w-fit py-2 md:px-2 bg-[#F3F3F3] text-gray-700 font-medium text-xs xs:text-sm leading-tight tracking-wider uppercase rounded shadow-md hover:bg-gradient-to-r from-[#FECFFF] via-[#FFECCF] to-[#CFE8FF] hover:bg-gradient-45 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-900 ease-in-out my-2" @click="openModal()">how much is the project ?</button>
  <!-- Modal form -->
  <dialog id="modal" class="h-full gradient-form bg-gradient-45 bg-gradient-to-r from-[#FECFFF] via-[#FFECCF] to-[#CFE8FF] md:h-[40rem] md:w-[50rem] rounded outline outline-2 animate-pulse-once md:-top-2" @click.self="close">
    <div @click="close" class="absolute top-[3rem] right-[1.5rem] h-10 w-10 z-10 flex justify-center items-center cursor-pointer rounded hover:bg-white/75 hover:rounded hover:duration-200 hover:ease-in md:top-[.5rem] md:right-[.5rem] text-white sm:text-black">
      <span class="text-4xl">X</span>
    </div>
  <div class="container py-12 md:py-1 md:px-1 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="xl:w-10/12">
        <div class="h-[30rem] md:h-full block">
          <div>
            <div class="text-center">
            <h4 class="text-xl md:text-4xl font-semibold mt-1 mb-5 pb-1">Interested in this project?</h4>
            <p class="mb-3 md:text-2xl">Send us a message with your details, and we'll get back to you with an offer</p>
            </div>
          <form id="my-form" action="https://formspree.io/f/xyyveada" method="POST" @submit.prevent="handleSubmit">
            <div class="mb-4">
            <input
            type="text"
            name="First Name"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="firstName"
            placeholder="First Name"
            v-model="firstName"
            required
            />
            </div>
            <div class="mb-4">
            <input
            type="text"
            name="Last Name"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="lastName"
            placeholder="Last Name"
            v-model="lastName"
            required
            />
            </div>
            <div class="mb-4">
            <input
            type="text"
            name="Company Name"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="companyName"
            placeholder="Company Name"
            v-model="companyName"
            />
            </div>
            <div class="mb-4">
            <input
            type="email"
            name="Email address"
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email"
            placeholder="Email"
            v-model="email"
            required
            />
            </div>
            <div class="mb-4">
              <textarea
              name="Message"
              rows="5"
              class="px-3 py-1.5 form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="text-area"
              placeholder="Your message here"
              v-model="autoMessage"></textarea>
            </div>
            <div class="text-center pt-1 pb-1">
              <button
              class="inline-block px-6 py-2.5 text-black font-medium text-sm md:text-base leading-tight bg-white uppercase rounded shadow-md hover:bg-purple-300 hover:shadow-lg hover:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3">
                <input type="submit" value="I want this project !" class="cursor-pointer tracking-wide"> 
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>
</template>