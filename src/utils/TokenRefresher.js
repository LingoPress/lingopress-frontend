import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "./axiosMethod";

export default function TokenRefresher() {
  const navigate = useNavigate();

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
        const msg = error.response.data.message;
        const status = error.response.status;
        if (status === 401) {
          if (msg === "만료된 JWT 토큰입니다.") {
            await axios({
              url: `${process.env.REACT_APP_BACKEND_API_URL}/api/v1/users/reissue`,
              method: "post",
              data: {
                accessToken: localStorage.getItem("token"),
                refreshToken: localStorage.getItem("refreshToken"),
              },
            }).then((res) => {
              localStorage.setItem("token", res.data.data.accessToken);
              localStorage.setItem("refreshToken", res.data.data.refreshToken);
              originalConfig.headers["Authorization"] =
                "Bearer " + res.data.data.accessToken;

              return refreshAPI(originalConfig);
            });
            // .then((res) => {
            //   window.location.reload();
            // });
          } else if (msg === "만료된 JWT 토큰입니다.") {
            localStorage.clear();
            navigate("/login");
            window.alert("토큰이 만료되어 자동으로 로그아웃 되었습니다.");
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

    console.log("interceptor", interceptor);
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
  return <></>;
}
