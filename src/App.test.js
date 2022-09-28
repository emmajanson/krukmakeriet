import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home";
import "@testing-library/jest-dom";
import Footer from "../src/Components/Footer";
import Header from "./Components/Header";

const MockHome = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <BrowserRouter>
      <Home />;
    </BrowserRouter>
  );
};
const MockHeader = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <BrowserRouter>
      <Header />;
    </BrowserRouter>
  );
};

describe("App and navigation", () => {
  test("full app rendering/navigation to courses-page", async () => {
    render(<MockHome />);
    const routeForHome = screen.getByTestId("home");
    expect(routeForHome).toBeInTheDocument();
    const link = screen.getByTestId("link");
    fireEvent.click(link);
    const courseroute = screen.getByTestId("course");
    expect(courseroute).toBeInTheDocument();
  });
});

describe("Footer", () => {
  test("Should render without crash", async () => {
    render(<Footer />);
  });
});
