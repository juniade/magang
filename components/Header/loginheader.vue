<template>
    <div class="container py-3">
        <div>
            <div class="d-flex justify-content-between">
                <NuxtLink to="/"><img src="/assets/logo.svg"></NuxtLink>
                <div>
                    <NuxtLink to="/ProfilPages/WebProfil"
                        class=" btn btn-dark me-2 rounded-0 d-flex align-items-center">
                        <div class="rounded-circle bg-white me-2 ms-1" style="color:black; width:20px; height:20px;"><i
                                class="fa-regular fa-user"></i></div>
                        <div class="me-1"> {{ data.name }}</div>

                    </NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { useAuth } from "~/stores/auth"

const store = useAuth()

onMounted(async () => {
    await store.getProfile();
   
})
const data = computed(() => {
    return store.userProfile
})
</script>