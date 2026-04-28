import * as React from "react";
import { MyAppBar } from "../components/MyAppBar";
import { Layout } from "react-admin";
import { MyMenu } from "../components/MyMenu";

interface MyLayoutProps {
  children: React.ReactNode;
}

export const MyLayout = ({ children }: MyLayoutProps) => (
  <Layout appBar={MyAppBar} menu={MyMenu}>
    {children}
  </Layout>
);
