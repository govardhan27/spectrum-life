import React from "react";
import { useAppSelector } from "@app/hooks";
import { GPContactForm } from "@components/forms";
import { Container } from "./GPContactDetails.styles";

const GPContactDetails: React.FC = () => {
  const existingData = useAppSelector(
    (state) => state.booking.gpContactDetails
  );

  return (
    <Container>
      <GPContactForm initialData={existingData || undefined} />
    </Container>
  );
};

export default GPContactDetails;
