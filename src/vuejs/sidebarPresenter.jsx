import { SidebarView } from "../views/sidebarView.jsx";
import {model} from "../DinnerModel.js";

function Sidebar(props){

    function setGuestNumberACB(evt){
        props.model.setNumberOfGuests(evt)
    }

    function showCurrentDishACB(evt){
        props.model.setCurrentDishId(evt.id)
    }

    function deleteDishACB(evt){
        props.model.removeFromMenu(evt)
    }

    //console.log(props.model)
    return <SidebarView 
    number={props.model.numberOfGuests} 
    dishes={props.model.dishes} 
    onNumberChange={setGuestNumberACB} 
    dishClickedACB={showCurrentDishACB} 
    xClickedACB={deleteDishACB}
    />;
}

export { Sidebar }