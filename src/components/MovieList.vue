<template>
  <div class="cardContainer">
    <div v-for="(movie, index) in movies" :key="index" class="movieCard">
      <div class="movieBox">
        <h3 class="movieName">{{ movie.title }}</h3>

        <img
          :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
          alt=""
          width="280"
          s
          height="350"
        />

        <p class="description">{{ movie.overview }}</p>
      </div>
    </div>
    <div v-if="movies.length" v-observe-visibility="handleScroll"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { movies: [], page: 1, total_pages: 1 };
  },

  methods: {
    async getMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=1f0795097b3d4f1ad22864d8d633e221&language=en-US&page=${this.page}`
      );

      this.movies.push(...response.data.results);
      this.total_pages = response.data.total_pages;
    },
    handleScroll(isVisible) {
      if (!isVisible) {
        return;
      }
      if (this.page == this.total_pages) {
        return;
      }
      this.page++;
      this.getMovies();
    },
  },
  mounted() {
    this.getMovies();
  },
};
</script>

<style>
.cardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.movieBox {
  padding: 2px 16px;
}
.movieCard {
  box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
.description {
  background-color: rgb(19, 28, 58);
  color: white;
  height: 400px;
  line-height: 1.5;
  border-radius: 4%;
}

.movieName {
  padding: 30px;
  height: 30px;
  background-color: rgb(19, 28, 58);
  color: white;
}
</style>
