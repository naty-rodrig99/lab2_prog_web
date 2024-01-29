import { render } from "./teacherRender.js";
import getModule from "/test/filesToTest.js";
import { findFormEventNames } from "/test/searchUtils.js";

const X = TEST_PREFIX;

const SearchFormView = (await getModule(`/src/views/${X}searchFormView.jsx`))
  ?.SearchFormView;

if (!SearchFormView) {
  render(
    <div>Please define /src/views/searchFormView.jsx</div>,
    document.getElementById("root")
  );
}

let textChangeCustomEvent, typeChangeCustomEvent, searchButtonCustomEvent;
try {
  [textChangeCustomEvent, typeChangeCustomEvent, searchButtonCustomEvent] =
    findFormEventNames();
} catch (e) {}

if (SearchFormView) {
  const preamble = (
    <div>
      <p>
        {" "}
        This is the TW2.2.1 search form view test. Note that this is just a View
        and interatction will not work yet.
      </p>
      <p>
        The props 'text' and 'type' are set, to demonstrate the case when the
        search form was hidden away and the user comes back to it during
        Navigation (TW3). Then we want the user to see what they searched for
        last time.
      </p>
      <p>
        The custom event we have detected for changing search text is:{" "}
        <code>{textChangeCustomEvent || "none yet"}</code>
      </p>
      <p>
        The custom event we have detected for changing search type is:{" "}
        <code>{typeChangeCustomEvent || "none yet"}</code>
      </p>
      <p>
        The custom event we have detected for clicking search button is:{" "}
        <code>{searchButtonCustomEvent || "none yet"}</code>
      </p>
      <hr />
    </div>
  );
  render(
    <div>
      {preamble}
      <SearchFormView
        dishTypeOptions={["starter", "main course", "dessert"]}
        text="pizza"
        type="main course"
        textChangeCustomEvent={function searchTextACB(txt) {
          console.log("user wants to set the dish search text ", txt);
        }}
        typeChangeCustomEvent={function searchTypeCB(typ) {
          console.log("user wants to set the dish search type ", typ);
        }}
        searchButtonCustomEvent={function searchNowACB() {
          console.log("user wants to search now!");
        }}
      />
    </div>,
    document.getElementById("root")
  );
}
