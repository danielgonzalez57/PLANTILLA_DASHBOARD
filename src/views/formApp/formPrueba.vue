<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DataTable } from 'simple-datatables';
import { useField } from 'vee-validate';
import { useToast } from "primevue/usetoast";
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import DefaultCard from '@/components/DefaultCard.vue'
import router from '@/router';
import * as yup from 'yup';
import MasteUserService from '@/services/UserService';
const toast = useToast();
import { useRoute } from 'vue-router'
const route = useRoute()

const idUser: any = ref('')
idUser.value = route.params.id
const searchTable = ref('');
const breadcrumbOption = ref([
    {
        router: '/usuarios/',
        title: 'Listado de usuarios',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear usuario',
        disabledOption: true
    },
]);


const schema: yup.Schema<any> = yup.object({
    name: yup.string().required('Nombre es requerido'),
    email: yup.string().required('Email es requerido').email('Email con formato inválido'),
    role: yup.string().required('Rol es requerido'),
    password: yup.string().required('Password es requerido').min(8, 'Password debe tener al menos 8 caracteres'),
    confirmPassword: yup.string()
        .required('Confirmar Password es requerido')
        .oneOf([yup.ref('password')], 'Passwords no coinciden')
});
const form = ref(null)
const loading = ref(false)
const typeU: any = ref([
    {
        id: 0,
        name: 'Administrador',
        title: 'ADMIN'
    },
    {
        id: 1,
        name: 'Supervisor',
        title: 'SUPERVISOR'
    }, {
        id: 2,
        name: 'Usuario',
        title: 'USER'
    }
])


let { value: name } = useField<string>('name');;
let { value: email } = useField<string>('email');;
let { value: password } = useField<string>('password');
let { value: confirmPassword } = useField<string>('confirmPassword');
let { value: role } = useField<string>('role')
const typeServiceSelected = ref('')
onMounted(() => {
    initFlowbite();

    const tableElement = searchTable.value;
    let userService =  new MasteUserService()

    if (idUser.value !== '' && idUser.value !== undefined) {
        let response: any = userService.getUsersById(idUser.value)
        let dataComissionFind = userService.getUser()._value

        name.value = dataComissionFind.User_name
        role.value = dataComissionFind.ID_Cargo

        
    } else {


        const tableElement = searchTable.value;
        if (tableElement) {
            new DataTable(tableElement, {
                searchable: true,
                sortable: true,
                labels: {
                    placeholder: "Buscar...",
                    noRows: "No se encontraron resultados",
                    info: "Mostrando {start} a {end} de {rows} resultados",
                    noResults: "No se encontraron resultados"
                }
            });
        }
    }
    if (tableElement) {
        new DataTable(tableElement, {
            searchable: true,
            sortable: true,
            labels: {
                placeholder: "Buscar...",
                noRows: "No se encontraron resultados",
                info: "Mostrando {start} a {end} de {rows} resultados",
                noResults: "No se encontraron resultados"
            }
        });
    }
})


async function submit(values: any) {
    loading.value = true
    
    let data: any = {
        "User_name": values.name,
        "Email": values.email,
        "Password": values.password,
        "ID_rol": values.role,
        "Phone": values.phone,
        "Address": values.address,
        "Identification": values.identification
    }

    const baseUrl = `${import.meta.env.VITE_API_URL}/`;
    await fetch(${baseUrl}api/auth/signup, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        loading.value = false
        response.json().then((data) => {
            toast.add({ severity: 'info', summary: 'Success', detail: 'Usuario creado con éxito', life: 3000 });
            //router.push('/usuarios');
            setTimeout(function () { router.push('/usuarios/'); }, 1000);
        });
    })
}

</script>

<template>
    <Breadcrumb :data="breadcrumbOption" />
    <h3 class="text-3xl font-bold mt-5 dark:text-white mb-12">Crear nuevo usuario</h3>

    <DefaultCard cardTitle="Datos Generales">
        <div class="flex flex-col items-center justify-center p-4">
            <!-- Author: FormBold Team -->
            <div class="w-full bg-white">
                <Toast />
                <Form @submit="submit" :validation-schema="schema" class="flex flex-col w-full">
                    <div class="grid md:grid-cols-3 md:gap-6">
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                                Nombre <span>*</span>
                            </label>
                            <Field name="name" v-model="name" placeholder="Ingrese nombre del usuario"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="name" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Email <span>*</span>
                            </label>
                            <Field name="email" v-model="email" placeholder="Ingrese email"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="email" class="text-[#c82a08] text-sm" />
                        </div>

                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Rol <span>*</span>
                            </label>

                            <Field name="role" as="select" v-model="role" placeholder="Seleccione el tipo de servicio"
                                class="w-full rounded-lg border-[1px]  border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                <option v-for="rol in typeU" :key="rol.title" :value="rol.title" class="w-full">
                                    {{ rol.name }}
                                </option>
                            </Field>
                            <ErrorMessage name="role" class="text-[#c82a08] text-sm" />
                        </div>

                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Password <span>*</span>
                            </label>
                            <Field name="password" type="password" v-model="password" placeholder="Ingrese password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="password" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Confirmar Password <span>*</span>
                            </label>
                            <Field name="confirmPassword" type="password" v-model="confirmPassword"
                                placeholder="Confirme password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="confirmPassword" class="text-[#c82a08] text-sm" />
                        </div>
                    </div>
                    <div>
                     
                        <button
                            class="text-white w-1/5 p-2 m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  icon="pi pi-upload" :loading="loading">
                            Crear
                        </button>
                    </div>
                </Form>
            </div>
        </div>

    </DefaultCard>
</template>