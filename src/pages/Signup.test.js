import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, act } from "@testing-library/react";
import SignUp from "./SignUp";
import { AllContextProvider } from "../context/AllContext";

const MockSignup = () => {
  return (
    <AllContextProvider>
      <BrowserRouter>
        <SignUp />;
      </BrowserRouter>
    </AllContextProvider>
  );
};

describe("testing signup form", () => {
  test("name-input should be in the document", () => {
    render(<MockSignup />);

    const inputElement = screen.getByPlaceholderText("Förnamn Efternamn");
    expect(inputElement).toBeInTheDocument();
  });

  test("Check for relation between name-label and name-input", () => {
    render(<MockSignup />);

    const inputElement = screen.getByLabelText("Namn");
    expect(inputElement.getAttribute("name")).toBe("name");
  });

  test("name-input accept text", () => {
    render(<MockSignup />);

    const emailInput = screen.getByLabelText("Namn");
    expect(emailInput.value).toMatch("");
    fireEvent.change(emailInput, { target: { value: "Arne" } });
    expect(emailInput.value).toMatch("Arne");
  });

  test("email-input should be in the document", () => {
    render(<MockSignup />);
    const inputElement = screen.getByPlaceholderText("exempel@exempel.se");
    expect(inputElement).toBeInTheDocument();
  });

  test("Check for relation between email-label and email-input", () => {
    render(<MockSignup />);

    const inputElement = screen.getByLabelText("E-postadress");
    expect(inputElement.getAttribute("name")).toBe("email");
  });

  test("email-input accept text", () => {
    render(<MockSignup />);

    const emailInput = screen.getByLabelText("E-postadress");
    expect(emailInput.value).toMatch("");
    fireEvent.change(emailInput, { target: { value: "hanna@email.com" } });
    expect(emailInput.value).toMatch("hanna@email.com");
  });

  test("password-input should be in the document", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Lösenord");
    expect(inputElement).toBeInTheDocument();
  });

  test("Check for relation between password-label and password-input", () => {
    render(<MockSignup />);

    const inputElement = screen.getByLabelText("Lösenord");
    expect(inputElement.getAttribute("name")).toBe("password");
  });

  test("password input accept text", () => {
    render(<MockSignup />);

    const inputElement = screen.getByLabelText("Lösenord");
    expect(inputElement.value).toMatch("");
    fireEvent.change(inputElement, { target: { value: "password" } });
    expect(inputElement.value).toMatch("password");
  });

  test("confirm-password-input should be in the document", () => {
    render(<MockSignup />);

    const inputElement = screen.getByTestId("confirm");
    expect(inputElement).toBeInTheDocument();
  });

  test("Check for relation between confirm-password-label and confirm-password-input", () => {
    render(<MockSignup />);
    const inputElement = screen.getByLabelText("Upprepa lösenord");
    expect(inputElement.getAttribute("name")).toBe("confirm-password");
  });

  test("confirm-password input accept text", () => {
    render(<MockSignup />);
    const inputElement = screen.getByTestId("confirm");
    expect(inputElement.textContent).toMatch("");
    fireEvent.change(inputElement, { target: { textContent: "password" } });
    expect(inputElement.textContent).toMatch("password");
  });
});
