// un-comment when needed:
//import {sortIngredients} from "/src/utilities.js";
//import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
    return (
            <div className="debug">
              Summary for <span title="nr guests">{props.people}</span> persons:

            
              
              <table>
                  {  //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript, and make a comment
                  /*  The rest of the file is for TW1.5. If you are at TW1.2, wait!  

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>

                  */}
                
                <tbody>
                  {  
                      // Here you will use Array Rendering to generate a table row for each element of the ingredients prop (an array) 
                  }
                </tbody>
              </table>
            </div>
    );
    /* callback for Array Rendering */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>TODO aisle</td>
                 <td className="TODO">TODO qty</td>
                 <td> TODO unit </td>
               </tr>;
    }
}

