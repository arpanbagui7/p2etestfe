export interface IEventRes {
  status: number;
  error: null;
  content: {
    events: IEvent[];
  };
}

export interface IEvent {
  id: string;
  eventStartTime: string;
  eventEndTime: string;
  slotNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISlotRes {
  status: number;
  error: null;
  content: ISlot;
}

export interface ISlot {
  availableSlots: string[];
}
