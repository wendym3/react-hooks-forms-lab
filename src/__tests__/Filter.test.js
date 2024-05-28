import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; 
import ShoppingList from "../components/ShoppingList";

const testData = [
  { name: "Swiss Cheese", category: "Dairy" },
  { name: "String Cheese", category: "Dairy" },
  { name: "Lettuce", category: "Produce" },
  { name: "Yogurt", category: "Dairy" },
];

test("the shopping list displays all items when initially rendered", () => {
  const { container } = render(<ShoppingList items={testData} />);
  expect(container.querySelectorAll("li").length).toBe(testData.length);
});

test("the shopping list filters based on the search term to include partial matches", () => {
  render(<ShoppingList items={testData} />);

  fireEvent.change(screen.getByPlaceholderText(/Search/), { target: { value: "cheese" } });

  expect(screen.queryByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.queryByText("String Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});
