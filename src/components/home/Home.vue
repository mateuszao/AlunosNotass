<template>
  <div class="container">
      <div class="row mt-5">
          <div class="col-12 border-bottom mb-5">
              <h2>{{titulo01}}</h2>
          </div>

          <div class="col-4">

              <form action="">

                  <div class="form-group mr-1">
                      <label>Nome</label>
                      <input type="text" class="form-control" placeholder="Nome Completo..." v-model="contact.name">
                  </div>


                  <div class="form-group mr-1">
                      <label>E-mail</label>
                      <input type="email" class="form-control" placeholder="Seu melhor email..." v-model="contact.email">
                  </div>

                  <div class="form-group mr-1">
                      <label>Cod. Aluno:</label>
                      <input type="text" class="form-control" placeholder="Digite o codigo do aluno..." v-model="contact.cod">
                  </div>

                  <div class="form-group ml-1">
                      <button v-if="!isEdit" class="btn btn-lg btn-rounded btn-success" @click.prevent="saveContact(contact)">Criar Aluno</button>
                      <button v-if="isEdit" class="btn btn-lg btn-rounded btn-primary" @click.prevent="updateContact(contact)">Atualizar Aluno</button>
                  </div>
              </form>
          </div>

          <div class="col-8 border-left">
              
              <div class="contact">
                      
                  <div class="col-12 mb-2" v-for="contact in contacts">

                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">{{contact.name}}</h5>

                              <p class="card-text">{{contact.email}} | {{contact.cod}}</p>

                              <a href="#" class="btn btn-sm btn-primary" @click.prevent="editContact(contact)">EDITAR</a>
                              <a href="#" class="btn btn-sm btn-danger" @click.prevent="removeContact(contact.id)">DELETAR</a>
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
      titulo01: 'Alunos - Cadastro',
       contacts : [],  
       contact: {
        id: '',
        name: '',
        email: '',
        cod: ''
       },
       isEdit: false
    }
  },
  created(){
    this.contacts = JSON.parse(localStorage.getItem('contactsApp'));
  },
  methods: {
    saveContact(contact) {
      let contacts = localStorage.getItem('contactsApp');
        contact.id = new Date().getTime();

      if(contacts) {
        contacts = JSON.parse(contacts);
        contacts.push(contact);

      } else {
        contacts = [contact];
      }

      this.contacts = contacts;

      // o atualizar local storage independemente de novo contato ou nova adição   
      localStorage.setItem('contactsApp', JSON.stringify(contacts));

      location.reload();
    },

    removeContact(contactId){
      let contacts = localStorage.getItem('contactsApp');

      if(!contacts) return;
      
      contacts = JSON.parse(contacts);

      contacts = contacts.filter((contact) => {
        return contact.id != contactId;
      });
      
      this.contacts = contacts;

      localStorage.setItem('contactsApp', JSON.stringify(contacts));
      location.reload();
    }, 

    editContact(contact) {
        this.contact = contact;
        this.isEdit = true;
    },

    updateContact(contact){
      let contacts = this.contacts.map(contactMap => {
        if(contactMap.id == contact.id) {
            return contact;
        }

        return contactMap;
      });

      this.contacts = contacts;
      this.isEdit = false;

      localStorage.setItem('contactsApp', JSON.stringify(contacts));

      location.reload();
    }
  }
}
</script>

<style>

</style>
