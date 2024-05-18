import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useAtom } from "jotai/index";
import { authAtom } from "../../atom/user";

const OAuthLogic = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useAtom(authAtom);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      fetchLogin();
    }
  }, [code]);

  const fetchLogin = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/oauth2/google?code=${code}`,
      );
      if (result.status === 200) {
        localStorage.setItem("token", result.data.data.accessToken);
        localStorage.setItem("refreshToken", result.data.data.refreshToken);
        localStorage.setItem("targetLanguage", result.data.data.targetLanguage);
        localStorage.setItem("userLanguage", result.data.data.userLanguage);
        setAuthStatus({ is_logged_in: true });
        if (result.data.data.isNewUser === true) {
          navigate("/whatis");
          return;
        }
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
      navigate("/");
    }
  };
  return <div></div>;
};

export default OAuthLogic;
