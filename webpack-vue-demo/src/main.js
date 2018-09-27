import Vue from 'vue';
import App from './App';

console.log('webpack');

new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App
  }
});