<template>
  <div class="search">
    <h1>Search</h1>
    <input type="text" v-model="query" @keyup="getResult(query)" />
    <div v-for="result in results" :key="result.id">
      <p>{{ result.title }}</p>
      <img
        v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path"
        width="100px"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      query: "",
      results: "",
    };
  },
  methods: {
    getResult(query) {
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=1f0795097b3d4f1ad22864d8d633e221&language=en-US&page=1&include_adult=false&query=" +
            query
        )
        .then((response) => {
          this.results = response.data.results;
        });
      console.log(this.results);
    },
  },
};
</script>
