import { DetailsView } from "../views/detailsView.jsx";
import { observer } from "mobx-react-lite";

const Details = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function DetailsRender(props){
        function isInDishesCB(dish){
            return dish.id===props.model.currentDishId;
        }

        function setAddToMenuACB(){
            props.model.addToMenu(props.model.currentDishPromiseState.data)
        }

        if(!props.model.currentDishPromiseState.promise){return "no data"}
        if(props.model.currentDishPromiseState.error){return props.model.currentDishPromiseState.error}
        if(!props.model.currentDishPromiseState.data){return <img src="https://brfenergi.se/iprog/loading.gif"></img>}
    
        return <DetailsView 
        dishData ={props.model.currentDishPromiseState.data}
        guests={props.model.numberOfGuests}
        isDishInMenu={props.model.dishes.find(isInDishesCB)}
        addToMenuACB={setAddToMenuACB} 
        />;
    }
);
export { Details }