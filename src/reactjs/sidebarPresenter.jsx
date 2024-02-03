import { SidebarView } from "../views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

const Sidebar = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SidebarRender(props){
        
        function setGuestNumberACB(evt){
            props.model.setNumberOfGuests(evt)
        }
        
        function showCurrentDishACB(evt){
            props.model.setCurrentDishId(evt.id)
        }
        
        function deleteDishACB(evt){
            props.model.removeFromMenu(evt)
        }

        return <SidebarView 
        number={props.model.numberOfGuests} 
        dishes={props.model.dishes }
        onNumberChange={setGuestNumberACB} 
        dishClickedACB={showCurrentDishACB} 
        xClickedACB={deleteDishACB}
        />;
    }
);

export { Sidebar };
