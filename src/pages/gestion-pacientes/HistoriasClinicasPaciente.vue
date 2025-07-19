<template>
  <q-page padding class="bg-grey-1">
    <q-card class="q-pa-md shadow-10" style="border-radius: 12px">
      <!-- Encabezado mejorado -->
      <div class="row items-center q-mb-md">
        <q-icon name="medical_services" size="md" color="primary" class="q-mr-sm" />
        <div class="text-primary text-weight-bold" style="font-size: 1.5rem">
          Historias Clínicas del Paciente
        </div>
        <q-chip color="teal" text-color="white" class="q-ml-md">
          <q-avatar icon="badge" color="white" text-color="teal" />
          {{ cedula }}
        </q-chip>
        <q-space />
        <q-btn
          color="primary"
          icon="refresh"
          label="Actualizar"
          @click="buscarHistorias"
          :loading="loading"
        />
      </div>

      <q-separator class="q-my-md" />

      <!-- Estado vacío -->
      <div
        v-if="historias.length === 0 && yaBuscado"
        class="column items-center q-pa-xl text-grey-7"
      >
        <q-icon name="folder_off" size="xl" class="q-mb-sm" />
        <div class="text-h6 q-mb-xs">No se encontraron historias clínicas</div>
        <div class="text-subtitle1">No hay registros médicos para esta cédula</div>
        <q-btn
          color="primary"
          label="Intentar nuevamente"
          outline
          class="q-mt-md"
          @click="buscarHistorias"
        />
      </div>

      <!-- Lista de historias -->
      <div v-else>
        <q-list bordered separator class="rounded-borders">
          <q-item
            v-for="historia in historias"
            :key="historia.id"
            class="q-my-sm bg-white"
            style="border-radius: 8px"
          >
            <q-item-section avatar>
              <q-avatar color="blue-1" text-color="primary" icon="note" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-primary">
                {{ historia.motivo_consulta }}
              </q-item-label>
              <q-item-label caption class="row items-center">
                <div class="row items-center q-mr-sm">
                  <q-icon name="person" size="xs" class="q-mr-xs" />
                  {{ historia.doctor?.nombre }}
                </div>
                <div class="row items-center">
                  <q-icon name="schedule" size="xs" class="q-mr-xs" />
                  {{ formatDate(historia.fecha_registro) }}
                </div>
              </q-item-label>

              <q-expansion-item
                dense
                switch-toggle-side
                expand-separator
                label="Ver detalles"
                class="q-mt-xs"
              >
                <q-card>
                  <q-card-section class="q-pt-none">
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <div class="text-caption text-grey-7">Diagnóstico</div>
                        <div class="text-body1">{{ historia.diagnostico || 'No especificado' }}</div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="text-caption text-grey-7">Tratamiento</div>
                        <div class="text-body1">{{ historia.tratamiento || 'No especificado' }}</div>
                      </div>
                      <div class="col-12">
                        <div class="text-caption text-grey-7">Observaciones</div>
                        <div class="text-body1">{{ historia.observaciones || 'Ninguna' }}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-item-section>

            <q-item-section side>
              <q-btn
                round
                flat
                color="grey-7"
                icon="more_vert"
                @click.stop
              >
                <q-menu auto-close>
                  <q-list style="min-width: 150px">
                    <q-item clickable @click="editarHistoria(historia)">
                      <q-item-section avatar>
                        <q-icon name="edit" />
                      </q-item-section>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable @click="imprimirHistoria(historia)">
                      <q-item-section avatar>
                        <q-icon name="print" />
                      </q-item-section>
                      <q-item-section>Imprimir</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="eliminarHistoria(historia)">
                      <q-item-section avatar>
                        <q-icon name="delete" color="negative" />
                      </q-item-section>
                      <q-item-section class="text-negative">Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Paginación -->
        <div class="row justify-center q-mt-md" v-if="historias.length > 0">
          <q-pagination
            v-model="pagination.page"
            :max="Math.ceil(historias.length / pagination.rowsPerPage)"
            :max-pages="6"
            direction-links
            boundary-links
            color="primary"
          />
        </div>
      </div>
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
const loading = ref(false)

const pagination = ref({
  page: 1,
  rowsPerPage: 5
})

const pacientesStore = usePacientesStore()

const buscarHistorias = async () => {
  yaBuscado.value = true
  loading.value = true
  historias.value = []
  try {
    await pacientesStore.cargarHistoriasClinicas(cedula)
    historias.value = pacientesStore.historiasPaciente
  } catch (error) {
    console.error('Error al buscar historias:', error)
  } finally {
    loading.value = false
  }
}

const editarHistoria = (historia) => {
  console.log('Editar historia:', historia)
  // Implementar lógica de edición
}

const imprimirHistoria = (historia) => {
  console.log('Imprimir historia:', historia)
  // Implementar lógica de impresión
}

const eliminarHistoria = (historia) => {
  console.log('Eliminar historia:', historia)
  // Implementar lógica de eliminación
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
.shadow-10 {
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
}

.q-item {
  transition: all 0.3s ease;
}

.q-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-expansion-item__container .q-item {
  padding-left: 0;
}
</style>
