<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md q-ma-md">
    <div class="row q-col-gutter-md">
      <!-- Paciente -->
      <div class="col-12 col-md-6">
        <q-input v-model="pacienteNombre" label="Paciente" filled dense readonly />
      </div>

      <!-- Doctor -->
      <div v-if="!editando" class="col-12 col-md-6">
        <q-input
          v-model="doctorCedula"
          label="Buscar Doctor por Cédula"
          filled
          dense
          @blur="buscarDoctorPorCedula"
          debounce="300"
        />
        <q-select
          v-model="formData.doctor_cedula"
          :options="doctoresOptions"
          label="Seleccionar Doctor"
          option-label="nombre"
          option-value="cedula"
          filled
          dense
          emit-value
          map-options
          :rules="[(val) => !!val || 'Requerido']"
        />
      </div>

      <div v-else class="col-12 col-md-6">
        <q-select
          v-model="formData.doctor_cedula"
          :options="doctoresOptions"
          label="Doctor"
          option-label="nombre"
          option-value="cedula"
          filled
          dense
          emit-value
          map-options
          disable
        />
      </div>

      <!-- Motivo consulta -->
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.motivo_consulta"
          label="Motivo de consulta"
          type="textarea"
          filled
          dense
          autogrow
          :rules="[(val) => !!val || 'Requerido']"
        />
      </div>

      <!-- Diagnóstico -->
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.diagnostico"
          label="Diagnóstico"
          type="textarea"
          filled
          dense
          autogrow
        />
      </div>

      <!-- Tratamiento -->
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.tratamiento"
          label="Tratamiento"
          type="textarea"
          filled
          dense
          autogrow
        />
      </div>

      <!-- Observaciones -->
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.observaciones"
          label="Observaciones"
          type="textarea"
          filled
          dense
          autogrow
        />
      </div>
    </div>

    <!-- Botones -->
    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Cancelar" flat @click="cancelar" />
      <q-btn label="Guardar" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDoctoresStore } from 'stores/doctores-store'
import { usePacientesStore } from 'stores/pacientes-store'

const emit = defineEmits(['submit'])

const props = defineProps({
  initialData: Object,
})

const route = useRoute()
const router = useRouter()
const editando = ref(false)

const doctorCedula = ref('')
const doctoresOptions = ref([])
const pacienteNombre = ref('')

const doctoresStore = useDoctoresStore()
const pacientesStore = usePacientesStore()

const formData = ref({
  paciente_cedula: null,
  doctor_cedula: null,
  motivo_consulta: '',
  diagnostico: '',
  tratamiento: '',
  observaciones: '',
})

onMounted(async () => {
  await doctoresStore.cargarDoctores()
  doctoresOptions.value = doctoresStore.doctoresRecords

  const pacienteId = route.params.cedula
  formData.value.paciente_cedula = pacienteId

  await pacientesStore.cargarPacientes()
  const paciente = pacientesStore.pacientesRecords.find((p) => p.cedula === pacienteId)
  if (paciente) {
    pacienteNombre.value = paciente.nombre
  }

  if (props.initialData) {
    editando.value = true
    formData.value = { ...props.initialData }
  }
})

async function buscarDoctorPorCedula() {
  try {
    if (doctorCedula.value) {
      const doctor = await doctoresStore.consultarDoctorPorCedula(doctorCedula.value)
      if (doctor) {
        formData.value.doctor_cedula = doctor.cedula
      }
    }
  } catch (err) {
    console.error('Doctor no encontrado', err)
  }
}

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      editando.value = true
      formData.value = { ...newVal }
    }
  },
  { immediate: true },
)

function cancelar() {
  router.push('/pacientes')
}

function handleSubmit() {
  emit('submit', formData.value)
}
</script>
