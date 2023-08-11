import { IEventRes, ISlotRes } from "@/interface/event.interface"
import axios from "axios";

export const getEvents = async (
  eventStartDate: string,
  eventEndDate: string
): Promise<IEventRes> => {
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}event?startDate=${eventStartDate}&endDate=${eventEndDate}`,
      method: "GET",
    })
    .then((res) => res.data);
};

export const getSlots = async (
  date: string,
  timezone: string
): Promise<ISlotRes> => {
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}event/slots?date=${date}&timeZone=${timezone}`,
      method: "GET",
    })
    .then((res) => res.data);
};
