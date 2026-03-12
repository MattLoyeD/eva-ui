import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InputField } from "../InputField";

describe("InputField", () => {
  it("renders with label", () => {
    render(<InputField label="Username" />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  it("controlled value works", () => {
    const { rerender } = render(<InputField value="hello" readOnly />);
    const input = screen.getByDisplayValue("hello");
    expect(input).toBeInTheDocument();
    rerender(<InputField value="world" readOnly />);
    expect(screen.getByDisplayValue("world")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<InputField error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("shows hint when no error", () => {
    render(<InputField hint="Enter your name" />);
    expect(screen.getByText("Enter your name")).toBeInTheDocument();
  });

  it("hides hint when error is present", () => {
    render(<InputField hint="Enter your name" error="Required" />);
    expect(screen.queryByText("Enter your name")).not.toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
