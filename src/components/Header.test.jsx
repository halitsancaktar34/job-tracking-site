import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header Component Tests", () => {
  it("renders header title correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("İş Takip")).toBeInTheDocument();
  });

  it("renders navigation links correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const jobListLink = screen.getByText("İş Listesi");
    const addJobLink = screen.getByText("İş Ekle");

    expect(jobListLink).toBeInTheDocument();
    expect(jobListLink).toHaveAttribute("href", "/");

    expect(addJobLink).toBeInTheDocument();
    expect(addJobLink).toHaveAttribute("href", "/add");
  });

  it("applies active class to the active link", () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Header />
      </MemoryRouter>
    );

    const addJobLink = screen.getByText("İş Ekle");
    expect(addJobLink).toHaveClass("active");
  });
});
