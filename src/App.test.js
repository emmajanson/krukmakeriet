import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Footer from "../src/Components/Footer";
import Header from "./Components/Header";
import { AllContextProvider } from "./context/AllContext";
import Courses from "./pages/Courses";
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

describe('Footer', () => {
  test('Should render without crash', async () => {
     render(<Footer />)
     const routeForFooter = screen.getByTestId("footer");
     expect(routeForFooter).toBeInTheDocument()
})
})
