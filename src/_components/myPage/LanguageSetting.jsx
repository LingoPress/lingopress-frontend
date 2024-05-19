import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import i18n from "i18next";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useTranslation } from "react-i18next";

const languages = ["한국어", "English", "日本語"];
const LanguageBox = ({ language }) => {
  return <div>{language}</div>;
};

const LanguageSetting = () => {
  const [checked, setChecked] = useState(false);
  const [targetLanguageValue, setTargetLanguageValue] = useState("ENGLISH");
  const [userLanguageValue, setUserLanguageValue] = useState("KOREAN");
  const { t } = useTranslation();
  const targetLanguage = [
    { name: "한국어", value: "ko" },
    { name: "English", value: "en" },
    { name: "日本語", value: "ja" },
  ];

  const userLanguage = [
    { name: "한국어", value: "ko" },
    { name: "English", value: "en" },
    { name: "日本語", value: "ja" },
  ];

  useEffect(() => {
    localStorage.getItem("targetLanguage") &&
      setTargetLanguageValue(localStorage.getItem("targetLanguage"));
    localStorage.getItem("userLanguage") &&
      setUserLanguageValue(localStorage.getItem("userLanguage"));
  }, []);

  const changeUserLanguage = (value) => {
    setUserLanguageValue(value);
    i18n.changeLanguage(value);
  };

  const saveLanguageSetting = () => {
    axiosPrivate({
      url: "/v1/users/language",
      method: "patch",
      data: {
        target_language: targetLanguageValue,
        user_language: userLanguageValue,
      },
    }).then((res) => {
      localStorage.setItem("targetLanguage", targetLanguageValue);
      localStorage.setItem("userLanguage", userLanguageValue);
      alert(t("mypage.Language settings have been saved"));
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h1>{t("mypage.Choose a language to study")}</h1>
      <ButtonGroup>
        {targetLanguage.map((radio, idx) => (
          <ToggleButton
            size={"lg"}
            key={idx}
            id={`study-radio-${idx}`}
            type="radio"
            variant={"outline-success"}
            name="study-radio"
            value={radio.value}
            checked={targetLanguageValue === radio.value}
            onChange={(e) => setTargetLanguageValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>{" "}
      <br />
      <br />
      <br />
      <h1>{t("mypage.Choose a menu language")}</h1>
      <ButtonGroup>
        {userLanguage.map((radio, idx) => (
          <ToggleButton
            size={"lg"}
            key={idx}
            id={`menu-radio-${idx}`}
            type="radio"
            variant={"outline-success"}
            name="menu-radio"
            value={radio.value}
            checked={userLanguageValue === radio.value}
            onChange={(e) => changeUserLanguage(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <br />
      <br />
      <br />
      <Button onClick={() => saveLanguageSetting()}>{t("mypage.save")}</Button>
    </div>
  );
};

export default LanguageSetting;
