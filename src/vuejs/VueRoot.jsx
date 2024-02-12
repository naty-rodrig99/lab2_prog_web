import { Summary }  from "./summaryPresenter.jsx";
import {Sidebar} from "./sidebarPresenter.jsx";
import {Details} from "./detailsPresenter.jsx";
import {Search} from "./searchPresenter.jsx";
import "../style.css"


function VueRoot(props){
    console.log(props)
    return (<div>
                <div className="SidePage"><Sidebar model={props.model} /></div>
                <div className="MainPage">
                    <Search model={props.model} />
                    <Details model={props.model} />
                    <Summary model={props.model} />
                </div>
            </div>
           );
}

export { VueRoot }

