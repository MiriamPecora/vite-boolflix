<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: "searchApp",
    data() {
        return {
            store,
            searched_media: "",
        }
    },
    methods: {
        getSearchedMovie() {
            const url = `${this.store.infoAPI_movie.url}api_key=${this.store.api_key}&query=${this.searched_media}&language=${this.store.language}`;
            axios
            .get(url)
            .then((response) => { 
                console.log(response);
                response.data.results.forEach(movie => {
                    const movieResult = {
                        title: movie.title,
                        original_title: movie.original_title,
                        original_language: movie.original_language,
                        vote_average: movie.vote_average,
                        flagUrl: this.getCorrectFlag(movie.original_language),
                    };
                    this.store.movieResults.push(movieResult);
                });
            });
        },
        getSearchedTvShow() {
            const url = `${this.store.infoAPI_tvseries.url}api_key=${this.store.api_key}&language=${this.store.language}&query=${this.searched_media}`;
            axios
            .get(url)
            .then((response) => { 
                console.log(url);
                response.data.results.forEach(tvshow => {
                    const tvShowResult = {
                        title: tvshow.name,
                        original_title: tvshow.original_name,
                        original_language: tvshow.original_language,
                        vote_average: tvshow.vote_average,
                        flagUrl: this.getCorrectFlag(tvshow.original_language),
                    };
                    this.store.tvShowResults.push(tvShowResult);
                });
            });
        },
        getCorrectFlag(language) {
            if (language === 'en') {
                return './src/assets/img/english.png';
            } else if (language === 'it') {
                return './src/assets/img/italy.png';
            };
        },
        searchAll() {
            this.getSearchedMovie();
            this.getSearchedTvShow();
        },
    },
    created() {
    }
};
</script>

<template>
    <div>
        <input v-model="searched_media" type="text" placeholder="Cosa vuoi cercare?">
        <button @click="searchAll">Cerca</button>
    </div>

    <div class="movieCard">
        <h2>FILM</h2>
        <ul v-for="movie in store.movieResults">
            <li> {{ movie.title }}</li>
            <ul>
                <li> {{ movie.original_title }} </li>       
                <li> <img class="flag" :src="movie.flagUrl" :alt="movie.original_language"> </li>    
                <li> {{ movie.vote_average }} </li>      
            </ul>
        </ul>
    </div>
    <div class="tvShowCard">
        <h2>SERIE TV</h2>
        <ul v-for="tvShow  in store.tvShowResults" >
            <li> {{ tvShow.title }}</li>
            <ul>
                <li> {{ tvShow.original_title }} </li>       
                <li> <img class="flag" :src="tvShow.flagUrl" :alt="tvShow.original_language"> </li>    
                <li> {{ tvShow.vote_average }} </li>      
            </ul>
        </ul>
    </div>
</template>

<style scoped>
    .flag {
    width: 25px;
    height: 25px; 
    display: inline-block;
    }

</style>
