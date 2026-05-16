import { useEffect, useState } from "react";
import i18n from "i18next";
import { axiosPrivate } from "../../utils/axiosMethod";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { customColors } from "../../styles/color";

const SettingPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 4rem 2rem;
  gap: 3.2rem;
`;

const Section = styled.section`
  width: min(100%, 52rem);
  text-align: center;

  h1 {
    margin-bottom: 1.4rem;
    color: ${customColors.text.title[900]};
    font-size: 1.9rem;
    font-weight: 900;
    line-height: 1.35;
  }
`;

const SegmentGroup = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, minmax(8rem, 1fr));
  gap: 0.4rem;
  padding: 0.4rem;
  border: 1px solid ${customColors.border[100]};
  border-radius: 999px;
  background: #f1f5f9;
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const SegmentButton = styled.button`
  min-height: 4rem;
  padding: 0 1.4rem;
  border-radius: 999px;
  color: ${({ $active }) => ($active ? "#ffffff" : customColors.text.subTitle[200])};
  background: ${({ $active }) =>
    $active ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" : "transparent"};
  font-size: 1.35rem;
  font-weight: 900;
  box-shadow: ${({ $active }) =>
    $active ? "0 0.8rem 1.8rem rgba(37, 99, 235, 0.22)" : "none"};
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "#ffffff" : customColors.text.title[900])};
    transform: translateY(-1px);
  }
`;

const SaveButton = styled.button`
  min-width: 16rem;
  min-height: 4.6rem;
  padding: 0 2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 1.45rem;
  font-weight: 900;
  box-shadow: 0 1rem 2.2rem rgba(37, 99, 235, 0.24);
  transition:
    box-shadow 0.2s ease,
    filter 0.2s ease,
    transform 0.2s ease;

  &:hover {
    filter: brightness(0.98);
    box-shadow: 0 1.3rem 2.8rem rgba(37, 99, 235, 0.32);
    transform: translateY(-1px);
  }
`;

const LanguageSetting = () => {
  const [targetLanguageValue, setTargetLanguageValue] = useState("en");
  const [userLanguageValue, setUserLanguageValue] = useState("ko");
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
    }).then(() => {
      localStorage.setItem("targetLanguage", targetLanguageValue);
      localStorage.setItem("userLanguage", userLanguageValue);
      alert(t("mypage.Language settings have been saved"));
    });
  };

  return (
    <SettingPanel>
      <Section>
        <h1>{t("mypage.Choose a language to study")}</h1>
        <SegmentGroup>
          {targetLanguage.map((language) => (
            <SegmentButton
              key={language.value}
              type="button"
              $active={targetLanguageValue === language.value}
              onClick={() => setTargetLanguageValue(language.value)}
            >
              {language.name}
            </SegmentButton>
          ))}
        </SegmentGroup>
      </Section>

      <Section>
        <h1>{t("mypage.Choose a menu language")}</h1>
        <SegmentGroup>
          {userLanguage.map((language) => (
            <SegmentButton
              key={language.value}
              type="button"
              $active={userLanguageValue === language.value}
              onClick={() => changeUserLanguage(language.value)}
            >
              {language.name}
            </SegmentButton>
          ))}
        </SegmentGroup>
      </Section>

      <SaveButton type="button" onClick={() => saveLanguageSetting()}>
        {t("mypage.save")}
      </SaveButton>
    </SettingPanel>
  );
};

export default LanguageSetting;
