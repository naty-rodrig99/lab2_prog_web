import { expect } from "chai";
import { withMyFetch, myDetailsFetch } from "./mockFetch.js";
import { useState, useEffect, createElement } from "react";
import { h, createApp, reactive } from "vue";
import getModule from "./filesToTest.js";
import { createRoot } from "react-dom/client";
import { observable, configure } from "mobx";

configure({
  enforceActions: "never",
});

const X = TEST_PREFIX;

async function getPresenters(framework) {
  return {
    search: (await getModule(`/src/${framework}/${X}searchPresenter.jsx`))
      ?.Search,
    sidebar: (await getModule(`/src/${framework}/${X}sidebarPresenter.jsx`))
      ?.Sidebar,
    details: (await getModule(`/src/${framework}/${X}detailsPresenter.jsx`))
      ?.Details,
    summary: (await getModule(`/src/${framework}/${X}summaryPresenter.jsx`))
      ?.Summary,
  };
}

const vuejs = await getPresenters("vuejs");
const reactjs = await getPresenters("reactjs");

const presenters = { vuejs, reactjs };

let foundReactRouter;

function makeCreateElement(framework, h) {
  const propsHistory = [];

  function Dummy(props) {
    propsHistory.push({ ...props });
    return h("span", {}, "dummy " + props.type);
  }
  return {
    replacePresenters: function (tag, props, ...children) {
      if (tag.name === "RouterProvider") foundReactRouter = true;
      const f = ["search", "summary", "sidebar", "details"].find(function (x) {
        return tag == presenters[framework][x];
      });
      if (f) return h(Dummy, { ...props, type: f });

      if (tag == "img") {
        return h(Dummy, { ...props, type: "imgLoader" });
      }
      if (
        tag == "div" &&
        children &&
        children[0] &&
        ("" + children[0]).toLowerCase() == "no data"
      )
        return h(Dummy, { ...props, type: "no data" });
      return h(tag, props, ...children);
    },
    propsHistory,
  };
}

async function testVue(theTest) {
  const { replacePresenters, propsHistory } = makeCreateElement("vuejs", h);

  window.React = { createElement: replacePresenters };

  const VueRootAll = await getModule(`/src/vuejs/${X}VueRoot.jsx`);

  if (!(VueRootAll?.VueRoot || VueRootAll?.default) || !VueRootAll?.makeRouter)
    return false;

  const vueRoot = VueRootAll?.VueRoot || VueRootAll?.default;

  const div = document.createElement("div");
  window.location.hash = "pursposefully_wrong_route"; // force rendering of just Sidebar
  const model = reactive({ ready: true });
  const app = createApp(h(vueRoot, { model }));

  await withMyFetch(myDetailsFetch, function () {
    app.use(VueRootAll.makeRouter(model));
    app.mount(div);
  });
  try {
    const result = await theTest(propsHistory, model);
    if (result === false) return false;
    return true;
  } finally {
    app.unmount();
  }
}

async function testReact(theTest) {
  const { replacePresenters, propsHistory } = makeCreateElement(
    "reactjs",
    createElement
  );

  window.React = { createElement: replacePresenters };

  const ReactRoot = (await getModule(`/src/reactjs/${X}ReactRoot.jsx`))
    ?.ReactRoot;

  if (!ReactRoot) return false;

  const model = observable({ ready: true });
  let turnOff;

  function Guard() {
    const [guard, setGuard] = useState(true);
    turnOff = function () {
      setGuard(false);
    };
    return guard && replacePresenters(ReactRoot, { model });
  }
  const div = document.createElement("div");
  await withMyFetch(myDetailsFetch, function () {
    window.React = { createElement: replacePresenters };
    window.location.hash = "pursposefully_wrong_route"; // force rendering of just Sidebar
    createRoot(div).render(replacePresenters(Guard)); // mounts the app in the page DIV with the id "root"
  });

  if (!foundReactRouter) return false;

  try {
    const result = await theTest(propsHistory, model);
    if (result === false) return false;
    return true;
  } finally {
    turnOff();
  }
}

async function testRoutes(propsHistory) {
  expect(propsHistory.length, "Root should render other components").to.be.ok;
  // we assume that here we have a wrong route, so Sidebar is rendered

  expect(
    propsHistory.slice(-1)[0]?.type,
    "Sidebar was supposed to be rendered"
  ).to.equal("sidebar");

  window.location.hash = "/";
  await new Promise((resolve) => setTimeout(resolve));
  expect(
    propsHistory.slice(-1)[0]?.type,
    "Search was supposed to also be rendered, but only Sidebar was"
  ).to.equal("search");

  window.location.hash = "/details";
  await new Promise((resolve) => setTimeout(resolve));
  expect(
    propsHistory.slice(-1)[0]?.type,
    "Details was supposed to be rendered"
  ).to.equal("details");

  window.location.hash = "/summary";
  await new Promise((resolve) => setTimeout(resolve));
  expect(
    propsHistory.slice(-1)[0]?.type,
    "Summary was supposed to be rendered"
  ).to.equal("summary");

  window.location.hash = "/search";
  await new Promise((resolve) => setTimeout(resolve));
  expect(
    propsHistory.slice(-1)[0]?.type,
    "Search was supposed to be rendered at /search"
  ).to.equal("search");
}

async function testSuspense(propsHistory, model) {
  model.ready = false;
  await new Promise((resolve) => setTimeout(resolve));
  model.ready = true;
  await new Promise((resolve) => setTimeout(resolve));
  expect(
    propsHistory.length,
    "Root should render the initial promise: first an image based on model.ready, then the app"
  ).to.be.gte(3);
  expect(
    propsHistory[1].type,
    "the root component will render a loading image (suspense) while the persistence promise is resolved"
  ).to.equal("imgLoader");
  expect(
    propsHistory[2].model,
    "the model passed to the presenters is the model prop"
  ).to.equal(model);
}

export { testReact, testVue, testRoutes, testSuspense };
