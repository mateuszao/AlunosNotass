<template>
    <nav>
      <ul class="nav nav-tabs">
        <!-- <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li> -->

        <li v-for="rota in rotas" class="nav-item">
          <router-link :to="rota.path ? rota.path : '/'" exact :class="'nav-link'">{{rota.titulo}}</router-link>
        </li>
      </ul>
    </nav>

</template>
<script>
export default {
    props: {
        rotas: {
            type: Array, 
            required: true
        }
    }
}
</script> 

<style scoped>
  .nav a {
    color: #000;
  }

</style>