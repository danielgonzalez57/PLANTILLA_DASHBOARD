
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';

import App from './App.vue'
import router from './router'
import './index.css'
import 'flowbite/dist/flowbite.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
import { ConfirmationService, DialogService } from 'primevue';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';


const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: 'dark'
        }
    }
});

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app')
