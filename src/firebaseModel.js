import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";

// Add relevant imports here 
import {firebaseConfig} from "/src/firebaseConfig.js";
import { model } from './DinnerModel.js';

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
        guests: objectDinner.numberOfGuests,
        disheIDs: dishIds,
        currentDishID: objectDinner.currentDishId
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

export function persistenceToModel(data_from_firebase){
    if (!data_from_firebase) {
        return {
            numberOfGuests: model.setnumberOfGuests(2),
            dishes: [],
            currentDishId: null
        };
    } else {
        return {
            numberOfGuests: data_from_firebase.guests || 2,
            dishes: data_from_firebase.disheIDs || [],
            currentDishId: data_from_firebase.currentDishID || null
        };
    }
    // TODO return a promise
}

export function saveToFirebase(model){
    if(model.ready == true){
        firebase.set(PATH, modelPersistenceData());
    }
}

export function readFromFirebase(model){
    model.ready = false;

    function convertDataCB(data_from_firebase){
        const modelData = persistenceToModel(data_from_firebase);
        model.ready = true;
        return modelData;
    }

    function showErrorCB(error){
        console.error('Error fetching data from Firebase:', error);
        throw error;
    }
    
    const promiseChain = firebase.get(PATH).then(convertDataCB()).catch(showErrorCB);
    return promiseChain;
}

function connectToFirebase(model, watchFunction){
    // TODO
}
// Remember to uncomment the following line:
//export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
