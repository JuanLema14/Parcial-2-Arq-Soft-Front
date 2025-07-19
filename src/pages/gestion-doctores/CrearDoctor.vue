<template>
  <q-page padding>
    <q-card class="shadowBox" style="border-radius: 10px">
      <q-card-section>
        <div class="text-primary text-weight-bolder" style="font-size: 2rem">
          Registrar nuevo doctor
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <DoctorForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import DoctorForm from 'src/components/gestion-doctores/FormularioDoctores.vue'
</script>
