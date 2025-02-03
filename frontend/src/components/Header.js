import React from 'react';
import '../styles/style.css';

const Header = () => {
  return (
    <header className="header">
      <a href="/">
        <img className="header_tosslogo" src="./static/asset/icons_toss/Toss_Logo_Primary.png" alt="Toss Logo" />
      </a>
      <ul className="navbar_menu">
        <li className="navbar_item"><a href="/">회사 소개</a></li>
        <li className="navbar_item"><a href="/">고객 소개</a></li>
        <li className="navbar_item"><a href="/">자주 묻는 질문</a></li>
        <li className="navbar_item"><a href="/">토스인증서</a></li>
        <li className="navbar_item"><a href="/">채용</a></li>
        <span className="navbar_lang">
          <li><a href="/">KOR</a></li>
          <span> | </span>
          <li><a href="/">ENG</a></li>
        </span>
      </ul>
    </header>
  );
};

export default Header;