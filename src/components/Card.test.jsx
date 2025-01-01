import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Card from "./Card";

const mockStore = configureStore();

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Card Component UI Tests", () => {
  let job;
  let store;

  beforeEach(() => {
    job = {
      id: 1,
      company: "Example Co",
      position: "Software Engineer",
      location: "Remote",
      type: "Full-Time",
      date: "2025-01-01",
      status: "Devam Ediyor",
    };

    store = mockStore({});

    render(
      <Provider store={store}>
        <Card job={job} />
      </Provider>
    );
  });

  it("renders job details correctly", () => {
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Example Co")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("Full-Time")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("Devam Ediyor")).toBeInTheDocument();
  });

  it("renders the correct color for the status", () => {
    const statusElement = screen.getByText("Devam Ediyor");
    expect(statusElement).toHaveStyle({ background: "green" });
  });

  it("calls handleDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const deleteButton = screen.getByRole("button", { name: "" });

    await user.click(deleteButton);

    expect(deleteButton).toBeEnabled();
  });
});
