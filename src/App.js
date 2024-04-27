import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./_pages/home/Home";
import Lingopress from "./_pages/lingopress/Lingopress";
import styled from "@emotion/styled";
import { Layout } from "./_layout/defaultLayout";
import Login from "./_pages/login/Login";
import SignUp from "./_pages/signUp/SignUp";
import MyLingopress from "./_pages/myLingopress/MyLingopress";
import Vocabulary from "./_pages/vocabulary/Vocabulary";
import RouteChangeTracker from "./utils/RouteChangeTracker";
import LandingPage from "./_pages/landingPage/LandingPage";
import OAuthLogic from "./_pages/login/OAuthLogic";

const NotFound = styled.div`
  text-align: center;
`;

function App() {
  RouteChangeTracker();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whatis" element={<LandingPage />} />
        <Route path="/lingopress/:press_id" element={<Lingopress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/google" element={<OAuthLogic />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-lingopress" element={<MyLingopress />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route
          path={"*"}
          element={
            <>
              <NotFound>
                404 <br /> NOT FOUND
              </NotFound>
            </>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
