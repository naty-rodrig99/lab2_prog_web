import "/src/style.css"

export function SearchResultsView(props){

    function dishDetailedACB(evt){
        console.log("evt",evt)
        //props.makePromiseACB(evt);
    }

    //used for array rendering
    function searchResultsCB(dishes){
        //console.log("dishes",dishes)
        function clickSpanACB(evt){ props.resultChosenACB(dishes);}
        function clickImgACB(evt){ props.resultChosenACB(dishes);}
        function clickTitleACB(evt){ props.resultChosenACB(dishes);}

        return <span key={dishes.id} onClick={clickSpanACB}>
                    <img alt="" height="100" src={dishes.image} onClick={clickImgACB}></img>
                    <div onClick={clickTitleACB}>
                        {dishes.title}
                    </div>

                </span>;
    }

    return (
        <div className="searchResultsView">
            {props.searchResults.map(searchResultsCB)}
        </div>
    );

}