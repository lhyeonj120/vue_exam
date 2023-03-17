<template>
  <div
    class="alert alert-success toast-box" role="alert">
    {{message}}
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
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