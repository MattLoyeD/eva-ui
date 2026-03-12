import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataGrid } from "../DataGrid";

const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
];

const data = [
  { name: "Unit-01", status: "ACTIVE" },
  { name: "Unit-02", status: "STANDBY" },
];

describe("DataGrid", () => {
  it("renders columns and data", () => {
    render(<DataGrid columns={columns} data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Unit-01")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.getByText("Unit-02")).toBeInTheDocument();
    expect(screen.getByText("STANDBY")).toBeInTheDocument();
  });

  it("shows title when provided", () => {
    render(<DataGrid columns={columns} data={data} title="PILOT ROSTER" />);
    expect(screen.getByText("PILOT ROSTER")).toBeInTheDocument();
  });

  it("shows index column when showIndex=true", () => {
    render(<DataGrid columns={columns} data={data} showIndex />);
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("002")).toBeInTheDocument();
  });

  it("does not show index column by default", () => {
    render(<DataGrid columns={columns} data={data} />);
    expect(screen.queryByText("#")).not.toBeInTheDocument();
  });
});
