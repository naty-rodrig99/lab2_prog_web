import { expect } from "chai";
import {dishInformation} from "./mockFetch.js";
import makeModelProxyHandler from "./mockModel.js";
import testComponent from "./testComponentTL.js";
import getModule from "./filesToTest.js";
import findCustomEvents from "./findCustomEvents.js";
import cloneModel from "./cloneModel.js";

const X = TEST_PREFIX;
const DetailsPresenter= (await getModule(`/src/vuejs/${X}detailsPresenter.jsx`))?.Details;
const DetailsPresenterReact= (await getModule(`/src/reactjs/${X}detailsPresenter.jsx`))?.Details;
const DetailsView=(await getModule(`/src/views/${X}detailsView.vue`))?.DetailsView ||
    (await getModule(`/src/views/${X}detailsView.jsx`))?.DetailsView;
const modelTemplate= cloneModel((await getModule(`/src/${X}DinnerModel.js`))?.model);

describe("TW2.4.1 Presenter passing props and custom events: Details presenter [test Vue](/tw2.4.1.html)[React](/tw2.4.1-react.html)", function tw2_4_1() {
    this.timeout(200000);
    before(function(){
            if(!DetailsPresenter && !DetailsPresenterReact) this.skip();
        let model = cloneModel(modelTemplate);
            if(!model?.currentDishPromiseState) this.skip();
        });

    testComponent({
        vue: DetailsPresenter,
        react: DetailsPresenterReact,
        mock: [{component: DetailsView, dummyText: "mock details view"}]},  
                  [
                      {model: new Proxy({currentDishPromiseState:{}},makeModelProxyHandler("Details presenter with no promise"))},
                      {model: new Proxy({currentDishId: dishInformation.id, currentDishPromiseState:{promise:"bla"}},makeModelProxyHandler("Details presenter with no promise data"))},
                      {model: new Proxy({currentDishId: dishInformation.id, currentDishPromiseState:{promise:"bla", error:"big error"}},makeModelProxyHandler("Details presenter with promise and error"))}
                  ],
                  "$framework Details presenter determines whether to render 'no data', loading image, or error",
                  function tw2_4_1_1(output, presenterPropsIndex, mockHandlers){
                      expect(output.container.childNodes.length, "Details presenter must render one child: either suspense or the details view").to.equal(1);
                      const test= presenterPropsIndex===0 && output.queryByText(/no data/i)  ||
                            presenterPropsIndex===1 && output.queryByRole('img')  ||
                            presenterPropsIndex===2 && output.queryByText(/big error/i);
                      const msg= presenterPropsIndex===0 && "when there is no promise, Details presenter should show 'no data'"||
                            presenterPropsIndex===1 && "when there is a promise but no data or error yet, Details presenter should render a loading image"  ||
                            presenterPropsIndex===2 && "when there is a promise but it rejected, Details presenter should render the error converted to string";
                            
                      expect(test, msg).to.be.ok
        }
    );

    testComponent({
        vue: DetailsPresenter,
        react: DetailsPresenterReact,
        mock: [{component: DetailsView, dummyText: "mock details view"}]},  
        {model: new Proxy({currentDishPromiseState:{promise:"bla", data:dishInformation}, currentDishId:dishInformation.id, dishes:[], numberOfGuests:4},
            makeModelProxyHandler("DetailsPresenter with promise data"))},
        "$framework Details presenter renders DetailsView with props calculated from the model: guests, isDishInMenu, dishData",
        function tw2_4_1_2(output, presenterPropsIndex, mockHandlers){
            expect(output.queryByText(/mock details view/), "DetailsPresenter should render DetailsView if the promise state includes data").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0]?.guests, "DetailsView guest prop must be read from the model").to.equal(4);
            expect(mockHandlers[0]?.propsHistory[0]?.isDishInMenu, "DetailsView isDishInMenu prop expected to be falsy with empty menu").to.not.be.ok;
            expect(mockHandlers[0]?.propsHistory[0]?.dishData.id, "DetailsView dishData prop expected to be read from the currentDish promise state").to.equal(dishInformation.id)
            expect(mockHandlers[0]?.propsHistory[0]?.dishData.title, "DetailsView dishData prop expected to be read from the currentDish promise state").to.equal(dishInformation.title)
        }
    );

    
    let dishAdded;
    beforeEach(function tw_2_4_1_beforeEach1(){ dishAdded=undefined; });
    
    testComponent({
        vue: DetailsPresenter,
        react: DetailsPresenterReact,
        mock: [{component: DetailsView, dummyText: "mock details view"}]},  
        {model: new Proxy({currentDishPromiseState:{promise:"bla", data: dishInformation}, currentDishId: dishInformation.id,dishes:[dishInformation],numberOfGuests:5,
            addToMenu(dish){dishAdded=dish;},searchResultsPromiseState:{}}, makeModelProxyHandler("DetailsPresenter with promise data, custom event test"))},
        "$framework DetailsPresenter handles custom event to add the dish to the menu",
        function tw2_4_1_3(output, presenterPropsIndex, mockHandlers){
            expect(mockHandlers[0]?.propsHistory[0]?.isDishInMenu, "DetailsView isDishInMenu prop expected to be truthy if the dish is in menu").to.be.ok;
            expect(mockHandlers[0]?.propsHistory[0]?.guests, "DetailsView guest prop must be read from the model").to.equal(5);

            const buttonsCE = findCustomEvents(DetailsView, {dishData:dishInformation, isDishInMenu:true, guests:6}).button;
            const addToMenu = buttonsCE.filter((button)=>{return button?.element?.props?.disabled;})[0].customEventName;

            expect(mockHandlers[0]?.propsHistory[0][addToMenu], "expecting the custom event handler "+addToMenu+" to be a function").to.be.a("function");
            expect(mockHandlers[0]?.propsHistory[0][addToMenu].length, "expecting the custom event handler "+addToMenu+" to not require arguments. The presenters already know which dish to add.").to.equal(0);
            mockHandlers[0]?.propsHistory[0][addToMenu]()
            expect(dishAdded.id, "expecting the custome event handler "+addToMenu+" to add a dish").to.equal(dishInformation.id);
            expect(dishAdded.title, "expecting the custome event handler "+addToMenu+" to add a dish").to.equal(dishInformation.title);
        }
    );
});

