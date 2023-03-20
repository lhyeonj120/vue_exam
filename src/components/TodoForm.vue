<template>
    <div v-if="loading">
        Loading...
    </div>
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control">
                </div>
            </div>
            <div v-if="editing" class="col-6">
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
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10">
                    </textarea>
                </div>
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!todoUpdated">
            {{editing ? 'Update' : 'Create'}}
        </button>
        <button class="btn btn-primary ml-2" @click="moveToListPage">Cancel</button>
    </form>
    <Toast v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"/>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed, onUnmounted} from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';

export default {
    components: {
        Toast
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
    setup(props){

        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subejct: '',
            completed: false,
            body: ''
        });
        const loading = ref(false);
        const todoId = route.params.id;
        const originalTodo = ref(null);

        const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast
        } = useToast();

        const onSave = async () => {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject: todo.value.subject,
                completed: todo.value.completed
            });
            originalTodo.value = {...res.data};
            triggerToast('Successfully save!!!');
            console.log(res);
        }

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        const getTodo = async () => {
            loading.value = true;
            try{
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                // 깊은 복사, 같은 주소값을 가지지 않도록
                todo.value = {...res.data};
                originalTodo.value = {...res.data};
                loading.value = false;
            }catch(err){
                loading.value = false;
                console.log(err);
                triggerToast('something went wrong ㅠㅠ', 'danger');
            }
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
        
        if(props.editing){
            getTodo();
        }

        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToListPage,
            onSave,
            todoUpdated,
            showToast,
            triggerToast,
            toastMessage,
            toastAlertType,
        }
    }
}
</script>

<style>

</style>