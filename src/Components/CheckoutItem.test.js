import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CheckoutItem from "./CheckoutItem";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

const mockProductData = [
  {
    name: "skål",
    id: "test123",
    img: "https",
  },
];
const MockCheckoutItem = () => {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <CheckoutItem productData={mockProductData} />
      </AllContextProvider>
    </BrowserRouter>
  );
};

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
            <CheckoutItem productData={mockProductData} />
          </AllContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
  // test("check if onclick on increment button the amount changes", async () => {
  //   render(<MockCheckoutItem />);
  //   const incrementBtn = screen.getByTestId("incrementBtn");
  //   const counterText = screen.getByText("0");
  //   expect(counterText.child).toHaveTextContent("0");
  //   fireEvent.click(incrementBtn);
  //   console.log();
  //   expect(counterText.textContent).toMatch("1");
  // });

  // test("check if onclick on decrement button the amount changes", async () => {
  //   render(<MockCheckoutItem />);
  //   const decremetnBtn = screen.getByTestId("decrementBtn");
  //   const counterText = screen.getByTestId("counterText");
  //   console.log(counterText.textContent);
  //   expect(counterText).toHaveTextContent("1");
  //   console.log(counterText.textContent);
  //   fireEvent.click(decremetnBtn);
  //   expect(counterText).toHaveTextContent("");
  // });
});
