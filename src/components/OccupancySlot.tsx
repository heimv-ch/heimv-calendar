import type { Occupancy as OccupancyType, OccupancySlot as OccupancySlotType } from "../model/occupancy";
import type { ReactNode } from "react";
import { Occupancy } from "./Occupancy";

type OccupancySlotProps = {
	occupancySlot: OccupancySlotType;
	onClick?: (occupancy: OccupancyType) => void;
	renderPopover?: (occupancy: OccupancyType) => ReactNode;
};

export function OccupancySlot({
	onClick,
	occupancySlot: { allDay, forenoon, afternoon },
	renderPopover,
}: OccupancySlotProps) {
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
