import React from 'react';

function ErrorMessage({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
}

export default ErrorMessage;