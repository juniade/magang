<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center align-item-center mt-5">
            <HomeInformation></HomeInformation>
        </div>
        <HomeSearchBar @search="cariHuruf" @sorting="sortingdata"></HomeSearchBar>
        <span v-if="filteredList!==0">
            <ItemStoryList :data_item="sortedList"></ItemStoryList>
        </span>
        <span v-if="filteredList.length===0">
            <div class=" d-flex justify-content-center ">
                <img src="/assets/empty-data.svg" style="width:20%">
            </div>
            <h5 class="mt-4 text-center">Data not found</h5>
        </span>

        <div class="row">
            <div class="col-lg-12 d-flex justify-content-center mt-3 ">
                <button class="btn btn-outline-dark" @click="loadmore">Load more</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStory } from '~/stores/story';

const counterStore = useStory();
const getData=async()=>{
    await counterStore.fetchStoryList("","","","");   
}
const getDatapage = async (params,author,idx,edit) => {
    await counterStore.fetchStoryList(params,author,idx,edit)}

onMounted(()=>{
    getData()
})
const allStory = computed(() => {
    return counterStore.storyList
})
const nilai = ref("")
const data_sort=ref('newest')
const index = ref(1)
// inisalisasi var nilai dengan data yang diperoleh dari emit serachItem
// input merupakan variabel yang beriskan data yang diperoleh dari emit serachItem
function cariHuruf(input) {
    nilai.value = input.trim()
    console.log('nilai.value: ',nilai.value)
    console.log('dijalankan')
    if (nilai.value === "") {
        console.log('if dijalankan')
        getData()
    }else{
        console.log('else dijalankan')
        getDatapage(nilai.value,"","","")
     
    }

}
// fungsi search
const filteredList = computed(() => {
    return allStory.value.filter((item) =>
        item.title.toLowerCase().includes(nilai.value.toLowerCase())
    );
})

//sorting
function sortingdata(data){
    data_sort.value=data
}
const sortedList = computed(() => {
    return filteredList.value.slice().sort((a, b) => {
        if (data_sort.value === 'asc') {
            return a.title.localeCompare(b.title);
        }else if(data_sort.value==='desc') {
            return b.title.localeCompare(a.title);
        }else if(data_sort.value==='newest'){
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
});
function loadmore(){
    index.value++
    counterStore.fetchStoryList("","", index.value,"");
    
}
</script>