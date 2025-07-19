const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/doctores',
        children: [
          { path: '', component: () => import('pages/gestion-doctores/DoctoresPages.vue') },
          { path: 'crear', component: () => import('pages/gestion-doctores/CrearDoctor.vue') },
          {
            path: 'editar/:cedula',
            component: () => import('pages/gestion-doctores/EditarDoctor.vue'),
          },
        ],
      },
      {
        path: '/pacientes',
        children: [
          { path: '', component: () => import('pages/gestion-pacientes/PacientesPage.vue') },
          { path: 'crear', component: () => import('pages/gestion-pacientes/CrearPaciente.vue') },
          {
            path: 'editar/:cedula',
            component: () => import('pages/gestion-pacientes/EditarPaciente.vue'),
          },
          {
            path: ':cedula/historias/nueva',
            component: () => import('pages/gestion-pacientes/NuevaHistoriaClinica.vue'),
          },
          {
            path: ':cedula/historias',
            component: () => import('pages/gestion-pacientes/HistoriasClinicasPaciente.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
