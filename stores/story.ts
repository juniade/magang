import axios from "axios";

export const useStory = defineStore("story", {
  state: () => ({
    storyList: [],
    storyDetail: [],
    loadmore: [],
    data_search: 0
  }),

  actions: {
    async fetchStoryList(key: any, page: any) {
      if (this.data_search === 1) {
        this.storyList = []
      }
      try {
        const story = await axios.get(
          `https://storytime-api.strapi.timedoor-js.web.id//api/stories/?keyword=${key}&author&page=${page}`
        );
        const newStories = story.data.data;
        console.log('ini adalah newstories', newStories)
        if (key === '') {
          console.log("key null")
          this.data_search = 0
          for (let newStory of newStories) {
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
        `https://storytime-api.strapi.timedoor-js.web.id//api/stories/${id}`
      );
      this.storyDetail = story.data.data;
      console.log("detail", this.storyDetail)
    },
  },
});
