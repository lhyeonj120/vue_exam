<template>
  <h1>Todo Page</h1>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Todo Subject</label>
                <input v-model="todo.subject" type="text" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label>Status</label>
                <div>
                    <button class="btn btn-danger">
                        Incomplete
                    </button>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary">Save</button>
  </form>
</template>

<script>
import {useRoute} from 'vue-router';
import axios from 'axios';
import {ref} from '@vue/reactivity';

export default {
    setup(){
        const route = useRoute();
        const todo = ref(null);
        const loading = ref(true);

        const getTodo = async () => {
            const res = await axios.get('http://localhost:3000/todos/' + route.params.id);
            todo.value = res.data;
            loading.value = false;
        }
        
        getTodo();

        return{
            todo,
            loading,
        }
    }
}
</script>

<style>

</style>