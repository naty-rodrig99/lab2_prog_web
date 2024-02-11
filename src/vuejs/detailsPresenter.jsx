import { DetailsView } from "../views/detailsView.jsx";

function Details(props){
    let inInMenu=false;
    for(let i in props.model.dishes){
        if(props.model.dishes[i].id==props.model.currentDishId){
            inInMenu = true;
        }
    }

    function searchACB(txt){
        resolvePromise(searchPromise(txt), props.model.searchResultsPromiseState);
    }
    //console.log("props", props.model.addToMenu)
    function setAddToMenuACB(evt){
        props.model.addToMenu(evt);
    }

    if(!props.model.currentDishPromiseState.promise){
        //console.log("here" )
        return "no data"
    }
    if(props.model.currentDishPromiseState.error){
        //console.log("here11" )
        return props.model.currentDishPromiseState.error
    }
    if(!props.model.currentDishPromiseState.data){
        return <img src="https://brfenergi.se/iprog/loading.gif"></img>
    }
    
    return <DetailsView 
    searchCustomEvent={searchACB}
    dishData ={props.model.currentDishPromiseState.data}
    guests={props.model.numberOfGuests}
    isDishInMenu={inInMenu}
    addToMenuACB={setAddToMenuACB} 
    />;
}

export { Details }