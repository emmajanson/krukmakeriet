import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
// import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";

describe("App and navigation", () => {
  test("full app rendering/navigation to courses-page", async () => {
    const user = userEvent.setup();
    render(<App />);
    const routeForHome = screen.getByTestId("home");
    expect(routeForHome).toBeInTheDocument();
    await user.click(screen.getByText(/LÄNK KURSER/i));
    //verify course-page after navigating //
    const routeForCourses = screen.getByTestId("courses");
    expect(routeForCourses).toBeInTheDocument();
  });
});
