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
                    <button
                        class="btn"
                        type="button"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleTodoStatus">
                        {{todo.completed ? 'Completed' : 'Incompleted'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
    <button class="btn btn-primary ml-2" @click="moveToListPage">Cancel</button>
  </form>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref} from '@vue/reactivity';

export default {
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);

        const getTodo = async () => {
            const res = await axios.get('http://localhost:3000/todos/' + route.params.id);
            todo.value = res.data;
            loading.value = false;
        }

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }

        const moveToListPage = () => {
            router.push({
                name: 'Todos'
            });
            // router.push('/todos');
        }
        
        getTodo();

        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToListPage
        }
    }
}
</script>

<style>

</style>