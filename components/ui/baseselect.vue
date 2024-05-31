<template>
    <label :for="id" class="fw-semibold">{{ label }}
        <slot></slot>
    </label>
    <select class="form-select mb-3" :id="id" @input="$emit('update:modelValue',$event.target.value)">
        <option v-for="(item,index) in data" :key="index" :value="item" :disabled="index === 0"
            :selected="modelValue===item">{{ item }}</option>
    </select>
</template>
<script setup>
defineProps({
    data:{type:Array,require:true},
    id:{type:String,require:true},
    label:{type:String,require:true},
    modelValue:{type:[String,Number]}
})
</script>