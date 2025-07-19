<template>
  <q-page padding>
    <q-card class="q-pa-md shadowBox" style="border-radius: 10px">
      <div class="text-primary text-weight-bolder" style="font-size: 2rem">
        Historias Clínicas del Paciente ({{ cedula }})
      </div>

      <q-separator class="q-my-md" v-if="historias.length === 0 && yaBuscado" />

      <div v-if="historias.length === 0 && yaBuscado" class="text-negative text-center q-mt-md">
        No se encontraron historias clínicas para esta cédula.
      </div>

      <q-list bordered separator v-else>
        <q-item v-for="historia in historias" :key="historia.id">
          <q-item-section>
            <q-item-label class="text-bold">{{ historia.motivo_consulta }}</q-item-label>
            <q-item-label caption>
              Doctor: {{ historia.doctor?.nombre }} | Fecha:
              {{ formatDate(historia.fecha_registro) }}
            </q-item-label>
            <q-item-label caption class="q-mt-xs">
              Diagnóstico: {{ historia.diagnostico }}<br />
              Tratamiento: {{ historia.tratamiento }}<br />
              Observaciones: {{ historia.observaciones }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePacientesStore } from 'src/stores/pacientes-store'
import { date } from 'quasar'

const route = useRoute()
const cedula = route.params.cedula || ''
const yaBuscado = ref(false)
const historias = ref([])

const pacientesStore = usePacientesStore()

const buscarHistorias = async () => {
  yaBuscado.value = true
  historias.value = []
  try {
    await pacientesStore.cargarHistoriasClinicas(cedula)
    historias.value = pacientesStore.historiasPaciente
  } catch (error) {
    console.error('Error al buscar historias:', error)
  }
}

onMounted(() => {
  if (cedula) {
    buscarHistorias()
  }
})

const formatDate = (fechaISO) => {
  return date.formatDate(fechaISO, 'DD/MM/YYYY HH:mm')
}
</script>

<style scoped>
.text-bold {
  font-weight: bold;
}
</style>
