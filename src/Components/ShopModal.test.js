import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ShopItem from "../Components/ShopItem";
import { AllContextProvider } from "../context/AllContext";

const mockProductData = {
    name: "Testitem",
    id: "test123",
    img: "https://en.wikipedia.org/wiki/Pottery#/media/File:Potter_making_Pottery.jpg",
    price: 100,
};

//test block
test("close shop modal", () => {
    // render the component on virtual dom
    render(
    <>
        <BrowserRouter>
            <AllContextProvider>
                <ShopItem key="1" productData={mockProductData} />
            </AllContextProvider>
        </BrowserRouter>
    </>
    );

    let shopModal = screen.queryByTestId("shopModal");
    expect(shopModal).toBeNull();

    let shopItem = screen.queryByTestId("shopItem");
    expect(shopItem).toBeInTheDocument();
});