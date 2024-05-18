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
  const [studyLanguageValue, setStudyLanguageValue] = useState("ENGLISH");
  const [menuLanguageValue, setMenuLanguageValue] = useState("KOREAN");
  const { t } = useTranslation();
  const studyLanguage = [
    { name: "한국어", value: "KOREAN" },
    { name: "English", value: "ENGLISH" },
    { name: "日本語", value: "JAPANESE" },
  ];

  const menuLanguage = [
    { name: "한국어", value: "KOREAN" },
    { name: "English", value: "ENGLISH" },
    { name: "日本語", value: "JAPANESE" },
  ];

  useEffect(() => {
    localStorage.getItem("studyLanguage") &&
      setStudyLanguageValue(localStorage.getItem("studyLanguage"));
    localStorage.getItem("menuLanguage") &&
      setMenuLanguageValue(localStorage.getItem("menuLanguage"));
  }, []);

  const changeMenuLanguage = (value) => {
    setMenuLanguageValue(value);
    i18n.changeLanguage(value);
  };

  const saveLanguageSetting = () => {
    axiosPrivate({
      url: "/v1/users/language",
      method: "patch",
      data: {
        target_language: studyLanguageValue,
        user_language: menuLanguageValue,
      },
    }).then((res) => {
      localStorage.setItem("studyLanguage", studyLanguageValue);
      localStorage.setItem("menuLanguage", menuLanguageValue);
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
        {studyLanguage.map((radio, idx) => (
          <ToggleButton
            size={"lg"}
            key={idx}
            id={`study-radio-${idx}`}
            type="radio"
            variant={"outline-success"}
            name="study-radio"
            value={radio.value}
            checked={studyLanguageValue === radio.value}
            onChange={(e) => setStudyLanguageValue(e.currentTarget.value)}
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
        {menuLanguage.map((radio, idx) => (
          <ToggleButton
            size={"lg"}
            key={idx}
            id={`menu-radio-${idx}`}
            type="radio"
            variant={"outline-success"}
            name="menu-radio"
            value={radio.value}
            checked={menuLanguageValue === radio.value}
            onChange={(e) => changeMenuLanguage(e.currentTarget.value)}
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
