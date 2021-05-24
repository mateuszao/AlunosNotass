import Home from './components/home/Home.vue';
import Materia from './components/materia/Materia.vue';
import Provas from './components/provas/Provas.vue';
import Relatorio from './components/relatorio/Relatorio.vue';


export const routes = [
  /* rotas aqui */
  { path: '', component: Home, titulo: 'Alunos' },
  { path: '/materia', component: Materia, titulo: 'Materia' },
  { path: '/provas', component: Provas, titulo: 'Provas' },
  { path: '/relatorio', component: Relatorio, titulo: 'Relatorio' }

];