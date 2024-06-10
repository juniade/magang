<template>
    <div class="container">
        <div class="row ">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-8">
                <div class=" border p-3">
                    <div class="d-flex justify-content-between">
                        <h3>My Profil</h3>
                        <button class="d-flex border-0 bg-white" @click="userEditProfile"
                            :class="{'d-none':komponenEdit}">
                            <div class="me-1"><i class="fa-regular fa-pen-to-square"></i></div>
                            <div>Edit Profile</div>
                        </button>
                    </div>
                    <div class="row mt-3">
                        <div class=" col-lg-4 col-sm-5">
                            <div>
                                <img src="https://i.pinimg.com/736x/18/dd/dc/18dddc546606f6f81df3c895b38d758e.jpg"
                                    class="rounded-circle" style="width:150px;height:150px;">
                            </div>

                            <div class="mt-4">
                                <button class="bg-white w-100 p-1">Change Avatar</button>
                            </div>
                        </div>
                        <div v-if="!editProfil" class=" col-lg-8 col-sm-6 mt-3 mt-lg-0 d-flex gap-3">
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
                        <div v-else class=" col-lg-8 col-sm-6 mt-3 mt-lg-0">
                            <UiBaseinput type="text" label="Nama" identity="name" v-model="dataUser.name"></UiBaseinput>
                            <UiBaseinput type="email" label="Email" identity="email" v-model="dataUser.email"
                                disabled="1"></UiBaseinput>
                            <UiBasetextarea type="text" label="About me" identity="biodata" v-model="dataUser.biodata">
                            </UiBasetextarea>
                            <div class="d-flex justify-content-end mt-5">
                                <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0" @click="cancleEdit">Batal
                                </UiBasebutton>
                                <UiBasebutton class="btn-dark rounded-0 px-3" @click="updateProfile">Simpan
                                </UiBasebutton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border mt-3">
                    <div class="p-3 d-flex justify-content-between ">
                        <div>
                            <h4>Password</h4>
                        </div>
                        <div v-if="!komponenPass">
                            <button class="d-flex bg-white align-items-center" @click="userEditPassword">
                                <div class="me-1"><i class="fa-regular fa-pen-to-square"></i></div>
                                <div>Change password</div>
                            </button>
                        </div>
                    </div>
                    <div v-if="editPassword" class="px-3">
                        <UiBaseinput type="password" label="Old password" placeholder="Enter old password"
                            class="w-100">
                        </UiBaseinput>
                        <UiBaseinput type="password" label="New password" placeholder="Enter old password">
                        </UiBaseinput>
                        <UiBaseinput type="password" label="Confirmation password" placeholder="Enter old password">
                        </UiBaseinput>
                        <div class="d-flex justify-content-end my-4">
                            <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0">Batal</UiBasebutton>
                            <UiBasebutton class="btn-dark rounded-0 px-3" @click="addStory">Simpan</UiBasebutton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuth } from "~/stores/auth"

const store = useAuth()
const editProfil=ref(false)
const komponenEdit=ref(false)
const komponenPass=ref(false)
const editPassword=ref(false)

const data=computed(()=>{
    return store.userProfile
})

console.log('user profil:',data)
const dataUser=reactive({
    name:"",
    email:"",
    biodata:""
})
const userEditProfile=()=>{
    editProfil.value=true
    komponenEdit.value=true
    for(let key in store.userProfile){
        dataUser[key]=store.userProfile[key]
    }
}
const cancleEdit=()=>{
    editProfil.value=false
    komponenEdit.value =false
}
const userEditPassword=()=>{
    editPassword.value=true
    komponenPass.value=true
}

const updateProfile=async()=>{
    await store.updateProfile(dataUser)
    editProfil.value=false
    komponenEdit.value=false
}

</script>