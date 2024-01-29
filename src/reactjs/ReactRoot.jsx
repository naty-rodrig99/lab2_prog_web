import { Summary } from "./summaryPresenter.jsx";

// const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (<div>
                {/* TODO TW1.5 Sidebar will be added here, inside a DIV, like Summary below */}
                <div><Summary model={props.model} /></div>
            </div>
           );
}
// )

export { ReactRoot }
