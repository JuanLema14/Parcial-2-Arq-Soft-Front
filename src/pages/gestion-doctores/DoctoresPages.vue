<template>
  <q-page padding>
    <DynamicTable
      entity-type="doctor"
      :data="doctores"
      :loading="loading"
      @view="onViewDoctor"
      @edit="onEditDoctor"
      @delete="onDeleteDoctor"
    />
  </q-page>
</template>

<script setup>
import { useDoctoresStore } from 'stores/doctores-store'
import { computed, onMounted, ref } from 'vue'
import DynamicTable from 'components/DynamicTable.vue'

const doctoresStore = useDoctoresStore()
const doctores = computed({
  get: () => doctoresStore.doctoresRecords,
})
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    await doctoresStore.cargarDoctores()
  } finally {
    loading.value = false
  }
})

const onViewDoctor = (doctor) => {
  console.log('Ver doctor:', doctor)
}

const onEditDoctor = (doctor) => {
  console.log('Editar doctor:', doctor)
}

const onDeleteDoctor = (doctor) => {
  // Mostrar confirmación y eliminar
  console.log('Eliminar doctor:', doctor)
}
</script>
