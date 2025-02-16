import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationLinks from '../NavigationLinks';
import '../../styles/style.css';
import send_arrow from '../../assets/asset/chatIcons/send_arrow.png';

const MainPage = () => {
  const navigate = useNavigate();
  const introContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introContainerRef.current) {
        introContainerRef.current.style.display = "block";
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <NavigationLinks />
      <div style={styles.content}>
        <div className="intro_textwrap">
              <h1>주식의 모든 것<br />퀀톡에게 쉽고 간편하게</h1>
        </div>
        {/* <div className="intro_mobile_wrap">
          <div className="store_button" onClick={handleLoginRedirect}>
            <img src={require('../../assets/asset/icons_timeline/applekorea.png')} alt="apple icon" />
            <span>App Store</span>
          </div>
          <div className="store_button" onClick={handleLoginRedirect}>
            <img src={require('../../assets/asset/icons_timeline/googleplay.png')} alt="googleplay icon" />
            <span>Play Store</span>
          </div>
        </div> */}
        <div style={styles.inputContainer}>
          <div style={styles.form}>
            <input
              type="text"
              placeholder="종목, 주가, 뉴스, 지표 등 다양한 정보를 물어보세요!"
              style={styles.input}
              onClick={handleLoginRedirect}
              readOnly
            />
          </div>
          <img
            src={send_arrow}
            alt="Send Arrow"
            onClick={handleLoginRedirect}
            style={styles.sendButton}
          />
        </div>
      </div>
      
      {/* Intro 컴포넌트 내용 */}
      {/* <section className="intro_wrap">
        <div className="intro_wallpaper">
          <div className="intro_wallpaper_css"></div>
          <div className="intro_container" ref={introContainerRef}>
            <div className="intro_textwrap">
              <h1>주식의 모든것<br />퀀톡에게 쉽고 간편하게</h1>
            </div>

            <div className="intro_mobile_wrap">
              <div className="store_button">
                <a href="https://apps.apple.com/kr/app/%ED%86%A0%EC%8A%A4/id839333328">
                  <img src={require('../assets/asset/icons_timeline/applekorea.png')} alt="apple icon" />
                  <span>App Store</span>
                </a>
              </div>
              <div className="store_button">
                <a href="https://play.google.com/store/apps/details?id=viva.republica.toss&pli=1">
                  <img src={require('../assets/asset/icons_timeline/googleplay.png')} alt="googleplay icon" />
                  <span>Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="intro2_wrap2">
        <div className="intro2_wallpaper">
          <h2>당신만의 투자 가치관을 확립하세요.</h2>
          <h2>퀀톡이 제공하는 스마트한 투자 분석으로</h2>
          <h2>데이터 기반의 인사이트를 얻고, 더 나은 금융 결정을 내리세요</h2>
          <h2>퀀톡과 함께하면, 당신의 투자 여정이 새로워질 거에요</h2>
        </div>
      </section>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  sub_title: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  inputContainer: {
    padding: '5px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '15px',
    margin: '30px 10px 10px',
    width: '100%',
    maxWidth: '500px',
  },
  form: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '95%',
    padding: '12px 15px',
    border: 'none',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  },
  sendButton: {
    width: '25px',
    height: '25px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default MainPage;
