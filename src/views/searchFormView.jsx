//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchFormView(props){
    function sendSearchTextACB(evt){
        props.searchTextACB(evt.target.value);
    }
    function sendsearchTypeCB(evt){
        props.searchTypeCB(evt.target.value)
    }

    function sendsearchNowACB(evt){
        props.searchNowACB()
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }
    function backToSummaryACB(){
        window.location.hash="#/summary"
      }


    return (
        <div className="searchFormView">
        <td>Search for a recipe:</td>

            <button onClick={backToSummaryACB}>Back to summary</button>
            <input type="text" value={props.text || ""} onChange={sendSearchTextACB}/>
            <select value={props.type || ""}onChange={sendsearchTypeCB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionsCB)}
            </select>
            <button onClick={sendsearchNowACB}>Search!</button>
          
        </div>
    );
}