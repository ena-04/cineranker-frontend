import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export const ErrorPage = ({ error, resetErrorBoundary }) => {
  //   const { error, resetErrorBoundary } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
