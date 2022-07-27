<script setup>
const props = defineProps({
  videoUrl: {
    Type: String
  }
})

const videoType = ref(null)
const videoId = ref(null)
const origin = ref(window.location.origin)

const youTubeGetID = (url) => {
  if (url != null) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
  }
  return null
}

const vimeoGetId = (url) => {
  const match = /vimeo.*\/(\d+)/i.exec(url)
  if (match) {
    return match[1]
  }
};

const checkUrlHost = (videoUrl) => {
  const url = new URL(videoUrl)
  const hostname = url.hostname
  if (hostname.includes('youtube')) {
    return 'youtube'
  } else if (hostname.includes('vimeo')) {
    return 'vimeo'
  }
  else {
    return null
  }
}

watchEffect(() => {
  videoType.value = checkUrlHost(props.videoUrl)
  if (videoType.value === 'youtube') {
    videoId.value = youTubeGetID(props.videoUrl)
  } else if (videoType.value === 'vimeo') {
    videoId.value = vimeoGetId(props.videoUrl)
  }
})
</script>

<template>
<div id="embed-video" class="bg-black rounded-lg overflow-hidden mt-2">
  <iframe
    v-if="videoType === 'youtube' && videoId != null"
    class="h-96 w-full"
    :src="`https://www.youtube.com/embed/${videoId}?origin=${origin}`"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
  <iframe v-if="videoType === 'vimeo' && videoId != null"
    :src="`https://player.vimeo.com/video/${videoId}`" 
    class="h-96 w-full"
    frameborder="0"
    allow="fullscreen">
  </iframe>
</div>
</template>