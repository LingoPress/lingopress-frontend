import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";
import { useNavigate } from "react-router-dom";
import { customColors } from "../../styles/color";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    // backgroundColor: "#f9f9f9",
  },
  input: {
    marginBottom: "2rem",
    padding: "1rem",
    width: "40rem",
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
    fontSize: "5rem",
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
};

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useAtom(authAtom);

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

  return (
    <form onSubmit={handleLogin} style={styles.container}>
      <h1 style={styles.h1}>LingoPress</h1>
      <h2 style={styles.h2}>
        링고프레스로 번역, 독해, 어휘, 시사까지 한번에 공부하세요!
      </h2>

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
    </form>
  );
}

export default LoginForm;
