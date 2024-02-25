import { Summary } from "./summaryPresenter.jsx";
import {Sidebar} from "./sidebarPresenter.jsx";
import {Details} from "./detailsPresenter.jsx";
import {Search} from "./searchPresenter.jsx";
import "../style.css"
import { observer } from "mobx-react-lite"
import {  createHashRouter,  RouterProvider} from "react-router-dom";

function makeRouter(model){
    return createHashRouter([
        { 
            path: "/", 
            element:<Search model={model} />,
        },
        { 
            path: "/search", 
            element:<Search model={model} />,
        },
        {
            path: "/summary",
            element: <Summary model={model} /> ,
        },
        { 
            path: "/details", 
            element:<Details model={model} />,
        }
    
    ])
    }
const ReactRoot = observer((props)=>{
    if(!props.model.ready){
        return <img src="https://brfenergi.se/iprog/loading.gif"></img>
    }
    return (<div className="flexParent">
                <div className="SidePage">
                    <Sidebar model={props.model} />
                </div>
                <div className="MainPage">
                    <RouterProvider router={makeRouter(props.model)}/>
                </div>
               
            </div>
           );
})

export { makeRouter, ReactRoot }
