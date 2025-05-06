export type Occupancy<O> = {
	key: string;
	color?: string;
	amount?: number;
	data?: O;
};

export type OccupancySlot<O> = {
	allDay?: Occupancy<O>;
	forenoon?: Occupancy<O>;
	afternoon?: Occupancy<O>;
};
