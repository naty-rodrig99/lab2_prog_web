import { render } from "./teacherRender.js";
import getModule from "/test/filesToTest.js";
import { findDetailsEventName } from "/test/detailsUtils.js";
const X = TEST_PREFIX;

const DetailsView = (await getModule(`/src/views/${X}detailsView.jsx`))
  ?.DetailsView;
const getMenuDetails = (await getModule(`/src/${X}dishSource.js`))
  ?.getMenuDetails;

if (!getMenuDetails || !DetailsView) {
  render(
    <div>
      Please write /src/dishSource.js and export getMenuDetails
      <br />
      Please write /src/views/detailsView.jsx to define DetailsView
    </div>,
    document.getElementById("root")
  );
}

let addToMenuCustomEvent;
try {
  [addToMenuCustomEvent] = findDetailsEventName();
} catch (e) {}

if (getMenuDetails && DetailsView) {
  const preamble = (
    <div>
      <p> This is the TW2.2.3 dish details view test</p>
      <p>
        It retrieves two dishes using getMenuDetails and shows them side by side
      </p>
      <p>
        The custom event we have detected for chosing dish is:{" "}
        <code>{addToMenuCustomEvent || "none yet"}</code>
      </p>
      <hr />
    </div>
  );
  //const AA= 523145,   BB= 787321,   CC= 452179;
  //const AA= 548321,   BB= 758118,   CC=    1152690;
  const AA = 1445969,
    BB = 1529625,
    CC = 32104;
  render(<div>{preamble}Wait...</div>, document.getElementById("root"));

  function addToMenuACB() {
    console.log("user wants to add the displayed dish to the menu!");
  }
  getMenuDetails([AA, BB])
    .then(function testACB([dish1, dish2]) {
      render(
        <div>
          {preamble}
          <div style={{ display: "flex", "flex-direction": "row" }}>
            <div style={{ flex: "0.5", padding: "20px" }}>
              <DetailsView
                dishData={dish1}
                isDishInMenu={true}
                guests={7}
                addToMenuCustomEvent={addToMenuACB}
              />
            </div>
            <div style={{ flex: "0.5", padding: "20px" }}>
              <DetailsView
                dishData={dish2}
                isDishInMenu={false}
                guests={3}
                addToMenuCustomEvent={addToMenuACB}
              />
            </div>
          </div>
        </div>,
        document.getElementById("root")
      );
    })
    .catch(function errorACB(err) {
      render(<div>{err}</div>, document.getElementById("root"));
    });
}
