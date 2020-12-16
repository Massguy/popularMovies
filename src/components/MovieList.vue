<template>
  <div class="cardContainer">
    <div v-for="movie in movies.results" :key="movie.id" class="movieCard">
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
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { movies: [] };
  },
  async created() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=1f0795097b3d4f1ad22864d8d633e221&language=en-US&page=1"
    );
    this.movies = response.data;
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
