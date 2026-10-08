import {
  autoPlacement,
  flip,
  offset,
  safePolygon,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { type ReactNode, use, useCallback, useMemo, useState } from "react";
import type { OccupancySlot, Occupancy as OccupancyType } from "../model/occupancy";
import { CalendarStateContext } from "./CalendarStateContext";

type OccupancyProps<O> = {
  type: keyof OccupancySlot<O>;
  occupancy: OccupancyType<O>;
  renderPopover?: (occupancy: OccupancyType<O>) => ReactNode;
  onClick?: (occupancy: OccupancyType<O>) => void;
};

const occupancyTypeClassNames: Record<OccupancyProps<unknown>["type"], string> = {
  allDay: "all-day",
  afternoon: "afternoon",
  forenoon: "forenoon",
};

export function CalendarOccupancy<O>({ type, occupancy, renderPopover, onClick }: OccupancyProps<O>) {
  const [isOpen, setIsOpen] = useState(false);
  const hasPopover = !!renderPopover;
  const isInteractive = hasPopover || !!onClick;
  const { defaultColor } = use(CalendarStateContext);
  const middleware = useMemo(() => [offset(4), flip(), autoPlacement({ allowedPlacements: ["bottom", "top"] })], []);

  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware,
  });

  const hover = useHover(context, {
    enabled: hasPopover,
    // move: false,
    restMs: 100,
    handleClose: safePolygon({ blockPointerEvents: false }),
  });
  const focus = useFocus(context, { enabled: hasPopover });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus]);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGRectElement | SVGPolygonElement>) => {
      if (!onClick) return;

      e.stopPropagation();
      onClick(occupancy);
    },
    [onClick, occupancy],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGRectElement | SVGPolygonElement>) => {
      if (!onClick || (e.key !== "Enter" && e.key !== " ")) return;

      e.preventDefault();
      e.stopPropagation();
      onClick(occupancy);
    },
    [onClick, occupancy],
  );

  // const ariaLabel = occupancy.amount
  //   ? `${occupancyTypeLabels[type]}, amount ${occupancy.amount}`
  //   : occupancyTypeLabels[type];
  const ariaLabel = "TODO";

  const props: React.SVGProps<SVGRectElement & SVGPolygonElement> = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    role: isInteractive ? "button" : undefined,
    "aria-label": isInteractive ? ariaLabel : undefined,
    fill: occupancy.color ?? defaultColor,
    tabIndex: isInteractive ? 0 : -1,
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

      {hasPopover && isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className="occupancy-popover">
          {renderPopover?.(occupancy)}
        </div>
      )}
    </>
  );
}
