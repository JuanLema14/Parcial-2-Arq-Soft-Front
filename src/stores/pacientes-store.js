import { defineStore } from 'pinia'
import { axiosInstance } from '../boot/axios'
import { computed, ref } from 'vue'

// Rutas de la API (debes ajustarlas según tu backend)
const RUTA_PACIENTES = '/pacientes'
const RUTA_PACIENTES_AGREGAR = '/pacientes'
const RUTA_PACIENTES_ACTUALIZAR = '/pacientes'
const RUTA_CONSULTAR_PACIENTE = '/pacientes'
const RUTA_HISTORIAS_CLINICAS_PACIENTE = '/pacientes'

export const usePacientesStore = defineStore('pacientesStore', () => {
  const pacientesRecords = ref([])
  const historiasPaciente = ref([])

  async function cargarPacientes() {
    try {
      const params = {
        params: {},
      }

      const response = await axiosInstance.get(RUTA_PACIENTES, params)

      if (response.data['_embedded']) {
        pacientesRecords.value = response.data['_embedded']['pacienteDtoes']
        return true
      } else {
        throw new Error('No se pudieron cargar los pacientes')
      }
    } catch (error) {
      console.error('Error cargando pacientes:', error)
      throw error
    }
  }

  async function agregarPaciente(pacienteData) {
    try {
      const response = await axiosInstance.post(RUTA_PACIENTES_AGREGAR, pacienteData)

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo agregar el paciente')
      }
    } catch (error) {
      console.error('Error agregando paciente:', error)
      throw error
    }
  }

  async function actualizarPaciente(pacienteData) {
    try {
      const response = await axiosInstance.put(
        `${RUTA_PACIENTES_ACTUALIZAR}/${pacienteData.id}`,
        pacienteData,
      )

      if (response.data) {
        return response.data
      } else {
        throw new Error('No se pudo actualizar el paciente')
      }
    } catch (error) {
      console.error('Error actualizando paciente:', error)
      throw error
    }
  }

  async function consultarPacientePorCedula(cedula) {
    try {
      const response = await axiosInstance.get(`${RUTA_CONSULTAR_PACIENTE}/cedula/${cedula}`)

      if (response.data) {
        currentPaciente.value = response.data
        return response.data
      } else {
        throw new Error('No se pudo consultar el paciente')
      }
    } catch (error) {
      console.error('Error consultando paciente:', error)
      throw error
    }
  }

  async function cargarHistoriasClinicas(pacienteCedula = null) {
    try {
      const response = await axiosInstance.get(
        `${RUTA_HISTORIAS_CLINICAS_PACIENTE}/${pacienteCedula}/historias-clinicas`,
      )

      if (response.data) {
        historiasPaciente.value = response.data['historias_clinicas']
        return true
      } else {
        throw new Error('No se pudieron cargar las historias clínicas del paciente')
      }
    } catch (error) {
      console.error('Error cargando historias clínicas:', error)
      throw error
    }
  }

  // ========== RESET STORE ==========
  function reset() {
    pacientesRecords.value = []
    historiasPaciente.value = []
  }

  return {
    // Estado
    historiasPaciente,
    pacientesRecords,

    // Métodos Pacientes
    cargarPacientes,
    agregarPaciente,
    actualizarPaciente,
    consultarPacientePorCedula,

    // Métodos Historias Clínicas
    cargarHistoriasClinicas,

    // Utilitarios
    reset,
  }
})
