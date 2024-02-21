export function DetailsView(props){
    //console.log("props", props.dishData)

    function dishAddToMenuACB(evt){
        props.addToMenuACB(props.dishData)
    }
    function cancelFromMenuACB(evt){
        props.isDishInMenu=false
    }

    return (
        <div className="detailsView">
            <div className="menuButton">
                <button disabled={props.isDishInMenu} onClick={dishAddToMenuACB}>Add to menu!</button>
                <button disabled={!props.isDishInMenu}>Cancel!</button>
            </div>
            
            <h1>{props.dishData.creditsText}</h1>

            <div className="imgAndPrice">
                <img src={props.dishData.image}></img>

                <div className="textDetails">
                    <p>Prices: ${props.dishData.pricePerServing}</p>
                    <p>for {props.guests} guests: ${(props.dishData.pricePerServing * props.guests).toFixed(2)}</p>
                </div>
            </div>
            
            <div className="textDetails">
                {props.dishData.extendedIngredients.map(dishIngredientDetailsACB)}
            </div>
            <div className="textDetails">
                <p>{props.dishData.instructions}</p>
            </div>

            <a href={props.dishData.sourceUrl}> More Information</a>
          
        </div>
    );

    function dishIngredientDetailsACB(ingredients){

        return <p key={ingredients.id} >
            {ingredients.name} : {ingredients.amount} {ingredients.unit}
        </p>;
    }
}