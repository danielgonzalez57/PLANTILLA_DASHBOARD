
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import axios from 'axios';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Select from 'primevue/select';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

// Toast
import { useToast } from "primevue/usetoast";
const toast = useToast();
const confirm = useConfirm();
const editDialogVisible = ref(false); 
const selectedUser = ref({ ID_User:0,  Nombre: '', Email: '', Departament: 0, ID_Rol: 0 })
const users = ref();
const roles = ref();
const departament = ref();
const dataBaseUrl = `${import.meta.env.VITE_URL}/users`;
const dataBaseUrlRol = `${import.meta.env.VITE_URL}/rol`;
const dataBaseUrlDepartament = `${import.meta.env.VITE_URL}/departament`;
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const breadcrumbOption = ref([
    {
        router: '#',
        title: 'Maestro de usuarios',
        disabledOption: true
    }
]);




const getUser = async () => {
  try{
      const response = await axios.get(`${dataBaseUrl}/masterUser`);
      users.value = response.data[0]
      
  } catch(error){
      console.log(error)
  }
}

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

const DeleteUser = async (item: any) => {
  try{
      const response = await axios.delete(`${dataBaseUrl}/deleteUser/${item}`);
      users.value = response.data 
      
  } catch(error){
      console.log(error);
  }
}

const confirmDelete = (item: any) => { 
    
    confirm.require({
        message: 'Desea Eliminar este usuario?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'danger',
            size:'small'
        },
        acceptProps: {
            label: 'Eliminar',
            severity: 'contrast',
            size:'small',
            icon:'pi pi-check',
            iconPos:'right'
        },
        accept: async () => {
            await DeleteUser(item.ID_User);
            toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Usuario Eliminado!', life: 3000 }); 
            await getUser();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'No se borro el usuario', life: 3000 });
        }
    });
};

onMounted(async () => {
    await getUser()
    await getRol()
    await getDepartament()
    initFlowbite();
})

interface User { ID_User: number; Nombre: string; Email: string; Departament: number; ID_Rol: number }

const editUser = ( item: User) => {
    selectedUser.value = { ...item }; 
    editDialogVisible.value = true; 
};

const saveUser = async () => {
    try { 
        
        const userUpdate = {
            Nombre: selectedUser.value.Nombre,
            Email: selectedUser.value.Email,
            ID_Rol: selectedUser.value.ID_Rol,
            Departament: selectedUser.value.Departament,
        }
        
        await axios.put(`${dataBaseUrl}/updateUser/${selectedUser.value.ID_User}`, userUpdate); 
        editDialogVisible.value = false; 
        toast.add({ severity: 'success', summary: 'Guardado', detail: 'Usuario actualizado!', life: 3000 });
        await getUser();
    } catch (error) {
        console.log(error);
    } 
};

</script>

<template>
    <Toast />
    <Breadcrumb :data="breadcrumbOption" />
    <h3 class="text-3xl font-bold mt-5 dark:text-white mb-7">Maestro de Usuarios</h3>

    <div class="rounded-lg overflow-hidden border border-gray-200">
        <DataTable 
            ref="dt" 
            :value="users"   
            stripedRows
            dataKey="Email" 
            :paginator="true" 
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        >
            <template #header>
                <div class="flex flex-wrap gap-3 align-items-center justify-content-between">
                
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar" size="small"/>
                    </IconField>

                    <Button 
                        as="router-link" 
                        label="Nuevo usuario"
                        icon="pi pi-plus" 
                        raised 
                        class="mr-2 mb-1" 
                        severity="contrast"
                        size="small" 
                        to="/formUser" 
                    />
                </div>
            </template>

            <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
            <Column field="ID_User" header="#"  ></Column>
            <Column field="Nombre" header="Nombre" sortable ></Column>
            <Column field="Email" header="Email" sortable ></Column>
            <Column field="Departamentos" header="Departamento" sortable ></Column>
            <Column field="Rol" header="Rol" sortable >
                <template #body="slotProps">
                    <Tag :value="slotProps.data.Rol"  :style="{ backgroundColor: '#003566', borderColor: '#003566', color: '#ffffff' }"  rounded icon="pi pi-cog"/>
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem" >
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" variant="text" rounded severity="info" class="mr-2"  @click="editUser(slotProps.data)"/>
                    <Button icon="pi pi-trash" variant="text" rounded severity="danger" @click="confirmDelete(slotProps.data)"/>
                </template>
            </Column>
        </DataTable>
        <ConfirmDialog />

        <!-- -------------------------------------------------------- Update user ------------------------------------------------------- -->
        <Dialog 
            modal
            header="Editar Usuario"
            v-model:visible="editDialogVisible"
            :style="{ width: '35rem' }"> 

            <div class="card flex flex-wrap gap-4 w-full mb-4">
                <div class="flex flex-col gap-2 flex-1">
                    <label for="name" class="font-semibold w-24">Nombre</label>
                    <InputText 
                        id="name" 
                        class="flex-auto" 
                        v-model="selectedUser.Nombre" 
                        autocomplete="off" 
                        size="small"
                    />
                </div>

                <div class="flex flex-col gap-2 flex-1">
                    <label for="email" class="font-semibold w-24">Email</label>
                    <InputText 
                        id="email" 
                        class="flex-auto" 
                        v-model="selectedUser.Email" 
                        autocomplete="off" 
                        size="small"
                    />
                </div>
            </div>

            <div class="card flex flex-wrap gap-4 w-full mb-3">
                <div class="flex flex-col gap-2 flex-1">
                    <label for="departament" class="font-semibold w-24">Departamento</label>
                    <Select 
                            v-model="selectedUser.Departament"
                            id="departament" 
                            showClear 
                            :options="departament"
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Selecciona el departamento"
                            size="small"
                        />
                </div>

                <div class="flex flex-col gap-2 flex-1">
                    <label for="rol" class="font-semibold w-24">Tipo de Rol</label>
                    <Select 
                            v-model="selectedUser.ID_Rol"
                            id="rol" 
                            :options="roles"
                            optionLabel="name"
                            optionValue="id"
                            showClear 
                            placeholder="Selecciona el rol"
                            size="small"
                        />
                </div>
            </div>

            <template #footer> 
                <Button 
                    label="Cancelar" 
                    size="small" 
                    @click="editDialogVisible = false" 
                    severity="danger"
                /> 

                <Button 
                    label="Guardar"
                    icon="pi pi-check"
                    size="small" 
                    @click="saveUser" 
                    severity="contrast"
                /> 
            </template> 
        </Dialog>
        <!-- -------------------------------------------------------- Update user ------------------------------------------------------- -->
    </div>
</template>




