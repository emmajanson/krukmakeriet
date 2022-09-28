import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CourseItem from "./CourseItem";
import { AllContextProvider } from "../context/AllContext";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

const MockCourseItem = () => {
  return (
    <BrowserRouter>
      <AllContextProvider>
        <CourseItem courseData={course} />
      </AllContextProvider>
    </BrowserRouter>
  );
};
const course = { name: "abc", img: "https" };

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
            <CourseItem courseData={course} />
          </AllContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
