import axios from 'axios';
const API_KEY = 'rohLxuJ1q7I3LLCqdnUOD2Pe4Xi4Cshn';  

export const fetchGif = (searchKey, offset, isInitial = false) => (dispatch) => {
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchKey}&offset=${offset}&limit=10`;
    dispatch({
        type: 'FETCH_GIF_REQUESTING'
    });
    axios.get(url).then((response) => {
        dispatch({
            type: 'FETCH_GIF_SUCCESS',
            payload: { data: response.data, isInitial }
        });
    }).catch(error => {
        dispatch({
            type: 'FETCH_GIF_FAILURE',
            payload: error
        });
    });
};
