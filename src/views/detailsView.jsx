export function DetailsView(props){
    console.log("props", props.dishData)

    function addToMenuACB(evt){
        props.addToMenuACB(props.dishData)
    }

    return (
        <div className="detailsView">
            <button disabled={props.isDishInMenu} onClick={addToMenuACB}>Add to menu!</button>
            <button onClick={addToMenuACB}>Cancel!</button>
            <h className="dishName">{props.dishData.creditsText}</h>
            <div className="dishImgDetails">
                <img src={props.dishData.image}></img>
            </div>
            <div className="dishPriceDetails">
                <p>Prices: {props.dishData.pricePerServing}</p>
                <p>for {props.guests} guests: {props.dishData.pricePerServing * props.guests}</p>
            </div>
            <div className="ingredientsDetails">
                {props.dishData.extendedIngredients.map(dishIngredientDetailsACB)}
            </div>
            <div>
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