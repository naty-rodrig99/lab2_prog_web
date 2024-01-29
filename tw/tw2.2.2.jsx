import { render } from "./teacherRender.js";
import { searchResults } from "../test/mockFetch.js";
import getModule from "/test/filesToTest.js";
import getType from "/test/componentType.js";
import { findResultsEventName } from "/test/searchUtils.js";

const X = TEST_PREFIX;

const SearchResultsView = (
  await getModule(`/src/views/${X}searchResultsView.jsx`)
)?.SearchResultsView;

if (!SearchResultsView) {
  render(
    <div>
      Please write /src/views/searchResultsView.jsx to define SearchResultsView
    </div>,
    document.getElementById("root")
  );
}

let dishChosenCustomEvent;
try {
  [dishChosenCustomEvent] = findResultsEventName();
} catch (e) {}

if (SearchResultsView) {
  const preamble = (
    <div>
      <p> This is the TW2.2.2 search result view test</p>
      <p>
        It waits for one second to simulate a search, then it displays three
        search results. Of course your view should accomodate more results,
        using array rendering
      </p>
      <p>
        The custom event we have detected for chosing dish is:{" "}
        <code>{dishChosenCustomEvent || "none yet"}</code>
      </p>
      <hr />
    </div>
  );
  render(<div>{preamble}Wait...</div>, document.getElementById("root"));
  // we simulate a searchDishes that returns some results after 1 second
  new Promise(function makePromiseACB(resolve) {
    setTimeout(function laterACB() {
      resolve(searchResults);
    }, 1000);
  }).then(function displayResultsACB(results) {
    render(
      <div>
        {preamble}
        <SearchResultsView
          searchResults={results}
          dishChosenCustomEvent={function resultChosenACB(searchResult) {
            console.log(
              "user chose searchResult: ",
              JSON.stringify(searchResult)
            );
          }}
        />
      </div>,
      document.getElementById("root")
    );
  });
}
