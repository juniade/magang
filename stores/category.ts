import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app'; // menggunakan cookie composable

export const useCategory = defineStore('category', {
  state: () => ({
    categories:[],
  }),
  actions:{
    async getStoryCategory(){
      const url="https://storytime-api.strapi.timedoor-js.web.id/api/categories"
      try{
        const  cookie=useCookie('token')
        const token=cookie.value
        const category= await axios.get(url, {
          headers:{
            Authorization:`Bearer ${token}`}
        })
        console.log('data categori: ',category.data.data)
        this.categories=category.data.data
      }catch(err){
        console.log(err)
      }
    },

  }
})