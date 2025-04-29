export type Occupancy = {
  key: string;
  color?: string;
}

export type OccupancySlot = {
  allDay?: Occupancy,
  forenoon?: Occupancy,
  afternoon?: Occupancy
}