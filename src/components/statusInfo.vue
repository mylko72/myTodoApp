<template>
  <div class="btns" role="group">
    <hr />
    <div>
      <button class="btn btn-default selected" type="button" v-on:click="showAll">All <span class="badge">{{ sum }}</span></button>
      <button class="btn btn-default" type="button" v-on:click="showActive">Active <span class="badge">{{ activelist.length }}</span></button>
      <button class="btn btn-default" type="button" v-on:click="showComplete">Completed <span class="badge">{{ completelist.length }}</span></button>
    </div>
    <a href="#" class="btn-clear" @click="removeComplete">Clear completed</a>
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
  name: 'statusinfo',
  props: ['sum', 'activelist', 'completelist'],
  methods: {
    showAll(e){
      var targetEl = e.target;
      eventBus.$emit('onAll');
      this.switchButton(targetEl);
    },
    showActive(e){
      var targetEl = e.target;
      eventBus.$emit('onActive');
      this.switchButton(targetEl);
    },
    showComplete(e){
      var targetEl = e.target;
      eventBus.$emit('onComplete');
      this.switchButton(targetEl);
    },
    removeComplete(){
      eventBus.$emit('onRemoveAll');
    },
    switchButton(target){
      var btnEl = document.querySelectorAll('.btn-default');

      [].forEach.call(btnEl, function(btn) {
          if (target !== btn) {
              btn.classList.remove('selected');
          }
      });
      target.classList.add('selected');
    }
  }
}
</script>

<style>
  .btns {
    margin-top: 35px;
    text-align: center;
  }
  .btn-default {
    border:1px solid transparent;
    background: #fff;
    font-size: .8rem;
    line-height: 1.8;
    outline: none;
  }
  .btn-clear {
    font-size: 12px;
  }
  .selected {
    border-color:rgba(175, 47, 47, 0.2)
  }
  .badge{
    display:inline-block;
    min-width:10px;
    padding:3px 7px;
    font-size:10px;
    font-weight:700;
    line-height:1;
    color:#fff;
    text-align:center;
    white-space:nowrap;
    vertical-align:baseline;
    background-color:#777;
    border-radius:10px
  }
  .badge:empty{
    display:none
  }
  .btn .badge{
    position:relative;
    top:-1px
  }
  .btn.focus, .btn:focus {
    box-shadow: none;
    outline-color: none
  }
</style>
