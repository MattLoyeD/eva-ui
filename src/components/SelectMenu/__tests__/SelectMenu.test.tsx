import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SelectMenu } from "../SelectMenu";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

describe("SelectMenu", () => {
  it("renders options", () => {
    render(<SelectMenu options={options} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("handles selection change", () => {
    const handleChange = vi.fn();
    render(<SelectMenu options={options} onChange={handleChange} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "b" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows placeholder", () => {
    render(<SelectMenu options={options} placeholder="Choose one..." />);
    expect(screen.getByText("Choose one...")).toBeInTheDocument();
  });

  it("shows error", () => {
    render(<SelectMenu options={options} error="Selection required" />);
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });
});
