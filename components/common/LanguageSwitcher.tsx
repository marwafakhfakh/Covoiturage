import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <div className="flex gap-2 items-center">
      <span>{i18n.t("language")}</span>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("fr")}>FR</button>
      <button onClick={() => changeLanguage("ar")}>AR</button>
    </div>
  );
};

export default LanguageSwitcher;
