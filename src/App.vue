<template>
  <div class="container"> <!-- 중간정렬 -->
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="!todos.length">
      추가된 todo가 없습니다.
    </div>
    <TodoList :todos="todos"/>
  </div>  
</template>

<script>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup(){
    const todos = ref([]);
    
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    return{
      todos,
      deleteTodo,
      addTodo,
    }
  }
}
</script>

<style>
  .todo{
    color: gray;
    text-decoration: line-through;
  }
</style>
