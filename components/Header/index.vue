<template>
    <div>
        <component :is="components[menuComponent]"></component>
    </div>
</template>
<script setup>

import LoginHeader from '~/components/Header/loginheader.vue'
import Navigation from '~/components/Header/navigation.vue'
import {useAuth} from "~/stores/auth"

const store=useAuth()
const menuComponent=ref('navigation')
const components={
    'login-header':LoginHeader,
    'navigation':Navigation,
}

const getToken=computed(()=>{
    return store.token
})

if (!getToken.value) {
    menuComponent.value = "navigation"
} else {
    menuComponent.value = "login-header"
}

watch(getToken, (newValue, oldValue) => {
    if (!newValue) {
        menuComponent.value = "navigation"
    } else {
        menuComponent.value = "login-header"
    }
})

</script>