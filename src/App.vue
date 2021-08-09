<template>
  <v-app>
    <Header :sitemap="sitemap" />

    <v-main>
      <router-view />
    </v-main>

    <v-footer>
      <v-row justify="center" no-gutters>
        
        <v-btn
          v-for="(site,index) in sitemap"
          :key="index"
          color="success"
          text
          rounded
          class="my-2"
          :to="{ name: site.name, params: { lang: $i18n.locale } }"
          exact
        >
          {{ $t(site.title) }}
        </v-btn>

        <v-col class="mt-2 ma-0 text-center" cols="12">
          <p>
         <strong>{{ $t('findUs') }}:</strong> 
          Company APS,
          Streetname 1,
          0000 Someplace,
          Countrymore
          </p>
        <p>
          <strong>{{ $t('contact') }}: </strong>
          <span class="success--text">Tel:</span> 10101010, 
          <span class="success--text">Email:</span> info@company.com
        </p>
        </v-col>

        <v-col class="py-3 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Anette Sommer</strong>
        </v-col>

      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";


export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({
    sitemap: [
      { name: 'Shops', title: 'shops' },
      { name: 'Members', title: 'members' },
      { name: 'Signup', title: 'signup' },
    ]
  }),
  
};
</script>
