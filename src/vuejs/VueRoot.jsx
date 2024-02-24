import { Summary }  from "./summaryPresenter.jsx";
import {Sidebar} from "./sidebarPresenter.jsx";
import {Details} from "./detailsPresenter.jsx";
import {Search} from "./searchPresenter.jsx";
import { createRouter, createWebHashHistory, RouterView, useRoute} from "vue-router";
import "../style.css"

function makeRouter(model){
    return createRouter({
      history: createWebHashHistory(),
      routes:[
        { 
            path: "/", 
            component:<Search model={model} />,
        },
        { 
            path: "/search", 
            component:<Search model={model} />,
        },
        {
            path: "/summary",
            component: <Summary model={model} /> ,
        },
        { 
            path: "/details", 
            component:<Details model={model} />,
        }
    
    ]});
}

function VueRoot(props){
    return (<div className="flexParent">
                <div className="SidePage"><Sidebar model={props.model} /></div>
                <div className="MainPage"> <RouterView/></div>
            </div>
           );
}


export { makeRouter, VueRoot }

