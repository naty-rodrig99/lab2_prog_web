import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";

// Add relevant imports here 
import {firebaseConfig} from "/src/firebaseConfig.js";
import { model } from './DinnerModel.js';
import { getMenuDetails } from "./dishSource.js";

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

//const PATHTest="dinnerModel22";
//set(ref(db, PATHTest+"/test"), "dummy");

const PATH="dinner";

export function modelToPersistence(objectDinner){
    function transformerCB(dish){
        return dish.id;
    }
    
    const dishIds = objectDinner.dishes.map(transformerCB).sort();
    
    const dinnerData = {
        numberOfGuests: objectDinner.numberOfGuests,
        dishes: dishIds,
        currentDishId: objectDinner.currentDishId
    }
    return dinnerData;
}

//someRef = ref(db, PATH+"/test");
/*set(ref(db, PATH), modelToPersistence({
    numberOfGuests:5, 
    currentDishId:13, 
    dishes:[{id:13, title:"dummy1"}, 
            {id:42, title:"dummy2"}]
   }))*/

   export function persistenceToModel(data_from_firebase, model){
    function responseACB(response){
        if(!response || data_from_firebase.numberOfGuests == null){
            model.setNumberOfGuests(2);
            model.setCurrentDishId(null);
            model.dishes = [];
        } else{
            model.setNumberOfGuests(data_from_firebase.numberOfGuests);
            model.setCurrentDishId(data_from_firebase.currentDishId);
            model.dishes = response;
        } 
        return response; 
    }    
    if (!data_from_firebase || typeof data_from_firebase.dishes === 'undefined') {
        return getMenuDetails([]).then(responseACB);
    } 
    else {        
        return getMenuDetails(data_from_firebase.dishes).then(responseACB);
    }  
}

export function saveToFirebase(model){
    if(model.ready){
        set(ref(db, PATH), modelToPersistence(model));
    }
}

export function readFromFirebase(model){
    model.ready = false;

    function convertDataCB(data_from_firebase){
        return modelData = persistenceToModel(data_from_firebase);
    }

    function changeModelReadyCB(){
        model.ready = true;
    }
    
    return get(ref(db, PATH)).then(convertDataCB).then(changeModelReadyCB);
}

function connectToFirebase(model, watchFunction){
    // TODO
}
// Remember to uncomment the following line:
//export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
