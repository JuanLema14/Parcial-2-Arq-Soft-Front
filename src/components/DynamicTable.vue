<template>
  <q-card class="shadowBox" style="border-radius: 10px">
    <q-card-section>
      <div class="text-primary text-weight-bolder" style="font-size: 2rem">{{ title }}</div>
      <div class="text-subtitle2 text-weight-medium text-grey-7">{{ description }}</div>

      <q-btn
        v-if="entityType !== 'historia'"
        :label="`Nuevo ${entityTypeLabel}`"
        color="primary"
        icon="add"
        @click="crearEntidad"
        unelevated
        class="q-ml-md"
      />
    </q-card-section>

    <q-table
      :rows="data"
      :columns="columns"
      :loading="loading"
      :pagination.sync="pagination"
      row-key="id"
      class="q-pa-md"
    >
      <!-- Slot para personalizar celdas -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-dropdown color="primary" icon="more_vert" size="sm" flat dense>
            <q-list>
              <!-- Acciones dinámicas según el tipo de entidad -->
              <q-item
                v-for="action in entityActions"
                :key="action.label"
                clickable
                v-close-popup
                @click="handleAction(action.event, props.row)"
              >
                <q-item-section avatar>
                  <q-icon :name="action.icon" />
                </q-item-section>
                <q-item-section>{{ action.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>

      <!-- Slot para personalizar campos especiales -->
      <template v-slot:body-cell-fechaRegistro="props">
        <q-td :props="props">
          {{ formatDate(props.value) }}
        </q-td>
      </template>

      <template v-slot:body-cell-historiasClinicas="props">
        <q-td :props="props">
          <q-badge color="info"> {{ props.value ? props.value.length : 0 }} historias </q-badge>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  entityType: {
    type: String,
    required: true,
    validator: (value) => ['doctor', 'paciente', 'historia'].includes(value),
  },
  data: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['view', 'edit', 'delete', 'add-history', 'view-histories'])

const pagination = ref({
  sortBy: 'nombre',
  descending: false,
  page: 1,
  rowsPerPage: 10,
})

const tableConfig = computed(() => {
  const configs = {
    doctor: {
      title: 'Listado de Doctores',
      description: 'Médicos registrados en el sistema',
      columns: [
        { name: 'cedula', label: 'Cédula', field: 'cedula', align: 'left', sortable: true },
        { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
        {
          name: 'especialidad',
          label: 'Especialidad',
          field: 'especialidad',
          align: 'left',
          sortable: true,
        },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'telefono', label: 'Teléfono', field: 'telefono', align: 'left' },
        {
          name: 'historiasClinicas',
          label: 'Historias',
          field: (row) => row.historiasClinicas?.length || 0,
          align: 'center',
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
      ],
      actions: [
        { label: 'Ver Detalle', icon: 'visibility', event: 'view' },
        { label: 'Editar', icon: 'edit', event: 'edit' },
        { label: 'Eliminar', icon: 'delete', event: 'delete' },
      ],
    },
    paciente: {
      title: 'Listado de Pacientes',
      description: 'Pacientes registrados en el sistema',
      columns: [
        { name: 'cedula', label: 'Cédula', field: 'cedula', align: 'left', sortable: true },
        { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
        { name: 'edad', label: 'Edad', field: 'edad', align: 'center', sortable: true },
        { name: 'genero', label: 'Género', field: 'genero', align: 'center' },
        { name: 'telefono', label: 'Teléfono', field: 'telefono', align: 'left' },
        {
          name: 'historiasClinicas',
          label: 'Historias',
          field: (row) => row.historiasClinicas?.length || 0,
          align: 'center',
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
      ],
      actions: [
        { label: 'Ver Detalle', icon: 'visibility', event: 'view' },
        { label: 'Editar', icon: 'edit', event: 'edit' },
        { label: 'Eliminar', icon: 'delete', event: 'delete' },
        { label: 'Agregar Historia', icon: 'note_add', event: 'add-history' },
        { label: 'Ver Historias', icon: 'medical_services', event: 'view-histories' },
      ],
    },
    historia: {
      title: 'Historias Clínicas',
      description: 'Registros médicos de pacientes',
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        {
          name: 'paciente',
          label: 'Paciente',
          field: (row) => row.paciente?.nombre,
          align: 'left',
          sortable: true,
        },
        {
          name: 'doctor',
          label: 'Médico',
          field: (row) => row.doctor?.nombre,
          align: 'left',
          sortable: true,
        },
        { name: 'motivoConsulta', label: 'Motivo', field: 'motivoConsulta', align: 'left' },
        {
          name: 'fechaRegistro',
          label: 'Fecha',
          field: 'fechaRegistro',
          align: 'left',
          sortable: true,
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
      ],
      actions: [
        { label: 'Ver Detalle', icon: 'visibility', event: 'view' },
        { label: 'Editar', icon: 'edit', event: 'edit' },
        { label: 'Eliminar', icon: 'delete', event: 'delete' },
      ],
    },
  }
  return configs[props.entityType] || configs.doctor
})

const entityTypeLabel = computed(() => {
  switch (props.entityType) {
    case 'doctor':
      return 'Doctor'
    case 'paciente':
      return 'Paciente'
    default:
      return 'Entidad'
  }
})

function crearEntidad() {
  if (props.entityType === 'doctor') {
    router.push('/doctores/crear')
  } else if (props.entityType === 'paciente') {
    router.push('/pacientes/crear')
  }
}

const title = computed(() => tableConfig.value.title)
const description = computed(() => tableConfig.value.description)
const columns = computed(() => tableConfig.value.columns)
const entityActions = computed(() => tableConfig.value.actions)

const formatDate = (dateString) => {
  if (!dateString) return ''
  return date.formatDate(dateString, 'DD/MM/YYYY HH:mm')
}

const handleAction = (action, row) => {
  emit(action, row)
}
</script>

<style lang="scss"></style>
