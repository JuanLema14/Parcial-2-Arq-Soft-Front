<template>
  <q-page padding>
    <div class="row">
      <q-card
        class="col-lg-8 col-md-8 col-sm-8 col-xs-8 q-pa-md bg-transparent"
        flat
      >
        <q-img
          src="~assets/bienvenida.png"
          class="sectionShadow"
          style="border-radius: 60px"
        />
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const nombreUsuario = ref("Dr.Example");
const especializacion = ref("Cardiologo");
</script>

<style scoped>
.sectionShadow {
  -webkit-box-shadow: -1px 14px 24px -5px rgba(57, 66, 196, 0.5);
  box-shadow: -1px 14px 24px -5px rgba(11, 19, 138, 0.2);
}
</style>
