import React, {useState} from "react";
import axios from "axios";
import {useAtom} from "jotai/index";
import {authAtom} from "../../atom/user";
import {useNavigate} from "react-router-dom";

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
    marginBottom: "10px",
    padding: "8px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
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
    fontSize: "3rem",
    marginBottom: "1rem",
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

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useAtom(authAtom);

  const handleLogin = async () => {
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
        setAuthStatus({is_logged_in: true});
        return result.data.data;
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message)
    }
  };

  return (
    <div style={styles.container}>
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
      <button onClick={handleLogin} style={styles.button}>
        로그인
      </button>
      <p onClick={() => navigate("/signup")} style={styles.signup}>
        회원가입
      </p>
    </div>
  );
}

export default LoginForm;
