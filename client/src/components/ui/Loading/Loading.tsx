import { LoadingWrapper, LoadingSpinner, LoadingText } from "./Loading.styles";

export const Loading: React.FC = () => {
  return (
    <LoadingWrapper role="status" aria-label="Loading">
      <LoadingSpinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};
