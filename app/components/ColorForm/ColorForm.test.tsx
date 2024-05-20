import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorForm from "./ColorForm";

describe("ColorForm", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  it("allows entering a color name and hex code", () => {
    render(<ColorForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.change(screen.getByLabelText("Color Name:"), {
      target: { value: "Green" },
    });
    fireEvent.change(screen.getByLabelText("HEX Code:"), {
      target: { value: "#00ff00" },
    });

    expect(screen.getByDisplayValue("Green")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#00ff00")).toBeInTheDocument();
  });

  it("calls onSave with the color data when form is submitted", () => {
    render(<ColorForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.change(screen.getByLabelText("Color Name:"), {
      target: { value: "Green" },
    });
    fireEvent.change(screen.getByLabelText("HEX Code:"), {
      target: { value: "#00ff00" },
    });
    fireEvent.submit(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({ name: "Green", hex: "#00ff00" });
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(<ColorForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
