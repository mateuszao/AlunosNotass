<template>
  <div class="container">
   <div class="container">
      <div class="row mt-5">
          <div class="col-12 border-bottom mb-5">
              <h2>{{titulo01}}</h2>
          </div>
           <div class="col-md-4">
              <form action="">
                  <div class="form-group mr-1">
                      <label>Nome Alunos</label>
                    
                      <select class="form-control" required v-model="relatorio.aluno">
                        <option disabled value="">Escolha um item</option>
                        <option v-for="cName in contactsName">{{cName.name}}</option>
                      </select>
                  </div>

                  <div class="form-group mr-1">
                    <label>Materia</label>
                  
                    <select class="form-control" v-model="relatorio.materia">
                      <option disabled value="">Escolha uma materia</option>
                      <option v-for="mName in materiasName">{{mName.materia}}</option>
                    </select>
                  </div>

                  <div class="form-group ml-1">
                      <button class="btn btn-lg btn-rounded btn-primary" @click.prevent="filtraAluno(relatorio)">Filtrar aluno</button>
                  </div>
              </form>
          </div>
          <div class="col-md-8 border-left">
              
              <div class="contact">
                      
                  <div class="col-12 mb-2" v-for="p in provas">

                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Nome aluno: {{p.aluno}}</h5>

                              <p class="card-text">Materia: {{p.materia}}</p>
                              <p class="card-text">Prova: {{p.prova}}</p>
                              <p class="card-text">Nota: {{p.nota}}</p>
                          </div>
                      </div>

                  </div>


                   <div class="col-12 border-top" v-if="isRelatorio">

                      <div class="card mt-2 bg-light">
                          <div class="card-body">
                              <p class="card-text" v-if="isP">{{ materiaFiltro.aluno }} fez {{ numeroProvas }} provas de {{ materiaFiltro.materia }} e tem media {{ notaFiltro }}</p>
                              <p class="card-text" v-if="!isP">O Aluno não possui nota nesta matéria</p>
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
      titulo01: 'Relatorio Notas Alunos',
      provas : [],
      materiaFiltro: '',
      notaFiltro: '',
      numeroProvas: '',
      relatorio: {
        aluno: '',
        materia: ''
      },
      isRelatorio: false,
      isP: false
    }
  },
  created(){
    this.provas = JSON.parse(localStorage.getItem('provasApp'));
    this.contactsName = JSON.parse(localStorage.getItem('contactsApp'));
    this.materiasName = JSON.parse(localStorage.getItem('materiasApp'));
  },
  methods: {
    
    filtraAluno(relatorio){
      this.isRelatorio = true;
      
      function retornaAlunosMaterias (value){
          if (value.aluno == relatorio.aluno && value.materia == relatorio.materia)
          return value;
      }

      let aluno = JSON.parse(localStorage.getItem('provasApp'));
      aluno = aluno.filter(retornaAlunosMaterias)

      if(aluno.length > 0) {
        this.isP = true;
        this.provas = aluno

        this.materiaFiltro = this.provas[0]
        this.numeroProvas = this.provas.length 

        var soma = 0;
        var numero;
        for (var i = 0; i < this.provas.length; i++) {
          numero = parseInt(this.provas[i].nota);
          soma+= numero;
        }
        
        this.notaFiltro = soma / this.provas.length;
      } else {
        this.isP = false;

        this.provas = []        
      }      
    }
  }
}
</script>


<style>

</style>