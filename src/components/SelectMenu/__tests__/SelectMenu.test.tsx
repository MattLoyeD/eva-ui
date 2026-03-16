import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SelectMenu } from "../SelectMenu";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

describe("SelectMenu", () => {
  it("renders native options in the default single-select path", () => {
    render(<SelectMenu options={options} />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("handles native selection change", () => {
    const handleChange = vi.fn();
    render(<SelectMenu options={options} onChange={handleChange} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "b" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("shows placeholder and error in native mode", () => {
    render(
      <SelectMenu
        options={options}
        placeholder="Choose one..."
        error="Selection required"
      />
    );

    expect(screen.getByText("Choose one...")).toBeInTheDocument();
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });

  it("renders the custom searchable path and filters options", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <SelectMenu
        label="Priority"
        options={options}
        filter
        onValueChange={handleValueChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: /priority/i }));
    const filterInput = screen.getByRole("textbox", { name: /priority filter/i });
    await user.type(filterInput, "Option B");

    expect(screen.getByRole("option", { name: /Option B/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Option A/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: /Option B/ }));

    expect(handleValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("combobox", { name: /priority/i })).toHaveTextContent(
      "Option B"
    );
  });

  it("shows an empty-state message when search has no matches", async () => {
    const user = userEvent.setup();

    render(<SelectMenu label="Priority" options={options} filter />);

    await user.click(screen.getByRole("combobox", { name: /priority/i }));
    await user.type(
      screen.getByRole("textbox", { name: /priority filter/i }),
      "zzz"
    );

    expect(screen.getByText("NO MATCHES")).toBeInTheDocument();
  });

  it("supports multiple selection, keeps the panel open, and emits array values", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <SelectMenu
        label="Pilots"
        options={options}
        multiple
        onValueChange={handleValueChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: /pilots/i }));
    await user.click(screen.getByRole("option", { name: /Option A/ }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(handleValueChange).toHaveBeenLastCalledWith(["a"]);

    await user.click(screen.getByRole("option", { name: /Option B/ }));

    expect(handleValueChange).toHaveBeenLastCalledWith(["a", "b"]);
    expect(screen.getByRole("combobox", { name: /pilots/i })).toHaveTextContent(
      "Option A"
    );
    expect(screen.getByRole("combobox", { name: /pilots/i })).toHaveTextContent(
      "Option B"
    );
  });

  it("collapses overflowing tags into a +N summary chip", () => {
    render(
      <SelectMenu
        label="Systems"
        multiple
        defaultValue={["alpha", "beta", "gamma", "delta"]}
        options={[
          { value: "alpha", label: "ALPHA-UNIT" },
          { value: "beta", label: "BETA-UNIT" },
          { value: "gamma", label: "GAMMA-UNIT" },
          { value: "delta", label: "DELTA-UNIT" },
        ]}
      />
    );

    const trigger = screen.getByRole("combobox", { name: /systems/i });
    expect(trigger).toHaveTextContent("ALPHA-UNIT");
    expect(trigger).toHaveTextContent("+3");
  });

  it("syncs the hidden native select and fires onChange in custom mode", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { container } = render(
      <SelectMenu
        label="Pilots"
        options={options}
        multiple
        name="pilots"
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: /pilots/i }));
    await user.click(screen.getByRole("option", { name: /Option A/ }));

    const hiddenSelect = container.querySelector(
      'select[name="pilots"][aria-hidden="true"]'
    ) as HTMLSelectElement;

    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));
    expect(Array.from(hiddenSelect.selectedOptions).map((option) => option.value)).toEqual([
      "a",
    ]);
  });

  it("does not select disabled options in custom mode", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <SelectMenu
        label="Priority"
        filter
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B", disabled: true },
        ]}
        onValueChange={handleValueChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: /priority/i }));
    await user.click(screen.getByRole("option", { name: /Option B/ }));

    expect(handleValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("supports keyboard navigation and escape in custom mode", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    const originalConsoleError = console.error;
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation((message, ...args) => {
        if (String(message).includes("not wrapped in act")) {
          return;
        }

        originalConsoleError(message, ...args);
      });

    try {
      render(
        <SelectMenu
          label="Priority"
          options={options}
          filter
          onValueChange={handleValueChange}
        />
      );

      const trigger = screen.getByRole("combobox", { name: /priority/i });
      trigger.focus();

      fireEvent.keyDown(trigger, { key: "ArrowDown" });
      expect(screen.getByRole("listbox")).toBeInTheDocument();

      const filterInput = screen.getByRole("textbox", {
        name: /priority filter/i,
      });
      fireEvent.keyDown(filterInput, { key: "ArrowDown" });
      fireEvent.keyDown(filterInput, { key: "Enter" });
      expect(handleValueChange).toHaveBeenCalledWith("b");
      await waitFor(() =>
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
      );
      await waitFor(() => expect(trigger).toHaveFocus());

      await user.click(trigger);
      fireEvent.keyDown(
        screen.getByRole("textbox", { name: /priority filter/i }),
        { key: "Escape" }
      );
      await waitFor(() =>
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
      );
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
