<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div class="d-flex align-items-center">
                        <NuxtLink to="/ProfilPages/WebStory" style="color:black;"> <i
                                class="fa-solid fa-arrow-left me-3"></i></NuxtLink>
                        <h3>Create Story</h3>
                    </div>
                    <div>
                        <form @submit.prevent="addStory">
                            <UiBaseinput type="text" label="Title" placeholder="Enter a story title"
                                v-model="storyData.title"></UiBaseinput>
                            <UiBaseselect label="Category" id="gendre"
                                :data="['Select a category', 'Comedy', 'Horror', 'Romance']" v-model="storyData.category"></UiBaseselect>
                            <label class="fw-semibold">Content</label>
                            <div class="mb-3">
                                <UiQuill v-model:content="storyData.content"></UiQuill>
                            </div>
                            <div class="position-relative">
                                <UiBaseinput type="file" identiy="recipeImage" placeholder="Profile Photo"
                                    isImage="true" label="Cover Image" @input="checkImage">
                                    <div>
                                        <div class="border">
                                            <img src="#" width="300px" height="300px"
                                                style="object-fit: cover">
                                        </div>
                                        <div class="text-center" style="transform: translateY(-24px);">
                                            <i class="fa-solid fa-camera fs-5 p-2 rounded-circle  bg-white "></i>
                                        </div>
                                    </div>
                                </UiBaseinput>
                            </div>
                            <div class="d-flex justify-content-end">
                                <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0">Batal</UiBasebutton>
                                <UiBasebutton class="btn-dark rounded-0 px-3" @click="addStory">Simpan</UiBasebutton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';

const store = useAuth();

const storyData=reactive({
    title:"",
    category:"",
    content:"",  
})

const checkImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
        storyData.image = reader.result;
    });

};
const addStory = async () => {
    try {
        console.log('Sending story data:', storyData);
        await store.createStory(storyData);
        alert('Story created successfully!');
    } catch (err) {
        alert('Failed to create story: ' + err.message);
    }
};
</script>
