<template>
  <Fieldset class="p-p-2 p-my-2 p-mx-auto"  style="width:50vw">
    <template #legend>
     Settings
    </template>


  <form @submit.prevent>
      <div class="p-field">
        <label for="email">Change your email:</label>
        <InputText id="email" v-model="email" type="text"/>
<!--        <InlineMessage v-if="email">{{ errors.first_name }}</InlineMessage>-->
      </div>

    <Button @click="changeEmailButton">Change email</Button>
  </form>

<form @submit.prevent>
  <div class="p-field">
    <label for="password">Change your password:</label>
    <InputText id="password" v-model="password" type="password"/>
<!--    <InlineMessage v-if="errors.first_name">{{ errors.first_name }}</InlineMessage>-->
  </div>
  <Button @click="changePasswordButton">Change password</Button>
  </form>
  </Fieldset>

  <Fieldset class="p-p-2 p-my-2 p-mx-auto"  style="width:50vw">
    <template #legend>
      Additional options
    </template>

    <Button  @click="confirmDelete($event)"  class="p-field p-mx-2 p-button-danger">Deactivate account</Button>
    <Button @clik="logout_allButton" class="p-field p-mx-2 p-button-warning">Logout from all devices</Button>

  </Fieldset>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Settings",
  data() {
  return {
    email: '',
    password: ''
  }
},
  methods:{
    ...mapActions(['changePassword','changeEmail','deactivate','logout_all']),
    async changePasswordButton(){
      await this.changePassword({password: this.password});
      this.$toast.add(
          {severity:'info', summary: 'Info Message', detail:'Password changed', life: 10000}
      );
    },

    async changeEmailButton(){
      await this.changeEmail({email: this.email});
      this.$toast.add(
          {severity:'info', summary: 'Info Message', detail:'Email changed', life: 10000}
      );
    },

    async logout_allButton(){
      await this.logout_all();
      this.$toast.add(
          {severity:'info', summary: 'Info Message', detail:'Logged out', life: 10000}
      );
    },

    async deactivateButton(){
      await this.deactivate();
    },

    confirmDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Do you want to deactivate your account?',
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.deactivateButton();
          this.$toast.add({severity:'info', summary:'Confirmed', detail:'Account deactivated', life: 3000});
        },
        reject: () => {
          this.$toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
      });
    },
  }


}
</script>

<style scoped>

</style>
