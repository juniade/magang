<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div>
                        <h3>Bookmark</h3>
                    </div>
                    <div v-if="data.length===0">
                        <div class=" mt-5 d-flex justify-content-center">
                            <img src="/assets/empty-data.svg" style="width:20%">
                        </div>
                        <h5 class="mt-4 text-center">Data not found</h5>
                    </div>
                    <div v-else class="row">
                        <div v-for="(item,index) in data" :key="index" class="col-lg-4 col-sm-6">
                            <ItemKomponenStoryList :items="item" :isBookmark="isBookmark"></ItemKomponenStoryList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useStory } from '~/stores/story';
const store = useStory()
const isBookmark=ref(true)
const data=computed(()=>{
    return store.bookmark
})

onMounted(()=>{
    store.loadBookmarks();
})
</script>
