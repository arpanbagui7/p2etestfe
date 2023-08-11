import React, { useState } from "react";
import { Col, DatePicker, Empty, Row, Spin, Tag, Typography } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { DateFormat } from "@/constants/constant";
import { getEvents } from "@/api/event.api";
import ErrorHandler from "./errorHandler";
import { IEvent } from "@/interface/event.interface";

const Events = () => {
  const { Title, Text } = Typography;
  const { RangePicker } = DatePicker;
  const [eventDate, setEventDate] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [eventDate],
    queryFn: () =>
      getEvents(
        eventDate.startDate.format(DateFormat),
        eventDate.endDate.format(DateFormat)
      ),
  });

  const renderEvents = (events: IEvent[]) => {
    return events.length ? (
      events.map((ev, index) => (
        <Tag key={index} className='marginBlock1'>
          <Text>
            Start Time: {ev.eventStartTime} - End Time: {ev.eventEndTime}
          </Text>
        </Tag>
      ))
    ) : (
      <div className='divCenter fullDiv'>
        <Empty description='No Events' />
      </div>
    );
  };

  const handleDateChange: RangePickerProps["onChange"] = (date) => {
    const selectedDate = {
      startDate: dayjs(),
      endDate: dayjs(),
    };
    if (date) {
      if (date[0]) {
        selectedDate.startDate = date[0];
      }
      if (date[1]) {
        selectedDate.endDate = date[1];
      }
      setEventDate(selectedDate);
    } else {
      setEventDate(selectedDate);
    }
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Title level={3}>Booked Events</Title>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <RangePicker
            className='marginBlockStart2'
            value={[eventDate.startDate, eventDate.endDate]}
            format={DateFormat}
            onChange={handleDateChange}
          />
        </Col>
      </Row>
      {isError ? (
        <ErrorHandler error={error} />
      ) : (
        <Row>
          <Col span={24} className='scrollY'>
            {isLoading ? (
              <div className='fullDiv divCenter'>
                <Spin tip='Loading'>
                  <div />
                </Spin>
              </div>
            ) : (
              renderEvents(data.content.events)
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Events;
