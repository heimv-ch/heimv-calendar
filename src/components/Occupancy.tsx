import { autoPlacement, useFloating, useFocus, useHover, useInteractions } from "@floating-ui/react";
import { type ReactNode, use, useState } from "react";
import type { OccupancySlot, Occupancy as OccupancyType } from "../model/occupancy";
import { CalendarStateContext } from "./CalendarStateContext";

type OccupancyProps<O> = {
  type: keyof OccupancySlot<O>;
  occupancy: OccupancyType<O>;
  renderPopover?: (occupancy: OccupancyType<O>) => ReactNode;
  onClick?: () => void;
};

const occupancyTypeClassNames: Record<OccupancyProps<unknown>["type"], string> = {
  allDay: "all-day",
  afternoon: "afternoon",
  forenoon: "forenoon",
};

export function Occupancy<O>({ type, occupancy, renderPopover, onClick }: OccupancyProps<O>) {
  const [isOpen, setIsOpen] = useState(false);

  const { defaultColor } = use(CalendarStateContext);

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
      if (!onClick) return;

      e.stopPropagation();
      onClick();
    },
    fill: occupancy.color ?? defaultColor,
    tabIndex: 0,
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
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: dont display a title */}
      <svg className={occupancyTypeClassNames[type]} viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
        {getSlot()}
      </svg>
      {occupancy.amount && <span className="occupancy-amount">{occupancy.amount}</span>}

      {isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className="occupancy-popover">
          {renderPopover?.(occupancy)}
        </div>
      )}
    </>
  );
}
