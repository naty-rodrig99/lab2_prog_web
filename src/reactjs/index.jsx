import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import "/src/firebaseModel.js"

// (1) ------------ application state (model) -----------
import { model } from '/src/DinnerModel.js';
// uncomment to make the app update when the model changes:

import { reaction, observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model);

reactiveModel.setSearchQuery("pizza")
reactiveModel.setSearchType("starter")
reactiveModel.doSearch(reactiveModel.searchParams);

// then use reactiveModel instead of model below!

// (2) ----------  display (mount) the root component in the browser page. Pass model(1) as prop. ---------
// http://localhost:8080/react.html

import { createElement } from "react";
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue

import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";

createRoot(document.getElementById('root'))
    .render(<ReactRoot model={reactiveModel}/>);  // mounts the app in the page DIV with the id "root"
// to see the DIV, look at react.html in the developer tools Sources
// react.html, with the content <div id="root"></div> is configured in vite.config.js


// ------ for debug purposes ----------
//window.myModel= model;             // make the model available in the Console
window.myModel= reactiveModel;

import {connectToFirebase} from '/src/firebaseModel.js'
connectToFirebase(reactiveModel, reaction)


