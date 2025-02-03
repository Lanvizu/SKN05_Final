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
            <li><a href="/">브랜드 리소스센터</a></li>
            <li><a href="/">토스의 개인정보 보호</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>회사</b></li>
            <li><a href="/">회사 소개</a></li>
            <li><a href="/">토스페이먼츠</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>문의</b></li>
            <li><a href="/">사업 제휴</a></li>
          </ul>
          <ul className="footer_content">
            <li><b>고객센터</b></li>
            <li><a href="/">전화: 1599-4905(24시간 연중무휴)</a></li>
          </ul>
        </div>
        <div className="footer_information">
          <h5><strong>(주)비바리퍼블리카</strong></h5>
          <p>
            사업자 등록번호 : 120-88-01280 | 대표 : 이승건<br />
            호스팅 서비스 : 주식회사 비바리퍼블리카 | 통신판매업 신고번호 : 2014-서울강남-03377<br />
            06236 서울특별시 강남구 테헤란로 142, 4층, 10층, 11층, 12층, 13층, 22층, 23층 (역삼동, 아크플레이스)<br />
            고객센터 : 서울특별시 강남구 테헤란로 133, 9층 (역삼동, 한국타이어빌딩)
          </p>
          <div className="footer_term">
            <ul>
              <li><a href="/">서비스 이용약관</a></li>
              <li><a href="/"><b>개인정보 처리방침</b></a></li>
            </ul>
          </div>
          <div className="footer_imgcontainer">
            <a href="/"><img src={require('../assets/asset/safety/icn-facebook.svg').default} alt="facebook" /></a>
            <a href="/"><img src={require('../assets/asset/safety/icn-blog.svg').default} alt="blog" /></a>
            <a href="/"><img src={require('../assets/asset/safety/icn-naver.svg').default} alt="naver" /></a>
            <a href="/"><img src={require('../assets/asset/safety/icn-twitter.svg').default} alt="twitter" /></a>
            <a href="/"><img src={require('../assets/asset/safety/icn-instagram.svg').default} alt="instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;