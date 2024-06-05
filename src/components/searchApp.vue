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
                const url = `${this.store.infoAPI_movie.url}api_key=${this.store.api_key}&query=${this.searched_media}`;
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
            this.store.results = [];
        },
    };
</script>

<template>
    <div>
        <input v-model="searched_media" type="text" placeholder="American Psycho">
        <button @click="getSearchedMedia">Cerca</button>
    </div>
</template>