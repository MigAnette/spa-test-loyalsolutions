<template>
  <nav>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-app-bar-title>
          <router-link :to="{ name: sitemap[0].name, params: { lang: $i18n.locale } }">

          <v-img
            class="shrink hidden-sm-and-down"
            contain
            min-width="200"
            src="https://www.loyalsolutions.eu/assets/img/logo.c524cdae.svg"
            width="200"
          />
          </router-link>
        </v-app-bar-title>
      </div>
        <span class="justify-center ml-3" v-if="locales"> {{ locales[`${$i18n.locale}`]['paragraph'] }} </span>

      <v-spacer></v-spacer>

      <v-btn color="success" v-for="site in sitemap" :key="site.name" tile text :to="{ name: site.name, params: { lang: $i18n.locale } }" exact> {{ $t(site.title) }} </v-btn>

      <select v-model="$i18n.locale" @change="setLocale($i18n.locale)">
        <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">
          <span>{{ lang }}</span>
        </option>
      </select>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  props: ['sitemap'],
  name: "Header",
  data() {
    return {
      locales: null,
    };
  },
  methods: {
    setLocale(lang) {
      console.log(lang);
      this.$i18n.locale = lang;
      this.$router.push({
        params: { lang: lang },
      })
    },
    async fetchMultilanguage() {
      const baseURI = "https://run.mocky.io/v3/61098797-3414-47e1-b749-1b9342574b09";

      try {
        const response = await fetch(baseURI);
        const data = await response.json();
        this.locales = data;
        console.log(this.locales);
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    console.log(this.$i18n.locale);
    this.fetchMultilanguage();
    
  },
};
</script>

<style>
</style>
