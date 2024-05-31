<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div class="d-flex justify-content-between">
                        <h3>My Profil</h3>
                        <button class="d-flex border-0 bg-white" @click="userEditProfile">
                            <div class="me-1"><i class="fa-regular fa-pen-to-square"></i></div>
                            <div>Edit Profile</div>
                        </button>
                    </div>
                    <div class="d-flex mt-3">
                        <div class="me-5">
                            <img src="https://i.pinimg.com/736x/18/dd/dc/18dddc546606f6f81df3c895b38d758e.jpg"
                                class="rounded-circle" style="width:200px;height:200px;">
                            <div class="mt-4">
                                <button class="bg-white w-100 p-1">Change Avatar</button>
                            </div>
                        </div>
                        <div v-if="!editProfil" class="w-100 d-flex gap-3">
                            <div>
                                <p><b>Nama</b></p>
                                <p><b>Email</b></p>
                                <p><b>Biodata</b></p>
                            </div>
                            <div>
                                <p>{{data.name }}</p>
                                <p>{{data.email }}</p>
                                <p>{{data.biodata }}</p>
                            </div>
                        </div>
                        <div v-else class="w-100">
                            <UiBaseinput type="text" label="Nama" identity="name" v-model="dataUser.name"></UiBaseinput>
                            <UiBaseinput type="email" label="Email" identity="email" v-model="dataUser.email" disabled="1"></UiBaseinput>
                            <UiBasetextarea type="text" label="About me" identity="biodata" v-model="dataUser.biodata"></UiBasetextarea>
                        </div>

                    </div>
                </div>
                <div class="border p-3 mt-3 d-flex justify-content-between ">
                    <h4>Password</h4>
                    <button class="d-flex bg-white align-items-center " @click=userEditPassword>
                        <div class="me-1"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div>Change password</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuth } from "~/stores/auth"
const store = useAuth()
const editProfil=ref(false)
const editPassword=ref(false)

const data=computed(()=>{
    return store.userProfile
})
const dataUser=reactive({
    name:"",
    email:"",
    biodata:""
})
const userEditProfile=()=>{
    editProfil.value=true
    for(let key in store.userProfile){
        dataUser[key]=store.userProfile[key]
    }
}

const userEditPassword=()=>{
    editPassword.value=true
}

</script>