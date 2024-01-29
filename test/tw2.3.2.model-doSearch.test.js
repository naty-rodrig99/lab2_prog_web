import { expect } from "chai";
import { withMyFetch, mySearchFetch, searchResults } from "./mockFetch.js";
import getModule from "./filesToTest.js";
import cloneModel from "./cloneModel.js";
import { observable } from "mobx";

const X = TEST_PREFIX;
const modelTemplate = cloneModel(
  (await getModule(`/src/${X}DinnerModel.js`))?.model
);

describe("TW2.3.2 Promise State in Model: search [test](/tw2.3.2.html)", function tw2_3_2() {
  this.timeout(200000);

  let model;

  before(function () {
    model = cloneModel(modelTemplate);
  });

  this.beforeEach(function tw2_3_2_beforeEach() {
    model = cloneModel(modelTemplate);
  });

  it("Model has searchParams", function tw2_3_2_1() {
    if (!model?.searchParams) this.skip();
    this._runnable.title =
      "Model sets the searchParams for search query and type";
    expect(
      model,
      "Model could not be imported, please check the top of your Console"
    ).to.be.ok;
    expect(model, "searchParams must be added to the model").to.have.property(
      "searchParams"
    );
    expect(
      JSON.stringify(model.searchParams),
      "searchParams expected to be initially an empty object"
    ).to.equal(JSON.stringify({}));
  });

  it("setSearchQuery and setSearchType save their arguments in searchParams", function tw2_3_2_1() {
    if (!model?.searchParams) this.skip();
    model.setSearchQuery("pizza");
    model.setSearchType("main course");
    expect(
      model.searchParams,
      "searchParams must have the property query"
    ).to.have.property("query");
    expect(
      model.searchParams,
      "searchParams must have the property type"
    ).to.have.property("type");
    expect(
      model.searchParams.query,
      "searchParams must have the property query and it must be a string"
    ).to.be.a("string");
    expect(
      model.searchParams.type,
      "searchParams must have the property type and it must be a string"
    ).to.be.a("string");
    expect(
      model.searchParams.query,
      "searchParams query must be set to 'pizza' when setSearchQuery('pizza') is called"
    ).to.be.equal("pizza");
    expect(
      model.searchParams.type,
      "searchParams type must be set to 'main course' when setSearchType('main course') is called"
    ).to.be.equal("main course");
  });

  it("Model defines property searchResultsPromiseState", async function tw2_3_2_2() {
    if (!model.searchResultsPromiseState) this.skip();
    expect(
      model,
      "Model must have a searchResultsPromiseState"
    ).to.have.property("searchResultsPromiseState");
    expect(
      JSON.stringify(model.searchResultsPromiseState),
      "searchResultsPromiseState expected to be initially an empty object"
    ).to.equal(JSON.stringify({}));
  });

  it("doSearch performs a search with the given params and resolves the promise into searchResultsPromiseState", async function tw2_3_2_2() {
    if (!model.searchResultsPromiseState) this.skip();
    withMyFetch(mySearchFetch, () =>
      model.doSearch({ query: "ice cream", type: "dessert" })
    );

    expect(
      model.searchResultsPromiseState,
      "searchResultsPromiseState must have the property promise"
    ).to.have.property("promise");
    expect(
      model.searchResultsPromiseState.data,
      "searchResultsPromiseState data property must start as null"
    ).to.be.null;
    expect(
      model.searchResultsPromiseState.error,
      "searchResultsPromiseState's error property initially starts null"
    ).to.be.null;
    expect(
      model.searchResultsPromiseState.promise,
      "searchResultsPromiseState's promise property initially starts null"
    ).to.not.be.null;

    await model.searchResultsPromiseState.promise;

    expect(
      model.searchResultsPromiseState.data,
      "Must store promise result in the data property"
    ).to.equal(searchResults);

    expect(
      mySearchFetch.lastFetch,
      "doSearch for ice cream should result in an API call that includes ice"
    ).to.include("ice");
    expect(
      mySearchFetch.lastFetch,
      "doSearch for ice cream should result in an API call that includes cream"
    ).to.include("cream");
    expect(
      mySearchFetch.lastFetch,
      "doSearch for dessert should result in an API call that includes dessert"
    ).to.include("dessert");
  });

  it("doSearch works when used in a reactive model", async function tw2_3_2_3() {

    model = observable(model)
    if (!model.searchResultsPromiseState) this.skip();
    withMyFetch(mySearchFetch, () =>
      model.doSearch({ query: "ice cream", type: "dessert" })
    );

    expect(
      model.searchResultsPromiseState,
      "searchResultsPromiseState must have the property promise"
    ).to.have.property("promise");
    expect(
      model.searchResultsPromiseState.data,
      "searchResultsPromiseState data property must start as null"
    ).to.be.null;
    expect(
      model.searchResultsPromiseState.error,
      "searchResultsPromiseState's error property initially starts null"
    ).to.be.null;
    expect(
      model.searchResultsPromiseState.promise,
      "searchResultsPromiseState's promise property initially starts null"
    ).to.not.be.null;

    await model.searchResultsPromiseState.promise;

    /* deep equal ok: if the previous one works, this will work as well */  
    expect(
        model.searchResultsPromiseState.data,
        "Must store promise result in the data property"
    ).to.deep.equal(searchResults);

    expect(
      mySearchFetch.lastFetch,
      "doSearch for ice cream should result in an API call that includes ice"
    ).to.include("ice");
    expect(
      mySearchFetch.lastFetch,
      "doSearch for ice cream should result in an API call that includes cream"
    ).to.include("cream");
    expect(
      mySearchFetch.lastFetch,
      "doSearch for dessert should result in an API call that includes dessert"
    ).to.include("dessert");
  });
});
