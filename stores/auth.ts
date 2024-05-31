import axios from 'axios';
import { defineStore } from 'pinia';
import { useCookie } from '#app'; // menggunakan cookie composable

export const useAuth = defineStore('auth', {
  state: () => ({
    token: null,
    isLogin: false,
    userProfile: {}
  }),

  actions: {
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

        console.log('register data', response.data.data);
        const { jwt, user } = response.data.data;

        this.token = jwt;
        console.log("Ini adalah token", this.token);

        // Menggunakan useCookie composable untuk mengelola token JWT di cookies
        const cookie = useCookie('token');
        cookie.value = jwt;

        console.log("Cookie set:", cookie.value);
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

        console.log('Login data', login_data.data);
        const { jwt, user } = login_data.data.data;

        // Simpan token JWT di state dan cookies
        this.token = jwt;
        const cookies = useCookie('token');
        cookies.value = jwt;

        console.log("Cookie set:", cookies.value);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
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

    async createStory(payload: any) {
      const createStoryUrl = 'https://storytime-api.strapi.timedoor-js.web.id/api/stories';
      const cookie = useCookie('token');
      const token = cookie.value;

      console.log('Ini adalah token create story:', token);

      if (!token) {
        throw new Error('User is not authenticated');
      }

      try {
        const response = await axios.post(createStoryUrl, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json'
          }
        });
        console.log("Create story:", response.data);
        return response.data;
      } catch (err: any) {
        if (err.response) {
          console.error('Error during story creation:', err.response.data);
        } else if (err.request) {
          console.error('No response received:', err.request);
        } else {
          console.error('Error in setup request:', err.message);
        }
        throw new Error('Story creation failed');
      }
    }
  }
});
