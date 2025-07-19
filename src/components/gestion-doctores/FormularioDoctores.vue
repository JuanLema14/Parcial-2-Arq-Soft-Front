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
          v-model="form.especialidad"
          label="Especialidad"
          :rules="[(val) => !!val || 'Requerido']"
          filled
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="form.telefono" label="Teléfono" filled />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="form.email" label="Email" type="email" filled />
      </div>
    </div>

    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Cancelar" flat @click="cancelar" />
      <q-btn :label="editando ? 'Actualizar' : 'Guardar'" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDoctoresStore } from 'src/stores/doctores-store'

const doctoresStore = useDoctoresStore()
const route = useRoute()
const router = useRouter()

const editando = ref(false)

const form = ref({
  id: null,
  cedula: '',
  nombre: '',
  especialidad: '',
  telefono: '',
  email: '',
})

onMounted(async () => {
  if (route.params.cedula) {
    editando.value = true
    const data = await doctoresStore.consultarDoctorPorCedula(route.params.cedula)
    Object.assign(form.value, data)
  }
})

async function handleSubmit() {
  try {
    if (editando.value) {
      await doctoresStore.actualizarDoctor(form.value)
    } else {
      await doctoresStore.agregarDoctor(form.value)
    }

    router.push('/doctores')
  } catch (error) {
    console.error('Error guardando doctor:', error)
  }
}

function cancelar() {
  router.push('/doctores')
}
</script>
