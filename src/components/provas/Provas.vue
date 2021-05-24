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
                      <label>Nome Alunos</label>
                    
                      <select class="form-control" v-model="prova.aluno">
                        <option disabled value="">Escolha um item</option>
                        <option v-for="cName in contactsName">{{cName.name}}</option>
                      </select>
                  </div>

                  <div class="form-group mr-1">
                      <label>Materia</label>
                    
                      <select class="form-control" v-model="prova.materia">
                        <option disabled value="">Escolha uma materia</option>
                        <option v-for="mName in materiasName">{{mName.materia}}</option>
                      </select>
                  </div>

                  <div class="form-group mr-1">
                      <label>Prova</label>
                      <input type="email" class="form-control" placeholder="Digite a prova ..." v-model="prova.prova">
                  </div>

                  <div class="form-group mr-1">
                      <label>Nota</label>
                      <input type="text" class="form-control" placeholder="Digite a nota do aluno ..." v-model="prova.nota">
                  </div>

                  <div class="form-group ml-1">
                      <button v-if="!isEdit" class="btn btn-lg btn-rounded btn-success" @click.prevent="saveContact(prova)">Criar Prova</button>
                      <button v-if="isEdit" class="btn btn-lg btn-rounded btn-primary" @click.prevent="updateContact(prova)">Atualizar Prova</button>
                  </div>
              </form>
          </div>

          <div class="col-8 border-left">
              
              <div class="contact">
                      
                  <div class="col-12 mb-2" v-for="p in provas">

                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Nome aluno: {{p.aluno}}</h5>

                              <p class="card-text">Materia: {{p.materia}}</p>
                              <p class="card-text">Prova: {{p.prova}}</p>
                              <p class="card-text">Nota: {{p.nota}}</p>

                              <a href="#" class="btn btn-sm btn-primary" @click.prevent="editContact(p)">EDITAR</a>
                              <a href="#" class="btn btn-sm btn-danger" @click.prevent="removeContact(p.id)">DELETAR</a>
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
      titulo01: 'Provas - Cadastro',
       provas : [],
       prova: {
        id: '',
        aluno: '',
        materia: '',
        prova: '',
        nota: ''
       },
       isEdit: false
    }
  },
  created(){
    this.provas = JSON.parse(localStorage.getItem('provasApp'));
    this.contactsName = JSON.parse(localStorage.getItem('contactsApp'));
    this.materiasName = JSON.parse(localStorage.getItem('materiasApp'));
  },
  methods: {
    saveContact(prova) {
      let provas = localStorage.getItem('provasApp');
        prova.id = new Date().getTime();

      if(provas) {
        provas = JSON.parse(provas);
        provas.push(prova);

      } else {
        provas = [prova];
      }

      this.provas = provas;

      // o atualizar local storage independemente de novo contato ou nova adição   
      localStorage.setItem('provasApp', JSON.stringify(provas));

      location.reload();
    },

    removeContact(provaId){
      let provas = localStorage.getItem('provasApp');

      if(!provas) return;
      
      provas = JSON.parse(provas);

      provas = provas.filter((prova) => {
        return prova.id != provaId;
      });
      
      this.provas = provas;

      localStorage.setItem('provasApp', JSON.stringify(provas));
      location.reload();
    }, 

    editContact(prova) {
        this.prova = prova;
        this.isEdit = true;
    },

    updateContact(prova){
      let provas = this.provas.map(provaMap => {
        if(provaMap.id == prova.id) {
            return prova;
        }

        return provaMap;
      });

      this.provas = provas;
      this.isEdit = false;

      localStorage.setItem('provasApp', JSON.stringify(provas));

      location.reload();
    }
  }
}
</script>


<style>

</style>