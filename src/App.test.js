import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

async function getDb() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    return doc.data();
  });
}

jest.setTimeout(100000);

describe("testing LogIn component", () => {
  // When Document written to '/TestCollection/{DocumentId}' , trigger function to copy it to '/Copies/{DocumentId}
  test("Expect to find users and display", async () => {
    render(<App />);

    const user = await screen.findByTestId("user");
    console.log(user);
    expect(user).toBeInTheDocument();
  });
});
