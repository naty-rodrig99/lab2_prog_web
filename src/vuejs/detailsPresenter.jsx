import { DetailsView } from "../views/detailsView.jsx";

function Details(props){
    function searchACB(txt){
        resolvePromise(searchPromise(txt), props.model.searchResultsPromiseState);
    }

    function setAddToMenuACB(evt){
        props.model.addToMenu(evt);
    }

    return <DetailsView 
    searchCustomEvent={searchACB}
    dishData ={props.model.currentDishPromiseState}
    guests={props.model.numberOfGuests}
    //isDishInMenu={}

    addToMenuACB={setAddToMenuACB} 
    /> 
}

export { Details }