<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-sm-6">
                <h3><b>{{ data_id.title }}</b></h3>
                <p>{{ formatDate(data_id.createdAt)}}</p>
                <div class="w-100">
                    <img v-if="data_id.cover_image" :src="baseUrl + data_id.cover_image.url" class="img-fluid">
                </div>
                <p>{{ data_id.content }}</p>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="p-3 border border-2">
                    <p class="d-flex justify-content-center ">Author</p>
                    <div class="d-flex justify-content-center">
                        <img v-if="data_id.author" :src="baseUrl + data_id.author.profile_picture.formats.thumbnail.url"
                            class="rounded-circle" style="width:5opx;height:50px">
                    </div>
                    <p class="d-flex justify-content-center pt-3 m-0 " v-if="data_id.author"><b>{{ data_id.author.name
                            }}</b></p>
                    <p class="d-flex justify-content-center " v-if="data_id.author">{{ data_id.author.biodata }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    data_id:Object
})

const baseUrl = "https://storytime-api.strapi.timedoor-js.web.id";

function formatDate(dateStr) {
    // Parse the ISO 8601 date string into a Date object
    const date = new Date(dateStr);
    // Set the options for formatting the date
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    // Format the date to Indonesian locale
    return date.toLocaleDateString('id-ID', options);
}
</script>