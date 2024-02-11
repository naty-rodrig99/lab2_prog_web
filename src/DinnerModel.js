/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
import { searchDishes, getDishDetails } from './dishSource.js';
import { resolvePromise } from './resolvePromise.js';

const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    setCurrentDishId(dishId){
        this.currentDishId= dishId;

        if(dishId || dishId != this.currentDishId){
            resolvePromise(getDishDetails(dishId),this.currentDishPromiseState);
        }
    },
    
    setNumberOfGuests(number){
        if(number>0 && Number.isInteger(number)){
            this.numberOfGuests=number
        }
        else{throw new Error("number of guests not a positive integer");}
    },
    
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd];
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            if(dish.id===dishToRemove.id){
                return false
            }
            else{
                return true
            }
        }
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },

    setSearchQuery(query){
        this.searchParams.query = query;
    },

    setSearchType(type){
        this.searchParams.type = type;
    },

    doSearch(params){
        resolvePromise(searchDishes(params),this.searchResultsPromiseState);
    },
    
    // more methods will be added here, don't forget to separate them with comma!
};

export {model};
