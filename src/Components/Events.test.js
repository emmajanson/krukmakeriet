import Events from "./Events";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("test if event component is rendered", () => {
  test("check if event component are rendered", async () => {
    render(<Events />);
    const element = screen.getByTestId("events");
    console.log(element);
    expect(element).toBeInTheDocument();
  });
});