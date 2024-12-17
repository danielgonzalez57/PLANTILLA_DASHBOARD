<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import axios from 'axios';

// Componentes
import MultiSelect from 'primevue/multiselect';
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
const loading = ref(false)
const { value: Name } = useField<string>('Name');
const { value: Id_Permissions } = useField<{ id: number; name: string }>('Id_Permissions');

const permissions = ref();
const dataBaseUrlPermissions = `${import.meta.env.VITE_URL}/permissions`;
const dataBaseUrlRol = `${import.meta.env.VITE_URL}/rol`;

interface FormData {
    Name: string;
    Id_Permissions: string;
}

const initialValues = {
    Name: '',
    Id_Permissions: '',
};

const breadcrumbOption = ref([
    {
        router: '/tablesRoles',
        title: 'Maestro De Roles',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear Roles',
        disabledOption: true
    },
]);

const postPermissions = async (data: FormData): Promise<void> => {
    try {
        await axios.post(`${dataBaseUrlRol}/postRoles`, data, {
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

const getPermissions = async () => {
  try{
      const response = await axios.get(`${dataBaseUrlPermissions}/getPermissions`);
      permissions.value = response.data.map((role: ItemSelect) => ({ 
        id: role.Id, 
        name: role.Name
     }));
      
  } catch(error){
      console.log(error)
  }
}

// Form
const schema: yup.Schema<any> = yup.object({
    Name: yup.string().required('Nombre del rol es requerido'),
    // Id_Permissions: yup.string().required('Los permisos requerido')
});

interface Ids {
    id: number;
    Name: string;
}

const onFormSubmit = (values: any) => {
    loading.value = true

    const ids: string = values.Id_Permissions.value.map((permission: Ids) => permission.id).join(', ');

    const data = {
        Name: values.Name,
        Id_Permissions: ids
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
            await postPermissions(data);
            
            toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Rol creado correctamente!', life: 3000 });
            setTimeout(function () { router.push('/tablesRoles'); }, 1000); 
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'Error papa', life: 3000 });
        }
    });

    loading.value = false
};


onMounted(async () => {
    await getPermissions();
    initFlowbite();
})

</script>

<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Breadcrumb :data="breadcrumbOption" />

    <h3 class="text-3xl font-bold mt-5 dark:text-white">Crear Roles</h3>
    <div class="container mx-auto px-10 py-10">

        <Form
            :initial-values="initialValues"
            :validation-schema="schema"
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full"
        >
            <div class="card flex flex-wrap gap-4 w-full">
                <div class="flex flex-col gap-2 flex-1">

                    <Field name="Name" rules="required|Name" v-slot="{ field }" v-model="Name">
                        <label for="Name">Nombre del Rol<span class="text-red-500">*</span></label>
                        <InputText 
                            v-bind="field" 
                            type="text"
                            id="Name"
                            placeholder="Almacen"
                            autocomplete="off"
                        />
                    </Field>
                    <ErrorMessage name="Name" class="font-semibold text-red-500"/> 

                </div>

                <div class="flex flex-col gap-2 flex-1">
                    <Field name="Id_Permissions" rules="required|Id_Permissions" v-slot="{ field }" v-model="Id_Permissions">
                        <label for="Id_Permissions">Permisos<span class="text-red-500">*</span></label>
                        <MultiSelect 
                            v-bind="field"
                            :options="permissions" 
                            optionLabel="name" 
                            filter 
                            placeholder="Selecciona los Permisos"
                            :maxSelectedLabels="3" 
                            class="w-full md:w-80" 
                        />
                    </Field>
                    <ErrorMessage name="Id_Permissions" class="font-semibold text-red-500"/>
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
                    :disabled="!Id_Permissions || !Name"
                    :style="{ backgroundColor: '#003566', borderColor: '#003566', color: '#ffffff' }" 
                />
            </div>
        </Form>

    </div>
</template>

