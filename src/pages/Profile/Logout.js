import React from 'react';

const Logout = ({ logout }) => {
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
