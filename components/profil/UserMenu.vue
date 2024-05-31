<template>
    <div class="col-lg-4">
        <div class="border">
            <NuxtLink to="/ProfilPages/WebProfil" class=" btn p-3 d-flex border-0 bg-white w-100">
                <div class="me-1"><i class="fa-regular fa-user"></i></div>
                <p class="m-0">My Profil</p>
            </NuxtLink>
            <hr class="m-0">
            <NuxtLink to="/ProfilPages/WebStory" class=" btn p-3 d-flex border-0 bg-white w-100">
                <div class="me-1"><i class="fa-solid fa-file-invoice"></i></div>
                <p class="m-0">StoryList</p>
            </NuxtLink>
            <hr class="m-0">
            <NuxtLink to="/ProfilPages/WebBookmark" class=" btn p-3 d-flex border-0 bg-white w-100">
                <div class="me-1"><i class="fa-regular fa-bookmark"></i></div>
                <p class="m-0">Bookmark</p>
            </NuxtLink>
            <hr class="m-0">
            <div class="p-3">
                <button class=" btn btn-outline-danger d-flex justify-content-between w-100" @click="logout">
                    <div>Logout</div>
                    <div><i class="fa-solid fa-right-from-bracket"></i></div>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useAuth} from "~/stores/auth"
const store=useAuth()
const router=useRouter()

const logout = async () => {
    await store.logout();
    router.push('/'); // Redirect to login page or any other page after logout
};
</script>