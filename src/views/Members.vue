<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="allMembers"
    :items-per-page="perPage"
    :loading="isLoading"
    :loading-text="$t('loading-text')"
    class="ma-5"
  ></v-data-table>

  </div>
</template>

<script>
export default {
  name: "Members",
  data() {
    return {
      headers: [
          {
            text: this.$t("name"),
            align: 'start',
            value: 'name',
            class: "success lighten-5"
          },
          { text: this.$t("last_name"), value: 'last_name', class: "success lighten-5" },
          { text: 'Email', value: 'email', class: "success lighten-5" },
        ],
      allMembers: [],
      isLoading: true,
      perPage: 10,
    };
  },
  methods: {
    async fetchMembers() {
      const baseURI =
        "https://run.mocky.io/v3/90cfbed9-924c-423f-8e4b-dde6a6be438b";

      try {
        const response = await fetch(baseURI);
        const data = await response.json();
        this.allMembers = data.members;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchMembers();
  },
};
</script>

<style>
</style>
