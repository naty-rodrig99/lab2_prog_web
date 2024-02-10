import { BASE_URL, API_KEY } from './apiConfig.js';

export function searchDishes(searchParams){
    const queryParams = new URLSearchParams();
    if (searchParams.type) {
        queryParams.append('type', searchParams.type);
    }
    if (searchParams.query) {
        queryParams.append('query',searchParams.query);
    }

    const URL = `${BASE_URL}/recipes/complexSearch?${queryParams}`;

    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': API_KEY,
            'X-DH2642-Group': '22' // Replaced with group number
        }
    };
    return fetch(URL, options).then(gotResponseACB).then(someACB);

    //aynchronous callback to handle response
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

export function getMenuDetails(ids_array){
    const queryParams = new URLSearchParams({ids: ids_array});

    const URL = `${BASE_URL}/recipes/informationBulk?${queryParams}`;

    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': API_KEY,
            'X-DH2642-Group': '22' // Replaced with group number
        }
    };

    return fetch(URL, options).then(gotResponseACB).then(someACB);

    //aynchronous callback
    function gotResponseACB(response){
        if (!response.ok) {
            throw new Error(`response was not 200`);
        }
        return response.json();
    }

    function someACB(objectResponse){
        return objectResponse; 
    }
} 

export function getDishDetails(id){
    return getMenuDetails(id).then(arrayToObjectACB);

    function arrayToObjectACB(idArray){
        return idArray[0];
    }
} 