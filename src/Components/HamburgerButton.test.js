import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HamburgerButton from "./HamburgerButton";

describe("Test if hamburgerbtn renders", () => {
  test("Checks if it actually renders", async () => {
    render(<HamburgerButton />);
    const element = screen.getByTestId("hamburgurbtn");
    console.log(element);
    expect(element).toBeInTheDocument();
  });
});
