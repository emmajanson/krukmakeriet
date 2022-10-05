import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../src/Components/Footer";
import { AllContextProvider } from "./context/AllContext";
import "@testing-library/jest-dom";
import App from "./app";

const MockHome = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <AllContextProvider>
      <App />
    </AllContextProvider>
  );
};

describe("App and navigation", () => {
  test("check if homecomponent is is render", async () => {
    render(<MockHome />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  test("Should render without crash", async () => {
    render(<Footer />);
    const routeForFooter = screen.getByTestId("footer");
    expect(routeForFooter).toBeInTheDocument();
  });
});
