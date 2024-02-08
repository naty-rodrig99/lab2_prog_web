//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchFormView(props){
    //console.log("props", props)
    function searchTextACB(evt){
        //console.log(props)
        console.log("user wants to set the dish search text ", evt.target.value);
    }
    function searchTypeCB(evt){
        console.log("user wants to set the dish search type ", evt.target.value);
    }

    function searchNowACB(evt){
        console.log("user wants to search now!");
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }

    return (
        <div className="searchFormView">
            <input type="text" value={props.text || ""} onChange={searchTextACB}/>
            <select value={props.type || ""}onChange={searchTypeCB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionsCB)}
            </select>
            <button onClick={searchNowACB}>Search!</button>
          
        </div>
    );
}