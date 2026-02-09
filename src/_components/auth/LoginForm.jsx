import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";
import { customColors } from "../../styles/color";
import ContinueWithGoogle from "../../assets/continue_google.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [authStatus, setAuthStatus] = useAtom(authAtom);
  const { t } = useTranslation();


  const handleLogin = async (event) => {
    event.preventDefault();
    await fetchLogin();
  };

  const fetchLogin = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/sign-in`,
        {
          username: username,
          password: password,
        },
      );
      if (result.status === 200) {
        localStorage.setItem("token", result.data.data.accessToken);
        localStorage.setItem("refreshToken", result.data.data.refreshToken);
        navigate(-1);
        setAuthStatus({ is_logged_in: true });
        return result.data.data;
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/oauth2/google`,
      );
      if (result.status === 200) {
        window.location.href = result.data.data;
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleLogin} style={styles.container}>
      <h1 style={styles.h1}>
        Lingo
        <br />
        Press
      </h1>
      <br /> <br /> <br />
      <br />
      <br />
      <br />
      <h2 style={styles.h2}>{t("home.login_message")}</h2>
      <input
        type="text"
        placeholder="아이디"
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type={"submit"} style={styles.button}>
        로그인
      </button>
      <p onClick={() => navigate("/signup")} style={styles.signup}>
        회원가입
      </p>
      <img
        style={styles.image}
        src={ContinueWithGoogle}
        alt={"Continue with Google"}
        onClick={() => handleGoogleLogin()}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </form>
  );
}

export default LoginForm;
