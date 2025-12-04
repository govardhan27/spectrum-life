import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@app/hooks";
import { confirmBooking, resetBooking } from "@features/booking/bookingSlice";
import { Button } from "@components/ui";
import { Alert } from "@components/ui";
import SuccessIcon from "@assets/icons/success.svg?react";

import {
  Container,
  ContentWrapper,
  Heading,
  BodyText,
  ButtonWrapper,
  AlertText,
} from "./BookingConfirmation.styles";

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gpContactDetails, isConfirmed } = useAppSelector(
    (state) => state.booking
  );

  useEffect(() => {
    // Redirect if no GP contact details
    if (!gpContactDetails) {
      navigate("/gp-contact");
      return;
    }

    // Mark booking as confirmed
    if (!isConfirmed) {
      dispatch(confirmBooking());
    }
  }, [gpContactDetails, isConfirmed, navigate, dispatch]);

  const handleReturnHome = () => {
    dispatch(resetBooking());
    navigate("/home");
  };

  if (!gpContactDetails) {
    return null;
  }

  return (
    <Container>
      <ContentWrapper>
        <SuccessIcon />

        <Heading>Booking confirmed !</Heading>

        <BodyText>
          You should soon receive an email confirming your booking, followed by
          a reminder email the day before your appointment to your registered
          email address.
        </BodyText>

        <BodyText>
          To attend or cancel your session, go to the booking area by clicking
          the calendar icon in the top navigation
        </BodyText>

        <Alert title="Important Note">
          <AlertText>
            For both audio appointments and video appointments, you will need to
            return to the portal to join your session at the scheduled time.
          </AlertText>
          <AlertText>
            Clinicians do not call users directly. Ensure you log in a few
            minutes before your appointment to avoid missing your session.
          </AlertText>
        </Alert>

        <ButtonWrapper>
          <Button
            variant="primary"
            fullWidth
            onClick={handleReturnHome}
            type="button"
          >
            Return to Home
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default BookingConfirmation;
