
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import { DataTable } from 'simple-datatables';

const searchTable = ref('');
const breadcrumbOption = ref([
    {
        router: '/Hola',
        title: 'Project',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Daka',
        disabledOption: true
    },
]);

onMounted(() => {
    initFlowbite();

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
})

</script>

<template>
    <Breadcrumb :data="breadcrumbOption"/>

    <div class="about">
        <h3 class="text-3xl font-bold mt-5 dark:text-white">Maestro de Usuarios</h3>
        
        <div class="border border-gray-200 rounded-lg p-5 mt-4 dark:border-gray-700">
            <table ref="searchTable">
                <thead>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <th>
                            <span class="flex items-center">
                                Name
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Category
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Brand
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Price
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Stock
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Total Sales
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span class="flex items-center">
                                Status
                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4"/>
                                </svg>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iMac</td>
                        <td>Computers</td>
                        <td>Apple</td>
                        <td>$1,299</td>
                        <td>50</td>
                        <td>200</td>
                        <td>In Stock</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iPhone</td>
                        <td>Mobile Phones</td>
                        <td>Apple</td>
                        <td>$999</td>
                        <td>120</td>
                        <td>300</td>
                        <td>In Stock</td>
                    </tr>
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Samsung Galaxy</td>
                        <td>Mobile Phones</td>
                        <td>Samsung</td>
                        <td>$899</td>
                        <td>80</td>
                        <td>150</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Dell XPS 13</td>
                        <td>Computers</td>
                        <td>Dell</td>
                        <td>$1,099</td>
                        <td>30</td>
                        <td>120</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">HP Spectre x360</td>
                        <td>Computers</td>
                        <td>HP</td>
                        <td>$1,299</td>
                        <td>25</td>
                        <td>80</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Google Pixel 6</td>
                        <td>Mobile Phones</td>
                        <td>Google</td>
                        <td>$799</td>
                        <td>100</td>
                        <td>200</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Sony WH-1000XM4</td>
                        <td>Headphones</td>
                        <td>Sony</td>
                        <td>$349</td>
                        <td>60</td>
                        <td>150</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple AirPods Pro</td>
                        <td>Headphones</td>
                        <td>Apple</td>
                        <td>$249</td>
                        <td>200</td>
                        <td>300</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Asus ROG Zephyrus</td>
                        <td>Computers</td>
                        <td>Asus</td>
                        <td>$1,899</td>
                        <td>15</td>
                        <td>50</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Microsoft Surface Pro 7</td>
                        <td>Computers</td>
                        <td>Microsoft</td>
                        <td>$899</td>
                        <td>40</td>
                        <td>100</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Samsung QLED TV</td>
                        <td>Televisions</td>
                        <td>Samsung</td>
                        <td>$1,299</td>
                        <td>25</td>
                        <td>70</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">LG OLED TV</td>
                        <td>Televisions</td>
                        <td>LG</td>
                        <td>$1,499</td>
                        <td>20</td>
                        <td>50</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Canon EOS R5</td>
                        <td>Cameras</td>
                        <td>Canon</td>
                        <td>$3,899</td>
                        <td>10</td>
                        <td>30</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Nikon Z7 II</td>
                        <td>Cameras</td>
                        <td>Nikon</td>
                        <td>$3,299</td>
                        <td>8</td>
                        <td>25</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Watch Series 7</td>
                        <td>Wearables</td>
                        <td>Apple</td>
                        <td>$399</td>
                        <td>150</td>
                        <td>500</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Fitbit Charge 5</td>
                        <td>Wearables</td>
                        <td>Fitbit</td>
                        <td>$179</td>
                        <td>100</td>
                        <td>250</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Dyson V11 Vacuum</td>
                        <td>Home Appliances</td>
                        <td>Dyson</td>
                        <td>$599</td>
                        <td>30</td>
                        <td>90</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">iRobot Roomba i7+</td>
                        <td>Home Appliances</td>
                        <td>iRobot</td>
                        <td>$799</td>
                        <td>20</td>
                        <td>70</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Bose SoundLink Revolve</td>
                        <td>Speakers</td>
                        <td>Bose</td>
                        <td>$199</td>
                        <td>80</td>
                        <td>200</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Sonos One</td>
                        <td>Speakers</td>
                        <td>Sonos</td>
                        <td>$219</td>
                        <td>60</td>
                        <td>180</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iPad Pro</td>
                        <td>Tablets</td>
                        <td>Apple</td>
                        <td>$1,099</td>
                        <td>50</td>
                        <td>150</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Samsung Galaxy Tab S7</td>
                        <td>Tablets</td>
                        <td>Samsung</td>
                        <td>$649</td>
                        <td>70</td>
                        <td>130</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Amazon Echo Dot</td>
                        <td>Smart Home</td>
                        <td>Amazon</td>
                        <td>$49</td>
                        <td>300</td>
                        <td>800</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Google Nest Hub</td>
                        <td>Smart Home</td>
                        <td>Google</td>
                        <td>$89</td>
                        <td>150</td>
                        <td>400</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">PlayStation 5</td>
                        <td>Gaming Consoles</td>
                        <td>Sony</td>
                        <td>$499</td>
                        <td>10</td>
                        <td>500</td>
                        <td>Out of Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Xbox Series X</td>
                        <td>Gaming Consoles</td>
                        <td>Microsoft</td>
                        <td>$499</td>
                        <td>15</td>
                        <td>450</td>
                        <td>Out of Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Nintendo Switch</td>
                        <td>Gaming Consoles</td>
                        <td>Nintendo</td>
                        <td>$299</td>
                        <td>40</td>
                        <td>600</td>
                        <td>In Stock</td>
                    </tr>
                     <tr class="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td class="font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple MacBook Pro</td>
                        <td>Computers</td>
                        <td>Apple</td>
                        <td>$1,299</td>
                        <td>20</td>
                        <td>100</td>
                        <td>In Stock</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


