import { autoPlacement, useFloating, useFocus, useHover, useInteractions } from "@floating-ui/react";
import type { Occupancy as OccupancyType, OccupancySlot } from "../model/occupancy";
import { type ReactNode, useState } from "react";
import { defaults } from "../config";

type OccupancyProps = {
	type: keyof OccupancySlot;
	occupancy: OccupancyType;
	renderPopover?: (occupancy: OccupancyType) => ReactNode;
	onClick?: () => void;
};

export function Occupancy({ type, occupancy, renderPopover, onClick }: OccupancyProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { refs, context, floatingStyles } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [autoPlacement()],
	});

	const hover = useHover(context);
	const focus = useFocus(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus]);

	const props: React.SVGProps<SVGRectElement & SVGPolygonElement> = {
		onClick: (e) => {
			e.stopPropagation();
			onClick?.();
		},
		fill: occupancy.color ?? defaults.color,
		ref: refs.setReference,
		...getReferenceProps(),
	};

	const getSlot = () => {
		switch (type) {
			case "allDay":
				return <rect y="0" x="0" width="48" height="48" {...props} />;
			case "forenoon":
				return <polygon points="0,0 0,46 46,0" {...props} />;
			case "afternoon":
				return <polygon points="48,0 48,48 0,48" {...props} />;
		}
	};

	return (
		<>
			<svg viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
				<title>{type}</title>
				{getSlot()}
			</svg>
			{isOpen && (
				<div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className="occupancy-popover">
					{renderPopover?.(occupancy)}
				</div>
			)}
		</>
	);
}
