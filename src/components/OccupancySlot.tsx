import type { ReactNode } from "react";
import type { OccupancySlot as OccupancySlotType, Occupancy as OccupancyType } from "../model/occupancy";
import { Occupancy } from "./Occupancy";

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
        <Occupancy
          occupancy={allDay}
          type="allDay"
          onClick={onClick ? () => onClick(allDay) : undefined}
          renderPopover={renderPopover}
        />
      ) : (
        <>
          {forenoon && (
            <Occupancy
              occupancy={forenoon}
              type="forenoon"
              onClick={onClick ? () => onClick(forenoon) : undefined}
              renderPopover={renderPopover}
            />
          )}
          {afternoon && (
            <Occupancy
              occupancy={afternoon}
              type="afternoon"
              onClick={onClick ? () => onClick?.(afternoon) : undefined}
              renderPopover={renderPopover}
            />
          )}
        </>
      )}
    </>
  );
}
