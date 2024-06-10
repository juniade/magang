<template>
    <label :for="id" class="fw-semibold">{{ label }}
        <slot></slot>
    </label>
    <select class="form-select mb-3" :id="id" @input="$emit('update:modelValue',$event.target.value)">
        <option selected disabled>Select Category</option>
        <option v-for="(item,index) in data" :key="index" :value="item.id"
            :selected="modelValue===item.id">{{ item.name }}</option>
    </select>
</template>
<script setup>
defineProps({
    data:{type:Array,require:true},
    id:{type:String,require:true},
    label:{type:String,require:true},
    modelValue:{type:[String,Number,Object]}
})
</script>