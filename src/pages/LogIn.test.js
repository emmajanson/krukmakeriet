import "@testing-library/jest-dom";
import LogIn, {validateEmail} from './LogIn'
import { BrowserRouter } from "react-router-dom"

import { render,screen } from "@testing-library/react";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <LogIn />
    </BrowserRouter>
  );
};



describe("testing LogIn component", () => {
  test("validation that should pass on correct email-input",  () => {
  const text = 'text@text.com'
  expect(validateEmail(text)).toBe(true)
  
  })

  test("validation that should fail on incorrect email-input",  () => {
    const text = 'text.com'
    expect(validateEmail(text)).not.toBe(true)
    
    })

    test("login form should be in the document", () => {
    // Check for element with the placeholder text "Enter E-mail"
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText(/Enter E-mail.../i);
    expect(inputElement).toBeInTheDocument();

  });

  test("Check for relation between label and input", () => {
    // email-input should have a label 
    render(<MockLogin />);
    const inputElement = screen.getByLabelText(/E-mail/i);
    expect(inputElement.getAttribute("name")).toBe("email")

  });

  test("are forms correctly filled out", () => {
  });

});
