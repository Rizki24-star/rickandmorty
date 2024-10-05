import React, { PropsWithChildren } from "react";
import { ApolloError } from "@apollo/client";
import { Spinner } from "react-bootstrap";

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown;
}

const QueryResult: React.FC<PropsWithChildren<QueryResultProps>> = ({
  loading,
  error,
  data,
  children,
}): React.ReactElement<any, any> | null => {
  if (error) {
    return (
      <div className="d-flex flex-column text-center">
        <p className="fw-bold fs-4">Ooops!</p>
        <span className="fs-5"> &#128511; {error.message}</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (data) {
    return <div>{children}</div>;
  }

  return <p>Nothing to show...</p>;
};

export default QueryResult;
