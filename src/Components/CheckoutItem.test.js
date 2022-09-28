import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutItem from "./CheckoutItem";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

const MockCheckoutItem = () => {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <CheckoutItem productData={product} />
      </AllContextProvider>
    </BrowserRouter>
  );
};
const product = { name: "skål", img: "https" };

describe("CheckoutItem", () => {
  test("check if props exist as should", async () => {
    render(<MockCheckoutItem />);
    const routeForCheckoutItem = screen.getByTestId("checkoutItem");
    expect(routeForCheckoutItem).toBeInTheDocument();
  });
  test("create a snapshot to test the rendering of element", async () => {
    const domTree = renderer
      .create(
        <BrowserRouter>
          <AllContextProvider>
            <CheckoutItem productData={product} />
          </AllContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });

  test("check if onclick on increment button the amount changes", async () => {
    render(<MockCheckoutItem />);
    const incrementBtn = screen.getByTestId("incrementBtn");
    const counterText = screen.getByTestId("counterText");
    expect(counterText).toHaveTextContent("");
    userEvent.click(incrementBtn);
    expect(counterText).toHaveTextContent("1");
  });

  test("check if onclick on decrement button the amount changes", async () => {
    render(<MockCheckoutItem />);
    const decremetnBtn = screen.getByTestId("decrementBtn");
    const counterText = screen.getByTestId("counterText");
    expect(counterText).toHaveTextContent("1");
    userEvent.click(decremetnBtn);
    expect(counterText).toHaveTextContent("");
  });
});
