import { assert, expect } from "chai";
import installOwnCreateElement from "./jsxCreateElement";
import {dishInformation, searchResults} from "./mockFetch.js";
import {findTag, prepareViewWithCustomEvents} from "./jsxUtilities.js";

import getModule from "./filesToTest.js";

const X= TEST_PREFIX;
const SearchFormView=(await getModule(`/src/views/${X}searchFormView.jsx`))?.SearchFormView;
const SearchResultsView=(await getModule(`/src/views/${X}searchResultsView.jsx`))?.SearchResultsView;
const SidebarView=(await getModule(`/src/views/${X}sidebarView.jsx`))?.SidebarView;
const SummaryView=(await getModule(`/src/views/${X}summaryView.jsx`))?.SummaryView;
const DetailsView=(await getModule(`/src/views/${X}detailsView.jsx`))?.DetailsView;

function urlInResult(url){
    return {results:[url] };
}

describe("TW3.2.2 Navigation buttons in views [Vue](/vue.html) [React](/react.html)", function tw_3_2_2() {
    this.timeout(200000);

    before(  function() {
        try{
            expect(SearchFormView).to.be.ok;
            expect(DetailsView).to.be.ok;
            expect(SearchResultsView).to.be.ok;
            expect(SummaryView).to.be.ok;
            installOwnCreateElement();
            const rendering= SummaryView({people:2, ingredients:[]});
            const buttons=findTag("button", rendering);
            expect(buttons.length).to.be.ok;
        }catch(err){
            this.skip();
        }
    });

    it("SummaryView should have a button leading to search (render a button in SummaryView to enable)",  async function  tw_3_2_2_1() {
         this._runnable.title= "SummaryView should have a button leading to search";      
         const rendering= SummaryView({people:2, ingredients:[]});
         const buttons=findTag("button", rendering);
         expect(buttons.length, "summary view should have one button").to.equal(1);
         window.location.hash="/randomRoute";
         buttons[0].props.onClick();
         await new Promise(resolve => setTimeout(resolve));
         expect(window.location.hash, "Summary button should navigate to search").to.equal("#/search");
     });

    it("DetaillsView should have a button leading to search without adding the dish",  async function  tw_3_2_2_2() {
        installOwnCreateElement();
        const rendering= DetailsView( {isDishInMenu:true, guests:2, dishData:dishInformation});
        
        const buttons=findTag("button", rendering).filter(function(button){ return !button.props.disabled; });
        expect(buttons.length, "DetailsView expected to have two (navigation) buttons and only one of them is enabled when the dish is already in the menu").to.equal(1);

        window.location.hash="/details";
        buttons[0].props.onClick();
        await new Promise(resolve => setTimeout(resolve));
        expect(window.location.hash, "Details navigation button should navigate to search").to.equal("#/search");
    });
    
    it("DetaillsView dish adding button should lead to search",  async function  tw_3_2_2_3() {
        const {clickables, rendering}= prepareViewWithCustomEvents(
            DetailsView,
            {isDishInMenu:true, guests:2, dishData:dishInformation},
            function makeButtons(rendering){
                const buttons=findTag("button", rendering).filter(function(button){ return button.props.disabled; });
                expect(buttons.length, "DetailsView expected to have one single disabled (add to menu) button if dish is in menu").to.equal(1);
                return buttons;
            });

        window.location.hash="/randomRoute";
        clickables[0].props.onClick();
        await new Promise(resolve => setTimeout(resolve));
        expect(window.location.hash,  "Details 'add to menu' button should navigate to search").to.equal("#/search");
    });

    it("SidebarView dish view links should open dish details",  async function  tw_3_2_2_4() {
        installOwnCreateElement();

        function findLinks(rendering){
            return findTag("a", rendering);
        }
        const rendering1= SidebarView( { number:2, dishes:[dishInformation]});

        const hrefs= findLinks(rendering1).filter(function(a){
            return a.props.href!="#/details";
        });
        if(hrefs.length==0)
            // all links have the correct href
            return;
        
        const {clickables, rendering}= prepareViewWithCustomEvents(
            SidebarView,
            { number:2, dishes:[dishInformation]},
            findLinks);

        expect(clickables.length).to.equal(1);
        window.location.hash="/randomRoute";
        const event=new Event("change", {  bubbles: true,  cancelable: true  });
        clickables[0].props.onClick(event);
        await new Promise(resolve => setTimeout(resolve));
        expect(window.location.hash,  "SidebarView dish links should navigate to details").to.equal("#/details");
        expect(event.defaultPrevented, "click on a sidebar link should prevent default behavior").to.equal(true);
    });

    it("SearchResultsView dish click should lead to details",  async function  tw_3_2_2_5() {
        const {clickables, rendering}= prepareViewWithCustomEvents(
            SearchResultsView,
            {searchResults},
            function findSpans(rendering){
                return findTag("span", rendering).filter(function checkSpan(span){
                    return span.props && span.props.onClick;
                });
            });

        expect(clickables.length).to.equal(searchResults.length);
        await Promise.all(clickables.map(async function  tw_3_2_2_5_loop(clickable){
            window.location.hash="/search";
            clickable.props.onClick();
            await new Promise(resolve => setTimeout(resolve));
            expect(window.location.hash, "SearchResultsView click on any result should navigate to details").to.equal("#/details");
        }));
    });

       it("SearchFormView button click should lead to Summary",  async function  tw_3_2_2_5() {
        installOwnCreateElement();
           const rendering= SearchFormView( {dishTypeOptions:[]});
        
           const buttons=findTag("button", rendering).filter(function(button){ return button?.children.toString().toLowerCase().indexOf("summary")>=0; });
        expect(buttons.length, "SearchFormView should have one button with a label containing the wod 'summary'").to.equal(1);

        window.location.hash="/randomRoute";
        buttons[0].props.onClick();
        await new Promise(resolve => setTimeout(resolve));
        expect(window.location.hash, "SearchFormView navigation button should navigate to summary").to.equal("#/summary");
    });
});

