<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div class="d-flex justify-content-between">
                        <h3>Story List</h3>
                        <NuxtLink to="/ProfilPages/WebCreateStory" class="btn btn-dark rounded-0">
                            <div>+ Create Story</div>
                        </NuxtLink>
                    </div>
                    <div v-if="data.length===0">
                        <div class=" mt-5 d-flex justify-content-center">
                            <img src="/assets/empty-data.svg" style="width:20%">
                        </div>
                        <h5 class="mt-4 text-center">Data not found</h5>
                    </div>
                    <div v-else>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" style="width:40%">Title</th>
                                    <th scope="col">Last Update</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody v-for="(data,idx) in data" :key="idx">
                                <tr>
                                    <td>{{ data.title }}</td>
                                    <td>{{ formatDate(data.updatedAt) }}</td>
                                    <td class="d-flex">
                                        <NuxtLink :to="'/EditStoryPages/'+data.id" class="text-decoration-none">
                                            <UiBasebutton class="btn-outline-dark bg-white me-2 rounded-0 text-black d-flex">
                                                <i class="fa-solid fa-pen-to-square align-content-center me-1"></i>Edit
                                            </UiBasebutton>
                                        </NuxtLink>

                                        <UiBasebutton class="btn-outline-danger rounded-0 d-flex"
                                            @click="deleteStory(data.id)"><i
                                                class="fa-solid fa-trash align-content-center me-1"></i>Delete
                                        </UiBasebutton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStory } from '~/stores/story';
import { useAuth } from '~/stores/auth';
const store_story=useStory()
const store_user=useAuth()



const  userStory=async()=>{
    const id= await store_user.getProfile()
    await store_story.fetchStoryList("", id,"","")
}

onMounted(()=>{
    userStory()
})

const data=computed(()=>{
    return store_story.user_story_data
})

const deleteStory=async(id)=>{
    await store_story.hapusStory(id)
    userStory()
}

function formatDate(dateString) {
    // Parsing the date string using new Date()
    const date = new Date(dateString);

    // Get hours and minutes with leading zeros
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Get day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('id-ID', { month: 'short' }); // Use 'short' for month abbreviation
    const year = date.getFullYear();

    // Format the date string
    return `${hours}:${minutes}, ${day} ${month} ${year}`;
}


</script>
