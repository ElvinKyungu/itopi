<template>
  <section id="header-area" class="h-[700px] bg-bottom bg-cover">
    <div class="absolute z-10 top-7 inset-x-10 flex items-center">
      <div class="h-10 w-10">
        <img src="~/assets/img/itopi-logo.png" class="h-full w-full object-cover object-bottom"/>
      </div>
      <p class="pl-4 font-semibold">itopi</p>
    </div>
    <div class="h-full w-full relative">
      <HeaderAnimation />
      <!-- <img src="~/assets/img/banner.jpg" class="h-full w-full object-cover object-bottom"/> -->
    </div>
    <div class="h-full w-full flex justify-center pt-32 absolute top-0">
      <h1 class="font-semibold text-black text-center text-4xl md:text-6xl whitespace-pre-wrap"> {{ "1000 installations,\nAccédez à 100 gratuitement !" }}</h1>
    </div>
  </section>
</template>