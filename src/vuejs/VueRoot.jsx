import { Summary }  from "./summaryPresenter.jsx";


function VueRoot(props){
    return (<div>
                <div><SideBar model={props.model} /></div>
                {/* TODO TW1.5 Sidebar will be added here, inside a DIV, like Summary below */}
                <div>
                    <Search model={props.model} />
                    <Details model={props.model} />
                    <Summary model={props.model} />
                </div>
            </div>
           );
}

export { VueRoot }

