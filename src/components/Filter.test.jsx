import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Filter from "./Filter";

const mockStore = configureStore();
vi.mock("../redux/slices/jobSlice", () => ({
  filterBySearch: vi.fn(),
  sortJobs: vi.fn(),
  clearFilters: () => ({ type: "jobs/clearFilters" }),
}));

describe("Filter Component UI Tests", () => {
  let store;
  let jobs;

  beforeEach(() => {
    jobs = [
      { company: "Example Co" },
      { company: "Another Co" },
    ];

    store = mockStore({});

    render(
      <Provider store={store}>
        <Filter jobs={jobs} />
      </Provider>
    );
  });

  it("renders filter form correctly", () => {
    expect(screen.getByText("Filtreleme Formu")).toBeInTheDocument();
    expect(screen.getByLabelText("Şirket ismine göre ara:")).toBeInTheDocument();
    expect(screen.getByLabelText("Durum")).toBeInTheDocument();
    expect(screen.getByLabelText("Tür")).toBeInTheDocument();
    expect(screen.getByLabelText("Sırala")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Filtreleri Sıfırla/i })).toBeInTheDocument();
  });

  it("updates text input and triggers search dispatch", async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText("Şirket ismine göre ara:");

    await user.type(input, "Example");
    expect(input).toHaveValue("Example");

    setTimeout(() => {
      expect(store.getActions()).toContainEqual({
        type: "jobs/filterBySearch",
        payload: { field: "company", text: "Example" },
      });
    }, 500);
  });

  it("dispatches clearFilters on reset button click", async () => {
    const user = userEvent.setup();
    const resetButton = screen.getByRole("button", { name: /Filtreleri Sıfırla/i });

    await user.click(resetButton);

    expect(store.getActions()).toContainEqual({ type: "jobs/clearFilters" });
  });
});
