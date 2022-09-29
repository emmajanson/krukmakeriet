import "@testing-library/jest-dom";
import SignIn from "./SignIn";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { AllContextProvider } from "../context/AllContext";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <SignIn />
      </AllContextProvider>
    </BrowserRouter>
  );
};

describe("testing LogIn component", () => {
  test("email-input should be in the document", () => {
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText(/exempel@exempel.se/i);
    expect(inputElement).toBeInTheDocument();
  });
  test("Check for relation between email-label and email-input", () => {
    render(<MockLogin />);
    const inputElement = screen.getByLabelText(/E-postadress/i);
    expect(inputElement.getAttribute("name")).toBe("email");
  });
  test("email input accept text", async () => {
    render(<MockLogin />);
    const emailInput = screen.getByLabelText(/E-postadress/i);
    expect(emailInput.value).toMatch("");
    fireEvent.change(emailInput, { target: { value: "testing" } });
    expect(await emailInput.value).toMatch("testing");
  });
  test("passwordinput should be in the document", async () => {
    render(<MockLogin />);
    const inputElement = await screen.findByPlaceholderText("********");
    expect(inputElement).toBeInTheDocument();
  });
  test("Check for relation between password-label and password-input", () => {
    render(<MockLogin />);
    const inputElement = screen.getByLabelText(/Lösenord/i);
    expect(inputElement.getAttribute("name")).toBe("password");
  });
  test("password input accept text", async () => {
    render(<MockLogin />);
    const passwordInput = screen.getByLabelText(/Lösenord/i);
    expect(passwordInput.value).toMatch("");
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    expect(await passwordInput.value).toMatch("test123");
  });
});
