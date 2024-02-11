import { SearchFormView } from "../views/searchFormView.jsx";

function SearchForm(props){
    
    function setSearchTextACB(evt){
        props.model.setSearchQuery(evt);
    }

    function setSearchDishTypeACB(evt){
        props.model.setSearchType(evt);
    }

    function searchNowACB(evt){
        props.model.doSearch(evt);
    }

    return <SearchFormView 
    dishTypeOptions= {["starter", "main course", "dessert"]}
    //text={model.props.setSearchQuery}
    //type={model.props.setSearchType}

    //nameACB={setSearchTextACB}
    //nameACB2={setSearchDishTypeACB}
    //nameACB3={searchNowACB}
    />
}

function SearchResults(props){
    
}