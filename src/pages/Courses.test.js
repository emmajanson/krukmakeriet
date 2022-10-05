import Courses from "./Courses";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("test if courses page is rendered", () => {
  test("check if coursespage are rendered", async () => {
    render(<Courses />);
    const element = screen.getByTestId("courses");
    expect(element).toBeInTheDocument();
  });
});
