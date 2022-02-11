import { act, render, screen } from "@testing-library/react";
import App from "./App";

const data = [
  {
    rocketName: "Falcon 9",
  },
  {
    rocketName: "Dragon",
    launchSite: "Vandenberg Air Force Base",
  },
];

beforeEach(() => {
  fetch.resetMocks();
});

test("displays a list of launches", async () => {
  fetch.mockResponseOnce(JSON.stringify({ data }));
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText(/falcon 9/i)).toBeInTheDocument();
  expect(screen.getByText(/dragon/i)).toBeInTheDocument();
  expect(screen.getByText(/Vandenberg Air Force Base/i)).toBeInTheDocument();
});
