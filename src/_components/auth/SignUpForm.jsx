import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";
import { useNavigate } from "react-router-dom";

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
    marginBottom: "1rem",
    padding: "1rem",
    width: "20rem",
    borderRadius: "0.5rem",
    border: "0.1rem solid #ccc",
    fontSize: "1.6rem",
  },
  button: {
    padding: "10px",
    width: "100px",
    borderRadius: "5px",
    backgroundColor: "#241f1f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
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
    marginTop: "10px",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
};

function SignInForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [authStatus, setAuthStatus] = useAtom(authAtom);

  const handleSignUp = async () => {
    await fetchSignUp();
  };

  const fetchSignUp = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/sign-up`,
        {
          username: username,
          password: password,
          nickname: nickname,
        },
      );
      if (result.status === 200) {
        localStorage.setItem("token", result.data.data.accessToken);
        localStorage.setItem("refreshToken", result.data.data.refreshToken);
        navigate("/");
        setAuthStatus({ is_logged_in: true });
        return result.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>
        Lingo
        <br />
        Press
      </h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2 style={styles.h2}>
        링고프레스로 번역, 독해, 어휘, 시사까지 한번에 공부하세요!
      </h2>

      <input
        type="text"
        placeholder="닉네임"
        style={styles.input}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
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
      <button onClick={handleSignUp} style={styles.button}>
        회원가입
      </button>
    </div>
  );
}

export default SignInForm;
