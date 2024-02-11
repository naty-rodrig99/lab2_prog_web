//import {dishTypeOptions, text, type} from "/src/utilities.js";

export function SearchFormView(props){
    //console.log("props", props)
    function sendSearchTextACB(evt){
        console.log("props",evt.target.value)
        props.searchTextACB(evt.target.value);
        //console.log("props",props)
    }
    /*function sendSearchTextACB(text){
        console.log("user wants to set the dish search text ", text);
    }*/
    function sendsearchTypeCB(evt){
        //console.log("user wants to set the dish search type ", evt.target.value);
        props.searchTypeCB(evt.target.value)
    }

    function sendsearchNowACB(evt){
        //console.log("user wants to search now!");
        props.searchNowACB()
    }

    //used for array rendering
    function dishTypeOptionsCB(dishType){
        return <option key={dishType} value={dishType}>{dishType}</option>;
    }

    return (
        <div className="searchFormView">
            <input type="text" value={props.text || ""} onChange={sendSearchTextACB}/>
            <select value={props.type || ""}onChange={sendsearchTypeCB}>
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(dishTypeOptionsCB)}
            </select>
            <button onClick={sendsearchNowACB}>Search!</button>
          
        </div>
    );
}