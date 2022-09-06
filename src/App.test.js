import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
// import App from "./App";
import Home from "./pages/Home";

describe("App", () => {
  test("renders App component", () => {
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    render(
      <Router>
        <Home />
      </Router>
    );
  });
});
