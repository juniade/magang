<template>
    <QuillEditor :options="option" contentType="html"></QuillEditor>
</template>
<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline'],        // toggled buttons
    ['link'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const option=ref({
    modules:{
        toolbar:toolbarOptions
    },
    placeholder:"Insert text here...",
    readOnly:false,
    theme:"snow"
})
</script>