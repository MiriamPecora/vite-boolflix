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
                        this.store.results.push(
                            {
                                title: movie.title,
                                original_title: movie.original_title,
                                original_language: movie.original_language,
                                vote_average: movie.vote_average,
                            }
                        )
                    });
                    console.log(this.store.results)
                });
            },
        },
        created() {
        },
    };
</script>

<template>
    <div>
        <input v-model="searched_media" type="text" placeholder="American Psycho">
        <button @click="getSearchedMedia">Cerca</button>
    </div>

    <div class="mediaCard">
        <ul v-for="movie in store.results">
            <li> {{ movie.title }}</li>
            <ul>
                <li> {{ movie.original_title }}</li>      
                <li> {{ movie.original_language }}</li>      
                <li> {{ movie.vote_average }}</li>      
            </ul>
        </ul>
    </div>
</template>