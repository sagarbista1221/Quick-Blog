// import React, { useState } from "react";

const AdminRegister = () => {
  return (
    <div>
      <h2>Admin Register</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value=""
          onChange=""
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value=""
          onChange=""
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default AdminRegister;
