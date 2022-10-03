import ShopItem from "./ShopItem";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";

const mockProductData = {
  name: "Testitem",
  id: "test123",
  img: "https://en.wikipedia.org/wiki/Pottery#/media/File:Potter_making_Pottery.jpg",
  price: 100,
};

describe("ShopItem", () => {
  test("check if props exist and are rendered", async () => {
    render(
      <>
        <BrowserRouter>
          <AllContextProvider>
            <ShopItem key="1" productData={mockProductData} />
          </AllContextProvider>
        </BrowserRouter>
      </>
    );

    let itemEle = screen.getByTitle("productItem");
    let nameExist = screen.getByText(/Testitem/i);

    expect(itemEle).toBeInTheDocument();
    expect(nameExist).toBeInTheDocument();
    expect(nameExist).toHaveTextContent(/Testitem/i);
  });
});
