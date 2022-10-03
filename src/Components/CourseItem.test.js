import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CourseItem from "./CourseItem";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

const mockCourseData = [
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
const MockCourseItem = () => {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <CourseItem courseData={mockCourseData} />
      </AllContextProvider>
    </BrowserRouter>
  );
};

describe("CourseItem", () => {
  test("check if props exist as should", async () => {
    render(<MockCourseItem />);
    const routeForCourseItem = screen.getByTestId("courseItem");
    expect(routeForCourseItem).toBeInTheDocument();
  });

  test("Matches DOM Snapshot", () => {
    const domTree = renderer
      .create(
        <BrowserRouter>
          <AllContextProvider>
            <CourseItem courseData={mockCourseData} />
          </AllContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
