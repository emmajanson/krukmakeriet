import "@testing-library/jest-dom";
import Profile from "./Profile";
import { render, screen } from "@testing-library/react";

describe("test if profile page is rendered", () => {
  test("does it render?", async () => {
    render(<Profile />);
    const element = screen.getByTestId("profile-test");
    expect(element).toBeInTheDocument();
  });
});
