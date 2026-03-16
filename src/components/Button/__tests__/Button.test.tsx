import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    const button = container.querySelector("button");
    expect(button?.className).toContain("border-nerv-red");
  });

  it("calls onClick handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled state prevents click", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("loading state shows loading indicator and hides content", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    const contentSpan = screen.getByText("Submit");
    expect(contentSpan.className).toContain("invisible");
    expect(button).toBeDisabled();
  });

  it("loading state adds aria-busy and aria-disabled", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });
});
