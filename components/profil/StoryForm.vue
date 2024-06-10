<template>
    <div class="col-lg-8">
        <div class=" border p-3">
            <div class="d-flex align-items-center">
                <NuxtLink to="/ProfilPages/WebStory" style="color:black;"> <i class="fa-solid fa-arrow-left me-3"></i>
                </NuxtLink>
                <h3>Create Story</h3>
            </div>
            <div>
                <form @submit.prevent="addStory">
                    <UiBaseinput type="text" label="Title" placeholder="Enter a story title" v-model="storyData.title">
                    </UiBaseinput>
                    <UiBaseselect label="Category" id="gendre" :data="categori" v-model="storyData.category">
                    </UiBaseselect>
                    <label class="fw-semibold">Content</label>
                    <div class="mb-3">
                        <UiQuill v-model:content="storyData.content"></UiQuill>
                    </div>
                    <div class="position-relative">
                        <UiBaseinput type="file" identiy="recipeImage" placeholder="Profile Photo" isImage="true"
                            label="Cover Image" @input="checkImage">
                            <div>
                                <div class="position-relative" @click="hapus" v-if="inputImage">
                                    <div class="position-absolute top-0 start-100 translate-middle">
                                        <i
                                            class=" btn fa-solid fa-circle-xmark d-flex justify-content-end position-absolute text-danger"></i>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center align-content-center align-items-center border-2 border-secondary flex-column m-0"
                                    style="width:300px; height:300px; cursor: pointer;"
                                    :style="{ borderStyle: inputImage ? 'none' : 'dashed' }">
                                    <img :src="storyImage.preview" v-if="inputImage"
                                        style="width:100%;">
                                    <div v-if="!inputImage" class="text-center">
                                        <i class="fa-solid fa-circle-plus fs-5"></i>
                                        <p class="m-0 p-0">Add image</p>
                                    </div>

                                </div>

                            </div>
                        </UiBaseinput>
                    </div>
                    <div class="d-flex justify-content-end">
                        <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0">Batal</UiBasebutton>
                        <UiBasebutton class="btn-dark rounded-0 px-3" @click="addStory">Simpan</UiBasebutton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStory } from '~/stores/story';
import { useCategory } from '~/stores/category';
import { useRouter } from 'vue-router';


const router=useRouter()
const store = useStory()
const store_cat = useCategory();
const props=defineProps({
    isEdit:{type:Boolean, default:false}
})

const id_edit=ref()

const storyData = reactive({
    title: "",
    category: 0,
    content: "",
})

const storyImage = reactive({
    id: 0,
    file_url: "",
    preview: ""
})

const inputImage = ref(false)
const checkImage = (e) => {
    inputImage.value = true
    const file = e.target.files[0];
    storyImage.file_url = file
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
        storyImage.preview = reader.result;
    });

};

const fetchStory=async()=>{
    await store.fetchStoryList("","","",1)
}


const addStory = async () => {
    if(props.isEdit){
        console.log('id edit',id_edit.value)
        const image_id = await store.updateStory(id_edit.value,storyData)
        storyImage.id = image_id
        console.log('ini adalah id stori yang akan di push:', storyImage.id)
        await store.uploadImage(storyImage)
        fetchStory()
        alert('Story Edited Successfully!')
        router.push('/ProfilPages/WebStory')
        
    }else{
        try {
            console.log('Sending story data:', storyData);
            const id_image = await store.createStory(storyData);
            storyImage.id = id_image
            console.log('ini adalah id stori:', storyImage.id)
            console.log('ini adalah storyImage:', storyImage)
            await store.uploadImage(storyImage)
            alert('Story created successfully!');
        } catch (err) {
            alert('Failed to create story: ' + err.message);
        }

    }
};


store_cat.getStoryCategory()
const categori = computed(() => {
    return store_cat.categories
})

const hapus = () => {
    inputImage.value = false
    store.removeImage(id_image.value)
}
const baseUrl = "https://storytime-api.strapi.timedoor-js.web.id";
const id_image=ref()
onMounted(()=>{
    if(props.isEdit){
        inputImage.value=true
        for(let key in store.storyDetail){
            if(key=='id'){
                id_edit.value=store.storyDetail[key]
            }
            if (key === 'category') {
                storyData[key] = store.storyDetail[key].id
            }else if( key=='cover_image'){
                storyImage.preview=`${baseUrl}${store.storyDetail[key].url}`
                id_image.value=store.storyDetail[key].id
                console.log('remove id image:',id_image.value)
            }else{
                 storyData[key]=store.storyDetail[key]
            }
           
        }
       
    }


})

</script>
