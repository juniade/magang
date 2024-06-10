<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <ProfilStoryForm v-if="editedData &&!isLoading" :isEdit="true"></ProfilStoryForm>
        </div>
    </div>
</template>

<script setup>
import { useStory } from '~/stores/story';
const { id } = useRoute().params
const store = useStory()
const isLoading = ref(false)
const editedData=ref()
onMounted((async () => {
    isLoading.value = true
    await store.fetchStoryDetail(id)
    editedData.value=store.storyDetail
    console.log('edit data:',editedData.value)
    isLoading.value=false
}))

</script>