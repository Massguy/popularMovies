<template>
  <div>
    <div class="search">
      <div class="headerInput">
        <h1>Search Movies</h1>
        <input
          type="text"
          v-model="query"
          @keyup="getResult(query)"
          placeholder="please enter movie name"
          required
        />
      </div>
      <div class="cardContainer">
        <div v-for="result in results" :key="result.id" class="movieCard">
          <div class="movieBox">
            <p class="movieName">{{ result.title }}</p>

            <img
              v-bind:src="
                result.poster_path == null
                  ? 'https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg'
                  : 'http://image.tmdb.org/t/p/w500/' + result.poster_path
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="popular">
      <h1>Popular Movies</h1>
    </div>
    <div class="cardContainer">
      <div v-for="(movie, index) in movies" :key="index" class="movieCard">
        <div class="movieBox">
          <h3 class="movieName">{{ movie.title }}</h3>

          <img
            :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
            alt=""
          />

          <p class="description">{{ movie.overview }}</p>
        </div>
      </div>
      <div v-if="movies.length" v-observe-visibility="handleScroll"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "movielist",
  data() {
    return { movies: [], page: 1, total_pages: 1, query: "", results: "" };
  },

  methods: {
    async getMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=1f0795097b3d4f1ad22864d8d633e221&language=en-US&page=${this.page}`
      );

      this.movies.push(...response.data.results);
      this.total_pages = response.data.total_pages;
    },
    getResult(query) {
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=1f0795097b3d4f1ad22864d8d633e221&language=en-US&page=1&include_adult=false&query=" +
            query
        )
        .then((response) => {
          this.results = response.data.results;
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
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
    if (this.query.length < 1) {
      this.getMovies();
    } else {
      this.getResult();
    }
  },
};
</script>

<style>
.headerInput {
  text-align: center;
  background-color: rgb(18, 21, 54);
  color: white;
  margin-top: -23px;
  width: 100%;
  padding-bottom: 25px;
}

.search input {
  height: 30px;
  width: 300px;
  border-color: blue;
  border-radius: 5%;
}
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

h1 {
  text-align: center;
}

img {
  width: 280px;
  height: 350px;
}

@media screen and (max-width: 1244px) {
  .cardContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .headerInput {
    text-align: center;
    background-color: rgb(18, 21, 54);
    color: white;
    margin-top: -23px;
    padding-bottom: 25px;
    width: 1250px;
  }
  img {
    width: 580px;
    height: 350px;
  }
  h1 {
    text-align: center;
  }
  .popular {
    width: 1250px;
  }
  .search input {
    height: 50px;
    width: 50%;
    border-color: blue;
    border-radius: 5%;
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
    height: 800px;
    font-size: 35px;
    line-height: 1.5;
    border-radius: 4%;
  }

  .movieName {
    padding: 30px;
    height: 30px;
    background-color: rgb(19, 28, 58);
    color: white;
  }
  @media screen and (max-width: 468px) {
    .cardContainer {
      display: grid;
      grid-template-columns: 1fr;
      width: 280%;
    }
    .headerInput {
      text-align: center;
      background-color: rgb(18, 21, 54);
      color: white;
      margin-top: -23px;
      padding-bottom: 25px;
      width: 1fr;
      height: 200px;
    }
    .search input {
      height: 60px;
      width: 90%;
      border-color: blue;
      border-radius: 5%;
    }
    .movieBox {
      padding: 2px 16px;
    }
    .movieCard {
      box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
    }
    img {
      width: 1200px;
      height: 750px;
    }
    .description {
      font-size: 55px;
      height: 1000px;
    }
  }
}
</style>
