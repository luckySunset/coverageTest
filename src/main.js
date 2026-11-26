import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

function test(){
    let a=1;
    a++;
    console.log(a);
}
