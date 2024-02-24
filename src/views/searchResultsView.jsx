import "/src/style.css"

export function SearchResultsView(props){

    //used for array rendering
    function searchResultsCB(dishes){
        function clickSpanACB(evt){ 
            props.resultChosenACB(dishes);
            window.location.hash="#/details";
        }
        function clickImgACB(evt){ 
            props.resultChosenACB(dishes);
            window.location.hash="#/details";
        }
        function clickTitleACB(evt){ 
            props.resultChosenACB(dishes);
            window.location.hash="#/details";
        }

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