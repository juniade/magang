import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app'; // menggunakan cookie composable
import {useStory} from "~/stores/story"


export const useAuth = defineStore('auth', {
  state: () => ({
    token: null as string|null,
    isLogin: false,
    userProfile: {},
    user_id:null
  }),

  actions: {
    async initializeAuth() {
      const cookies = useCookie('token');
      const tokens = cookies.value;
      if (tokens) {
        // Jika token tersedia di cookie saat aplikasi dimuat, tandai pengguna sebagai login
        this.isLogin = true
        this.token=tokens
      }    
    },
    async getRegisterData(payload: any) {
      const authUrl = 'https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register';
      try {
        // Validasi input payload
        if (!payload.username || !payload.email || !payload.password || !payload.name) {
          throw new Error('Semua field harus diisi');
        }

        const response = await axios.post(authUrl, {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          name: payload.name
        });
        this.isLogin=true
        console.log('register data', response.data.data);
      } catch (err: any) {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error("Error during registration:", err.response.data);
        } else if (err.request) {
          // Request was made but no response received
          console.error("No response received:", err.request);
        } else {
          // Something happened in setting up the request
          console.error("Error in setup request:", err.message);
        }
        throw new Error("Registration failed");
      }
    },

    async getLoginData(payload: any) {
      const loginUrl = 'https://storytime-api.strapi.timedoor-js.web.id/api/auth/local';
      try {
        // Logging payload untuk debugging
        console.log("Payload untuk login:", payload);

        const login_data = await axios.post(loginUrl, {
          identifier: payload.identifier,
          password: payload.password,
        });
        this.isLogin=true
        console.log('Login data', login_data.data);
        const { jwt, user } = login_data.data.data;

        // Simpan token JWT di state dan cookies
        console.log('ini adalah jwt',jwt)
        this.token = jwt;
        const cookies = useCookie('token');
        cookies.value = jwt;

        console.log("Cookie set:", cookies.value);
        
      } catch (err: any) {
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error("Error during login:", err.response.data);
        } else if (err.request) {
          // Request was made but no response received
          console.error("No response received:", err.request);
        } else {
          // Something happened in setting up the request
          console.error("Error in setup request:", err.message);
        }
        throw new Error("Login failed");
      }
    },

    async logout() {
      // Hapus token dari state
      this.token = null;
      this.isLogin=false
      this.user_id=null

      localStorage.clear();//hapus localstorage
      useStory().bookmark=[]

      // Hapus token dari cookies
      const cookies = useCookie('token');
      cookies.value = null;
    },

    async getProfile() {
      const profileUrl = 'https://storytime-api.strapi.timedoor-js.web.id/api/users/me';
      try {
        const cookie = useCookie('token');
        const token = cookie.value;

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       

        console.log('Profile data', response.data.data);
        this.userProfile = response.data.data; // Simpan data profil di state
        this.user_id=response.data.data.id
        console.log('ini adalah id login:',this.user_id)
        return this.user_id
      } catch (err: any) {
        if (err.response) {
          console.error("Error fetching profile:", err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error in setup request:", err.message);
        }
        throw new Error("Failed to fetch profile");
      }
    },
    async updateProfile(payload:any){
      const url="https://storytime-api.strapi.timedoor-js.web.id/api/users/me"
      const cookie=useCookie('token')
      const token=cookie.value

      const formData=new FormData();
      formData.append('name',payload.name),
      formData.append('biodata',payload.biodata)

      try{
        const update_data=await axios.patch(url,formData,{
        headers:{
          Authorization: 'Bearer ' + token,
          'Content-Type':'multipart/form-data'
        }
      })
      console.log('data update:',update_data.data.data)
      this.userProfile=update_data.data.data
      }catch(err){
        console.log(err)
      }

    }
  }
});
