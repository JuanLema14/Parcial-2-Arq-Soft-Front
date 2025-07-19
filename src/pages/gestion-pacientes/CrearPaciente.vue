<template>
  <q-page padding>
    <q-card class="shadowBox" style="border-radius: 10px">
      <q-card-section>
        <div class="text-primary text-weight-bolder" style="font-size: 2rem">
          Registrar nuevo paciente
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <PacienteForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import PacienteForm from 'src/components/gestion-pacientes/FormularioPacientes.vue'
</script>
