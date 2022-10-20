import React, { useState } from "react";
import Auth from "./pages/auth/Signup";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Auth />
    </>
  );
}

export default App;
