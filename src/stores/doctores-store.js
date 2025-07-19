import { defineStore } from 'pinia'
import { axiosInstance } from '../boot/axios'
import { ref } from 'vue'

const RUTA_DOCTORES = '/doctores'
const RUTA_DOCTORES_AGREGAR = '/doctores'
const RUTA_DOCTORES_ACTUALIZAR = '/doctores'
const RUTA_CONSULTAR_DOCTOR = '/doctores'

export const useDoctoresStore = defineStore('doctoresStore', () => {
  const doctoresRecords = ref([])
  const doctorActual = ref(null)
  const especialidades = ref([])

  async function cargarDoctores() {
    try {
      const response = await axiosInstance.get(RUTA_DOCTORES)

      if (response.data['_embedded']) {
        doctoresRecords.value = response.data['_embedded']['doctorDtoes']
        return true
      } else {
        throw new Error('No se pudieron cargar los doctores')
      }
    } catch (error) {
      console.error('Error cargando doctores:', error)
      throw error
    }
  }

  async function cargarDoctoresPorEspecialidad(especialidad) {
    try {
      const response = await axiosInstance.get(`${RUTA_DOCTORES_POR_ESPECIALIDAD}/${especialidad}`)

      if (response.data) {
        doctoresRecords.value = response.data
        return true
      } else {
        throw new Error('No se pudieron cargar los doctores de esta especialidad')
      }
    } catch (error) {
      console.error('Error cargando doctores por especialidad:', error)
      throw error
    }
  }

  async function agregarDoctor(doctorData) {
    try {
      const response = await axiosInstance.post(RUTA_DOCTORES_AGREGAR, doctorData)

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo registrar el doctor')
      }
    } catch (error) {
      console.error('Error agregando doctor:', error)
      throw error
    }
  }

  async function actualizarDoctor(doctorData) {
    try {
      const response = await axiosInstance.put(
        `${RUTA_DOCTORES_ACTUALIZAR}/${doctorData.id}`,
        doctorData,
      )

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo actualizar el doctor')
      }
    } catch (error) {
      console.error('Error actualizando doctor:', error)
      throw error
    }
  }

  async function consultarDoctorPorCedula(cedula) {
    try {
      const response = await axiosInstance.get(`${RUTA_CONSULTAR_DOCTOR}/cedula/${cedula}`)

      if (response.data) {
        doctorActual.value = response.data
        return response.data
      } else {
        throw new Error('No se pudo consultar el doctor')
      }
    } catch (error) {
      console.error('Error consultando doctor por cédula:', error)
      throw error
    }
  }

  function reset() {
    doctoresRecords.value = []
    doctorActual.value = null
  }

  return {
    // Estado
    doctoresRecords,
    doctorActual,
    especialidades,

    // Métodos
    cargarDoctores,
    cargarDoctoresPorEspecialidad,
    agregarDoctor,
    actualizarDoctor,
    consultarDoctorPorCedula,

    // Utilitarios
    reset,
  }
})
