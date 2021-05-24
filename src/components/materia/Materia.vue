<template>
  <div class="container">
   <div class="container">
      <div class="row mt-5">
          <div class="col-12 border-bottom mb-5">
              <h2>{{titulo01}}</h2>
          </div>

          <div class="col-4">

              <form action="">
                  <div class="form-group mr-1">
                      <label>Materia</label>
                      <input type="text" class="form-control" placeholder="Digite a materia ..." v-model="materia.materia">
                  </div>

                  <div class="form-group ml-1">
                      <button v-if="!isEdit" class="btn btn-lg btn-rounded btn-success" @click.prevent="saveContact(materia)">Criar Materia</button>
                      <button v-if="isEdit" class="btn btn-lg btn-rounded btn-primary" @click.prevent="updateContact(materia)">Atualizar Materia</button>
                  </div>
              </form>
          </div>

          <div class="col-8 border-left">
              
              <div class="contact">
                      
                  <div class="col-12 mb-2" v-for="m in materias">

                      <div class="card">
                          <div class="card-body">
    
                              <p class="card-text">Materia: {{m.materia}}</p>

                              <a href="#" class="btn btn-sm btn-primary" @click.prevent="editContact(m)">EDITAR</a>
                              <a href="#" class="btn btn-sm btn-danger" @click.prevent="removeContact(m.id)">DELETAR</a>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      titulo01: 'Materia - Cadastro',
       materias : [],
       materia: {
        id: '',
        materia: ''
       },
       isEdit: false
    }
  },
  created(){
    this.materias = JSON.parse(localStorage.getItem('materiasApp'));
  },
  methods: {
    saveContact(materia) {
      let materias = localStorage.getItem('materiasApp');
        materia.id = new Date().getTime();

      if(materias) {
        materias = JSON.parse(materias);
        materias.push(materia);

      } else {
        materias = [materia];
      }

      this.materias = materias;

      // o atualizar local storage independemente de novo contato ou nova adição   
      localStorage.setItem('materiasApp', JSON.stringify(materias));

      location.reload();
    },

    removeContact(materiaId){
      let materias = localStorage.getItem('materiasApp');

      if(!materias) return;
      
      materias = JSON.parse(materias);

      materias = materias.filter((materia) => {
        return materia.id != materiaId;
      });
      
      this.materias = materias;

      localStorage.setItem('materiasApp', JSON.stringify(materias));
      location.reload();
    }, 

    editContact(materia) {
        this.materia = materia;
        this.isEdit = true;
    },

    updateContact(materia){
      let materias = this.materias.map(materiaMap => {
        if(materiaMap.id == materia.id) {
            return materia;
        }

        return materiaMap;
      });

      this.materias = materias;
      this.isEdit = false;

      localStorage.setItem('materiasApp', JSON.stringify(materias));

      location.reload();
    }
  }
}
</script>


<style>

</style>