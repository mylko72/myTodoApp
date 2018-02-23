<template>
  <div id="app">
    <nav-header></nav-header>
    <div class="content">
      <input-form  placeholder="할일을 입력하세요"></input-form>
      <todo-list v-if="isall" :todos="filtered" :total="count" :isactive="activated" :iscomplete="completed"></todo-list>
      <todo-list v-if="iscompleted" :todos="completed" :total="count" :isactive="activated" :iscomplete="completed"></todo-list>
      <todo-list v-if="isactived" :todos="activated" :total="count":isactive="activated" :iscomplete="completed"></todo-list>
    </div>
    <!-- {{filtered}} -->
  </div>
</template>

<script>
import { eventBus } from './main.js';
import { storage, getLists, appendList, updateList } from './webstorage.js';
import navHeader from './components/navHeader.vue';
import inputForm from './components/inputForm.vue';
import todoList from './components/todoList.vue';

export default {
  name: 'app',
  data(){
    return {
      isall:true,
      isactived: false,
      iscompleted: false,
      todo_lists: []
    }
  },
  created(){
    var self = this;
    self.updateView();
    console.log('created');
    eventBus.$on('add', function(data){
      self.addList(data);
    })
    eventBus.$on('onAll', function(){
      self.isall = true;
      self.isactived = false;
      self.iscompleted = false;
    })
    eventBus.$on('onComplete', function(){
      self.isall = false;
      self.isactived = false;
      self.iscompleted = true;
    })
    eventBus.$on('onActive', function(){
      self.isall = false;
      self.isactived = true;
      self.iscompleted = false;
    })
    eventBus.$on('onRemove', function(todo){
      var task = todo;
      self.remove(task);
    })
    eventBus.$on('onRemoveAll', function(){
      self.removeList();
    })
  },
  computed: {
    filtered(){
      var self = this;
      console.log('filtered');
      return this.todo_lists.filter(function(todo, index){
        return true;
      })
    },
    count(){
      return this.todo_lists.length;
    },
    completed(){
      var lists = this.todo_lists;
      console.log('completed');
      return lists.filter(function(list, index){
        if(list.completed === true){
          list.active = false;
          updateList(lists);
          return true;
        }else{
          list.active = true;
          updateList(lists);
          return false;
        }
      });
    },
    activated(){
      var lists = this.todo_lists;
      console.log('active');
      return lists.filter(function(list, index){
        if(list.active === true){
          return true;
        }
      });
    },
  },
  components: {
    'nav-header': navHeader,
    'input-form': inputForm,
    'todo-list': todoList,
  },
  methods: {
    updateView(){
      console.log('update');
      this.todo_lists = getLists();
    },
    addList(data){
      var todo = {'task': data, 'active': true, 'completed': false }
      console.log('추가되었습니다');
      appendList(todo);
      this.updateView();
      // this.todo_lists.push(todo);

    },
    remove(todo){
      var filtered = this.todo_lists.filter(function(list){
          return list.task !== todo.task
      });
      this.todo_lists = filtered;
      updateList(this.todo_lists);
    },
    removeList(){
      var filtered = this.todo_lists.filter(function(list){
        return list.completed === false;
      });
      this.todo_lists = filtered;
      updateList(this.todo_lists);
    }
  }
}
</script>

<style>
body {
  background: #d2e3ed;
}
#app {
  max-width: 375px;
  margin: 0 auto;
  border-radius: 20px;
  background:#fff;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

button {
  -webkit-appearance: none;
}

button.focus, button:focus {
  box-shadow: none;
  outline-color: none;
  outline: 0;
}
button:active {
  outline: none;
  border: none;
}

.content {padding:30px 20px;}
</style>
