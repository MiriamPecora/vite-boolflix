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
        getSearchedMedia() {
            const url = `${this.store.infoAPI_movie.url}api_key=${this.store.api_key}&query=${this.searched_media}&language=${this.store.language}`;
            axios
            .get(url)
            .then((response) => { 
                console.log(response);
                response.data.results.forEach(movie => {
                    const result = {
                        title: movie.title,
                        original_title: movie.original_title,
                        original_language: movie.original_language,
                        vote_average: movie.vote_average,
                        flagUrl: this.getCorrectFlag(movie.original_language),
                    };
                    this.store.results.push(result);
                });
                console.log(this.store.results);
            });
        },
        getCorrectFlag(language) {
            if (language === 'en') {
                return './src/assets/img/english.png';
            } else if (language === 'it') {
                return './src/assets/img/italy.png';
            };
        },
    },
    created() {
    }
};
</script>

<template>
    <div>
        <input v-model="searched_media" type="text" placeholder="Cerca un film">
        <button @click="getSearchedMedia">Cerca</button>
    </div>

    <div class="mediaCard">
        <ul v-for="(movie, index) in store.results" :key="index">
            <li> {{ movie.title }}</li>
            <ul>
                <li> {{ movie.original_title }} </li>       
                <li> <img class="flag" :src="movie.flagUrl" :alt="movie.original_language"> </li>    
                <li> {{ movie.vote_average }} </li>      
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
