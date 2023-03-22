import { useState } from "react";
// import { useToasts } from "react-toast-notifications";

import styles from "../styles/login.module.css";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  // const { addToast } = useToasts();
  const auth = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return alert("Enter email id and password");
      // return addToast("Please enter both email and password", {
      //   appearance: "error",
      // });
    }

    const response = await auth.login(email, password);

    if (response.success) {
      // addToast("Successfully logged in", {
      //   appearance: "success",
      // });

      alert("Logged in");
    } else {
      // addToast(response.message, {
      //   appearance: "error",
      // });
      alert(response.message);
    }

    setLoggingIn(false);
  };
  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
