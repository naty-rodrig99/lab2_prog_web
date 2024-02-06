import { BASE_URL, API_KEY } from './apiConfig.js';

export function searchDishes(searchParams){
    const queryParams = new URLSearchParams();
    if (searchParams.type) {
        queryParams.append('type', searchParams.type);
    }
    if (searchParams.query) {
        queryParams.append('query',searchParams.query);
    }

    const URL = `${BASE_URL}/recipes/complexSearch?${queryParams.toString()}`;

    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': API_KEY,
            'X-DH2642-Group': '22' // Replaced with group number
        }
    };
    return fetch(URL, options).then(gotResponseACB).then(someACB);

    // Function to handle response
    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error('not ok');
        }
        return response.json();
    } 

    function someACB(objectResponse){
        return objectResponse.results; 
    }
}