import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EvaAccordion, EvaAccordionItem } from "../EvaAccordion";

describe("EvaAccordion", () => {
  it("renders items", () => {
    render(
      <EvaAccordion>
        <EvaAccordionItem id="1" title="Section One">
          Content one
        </EvaAccordionItem>
        <EvaAccordionItem id="2" title="Section Two">
          Content two
        </EvaAccordionItem>
      </EvaAccordion>
    );
    expect(screen.getByText("Section One")).toBeInTheDocument();
    expect(screen.getByText("Section Two")).toBeInTheDocument();
  });

  it("toggles item open/close on click", () => {
    render(
      <EvaAccordion>
        <EvaAccordionItem id="1" title="Section One">
          Content one
        </EvaAccordionItem>
      </EvaAccordion>
    );
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();
  });

  it("multiple mode allows multiple open", () => {
    render(
      <EvaAccordion multiple>
        <EvaAccordionItem id="1" title="Section One">
          Content one
        </EvaAccordionItem>
        <EvaAccordionItem id="2" title="Section Two">
          Content two
        </EvaAccordionItem>
      </EvaAccordion>
    );

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section Two"));
    expect(screen.getByText("Content one")).toBeInTheDocument();
    expect(screen.getByText("Content two")).toBeInTheDocument();
  });

  it("single mode closes previous when opening new", () => {
    render(
      <EvaAccordion>
        <EvaAccordionItem id="1" title="Section One">
          Content one
        </EvaAccordionItem>
        <EvaAccordionItem id="2" title="Section Two">
          Content two
        </EvaAccordionItem>
      </EvaAccordion>
    );

    fireEvent.click(screen.getByText("Section One"));
    expect(screen.getByText("Content one")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Section Two"));
    expect(screen.queryByText("Content one")).not.toBeInTheDocument();
    expect(screen.getByText("Content two")).toBeInTheDocument();
  });
});
