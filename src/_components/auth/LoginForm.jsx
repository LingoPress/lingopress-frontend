import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";
import { customColors } from "../../styles/color";
import ContinueWithGoogle from "../../assets/continue_google.svg";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const LoginPage = styled.div`
  min-height: 85vh;
  display: grid;
  place-items: center;
  padding: 5rem 2rem 8rem;
`;

const LoginPanel = styled.div`
  width: min(100%, 42rem);
  padding: 3rem;
  border: 1px solid ${customColors.border[100]};
  border-radius: 0.8rem;
  background: #ffffff;
  box-shadow: 0 1.8rem 5rem rgba(15, 23, 42, 0.08);
`;

const Logo = styled.h1`
  margin-bottom: 1.2rem;
  color: ${customColors.text.title[900]};
  font-family: "Margarine", sans-serif;
  font-size: 5.2rem;
  line-height: 0.95;
  text-align: center;
`;

const Message = styled.h2`
  margin-bottom: 2.4rem;
  color: ${customColors.text.subTitle[200]};
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
`;

const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  padding: 0 1.4rem;
  border: 1px solid ${customColors.border[100]};
  border-radius: 0.7rem;
  color: ${customColors.text.title[900]};
  font-size: 1.5rem;
  background: #f8fafc;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${customColors.background.button[100]};
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }
`;

const SubmitButton = styled.button`
  height: 4.8rem;
  margin-top: 0.4rem;
  border-radius: 999px;
  background: ${customColors.background.button[100]};
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 900;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${customColors.background.button[300]};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 2.2rem 0;
  color: ${customColors.text.subTitle[200]};
  font-size: 1.25rem;
  font-weight: 800;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${customColors.border[100]};
  }
`;

const GoogleButton = styled.button`
  display: grid;
  place-items: center;
  width: 100%;
  border-radius: 0.7rem;

  img {
    width: min(100%, 28rem);
  }
`;

const SignUpText = styled.p`
  margin-top: 2.2rem;
  color: ${customColors.text.subTitle[200]};
  font-size: 1.35rem;
  font-weight: 700;
  text-align: center;

  button {
    color: ${customColors.background.button[100]};
    font-weight: 900;
  }
`;

const ErrorText = styled.p`
  min-height: 2rem;
  color: #dc2626;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
`;

function LoginForm() {
  const [, setAuthStatus] = useAtom(authAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const persistLogin = (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setAuthStatus({ is_logged_in: true });
  };

  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.message ||
      "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
    );
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/sign-in`,
        {
          username: username.trim(),
          password,
        },
      );

      if (result.status === 200) {
        persistLogin(result.data.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
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
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <LoginPage>
      <LoginPanel>
        <Logo>
          Lingo
          <br />
          Press
        </Logo>
        <Message>{t("home.login_message")}</Message>

        <LoginFormWrapper onSubmit={handleSignIn}>
          <Input
            type="text"
            placeholder="아이디"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </SubmitButton>
          <ErrorText>{errorMessage}</ErrorText>
        </LoginFormWrapper>

        <Divider>또는</Divider>

        <GoogleButton type="button" onClick={handleGoogleLogin}>
          <img src={ContinueWithGoogle} alt={"Continue with Google"} />
        </GoogleButton>

        <SignUpText>
          계정이 없나요?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </SignUpText>
      </LoginPanel>
    </LoginPage>
  );
}

export default LoginForm;
