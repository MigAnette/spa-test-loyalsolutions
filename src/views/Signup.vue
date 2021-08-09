<template>
<v-container>
  <v-layout align-center justify-center row fill-heigh mt-5>
    <h2>Sign Up</h2>
  </v-layout>
  <v-layout align-center justify-center row fill-heigh mt-5>
      <v-flex xs12 sm6 md6 lg6>
        <v-form class="px-3" ref="form" v-model="isFormValid">
  
          <!-- Name: -->
          <!-- Input for name -->
          <v-text-field color="success" v-model="name" :label="$t('name') + ':'" :rules="nameRules" required></v-text-field>
          <v-text-field color="success" v-model="lastname" :label="$t('last_name') + ':'" :rules="nameRules"></v-text-field>

          <v-text-field color="success" v-model="email" :rules="emailRules" label="Email:" required></v-text-field>
          <v-text-field color="success" v-model="confirmEmail" :rules="confirmEmailRules" :label="$t('confirmEmail') + ':'" required></v-text-field>

          <!-- Navn: -->
          <!-- Input for Navn -->

          <p class="error--text" v-if="feedback">{{feedback}}</p>

          <!-- Button with Tilmeld/submit opens the site you wanted to go to-->
          <div class="btnContainer">
            <v-btn @click="submit" :disabled="!isFormValid" color="success">{{$t('submit')}}</v-btn>
          </div>
        </v-form>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">{{ this.content }}</v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            :to="{name: 'Shops'}"
          >
           {{$t('signupToShop')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</v-container>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      dialog: false,
      content: null,
      isFormValid: false,
      feedback: null,
      email: null,
      confirmEmail: null,
      password: null,
      name: null,
      lastname: null,
      emailRules: [
        v => !!v || "Email er påkrævet",
        v => /.+@.+/.test(v) || "Email skal være valid",
      ],
      confirmEmailRules: [
        v => this.email === this.confirmEmail ? !!v : 'Emails have to be identical',
      ],
      nameRules: [v => !!v || "Navn er påkrævet"],
    }
   },
  methods: {
    async submit() {
      try {
        const response = await fetch('https://run.mocky.io/v3/029be3b9-c4d0-42c9-b348-dc2b575e3312', {
          method: 'POST',
          body: JSON.stringify({
            name: this.name,
            last_name: this.lastname,
            email: this.confirmEmail
          }),
        });
        const data = await response;
      
        if (data.ok && data.status == 200) {
          this.dialog = true;
          this.content =  this.$t('newMember', { name: `${this.name} ${this.lastname}`});
        }
        console.log(data);
      } catch (error) {
        console.error(error);
        this.feedback = error.message; //t
      }
    }
  }
}
</script>

<style>

</style>
