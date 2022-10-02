import ShopItem from "./ShopItem";
import {
  render,
  screen,
  cleanup,
  getByText,
  getByTitle,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";

const mockProductData = [
  {
    name: "Testitem",
    id: "test123",
    img: "https://en.wikipedia.org/wiki/Pottery#/media/File:Potter_making_Pottery.jpg",
    price: 100,
  },
  {
    description: "second item",
    completed: false,
  },
  {
    description: "third item",
    completed: false,
  },
];

describe("CheckoutItem", () => {
  test("check if props exist as should", async () => {
    render(
      <>
        <BrowserRouter>
          <AllContextProvider>
            <ShopItem key="1" productData={mockProductData} />{" "}
          </AllContextProvider>
        </BrowserRouter>
      </>
    );

    let itemEle = screen.getByTitle("productItem");
    expect(itemEle).toBeInTheDocument();
  });
});
