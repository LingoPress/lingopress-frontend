import React from "react";
import axios from "axios";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";
import { customColors } from "../../styles/color";
import ContinueWithGoogle from "../../assets/continue_google.svg";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "85vh",
    // backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: "1rem",
    padding: "1rem",
    width: "20rem",
    borderRadius: "0.5rem",
    border: "0.1rem solid #ccc",
    fontSize: "1.6rem",
  },
  button: {
    padding: "1rem",
    width: "10rem",
    borderRadius: ".5rem",
    backgroundColor: customColors.background.button["300"],
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "1.6rem",
  },
  h1: {
    fontSize: "10rem",
    marginBottom: "1rem",
    fontFamily: "Margarine",
  },
  h2: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  signup: {
    marginTop: "2rem",
    fontSize: "1.6rem",
    cursor: "pointer",
  },
  image: {
    cursor: "pointer",
  },
};

function LoginForm() {
  const [authStatus, setAuthStatus] = useAtom(authAtom);

  const handleGoogleLogin = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/oauth2/google`,
      );
      if (result.status === 200) {
        console.log(result.data.data);
        window.location.href = result.data.data;
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>
        Lingo
        <br />
        Press
      </h1>
      <br /> <br /> <br />
      <br />
      <br />
      <br />
      <h2 style={styles.h2}>
        구글로그인으로 링고프레스를 간편하게 시작하세요.
      </h2>
      <img
        style={styles.image}
        src={ContinueWithGoogle}
        alt={"Continue with Google"}
        onClick={() => handleGoogleLogin()}
      />
    </div>
  );
}

export default LoginForm;
