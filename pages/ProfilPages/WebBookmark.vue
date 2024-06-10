<template>
    <ProfilUserBookmark v-if="data" :isBookmark="true"></ProfilUserBookmark>
</template>

<script setup>
import {useStory} from'~/stores/story'
const store=useStory()
const data = ref()
data.value=store.bookmark

</script>