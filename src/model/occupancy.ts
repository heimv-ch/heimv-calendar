export type Occupancy = {
  key: string;
  beginsAt: Date;
  endsAt: Date;
  occupancyType: "free" | "tentative" | "occupied" | "closed";
  color?: string;
}