<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import axios from 'axios';

// COmponentes
import Password from 'primevue/password';
import Select from 'primevue/select';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import { useAuthStore } from '@/stores/Auth';
import router from '@/router';


import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useField } from 'vee-validate';

// Toast
import { useToast } from "primevue/usetoast";
const toast = useToast();
const confirm = useConfirm();

const userStore = useAuthStore();
const token = userStore.user?.Token

// Variables
const dataBaseUrl = `${import.meta.env.VITE_URL}/auth`;
const loading = ref(false)
const { value: Email } = useField<string>('Email');
const { value: Nombre } = useField<string>('Nombre');
const { value: PasswordUser } = useField<string>('PasswordUser');
const { value: TypeRol } = useField<{ id: number; name: string }>('TypeRol');
const { value: Departament } = useField<{ id: number; name: string }>('Departament');
const roles = ref();
const departament = ref();
const dataBaseUrlRol = `${import.meta.env.VITE_URL}/rol`;
const dataBaseUrlDepartament = `${import.meta.env.VITE_URL}/departament`;


interface FormData {
    Nombre: string;
    Email: string;
    Password: string;
    ID_Rol: { id: number; name: string };
    Departament: { id: number; name: string };
}

const initialValues = {
    Nombre: '',
    Email: '',
    Rol: '', 
    Departament: '', 
    PasswordUser: ''
};

const breadcrumbOption = ref([
    {
        router: '/tables',
        title: 'Maestro Usuario',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear Usuario',
        disabledOption: true
    },
]);

const postUser = async (data: FormData): Promise<void> => {
    try {
        await axios.post(`${dataBaseUrl}/register`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error en la solicitud:', error.message);
            if (error.response) {
                console.error('Datos de respuesta del error:', error.response.data);
                console.error('Estado de respuesta del error:', error.response.status);
            }
        } else {
            console.error('Error desconocido:', error);
        }
    }
};

interface ItemSelect {
    Id: number;
    Name: string;
}

const getRol = async () => {
  try{
      const response = await axios.get(`${dataBaseUrlRol}/getRoles`);
      roles.value = response.data.map((role: ItemSelect) => ({ 
        id: role.Id, 
        name: role.Name
     }));
      
  } catch(error){
      console.log(error)
  }
}

const getDepartament = async () => {
  try{
      const response = await axios.get(`${dataBaseUrlDepartament}/getDepartament`);
      departament.value = response.data.map((departament: ItemSelect) => ({ 
        id: departament.Id, 
        name: departament.Name
     }));
      
  } catch(error){
      console.log(error)
  }
}

// Form
const schema: yup.Schema<any> = yup.object({
    Nombre: yup.string().required('Nombre Completo es requerido'),
    Email: yup.string().required('Email es requerido').email('Email con formato inválido'),
    // Rol: yup.string().required('Rol es requerido'),
    // departament: yup.string().required('Departamento es requerido'),
    PasswordUser: yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
});



const onFormSubmit = (values: any) => {
    loading.value = true

    const data = {
        Nombre: values.Nombre,
        Email: values.Email,
        Password: values.PasswordUser,
        ID_Rol: values.Rol.value.id, 
        Departament: values.Departament.value.id,
    };

    confirm.require({
        message: 'Deseas Guardar este usuario?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'danger',
            size:'small'
        },
        acceptProps: {
            label: 'Guardar',
            severity: 'contrast',
            size:'small',
            icon:'pi pi-check',
            iconPos:'right'
        },
        accept: async () => {
            await postUser(data);
            
            toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Usuario creado correctamente!', life: 3000 });
            setTimeout(function () { router.push('/tables/'); }, 1000);
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'Error papa', life: 3000 });
        }
    });

    loading.value = false
};


onMounted(async () => {
    await getRol();
    await getDepartament();
    initFlowbite();
})

</script>

<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Breadcrumb :data="breadcrumbOption" />

    <h3 class="text-3xl font-bold mt-5 dark:text-white">Crear Usuarios</h3>

    <div class="container mx-auto px-10 py-10">

        <Form
            :initial-values="initialValues"
            :validation-schema="schema"
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full"
        >
            <div class="card flex flex-wrap gap-4 w-full">
                <div class="flex flex-col gap-2 flex-1">
                    <Field name="Email" rules="required|Email" v-slot="{ field }" v-model="Email">
                        <label for="Email">Email<span class="text-red-500">*</span></label>
                        <InputText 
                            v-bind="field" 
                            type="Email" 
                            id="Email" 
                            placeholder="dolphin@tiendasdaka.com"
                            autocomplete="off"
                        />
                    </Field>
                    <ErrorMessage name="Email" class="font-semibold text-red-500"/> 
                </div>

                <div class="flex flex-col gap-2 flex-1">
                    <Field name="PasswordUser" rules="required|PasswordUser" v-slot="{ field }" v-model="PasswordUser">
                        <label for="password">Contraseña<span class="text-red-500">*</span></label>
                        <Password 
                            v-bind="field"
                            placeholder="Daka2023*"
                            :style="{ width: '100%' }" :inputStyle="{ width: '100%' }" 
                            toggleMask
                            autocomplete="off"
                        />
                    </Field>
                    <ErrorMessage name="PasswordUser" class="font-semibold text-red-500"/>
                </div>
            </div>
            <div class="card flex flex-wrap gap-4 w-full">
                <div class="flex flex-col gap-2 w-full">
                    <Field name="Nombre" rules="required|Nombre" v-slot="{ field }" v-model="Nombre">
                        <label for="Nombre">Nombre Completo<span class="text-red-500">*</span></label>
                        <InputText 
                            v-bind="field" 
                            type="Nombre" 
                            id="Nombre" 
                            placeholder="Jhon Doe"
                            autocomplete="off"
                        />
                    </Field>
                    <ErrorMessage name="Nombre" class="font-semibold text-red-500"/>
                </div>
            </div>

            <div class="card flex flex-wrap gap-4 w-full">
                <div class="flex flex-col gap-2 flex-1">
                    <Field name="Rol" rules="required|Rol" v-slot="{ field }" v-model="TypeRol">
                        <label for="Rol">Tipo de Rol<span class="text-red-500">*</span></label>
                        <Select 
                            id="role" 
                            v-bind="field"
                            :options="roles"
                            optionLabel="name"
                            placeholder="Selecciona el rol"
                            
                        />
                    </Field>
                    <ErrorMessage name="Rol" class="font-semibold text-red-500"/>
                </div>

                <div class="flex flex-col gap-2 flex-1">
                    <Field name="Departament" rules="required|departament" v-slot="{ field }" v-model="Departament">
                        <label for="departament">Departamento<span class="text-red-500">*</span></label>
                        <Select 
                            id="departament" 
                            v-bind="field"
                            :options="departament"
                            optionLabel="name"
                            placeholder="Selecciona el departamento"
                        />
                    </Field>      
                    <ErrorMessage name="departament" class="font-semibold text-red-500"/>
                </div>
            </div>

            <div class="flex py-5">
                <Button 
                    :loading="loading"
                    icon="pi pi-check" 
                    iconPos="right" 
                    type="submit" 
                    label="Guardar" 
                    class="w-auto"
                    :disabled="!Departament || !TypeRol"
                    :style="{ backgroundColor: '#003566', borderColor: '#003566', color: '#ffffff' }" 
                />
            </div>
        </Form>

    </div>
</template>

