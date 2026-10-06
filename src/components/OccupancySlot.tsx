import type { ReactNode } from "react";
import type { OccupancySlot as OccupancySlotType, Occupancy as OccupancyType } from "../model/occupancy";
import { CalendarOccupancy } from "./CalendarOccupancy";

type OccupancySlotProps<O> = {
  occupancySlot: OccupancySlotType<O>;
  onClick?: (occupancy: OccupancyType<O>) => void;
  renderPopover?: (occupancy: OccupancyType<O>) => ReactNode;
};

export function OccupancySlot<O>({
  onClick,
  occupancySlot: { allDay, forenoon, afternoon },
  renderPopover,
}: OccupancySlotProps<O>) {
  return (
    <>
      {allDay ? (
        <CalendarOccupancy occupancy={allDay} type="allDay" onClick={onClick} renderPopover={renderPopover} />
      ) : (
        <>
          {forenoon && (
            <CalendarOccupancy occupancy={forenoon} type="forenoon" onClick={onClick} renderPopover={renderPopover} />
          )}
          {afternoon && (
            <CalendarOccupancy occupancy={afternoon} type="afternoon" onClick={onClick} renderPopover={renderPopover} />
          )}
        </>
      )}
    </>
  );
}
