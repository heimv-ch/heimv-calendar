import { autoPlacement, useFloating, useFocus, useInteractions } from "@floating-ui/react";
import { memo, type ReactNode, use, useCallback, useMemo, useRef, useState } from "react";
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
  const middleware = useMemo(() => [autoPlacement()], []);
  const hoverTimeoutRef = useRef<number | null>(null);
  
  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware,
  });

  const focus = useFocus(context, { enabled: hasPopover });
  const { getReferenceProps, getFloatingProps } = useInteractions([focus]);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleReferenceMouseEnter = useCallback(() => {
    clearHoverTimeout();
    setIsOpen(true);
  }, [clearHoverTimeout]);

  const handleReferenceMouseLeave = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [clearHoverTimeout]);

  const handlePopoverMouseEnter = useCallback(() => {
    clearHoverTimeout();
    setIsOpen(true);
  }, [clearHoverTimeout]);

  const handlePopoverMouseLeave = useCallback(() => {
    clearHoverTimeout();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [clearHoverTimeout]);
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
  const ariaLabel = "TODO"

  const props: React.SVGProps<SVGRectElement & SVGPolygonElement> = {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    role: isInteractive ? "button" : undefined,
    "aria-label": isInteractive ? ariaLabel : undefined,
    fill: occupancy.color ?? defaultColor,
    tabIndex: isInteractive ? 0 : -1,
    ref: refs.setReference,
    onMouseEnter: handleReferenceMouseEnter,
    onMouseLeave: handleReferenceMouseLeave,
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
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
          className="occupancy-popover"
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        >
          {renderPopover?.(occupancy)}
        </div>
      )}
    </>
  );
}
