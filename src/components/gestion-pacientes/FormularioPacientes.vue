<template>
  <q-form @submit="handleSubmit" class="q-gutter-md q-ma-sm">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.nombre"
          label="Nombre"
          :rules="[(val) => !!val || 'Requerido']"
          filled
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="form.cedula"
          label="Cédula"
          :rules="[(val) => !!val || 'Requerido']"
          filled
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model.number="form.edad"
          type="number"
          label="Edad"
          :rules="[(val) => val >= 0 || 'Debe ser mayor o igual a 0']"
          filled
        />
      </div>

      <div class="col-12 col-md-6">
        <q-select
          v-model="form.genero"
          :options="['Masculino', 'Femenino', 'Otro']"
          label="Género"
          emit-value
          map-options
          filled
          :rules="[(val) => !!val || 'Requerido']"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="form.telefono" label="Teléfono" filled />
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="form.email" label="Email" type="email" filled />
      </div>

      <div class="col-12 col-md-6">
        <q-input v-model="form.direccion" label="Dirección" filled />
      </div>
    </div>

    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Cancelar" flat @click="cancelar" />
      <q-btn :label="editando ? 'Actualizar' : 'Guardar'" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePacientesStore } from 'src/stores/pacientes-store'

const pacientesStore = usePacientesStore()
const route = useRoute()
const router = useRouter()

const editando = ref(false)

const form = ref({
  id: null,
  nombre: '',
  cedula: '',
  edad: null,
  genero: '',
  telefono: '',
  email: '',
  direccion: '',
})

onMounted(async () => {
  if (route.params.cedula) {
    editando.value = true
    const data = await pacientesStore.consultarPacientePorCedula(route.params.cedula)
    Object.assign(form.value, data)
  }
})

async function handleSubmit() {
  try {
    if (editando.value) {
      await pacientesStore.actualizarPaciente(form.value)
    } else {
      await pacientesStore.agregarPaciente(form.value)
    }

    router.push('/pacientes')
  } catch (error) {
    console.error('Error guardando paciente:', error)
  }
}

function cancelar() {
  router.push('/pacientes')
}
</script>
