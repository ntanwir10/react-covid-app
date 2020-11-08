import { render, screen } from "@testing-library/react";
import App from "./App";

test("Covid tracker built using react", () => {
  render(<App />);
  const linkElement = screen.getByText(/Covid tracker built using react/i);
  expect(linkElement).toBeInTheDocument();
});
