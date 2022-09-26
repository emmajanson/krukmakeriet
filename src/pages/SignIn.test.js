import "@testing-library/jest-dom";
import SignIn from "./SignIn";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { AllContextProvider } from "../context/AllContext";

const MockLogin = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <BrowserRouter>
      <AllContextProvider>
        <SignIn />
      </AllContextProvider>
    </BrowserRouter>
  );
};

describe("testing LogIn component", () => {
  test("login form should be in the document", async () => {
    // Check for element with the placeholder text "Enter E-mail"
    render(<MockLogin />);
    const inputElement = await screen.findByPlaceholderText("Enter E-mail...");
    expect(inputElement).toBeInTheDocument();
  });

  test("Check for relation between email-label and email-input", () => {
    // email-input should have a label
    render(<MockLogin />);
    const inputElement = screen.getByLabelText(/E-mail/i);
    expect(inputElement.getAttribute("name")).toBe("email");
  });

  test("email input accept text", async () => {
    render(<MockLogin />);
    const emailInput = screen.getByLabelText(/E-mail/i);
    //värdet förväntas vara tomt
    expect(emailInput.value).toMatch("");
    // kör igång event som ändrar input värdet
    fireEvent.change(emailInput, { target: { value: "testing" } });
    // värdet förväntas matcha "testing"
    expect(await emailInput.value).toMatch("testing");
  });
});
