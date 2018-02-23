<template>
  <div class="input-group-lg">
    <input type="text" v-model="task" v-on:keydown.enter="register" :placeholder="placeholder" class="form-control" />
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
  name: 'inputform',
  data(){
    return {
      task: '',
    }
  },
  props: ['placeholder'],
  methods: {
    register(e){
      if(this.task.length>0){
          eventBus.$emit('add', this.task);
          this.task = '';
      }
      e.preventDefault();
    }

  }
}

</script>

<style>
  .input-group-lg {
    margin-bottom: 10px;
  }
</style>
