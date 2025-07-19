<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Encabezado con tema médico -->
    <q-header class="bg-transparent q-pa-md">
      <q-toolbar class="bg-accent text-white" style="border-radius: 10px">
        <q-toolbar-title class="text-weight-bold"> Sistema de Historias Clínicas </q-toolbar-title>

        <q-space />

        <div class="q-mr-sm">Bienvenido de vuelta!</div>
        <q-btn flat round dense icon="account_circle">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Mi perfil</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Menú lateral -->
    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-transparent">
      <q-list padding class="bg-accent q-ma-md" style="border-radius: 10px">
        <div class="row flex q-mb-md" style="align-items: center; justify-content: center">
          <q-avatar square text-color="white" style="width: 2.3vmax; height: 2.3vmax">
            <q-img src="~assets/logo.png" />
          </q-avatar>
          <q-item-label header class="text-weight-bold text-primary">
            Navegación Principal
          </q-item-label>
        </div>

        <q-item clickable v-ripple to="/" exact active-class="q-router-link--active">
          <q-item-section avatar>
            <q-icon name="home" :class="$route.path === '/' ? 'text-primary' : 'text-white'" />
          </q-item-section>
          <q-item-section :class="$route.path === '/' ? 'text-primary' : 'text-white'">
            Inicio
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/pacientes" active-class="q-router-link--active">
          <q-item-section avatar>
            <q-icon
              name="people"
              :class="$route.path.startsWith('/pacientes') ? 'text-primary' : 'text-white'"
            />
          </q-item-section>
          <q-item-section
            :class="$route.path.startsWith('/pacientes') ? 'text-primary' : 'text-white'"
          >
            Pacientes
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/doctores" active-class="q-router-link--active">
          <q-item-section avatar>
            <q-icon
              name="badge"
              :class="$route.path.startsWith('/doctores') ? 'text-primary' : 'text-white'"
            />
          </q-item-section>
          <q-item-section
            :class="$route.path.startsWith('/doctores') ? 'text-primary' : 'text-white'"
          >
            Doctores
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftDrawerOpen = ref(false)
const currentUser = ref('Dr. Ejemplo') // Esto debería venir de tu sistema de autenticación

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  $q.notify({
    message: 'Sesión cerrada correctamente',
    color: 'positive',
    icon: 'logout',
  })
  // Aquí iría la lógica para cerrar sesión
}

function showHelp() {
  $q.dialog({
    title: 'Ayuda',
    message:
      'Sistema de gestión de historias clínicas hospitalarias. Para asistencia contacte al administrador.',
    ok: {
      label: 'Entendido',
      color: 'primary',
    },
  })
}
</script>

<style lang="scss">
.q-drawer {
  .q-item {
    border-radius: 0 24px 24px 0;
    margin: 2px 8px;

    &.q-router-link--active {
      background-color: #e3f2fd;
      font-weight: bold;

      .q-icon {
        color: #0d47a1;
      }
    }

    &:hover:not(.q-router-link--active) {
      background-color: #a2d7ff;
      color: #0d47a1;
    }
  }
}

</style>
