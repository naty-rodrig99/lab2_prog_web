import { DetailsView } from "../views/detailsView.jsx";

function Details(props){
    function isInDishesCB(dish){
        if(dish.id===props.model.currentDishId){
            return true;
        }
        return false;
    }

    function setAddToMenuACB(){
        props.model.addToMenu(props.model.currentDishPromiseState.data)
    }

    if(!props.model.currentDishPromiseState.promise){
        return "no data"
    }
    if(props.model.currentDishPromiseState.error){
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