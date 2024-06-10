import axios from "axios";
import { defineStore } from 'pinia';
import { useCookie } from '#app'; // menggunakan cookie composable


export const useStory = defineStore("story", {
  state: () => ({
    storyList: [],
    storyDetail: [],
    loadmore: [],
    bookmark:[],
    data_search: 0,
    bookmarkIcon:false,
    user_story_data: []
  }),

  actions: {
    loadBookmarks() {
      if (typeof window !== 'undefined') {
        const storedBookmarks = localStorage.getItem('bookmarks');
        if (storedBookmarks) {
          this.bookmark = JSON.parse(storedBookmarks);
        }
      }
       console.log('local storage',this.bookmark)
    },
    saveBookmarks() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmark));
      }
    },
    async fetchStoryList(key: any, author: any, page: any, isEdit: any) {
      if (this.data_search === 1) {
        this.storyList = []
      }
      if (isEdit !== "") {
        this.storyList = []
      }
      try {
        const story = await axios.get(
          `https://storytime-api.strapi.timedoor-js.web.id/api/stories/?keyword=${key}&author=${author}&page=${page}`
        );
        this.user_story_data = []
        console.log('author:', author)
        if (author !== "") {
          for (const data of story.data.data) {
            this.user_story_data.push(data)
          }

          console.log('ini adalah user story data', this.user_story_data)
        }
        const newStories = story.data.data;
        console.log('ini adalah newstories', newStories)
        if (key === '') {
          console.log("key null")
          this.data_search = 0
          for (const newStory of newStories) {
            const storyExists = this.storyList.find(story => story.id === newStory.id);
            if (!storyExists) {
              this.storyList.push(newStory);
            }
          }
        } else {
          console.log("key tidak null")
          this.storyList = []
          this.storyList = newStories
          this.data_search = 1

        }

        console.log("ini adalah data:", this.storyList);
      } catch (err) {
        console.log(err);
      }
    },

    async fetchStoryDetail(id: any) {

      const story = await axios.get(
        `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`
      );
      this.storyDetail = story.data.data;
      console.log("detail", this.storyDetail)
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
        console.log("Create story:", response.data.data);
        return response.data.data.id;
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
    },

    async updateStory(id: any, payload: any) {
      const editStoryUrl = `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`;
      const cookie = useCookie('token');
      const token = cookie.value;

      console.log('Ini adalah token create story:', token);

      if (!token) {
        throw new Error('User is not authenticated');
      }

      const requestBody = {
        data: {
          title: payload.title,
          content: payload.content,
          category: payload.category
        }
      };

      try {
        const response = await axios.put(editStoryUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }

        });
        console.log("edit story:", response.data.data);
        return response.data.data.id
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
    },

    async uploadImage(payload: any) {
      const Url = "https://storytime-api.strapi.timedoor-js.web.id/api/upload"
      const cookie = useCookie('token')
      const token = cookie.value
      //karena type nya multipart/form-data maka gunakan cara seperti ini untu set atributnya
      const formData = new FormData();
      formData.append('files', payload.file_url);
      formData.append('refId', payload.id);
      formData.append('ref', 'api::story.story');
      formData.append('field', 'cover_image');
      console.log('FormData contents:', formData);
      try {
        const response = await axios.post(Url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
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
    },
    async removeImage(image_id: any) {
      const url = `https://storytime-api.strapi.timedoor-js.web.id/api/upload/files/${image_id}`

      const cookie = useCookie('token')
      const token = cookie.value

      const response = await axios.delete(url, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      console.log('image deleted data:', response.data.data)
    },

    async hapusStory(id: any) {
      const url = `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`

      const cookie = useCookie('token')
      const token = cookie.value
      const story_delete = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('delete story:', story_delete.data.data)
      this.user_story_data.splice(id, 1)
    },

    async bookmarkStory(payload: any) {
      this.bookmarkIcon=true
      const storydata = { ...payload }
      console.log('bookmark storydata', storydata)
      const exist = this.bookmark.find(story => story.id === storydata.id)
      if (!exist) {
        this.bookmark.push(payload)
        this.saveBookmarks();
      }
     
      console.log('bookmark story', this.bookmark)
    },

    async hapusBookmark(payload: any) {
      this.bookmarkIcon=false
      const hapusBookmark = { ...payload }
      const index = this.bookmark.findIndex(story => story.id === hapusBookmark.id);
      if (index !== -1) {
        this.bookmark.splice(index, 1);
        this.saveBookmarks();
      }
    }
  },
});
