import { reactive } from "vue";

export const store = reactive({
    title: [],
    original_title: [],
    original_language: [],
    vote_average: [],

    results: [],

    api_key: '23f1adce0be4ca3441ad85c7495255d4',
    language: '&language=it-IT',

    infoAPI_movie: {
        url: 'https://api.themoviedb.org/3/search/movie?',
    },

    infoAPI_tvseries: {},

});