import NotFound from "./NotFound";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test if NotFound renders", () => {
  test("Checks if NotFound renders", async () => {
    render(<NotFound />);
    const element = screen.getByTestId("notFound");
    expect(element).toBeInTheDocument();
  });
});
