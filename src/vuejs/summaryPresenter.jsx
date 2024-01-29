import { SummaryView } from "../views/summaryView.jsx";

function Summary(props){
    return <SummaryView people={props.model.numberOfGuests} ingredients={[] /* empty array for starters */}/>;
}

export { Summary }