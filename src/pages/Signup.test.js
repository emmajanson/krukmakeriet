import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, act } from "@testing-library/react";
import SignUp from "./SignUp";
import { AllContextProvider } from "../context/AllContext";

const MockLogin = () => {
  // mock becuse of usenavigate needs to be surrounded by browserRouter
  return (
    <AllContextProvider>
      <BrowserRouter>
        <SignUp />;
      </BrowserRouter>
    </AllContextProvider>
  );
};

describe("testing LogIn component", () => {
  test("signup form should be in the document", () => {
    // Check for element with the placeholder text "Enter E-mail"

    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText("Enter your email...");
    expect(inputElement).toBeInTheDocument();
  });

  // test("Check for relation between email-label and email-input", () => {
  //   // email-input should have a label

  //   render(<MockLogin />);

  //   const inputElement = screen.getByLabelText(/E-mail/i);
  //   expect(inputElement.getAttribute("name")).toBe("email");
  // });

  // test("email input accept text", () => {
  //   render(<MockLogin />);
  //   const emailInput = screen.getByLabelText(/E-mail/i);
  //   //värdet förväntas vara tomt
  //   expect(emailInput.value).toMatch("");
  //   // kör igång event som ändrar input värdet
  //   fireEvent.change(emailInput, { target: { value: "hanna@email.com" } });
  //   // värdet förväntas matcha "testing"
  //   expect(emailInput.value).toMatch("hanna@email.com");
  // });
});
