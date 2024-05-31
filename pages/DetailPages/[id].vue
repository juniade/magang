<template>
    <detail-story :data_id="data"></detail-story>
</template>
<script setup>
import { useStory } from '~/stores/story';
const store = useStory()
const{id}=useRoute().params

onMounted(() => {
    store.fetchStoryDetail(id)
})

const data = computed(() => {
    return store.storyDetail
})
</script>