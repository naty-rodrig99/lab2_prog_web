import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render

// (1) ------------ application state (model) -----------
import { model } from "/src/DinnerModel.js";
//console.log(model)
// uncomment to make the app update when the model changes.

import "/src/firebaseModel.js"

import { reactive } from "vue";
const reactiveModel= reactive(model);

reactiveModel.setSearchQuery("pizza")
reactiveModel.setSearchType("starter")
reactiveModel.doSearch(model.searchParams);

// then use reactiveModel instead of model below!

// (2) ----------  display (mount) the root component in the browser page. Pass model(1) as prop. ---------
// http://localhost:8080/vue.html

import { createApp, h } from "vue";
window.React= {createElement:h};  // needed in the lab because it works with both React and Vue

import { VueRoot } from "./VueRoot.jsx";
const app= createApp(<VueRoot model={reactiveModel} />);


app.mount('#root'); // mounts the app in the page DIV with the id "root"
// to see the DIV, look at vue.html in the developer tools Sources
// vue.html, with the content <div id="root"></div> is configured in vite.config.js


// ------ for debug purposes ----------
//window.myModel= model;             // make the model available in the Console
window.myModel= reactiveModel;  