import { Tabs } from "antd";
import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import ControlAccessory from "./ControlAccessory";
import ControlProduct from "./ControlProduct";

const { TabPane } = Tabs;

export default function Admin() {
  return (
    <Helmet title="Admin">
      <>
        <Tabs destroyInactiveTabPane={true} defaultActiveKey="1">
          <TabPane tab="Products" key="1">
            <ControlProduct />
          </TabPane>
          <TabPane tab="Accessory" key="2">
            <ControlAccessory />
          </TabPane>
        </Tabs>
      </>
    </Helmet>
  );
}
