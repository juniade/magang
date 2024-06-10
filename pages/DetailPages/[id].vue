<template>
    <detail-story :data_id="data"></detail-story>
</template>
<script setup>
import { useStory } from '~/stores/story';

const store = useStory()
const{id}=useRoute().params

const fetchData = async () => {
    await store.fetchStoryDetail(id);
};

onMounted(() => {
    fetchData();
});

const data = computed(() => {
    return store.storyDetail
})
</script>