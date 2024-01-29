import {render} from "./teacherRender.js";
import getModule from "/test/filesToTest.js";
import {reactive} from "vue";

const X= TEST_PREFIX;

const model1=(await getModule(`/src/${X}DinnerModel.js`))?.model;

if(!model1.doSearch){
    render(<div>
             Please write DinnerModel.doSearch()
           </div>,  document.getElementById('root'));
}

if(model1.doSearch){
    const preamble= <div><p> This is the TW2.3.2 doSearch test. It performs a search with empty parameters and display the model searchResultsPromiseState</p>
                      <p>You can edit tw/tw2.3.2.js to add search parameters</p>
                      <hr/></div>;

    const model= reactive(model1);
    model.doSearch({});
    const Root={
        render(){
            return <div>
                   search results promise state: {JSON.stringify(model.searchResultsPromiseState)}
               </div>;
        },
    };
    
    render(
        <div> {preamble} <Root/> </div>
        ,    document.getElementById('root')
    );
}

