<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-6 col-lg-3 my-3" v-for="(item, index) in data_item" :key="index">
                <ItemKomponenStoryList :items="item"></ItemKomponenStoryList>            
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    data_item:Object,
})
 
</script>
<style scoped>
.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
    /* Adjust the line height as needed */
    max-height: 3em;
    /* 2 lines * line-height */
}
</style>