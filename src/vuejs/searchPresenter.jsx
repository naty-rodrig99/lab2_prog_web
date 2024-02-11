import { SearchFormView } from "../views/searchFormView.jsx";
import{SearchResultsView} from "../views/searchResultsView.jsx"

function Search(props){
    
    function setSearchTextACB(evt){
        props.model.setSearchQuery(evt);
    }

    function setSearchDishTypeACB(evt){
        props.model.setSearchType(evt);
    }

    console.log("props.searchParams",props.model)
    function searchNowACB(){
        props.model.doSearch(props.model.searchParams);
    }

    function setResultChosenACB(evt){
       props.model.setCurrentDishId(evt.id)
    }

    function conditionalRenderingResult(promiseState){
        if(!promiseState.promise){
            return "no data"
        }
        if(promiseState.error){
            return props.model.searchResultsPromiseState.error
        }
        if(!promiseState.data){
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }
        return <SearchResultsView
        resultChosenACB = {setResultChosenACB}
        searchResults={props.model.searchResultsPromiseState.data}
    />
    }
    return <div>
        <SearchFormView 
        dishTypeOptions= {["starter", "main course", "dessert"]}
        text={props.model.searchParams.query}
        type={props.model.searchParams.type}

        searchTextACB={setSearchTextACB}
        searchTypeCB={setSearchDishTypeACB}
        searchNowACB={searchNowACB}
    />
    {conditionalRenderingResult(props.model.searchResultsPromiseState)}
        </div>
}

export { Search}