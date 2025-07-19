import { defineStore } from 'pinia'
import { axiosInstance } from '../boot/axios'
import { ref } from 'vue'

const RUTA_HISTORIAS = '/historias-clinicas'
const RUTA_HISTORIAS_AGREGAR = '/historias-clinicas'
const RUTA_HISTORIAS_ACTUALIZAR = '/historias-clinicas'
const RUTA_CONSULTAR_HISTORIA = '/historias-clinicas'

export const useHistoriasStore = defineStore('historiasStore', () => {
  const historiasRecords = ref([])
  const historiaActual = ref(null)

  async function cargarHistorias() {
    try {
      const response = await axiosInstance.get(RUTA_HISTORIAS)

      if (response.data) {
        historiasRecords.value = response.data
        return true
      } else {
        throw new Error('No se pudieron cargar las historias clínicas')
      }
    } catch (error) {
      console.error('Error cargando historias:', error)
      throw error
    }
  }

  async function agregarHistoria(historiaData, medicoData) {
    try {
      const dataCompleta = {
        ...historiaData,
        medico: medicoData,
        fechaRegistro: new Date().toISOString(),
      }

      const response = await axiosInstance.post(RUTA_HISTORIAS_AGREGAR, dataCompleta)

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo agregar la historia clínica')
      }
    } catch (error) {
      console.error('Error agregando historia:', error)
      throw error
    }
  }

  async function actualizarHistoria(historiaData) {
    try {
      const response = await axiosInstance.put(
        `${RUTA_HISTORIAS_ACTUALIZAR}/${historiaData.id}`,
        historiaData,
      )

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo actualizar la historia clínica')
      }
    } catch (error) {
      console.error('Error actualizando historia:', error)
      throw error
    }
  }

  async function consultarHistoria(historiaId) {
    try {
      const response = await axiosInstance.get(`${RUTA_CONSULTAR_HISTORIA}/${historiaId}`)

      if (response.data) {
        historiaActual.value = response.data
        return response.data
      } else {
        throw new Error('No se pudo consultar la historia clínica')
      }
    } catch (error) {
      console.error('Error consultando historia:', error)
      throw error
    }
  }

  function reset() {
    historiasRecords.value = []
    historiaActual.value = null
  }

  return {
    // Estado
    historiasRecords,
    historiaActual,

    // Métodos
    cargarHistorias,
    agregarHistoria,
    actualizarHistoria,
    consultarHistoria,

    // Utilitarios
    reset,
  }
})
