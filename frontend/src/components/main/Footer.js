import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_menu">
          <ul className="footer_content">
            <li><b>서비스</b></li>
            <li><a href="/">공지사항</a></li>
            <li><a href="/">자주 묻는 질문</a></li>
            <li><a href="/">공동인증서 관리</a></li>
            <li><a href="/">계정 일시잠금</a></li>
            <li><a href="/">고객센터</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>회사</b></li>
            <li><a href="/">회사 소개</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>문의</b></li>
            <li><a href="/">사업 제휴</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>고객센터</b></li>
            <li><a href="/">FAQ</a></li>
          </ul>
        </div>
        <div className="footer_information">
          <p>
            SKN0502_FINAL: 팀장 윤상혁<br />
            이준호, 황호준, 박찬규<br />
            https://github.com/Lanvizu/SKN05_Final<br />
            일단 만들어봄
          </p>
          <div className="footer_term">
            <ul>
              <li><a href="/">서비스 이용약관</a></li>
              <li><a href="/"><b>개인정보 처리방침</b></a></li>
            </ul>
          </div>
          <div className="footer_imgcontainer">
            <a href="/"><img src={require('../../assets/asset/safety/icn-facebook.svg').default} alt="facebook" /></a>
            <a href="/"><img src={require('../../assets/asset/safety/icn-blog.svg').default} alt="blog" /></a>
            <a href="/"><img src={require('../../assets/asset/safety/icn-naver.svg').default} alt="naver" /></a>
            <a href="/"><img src={require('../../assets/asset/safety/icn-twitter.svg').default} alt="twitter" /></a>
            <a href="/"><img src={require('../../assets/asset/safety/icn-instagram.svg').default} alt="instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;