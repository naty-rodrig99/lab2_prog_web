import {dishType, menuPrice, sortDishes} from "/src/utilities.js";
import "/src/style.css"

export function SidebarView(props){

  function clickDecreaseACB(evt){
    props.onNumberChange(props.number-1)
  }

  function clickAddACB(evt){
    props.onNumberChange(props.number+1)
  }

    return (
            <div className="sideBar">
              <td>Number of guests:</td>
                <button disabled={props.number==1} onClick={clickDecreaseACB}>-</button>
              <span title="nr guests">{props.number}</span>
              <button onClick={clickAddACB}>+</button>
              <table>
                <tbody>
                  {
                    sortDishes(props.dishes).map(dishTableRowCB)
                  }
                <tr>
                  <td></td>
                  <td>Total:</td>
                  <td></td>
                  <td class="TD"> ${(props.number*menuPrice(props.dishes)).toFixed(2)}</td>
                </tr>
                </tbody>
              
              </table>
              
            </div>
    );

     /* callback for Array Rendering */
     function dishTableRowCB(dishes){

      //used to delete dishes with the unknown dishType
      // if (dishType(dishes)==""){
      //   return null;
      // }

      function clickDeleteACB(evt){
        props.xClickedACB(dishes)
      }
      
      function clickDishACB(evt){
        props.dishClickedACB(dishes)
        //window.location.hash="#/details"
      }


      return <tr key={dishes.id}>
                <td><button onClick={clickDeleteACB}>x</button></td>
                 <td><a href="#/details" onClick={clickDishACB}>{dishes.title}</a></td>
                 <td>{dishType(dishes)}</td>
                 <td class="TD">${(dishes.pricePerServing*props.number).toFixed(2)}</td>  
               </tr>;
    }
}