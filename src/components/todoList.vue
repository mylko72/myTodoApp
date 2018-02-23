<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos">
        <label><input type="checkbox" v-model="todo.completed" /> <span>{{todo.task}}</span></label>
        <button type="button" class="del" v-on:click="remove(todo)"></button>
      </li>
      <li v-if="sel_complete && iscomplete.length==0" class="nolist">
        완료된 목록이 없습니다.
      </li>
      <li v-if="sel_active && isactive.length==0" class="nolist">
        진행중 목록이 없습니다.
      </li>
    </ul>
    <status-info :sum="total" :activelist="isactive" :completelist="iscomplete"></status-info>
  </div>

</template>

<script>
import { eventBus } from '../main.js';
import statusInfo from './statusInfo.vue';

export default {
  name: 'todolist',
  props: ['todos', 'total', 'isactive', 'iscomplete', 'sel_active', 'sel_complete'],
  components: {
    'status-info': statusInfo
  },
  methods: {
    remove(task){
      eventBus.$emit('onRemove', task);
    }
  }
}

</script>

<style>
  .nolist {
    padding:20px 0;
    text-align: center;
  }
  .list-group-item label {
    display: block;
    margin-bottom: 0;
    cursor: pointer;
  }
  .list-group-item label input[type="checkbox"] {
    margin-right: 5px;
    vertical-align: 1px;
  }
  .del {
    position:absolute;
    right:5px;
    top:2px;
    width:40px;
    height:45px;
    border:none;
    background: #fff;
  }
  .del:before {
    display:inline-block;
    content:'x';
    font-size:1.6rem;
    color:#cc9a9a;
  }
  input[type="checkbox"]:checked + span {
    text-decoration: line-through;
    color:#999;
  }
</style>
