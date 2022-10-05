import "@testing-library/jest-dom";
import ResetPassWord from "./ResetPassword";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <ResetPassWord />
    </BrowserRouter>
  );
};

describe("test if resetpassword page is rendered", () => {
  test("does it render?", async () => {
    render(<MockLogin />);
    const element = screen.getByTestId("reset-test");
    expect(element).toBeInTheDocument();
  });
});
