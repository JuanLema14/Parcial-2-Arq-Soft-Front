<template>
  <q-page padding>
    <DynamicTable
      entity-type="paciente"
      :data="pacientes"
      :loading="loading"
      @view="onViewPaciente"
      @edit="onEditPaciente"
      @delete="onDeletePaciente"
      @add-history="onAddHistoria"
      @view-histories="onViewHistorias"
    />
  </q-page>
</template>

<script setup>
import { usePacientesStore } from 'stores/pacientes-store'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DynamicTable from 'components/DynamicTable.vue'

const pacientesStore = usePacientesStore()
const router = useRouter()
const loading = ref(false)

const pacientes = computed(() => pacientesStore.pacientesRecords)

onMounted(async () => {
  loading.value = true
  try {
    await pacientesStore.cargarPacientes()
  } finally {
    loading.value = false
  }
})

const onViewPaciente = (paciente) => {
  router.push(`/pacientes/${paciente.cedula}`)
}

const onEditPaciente = (paciente) => {
  router.push(`/pacientes/editar/${paciente.cedula}`)
}

const onDeletePaciente = async (paciente) => {
  // Mostrar confirmación y eliminar
}

const onAddHistoria = (paciente) => {
  router.push(`/pacientes/${paciente.cedula}/historias/nueva`)
}

const onViewHistorias = (paciente) => {
  router.push(`/pacientes/${paciente.cedula}/historias`)
}
</script>
