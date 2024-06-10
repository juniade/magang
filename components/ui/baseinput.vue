<template>
    <div>
        <label :for="identity" class="fw-semibold">{{ label }}
            <slot></slot>
        </label>
        <div class="mb-3">
            <input :class="[{ 'file-input': type == 'file' }, 'form-control']" :type="type" :id="identity"
                :readonly="readonly === '1'" :placeholder="placeholder" :value="modelValue" :disabled="disabled === '1'"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup="$emit('keyInput', $event.target.value)">
    
        </div>
    </div>
</template>
<script setup>
import { readonly } from 'vue';
defineProps({
    type: { type: String, require: true },
    label: { type: String, require: true },
    identity: { type: String, require: true },
    placeholder: { type: String, require: true },
    readonly: { type: String, require: true, default: "0" },
    modelValue: { type: [String, Number] },
    disabled: { type: String, required: false, default: "0" }
})
</script>

<style scoped>
.file-input {
    cursor: pointer;
    height: 300px;
    width: 300px;
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 99;
    font-size: 50px;
    opacity: 0;
}
</style>