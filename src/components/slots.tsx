import React, { useState } from "react";
import { Col, DatePicker, Row, Spin, Typography, Select, Button } from "antd";
import type { DatePickerProps, SelectProps } from "antd";
import { DateFormat, defaultTimeZone } from "@/constants/constant";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getSlots } from "@/api/event.api";
import ErrorHandler from "./errorHandler";
import styles from "@/styles/page.module.css";
import { AxiosError } from "axios";

const Slots = () => {
  const { Title, Text } = Typography;
  const timeZoneOptions: SelectProps["options"] = [
    { value: defaultTimeZone, label: defaultTimeZone },
    { value: "India", label: "India" },
    { value: "London", label: "London" },
    { value: "California", label: "California" },
  ];
  const [slotReqDate, setSlotReqDate] = useState({
    date: dayjs(),
    timezone: defaultTimeZone,
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [slotReqDate],
    queryFn: () =>
      getSlots(slotReqDate.date.format(DateFormat), slotReqDate.timezone),
  });

  const handleDateChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setSlotReqDate({ ...slotReqDate, date });
    } else {
      setSlotReqDate({ ...slotReqDate, date: dayjs() });
    }
  };

  const renderSlots = (slots: string[]) => {
    return slots.map((slot, index) => (
      <Button key={index} className={styles.marginPoint5}>
        {slot}
      </Button>
    ));
  };
  const handleTimeZoneChange = (timezone: string) => {
    setSlotReqDate({ ...slotReqDate, timezone });
  };

  return (
    <>
      <Title level={3}>Booked Events</Title>
      <Row>
        <Col lg={3} md={3} sm={8} xs={8}>
          <Text type='secondary'>TimeZone: </Text>
        </Col>
        <Col lg={9} md={9} sm={16} xs={16}>
          <Select
            options={timeZoneOptions}
            value={slotReqDate.timezone}
            className={styles.width80}
            onChange={handleTimeZoneChange}
          />
        </Col>
        <Col lg={3} md={3} sm={8} xs={8}>
          <Text type='secondary'>Date: </Text>
        </Col>
        <Col lg={9} md={9} sm={16} xs={16}>
          <DatePicker
            className={styles.width80}
            value={slotReqDate.date}
            format={DateFormat}
            onChange={handleDateChange}
          />
        </Col>
      </Row>
      {isError ? (
        <ErrorHandler error={error} />
      ) : (
        <Row>
          <Col span={24}>
            {isLoading ? (
              <div className='divCenter fullDiv'>
                <Spin tip='Loading'>
                  <div />
                </Spin>
              </div>
            ) : (
              renderSlots(data.content.availableSlots)
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Slots;
