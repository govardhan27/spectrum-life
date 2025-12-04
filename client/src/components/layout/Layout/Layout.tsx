import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@components/layout/Header/Header";
import { PageContainer } from "@components/layout/PageContainer/PageContainer";
import { Footer } from "@components/layout/Footer/Footer";
import { LayoutWrapper } from "./Layout.styles";

export const Layout: React.FC = () => {
  return (
    <LayoutWrapper>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </LayoutWrapper>
  );
};
