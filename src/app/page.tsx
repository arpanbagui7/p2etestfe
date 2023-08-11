"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Col, Row } from "antd";
import styles from "@/styles/page.module.css";
import Events from "@/components/events";
import Slots from "@/components/slots";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Row className='fullDiv'>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Slots />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24} className={styles.leftBorder}>
            <Events />
          </Col>
        </Row>
      </QueryClientProvider>
    </>
  );
}
