import { fireEvent, render, screen } from "@testing-library/react";
import { formatISO } from "date-fns";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "../Calendar";

describe("Calendar", () => {
  it("allows interactive dates to be clicked", () => {
    const onDateClick = vi.fn();

    render(
      <Calendar
        mode="interactive"
        firstDate={new Date(2025, 0, 1)}
        onDateClick={onDateClick}
        occupancyOfDate={() => undefined}
      />,
    );

    const dateButton = screen.getAllByRole("button").find((button) => button.textContent === "1");

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected a date button labeled 1 to be present");
    }
    expect(dateButton).not.toBeDisabled();

    fireEvent.click(dateButton);

    expect(onDateClick).toHaveBeenCalledWith(new Date(2025, 0, 1));
  });

  it("calls the range callback with the selected start and end dates in ascending order", () => {
    const onSelectRange = vi.fn();

    render(
      <Calendar
        mode="range"
        firstDate={new Date(2025, 0, 1)}
        selectedRange={[new Date(2025, 0, 10), undefined]}
        onSelectRange={onSelectRange}
      />,
    );

    const dateButton = screen.getAllByRole("button").find((button) => button.textContent === "15");

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected a date button labeled 15 to be present");
    }
    expect(dateButton).not.toBeDisabled();

    fireEvent.click(dateButton);

    expect(onSelectRange).toHaveBeenCalledWith([new Date(2025, 0, 10), new Date(2025, 0, 15)]);
  });

  it("normalizes reverse-order range selection", () => {
    const onSelectRange = vi.fn();

    render(
      <Calendar
        mode="range"
        firstDate={new Date(2025, 0, 1)}
        selectedRange={[new Date(2025, 0, 10), undefined]}
        onSelectRange={onSelectRange}
      />,
    );

    const dateButton = screen.getAllByRole("button").find((button) => button.textContent === "5");

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected a date button labeled 5 to be present");
    }

    fireEvent.click(dateButton);

    expect(onSelectRange).toHaveBeenCalledWith([new Date(2025, 0, 5), new Date(2025, 0, 10)]);
  });

  it("supports selecting the same date as start and end", () => {
    const onSelectRange = vi.fn();

    render(
      <Calendar
        mode="range"
        firstDate={new Date(2025, 0, 1)}
        selectedRange={[new Date(2025, 0, 10), undefined]}
        onSelectRange={onSelectRange}
      />,
    );

    const dateButton = screen.getAllByRole("button").find((button) => button.textContent === "10");

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected a date button labeled 10 to be present");
    }

    fireEvent.click(dateButton);

    expect(onSelectRange).toHaveBeenCalledWith([new Date(2025, 0, 10), new Date(2025, 0, 10)]);
  });

  it("does not call range callback when date is disabled", () => {
    const onSelectRange = vi.fn();

    render(
      <Calendar
        mode="range"
        firstDate={new Date(2025, 0, 1)}
        selectedRange={[new Date(2025, 0, 10), undefined]}
        onSelectRange={onSelectRange}
        disableDate={(date) => date.getDate() === 15}
      />,
    );

    const dateButton = screen.getAllByRole("button").find((button) => button.textContent === "15");

    expect(dateButton).toBeDefined();
    if (!dateButton) {
      throw new Error("Expected a date button labeled 15 to be present");
    }

    expect(dateButton).toBeDisabled();
    fireEvent.click(dateButton);

    expect(onSelectRange).not.toHaveBeenCalled();
  });

  it("supports keyboard activation for occupancy actions", () => {
    const onOccupancyClick = vi.fn();
    const occupancies = new Map([
      [
        "2025-01-01",
        {
          allDay: {
            key: "occ-1",
            amount: 2,
          },
        },
      ],
    ]);

    render(
      <Calendar
        mode="interactive"
        firstDate={new Date(2025, 0, 1)}
        occupancyOfDate={(date) => occupancies.get(formatISO(date, { representation: "date" }))}
        onOccupancyClick={onOccupancyClick}
      />,
    );

    const occupancyButton = screen.getByRole("button", { name: "All day occupancy, amount 2" });

    fireEvent.keyDown(occupancyButton, { key: "Enter" });

    expect(onOccupancyClick).toHaveBeenCalledWith({ key: "occ-1", amount: 2 });
  });
});
