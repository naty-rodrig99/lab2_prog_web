import { assert, expect } from "chai";
import {withMyFetch, checkFetchUrl, mySearchFetch, searchResults} from "./mockFetch.js";
//import { server } from "./mocks/testServer.js";

import getModule from "./filesToTest.js";
const X= TEST_PREFIX;
const dishSource= await getModule(`/src/${X}dishSource.js`);

let searchDishes;
if (dishSource?.searchDishes) searchDishes = dishSource.searchDishes;


describe("TW2.1.2 API call: search [test](/tw2.1.2.html)", function tw2_1_2() {
  this.timeout(200000);

  before(function tw2_1_2_before() {
    if (!searchDishes) this.skip();
  });

  // this.beforeAll(() => server.listen());
  // this.afterAll(() => server.close());
  // this.afterEach(() => server.resetHandlers());

  // it("searchDishes pizza as main course with mws", async () => {
  //   searchDishes({ query: "pizza", type: "main course" })
  // });

    function testPromise(text, p, searchq, checkArray=true, checkQS=true) {
      it(text, async function tw2_1_2_testPromise() {
          const result= await withMyFetch(mySearchFetch, p);
          checkFetchUrl(mySearchFetch.lastFetch, mySearchFetch.lastParam,
                        //-1027221439
                        [-281827937]
                        , checkQS && searchq);

          if(!checkArray)
              return;
          // the search results returned are dummy. 
          expect(result, "searchDishes returns the correct array").to.equal(searchResults);
      }).timeout(4000);
  }
    testPromise("searchDishes uses the correct proxy, API endpoint and HTTP headers",
                function tw2_1_2_testPromise1(){return searchDishes({});},
                [], false, false
               );

    testPromise("searchDishes keeps only one of the API result properties: an array of dishes",
                function tw2_1_2_testPromise1(){return searchDishes({});},
                [], true, false
               );

    
    testPromise("searchDishes sends the correct query string: testing with type 'main course'",
                function tw2_1_2_testPromise1(){return searchDishes({ type: "main course" });},
                [1758563338]
               );
    
    testPromise("searchDishes sends the correct query string: testing with pizza as main course",
                function tw2_1_2_testPromise1(){return searchDishes({ query: "pizza", type: "main course" });},
                [-1894851277, 1758563338]
               );

    testPromise("searchDishes strawberry pie as dessert",
                function tw2_1_2_testPromise1(){return searchDishes({ query: "strawberry pie", type: "dessert" });},
                [1496539523,-1015451899]
               );
    testPromise("searchDishes strawberry pie",
                function tw2_1_2_testPromise1(){return searchDishes({ query: "strawberry pie" });},
                [-1015451899]
               );
    testPromise("searchDishes with no search criteria (empty object)",
                function tw2_1_2_testPromise1(){return searchDishes({});},
                []
               );
    


});
