import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Input } from "@components/ui";
import { Button } from "@components/ui";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  submitGPContactDetails,
  clearError,
} from "@features/booking/bookingSlice";
import { gpContactSchema, type GPContactFormData } from "./validation";
import {
  FormContainer,
  ButtonGroup,
  Heading,
  Error,
} from "./GPContactForm.styles";

interface GPContactFormProps {
  initialData?: GPContactFormData;
}

export const GPContactForm: React.FC<GPContactFormProps> = ({
  initialData,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get loading and error state from Redux
  const { isLoading, error, isConfirmed } = useAppSelector(
    (state) => state.booking
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<GPContactFormData>({
    resolver: zodResolver(gpContactSchema),
    mode: "onBlur",
    defaultValues: initialData || {
      gpName: "",
      email: "",
      contactNumber: "",
    },
  });

  // Watch all form values
  const watchedValues = watch();
  const previousValues = useRef(watchedValues);

  // Navigate on successful submission
  useEffect(() => {
    if (isConfirmed) navigate("/confirmation");
  }, [isConfirmed, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    const hasChanged =
      previousValues.current.gpName !== watchedValues.gpName ||
      previousValues.current.email !== watchedValues.email ||
      previousValues.current.contactNumber !== watchedValues.contactNumber;

    if (error && hasChanged) {
      dispatch(clearError());
    }

    previousValues.current = watchedValues;
  }, [watchedValues, error, dispatch]);

  const onSubmit = async (data: GPContactFormData) => {
    dispatch(submitGPContactDetails(data));
  };

  const handlePrevious = () => {};

  return (
    <FormContainer>
      <Heading id="form-heading">
        Please confirm or add to the below GP Contact Details.
      </Heading>

      {error && (
        <Error role="alert" aria-live="polite">
          {error}
        </Error>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="form-heading"
        noValidate
      >
        <Input
          label="GP Name"
          error={errors.gpName?.message}
          autoComplete="name"
          {...register("gpName")}
        />

        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          autoComplete="email"
          {...register("email")}
        />

        <Input
          label="Contact Number"
          type="tel"
          placeholder="+353 78876 0233"
          error={errors.contactNumber?.message}
          autoComplete="tel"
          {...register("contactNumber")}
        />

        <ButtonGroup role="group" aria-label="Form actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrevious}
            disabled={false}
          >
            Previous
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isLoading || !!error}
          >
            {isLoading ? "Submitting..." : "Continue"}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};
