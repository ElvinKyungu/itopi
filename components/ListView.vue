<script setup>
import { useStore } from "../store/index";
import { getImg, getTags } from "../tools/utils";

defineProps({
  filteredData: {
    Type: Array,
    default(rawProps) {
      return [];
    },
  },
});

const store = useStore()
const router = useRouter()

const updateSortOption = (newOption) => {
  store.sort.name = newOption.name
  store.sort.field = newOption.field
}

const projectPage = (id) => {
  router.push({
    path: "/search/" + store.searchWord,
    query: { filter: store.filter, project: id, favorite: store.favorite },
  });
}

const favoriteFilter = () => {
  store.favorite === true ? router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: false }}) : router.push({ path: '/search/' + store.searchWord, query: { filter: store.filter, favorite: true }})
}

</script>

<template>
  <div
    id="list-view"
    v-if="filteredData != null && filteredData.length !== 0"
    class="h-fit w-full font-medium"
  >
    <div
      class="relative w-full overflow-hidden lg:hidden my-2 text-sm"
      v-for="project in filteredData"
      :key="project.item.id"
      :img="getImg(project)"
    >
      <input
        type="checkbox"
        class="absolute top-0 inset-x-0 w-full h-full opacity-0 z-10 cursor-pointer"
        @click="projectPage(project.item.id)"
      />
      <div class="bg-neutral-300 h-20 w-full flex items-center place-content-between gap-2">
        <img :src="getImg(project) || '../assets/img/no-photo.jpg'" class="w-20 h-20" />
        <div class="flex flex-wrap">
          <span class="text-[.8rem] xs:text-[1rem] text-ellipsis overflow-hidden whitespace-nowrap w-28 xs:w-52 font-semibold">{{ project.item.fields.Name }}</span>
          <span class="text-ellipsis overflow-hidden whitespace-nowrap w-28 xs:w-52 text-[.8rem] xs:text-[1rem]">{{ project.item.fields.Lieux }}</span>
          <span class="text-ellipsis overflow-hidden whitespace-nowrap w-52 font-normal text-[.8rem] xs:text-[1rem]">{{project.item.fields.Année}}</span>
        </div>
        <AddToFavorite :id="project.item.id" class="absolute" />
      </div>
    </div>
    <div class="sticky top-0 z-20 md:h-14 md:max-w-full md:bg-neutral-800 md:text-white md:rounded-t-lg md:grid md:grid-cols-11 md:border md:border-black">
      <div class="hidden md:block md:border md:border-black md:rounded-tl-lg"></div>
      <ListTextCase
        v-on:click="updateSortOption({ name: 'Titre', field: 'Name' })"
        text="Titre"
        class="col-span-2 cursor-pointer hidden sm:block"
      />
      <ListTextCase
        v-on:click="updateSortOption({ name: 'Artiste', field: 'Artiste' })"
        text="Artiste"
        class="col-span-2 cursor-pointer hidden sm:block"
      />
      <ListTextCase
        v-on:click="updateSortOption({ name: 'Lieux', field: 'Lieux' })"
        text="Lieux"
        class="col-span-2 cursor-pointer hidden sm:block"
      />
      <ListTextCase
        v-on:click="updateSortOption({ name: 'Date', field: 'Année' })"
        text="Année"
        class="cursor-pointer hidden sm:block"
      />
      <ListTextCase text="Tags" class="col-span-2 hidden sm:block" />
      <ListTextCase
        text="Favoris"
        class="hidden cursor-pointer sm:block"
        @click="favoriteFilter"
      />
      <div class="hidden md:border md:border-black md:rounded-tr-lg"></div>
    </div>
    <div class="hidden md:block">
      <ListRow
        v-for="project in filteredData"
        :key="project.item.id"
        :id="project.item.id"
        :title="project.item.fields.Name"
        :artiste="project.item.fields.Artiste"
        :place="project.item.fields.Lieux"
        :year="project.item.fields.Année"
        :img="getImg(project) || '../assets/img/no-photo.jpg'"
        :tags="getTags(project)"
      />
    </div>
  </div>
</template>
