<template>
  <q-page padding>
    <q-card class="shadowBox" style="border-radius: 10px">
      <q-card-section>
        <div class="text-primary text-weight-bolder" style="font-size: 2rem">
          Registrar nueva historia clínica
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <HistoriaClinicaForm @submit="crearHistoria" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHistoriasStore } from 'stores/historias-store'
import HistoriaClinicaForm from 'src/components/gestion-historias/FormularioHistorias.vue'

const router = useRouter()
const historiasStore = useHistoriasStore()

async function crearHistoria(data) {
  try {
    await historiasStore.agregarHistoria(data)
    router.push('/pacientes')
  } catch (error) {
    console.error('Error al crear historia clínica', error)
  }
}
</script>
