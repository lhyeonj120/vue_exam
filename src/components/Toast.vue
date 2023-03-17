<template>
  <div
    class="alert alert-success toast-box" 
    role="alert"
    :class="`alert-${type}`">
    {{message}}
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'success'
        }
    }
}
</script>

<style>
    .toast-box{
        position: fixed;
        top: 2px;
        right: 10px;
    }
</style>