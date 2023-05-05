import { createApp } from 'vue'

import App from './App.vue'
import VueCookies from 'vue-cookies';
import router from "./router";
import store from './store';
import Vue3EasyDataTable from 'vue3-easy-data-table';

import 'vue3-easy-data-table/dist/style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import './assets/main.css'

const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(VueCookies).use(store).use(router).mount('#app');

