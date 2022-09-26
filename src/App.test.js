import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../src/pages/Home";
import "@testing-library/jest-dom";
const MockHome = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <BrowserRouter>
      <Home />;
    </BrowserRouter>
  );
};

describe("App and navigation", () => {
  test("full app rendering/navigation to courses-page", async () => {
    render(<MockHome />);
    const routeForHome = screen.getByTestId("home");
    expect(routeForHome).toBeInTheDocument();
  });
});
