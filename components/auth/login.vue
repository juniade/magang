<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-sm-12">
                <div class="border p-5">
                    <div>
                        <h3>Login</h3>
                    </div>
                    <form @submit.prevent="login" class="p-3">
                        <div class="my-4">
                            <UiBaseinput type="text" placeholder="Enter email/username" identity="text"
                                label="Email/Username" v-model="loginData.identifier">
                            </UiBaseinput>
                        </div>
                        <div class="my-4">
                            <UiBaseinput type="password" placeholder="Enter password" identity="username"
                                label="Password" v-model="loginData.password">
                            </UiBaseinput>
                        </div>
                        <button @click="login" class=" btn btn-dark w-100 text-decoration-none ">Login
                        </button>
                        <div></div>
                    </form>
                    <p>Don't have an account yet?<NuxtLink to="/AuthPages/WebSignUp" class="text-decoration-none"><b
                                style="color:black">Register</b></NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';

const Store = useAuth()
const router = useRouter()

const loginData = reactive({
    identifier: "",
    password: "",
    isLogin: true
})

const login = async () => {
    console.log("login dijalankkan")
    await Store.getLoginData(loginData)
    console.log('login berhasil dijalnkan')
    router.push("/")
}
</script>


