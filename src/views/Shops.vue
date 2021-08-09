<template>
  <v-container class="shops">
    <v-overlay absolute :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row wrap>
      <v-col v-for="(shop, index) in shopsToDisplay" cols="12" sm="6" md="6" lg="3" :key="index">
        <v-card hover height="100%" class="shop" :href="shop.external_url" target="blank">
          <v-img :src="shop.img_url" height="225">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title> {{ shop.name }} </v-card-title>

          <v-card-text v-html="shop.description_html"></v-card-text>
        </v-card>
      </v-col>
    </v-row>

      <v-pagination     
      v-model="currentPage"
      :length="totalPages"
      @input="renderList(currentPage)"
      circle
      color="success"
      class="my-4"
    ></v-pagination>

  </v-container>
</template>

<script>
export default {
  name: "Shops",
  data() {
    return {
      allShops: [],
      shopsToDisplay: [],
      isLoading: true,
      perPage: 15,
      currentPage: 1,
      pageToOpen: 1,

    };
  },
  methods: {
    async fetchShopsItems() {
      const baseURI =
        "https://run.mocky.io/v3/96795216-2572-44a1-b971-855f25e481c6";

      try {
        const response = await fetch(baseURI);
        const data = await response.json();
        this.allShops = data.shops;
        this.isLoading = false;
        this.renderList();
      } catch (error) {
        console.error(error);
      }
    },
    renderList(pageNumber = 1) {
      // clear currently displayed list
      this.shopsToDisplay = [];

      //set members to display
      if (this.allShops.length) {
        try {
          //set the page to open to the pageNumber in the parameter in order to allow start and stop to update accordingly
          this.pageToOpen = pageNumber;

          //add the necessary data to `shopsToDisplay` array
          for (let i = this.start; i <= this.stop; i++) {
            this.shopsToDisplay.push(this.allShops[i]);
          }

          //Now update the current page to the page we just loaded
          this.currentPage = this.pageToOpen;
        } catch (error) {
          console.log("render err", error);
        }
      }
    },
  },
  computed: {
    totalPages() {
      //calculating the total number of pages based on the number of members to show per page and the total members we got from server
      return this.allShops.length && this.allShops.length > this.perPage
        ? Math.ceil(this.allShops.length / this.perPage)
        : 1;
    },
    start() {
      return (this.pageToOpen - 1) * this.perPage;
    },
    stop() {
      //stop at the end of the array if array length OR the items left are less than the number of items to show per page
      //do the calculation if otherwise
      if (this.allShops.length - this.start >= this.perPage) {
        return this.pageToOpen * this.perPage - 1;
      } else {
        return this.allShops.length - 1;
      }
    },
  },
  watch: {
    //re-render list based on the value of `perPage` which indicates how many to show per page
    perPage: function(){
      this.renderList();
    }
  },
  created() {
    this.fetchShopsItems();
  },
};
</script>

<style>
  .shop a {
    color: green !important;
  }
</style>
