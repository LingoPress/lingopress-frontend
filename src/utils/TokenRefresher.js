import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "./axiosMethod";
import { useAtom } from "jotai/index";
import { authAtom } from "../atom/user";

export default function TokenRefresher() {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useAtom(authAtom);

  useEffect(() => {
    const refreshAPI = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_API_URL}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const interceptor = axiosPrivate.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalConfig = error.config;
        const code = error.response.data.code;
        const msg = error.response.data.message;
        const status = error.response.status;
        console.log("@@@ error: ", error.response);
        if (status === 401) {
          if (code === "EXPIRED_TOKEN") {
            await axios({
              url: `${process.env.REACT_APP_BACKEND_API_URL}/v1/users/reissue`,
              method: "post",
              data: {
                accessToken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            })
              .then((res) => {
                localStorage.setItem("token", res.data.data.accessToken);
                localStorage.setItem(
                  "refreshToken",
                  res.data.data.refreshToken,
                );
                originalConfig.headers["Authorization"] =
                  "Bearer " + res.data.data.accessToken;

                return refreshAPI(originalConfig);
              })
              // .then((res) => {
              //  window.location.reload();
              // })
              .catch((err) => {
                if (
                  err.response.data.code === "EXPIRED_REFRESH_TOKEN" ||
                  err.response.data.code === "INVALID_REFRESH_TOKEN"
                ) {
                  setAuthStatus({ is_logged_in: false });
                  localStorage.clear();
                  navigate("/login");
                  window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
                }
              });
          }
        } else if (
          status === 400 ||
          status === 404 ||
          status === 409 ||
          status === 500
        ) {
          window.alert(msg);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  return <></>;
}
