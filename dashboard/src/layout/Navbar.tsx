import { useEffect, useState } from "react";

// styles
import styles from "../assets/styles/modules/nav.module.css";

// svgs, images
import logo from "../assets/svg/logo.svg";
import avatar from "../assets/img/image-avatar.jpg";
import sunSvg from "../assets/svg/icon-sun.svg";
import moonSvg from "../assets/svg/icon-moon.svg";

// utils
import useDarkModeToggle from "../hooks/useDarkMode";
import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  NewspaperIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { isDarkMode, toggleTheme, setDarkMode } = useDarkModeToggle();
  const [value, setValue] = useLocalStorage("isDarkMode", isDarkMode);
  const [navSelected, setNavSelected] = useState("articles");

  const handleToggleDarkMode = () => {
    toggleTheme();
    setValue(!isDarkMode);
  };

  useEffect(() => {
    const darkmode = value ?? isDarkMode;
    setDarkMode(darkmode);
  }, [value, isDarkMode]);

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <ul className={styles.iconRoutes}>
        <li
          id="articles"
          className={
            navSelected === "articles" ? styles.selected : styles.normalRoute
          }
          onClick={() => setNavSelected("articles")}
        >
          <NewspaperIcon />
          <span>Articles</span>
        </li>
        <li
          id="cards"
          className={
            navSelected === "cards" ? styles.selected : styles.normalRoute
          }
          onClick={() => setNavSelected("cards")}
        >
          <BanknotesIcon />
          <span>Cards</span>
        </li>
        <li
          id="analytics"
          className={
            navSelected === "analytics" ? styles.selected : styles.normalRoute
          }
          onClick={() => setNavSelected("analytics")}
        >
          <ChartBarSquareIcon />
          <span>Analytics</span>
        </li>
        <li
          id="chat"
          className={
            navSelected === "chat" ? styles.selected : styles.normalRoute
          }
          onClick={() => setNavSelected("chat")}
        >
          <ChatBubbleOvalLeftIcon />
          <span>Chat</span>
        </li>
      </ul>

      <div className={styles.wrapper}>
        <div className={styles.darkmodeToggle} onClick={handleToggleDarkMode}>
          <img src={isDarkMode ? sunSvg : moonSvg} alt="toggle-darkmode" />
        </div>
        <div className={styles.imgContainer}>
          <Link to="/profile">
            <img src={avatar} alt="profile picture" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
