import LoginForm from "../../_components/auth/LoginForm";
import { authAtom } from "../../atom/user";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useAtom(authAtom);
  useEffect(() => {
    if (authStatus.is_logged_in) {
      alert("이미 로그인 되어있습니다.");
      navigate("/");
    }
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}
