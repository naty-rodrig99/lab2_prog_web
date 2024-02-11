import { DetailsView } from "../views/detailsView.jsx";

function Details(props){
    function isInDishesCB(dish){
        if(dish.id===props.model.currentDishId){
            return true;
        }
        return false;
    }
    // for(let i=0; i<props.model.dishes.length; i++){
    //     if(props.model.dishes[i].id===props.model.currentDishId){
    //         inInMenu = true;
    //     }
    // }

    // function searchACB(txt){
    //     resolvePromise(searchPromise(txt), props.model.searchResultsPromiseState);
    // }
    console.log("props", props.currentDishPromiseState)

    function setAddToMenuACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data)
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
    dishData ={props.model.currentDishPromiseState.data}
    guests={props.model.numberOfGuests}
    isDishInMenu={props.model.dishes.find(isInDishesCB)}
    addToMenuACB={setAddToMenuACB} 
    />;
}

export { Details }