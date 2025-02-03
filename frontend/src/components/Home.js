import React, { useEffect, useRef } from 'react';

const Home = () => {
  const homeTextRef = useRef(null);
  const homeIphone1Ref = useRef(null);
  const homeIphone2Ref = useRef(null);
  const homeText2Ref = useRef(null);

  const home2TextRef = useRef(null);
  const home2ContentsRef = useRef([]);
  const home2ImagesRef = useRef([]);

  const home3TextRef = useRef(null);
  const home3ImageContainerRef = useRef(null);
  const home3PRef = useRef(null);
  const home3TextSpansRef = useRef([]);

  const home4TextRef = useRef(null);
  const home4ContentsRef = useRef([]);
  const home4ImagesRef = useRef([]);

  const home5TextRef = useRef(null);
  const home5P1Ref = useRef(null);
  const home5P2Ref = useRef(null);
  const home5Text2Ref = useRef(null);
  const home5IphoneRef = useRef(null);
  const home5ImagesRef = useRef([]);

  const home6WallRef = useRef(null);
  const wallsRef = useRef([]);
  const home6Content1ImgRef = useRef(null);
  const home6Content1TextRef = useRef(null);
  const home6Content2ImgRef = useRef(null);
  const home6TextRef = useRef(null);
  const home6Content2ItemRef = useRef(null);
  const home6Content3ImgRef = useRef(null);
  const home6Text2Ref = useRef(null);

  const home7TextRef = useRef(null);
  const home7ContentsRef = useRef([]);

  const home8ImgRef = useRef(null);
  const home8TextRef = useRef(null);
  const home8ContentRef = useRef(null);

  useEffect(() => {
    const initialize = () => {
      window.windowHeight = window.outerHeight;
      
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = "manual";
      }
    };
  
    window.addEventListener('load', initialize);
    window.addEventListener('resize', initialize);
    window.addEventListener('reset', initialize);
  
    // 초기화 호출
    initialize();
  
    return () => {
      window.removeEventListener('load', initialize);
      window.removeEventListener('resize', initialize);
      window.removeEventListener('reset', initialize);
    };
  }, []);

  useEffect(() => {
    const introContainer = document.querySelector('.intro_container');
    const timer = setTimeout(() => {
      if (introContainer) {
        introContainer.style.display = "block";
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let windowHeight = window.innerHeight;

    /* Home 스크롤 이벤트 */

    // Observer1
    const observer1 = new IntersectionObserver(entries => {
      observer1cb(entries[0]);
    }, { root: null, threshold: 0.5 });

    const observer1cb = entry => {
      if (entry.isIntersecting) {
        if (homeTextRef.current) {
          homeTextRef.current.style.opacity = 1;
          homeTextRef.current.style.animation = `appear_from_bottom ease 1.5s`;

          setTimeout(() => {
            if (homeIphone1Ref.current) {
              homeIphone1Ref.current.style.opacity = 1;
              homeIphone1Ref.current.style.animation = `appear_from_bottom ease 1.5s`;
            }
            setTimeout(() => {
              if (homeIphone2Ref.current) {
                homeIphone2Ref.current.style.opacity = 1;
                homeIphone2Ref.current.style.animation = `appear_from_bottom ease 1.5s`;
              }
              setTimeout(() => {
                if (homeText2Ref.current) {
                  homeText2Ref.current.style.opacity = 1;
                  homeText2Ref.current.style.animation = `appear_from_bottom ease 1.5s`;
                }
                observer1.unobserve(homeTextRef.current);
              }, 600);
            }, 600);
          }, 600);
        }
      }
    };

    if (homeTextRef.current) {
      observer1.observe(homeTextRef.current);
    }

    // Observer2
    const observer2 = new IntersectionObserver(entries => {
      observer2cb(entries[0]);
    }, { threshold: 0.5 });

    const observer2cb = entry => {
      if (entry.isIntersecting) {
        if (home2TextRef.current) {
          home2TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home2TextRef.current.style.opacity = 1;

          setTimeout(() => {
            home2ContentsRef.current.forEach(item => {
              if (item) {
                item.style.animation = 'appear_from_bottom ease 1.5s';
                item.style.opacity = 1;
              }
            });

            setTimeout(() => {
              home2ImagesRef.current.forEach(item => {
                if (item) {
                  item.style.animation = 'appear_from_bottom ease 1.5s';
                  item.style.opacity = 1;
                }
              });
            }, 600);
          }, 600);
          observer2.unobserve(home2TextRef.current);
        }
      }
    };

    if (home2TextRef.current) {
      observer2.observe(home2TextRef.current);
    }

    // Observer3
    const observer3 = new IntersectionObserver(entries => {
      observer3cb(entries[0]);
    }, { threshold: 0.5 });

    const observer3cb = entry => {
      if (entry.isIntersecting) {
        if (home3TextRef.current) {
          home3TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home3TextRef.current.style.opacity = 1;

          setTimeout(() => {
            if (home3ImageContainerRef.current) {
              home3ImageContainerRef.current.style.animation = 'appear_from_bottom ease 1.5s';
              home3ImageContainerRef.current.style.opacity = 1;
            }
            setTimeout(() => {
              if (home3PRef.current) {
                home3PRef.current.style.animation = 'appear_from_bottom ease 1.5s';
                home3PRef.current.style.opacity = 1;
              }
              setTimeout(() => {
                home3TextSpansRef.current.forEach((span, index) => {
                  if (span) {
                    span.style.animation = 'appear_from_bottom ease 1.5s';
                    span.style.opacity = 1;
                  }
                });
                observer3.unobserve(home3TextRef.current);
              }, 600);
            }, 600);
          }, 600);
        }
      }
    };

    if (home3TextRef.current) {
      observer3.observe(home3TextRef.current);
    }

    // Observer4
    const observer4 = new IntersectionObserver(entries => {
      observer4cb(entries[0]);
    }, { threshold: 0.5 });

    const observer4cb = entry => {
      if (entry.isIntersecting) {
        if (home4TextRef.current) {
          home4TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home4TextRef.current.style.opacity = 1;

          setTimeout(() => {
            home4ContentsRef.current.forEach(item => {
              if (item) {
                item.style.animation = 'appear_from_bottom ease 1.5s';
                item.style.opacity = 1;
              }
            });

            setTimeout(() => {
              home4ImagesRef.current.forEach(item => {
                if (item) {
                  item.style.animation = 'appear_from_bottom ease 1.5s';
                  item.style.opacity = 1;
                }
              });
            }, 600);
          }, 600);
          observer4.unobserve(home4TextRef.current);
        }
      }
    };

    if (home4TextRef.current) {
      observer4.observe(home4TextRef.current);
    }

    // Observer5
    const observer5 = new IntersectionObserver(entries => {
      observer5cb(entries[0]);
    }, { threshold: 0.5 });

    const observer5cb = entry => {
      if (entry.isIntersecting) {
        if (home5TextRef.current) {
          home5TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home5TextRef.current.style.opacity = 1;

          setTimeout(() => {
            if (home5P1Ref.current) {
              home5P1Ref.current.style.animation = 'appear_from_bottom ease 1.5s';
              home5P1Ref.current.style.opacity = 1;
            }
            setTimeout(() => {
              if (home5P2Ref.current) {
                home5P2Ref.current.style.animation = 'appear_from_bottom ease 1.5s';
                home5P2Ref.current.style.opacity = 1;
              }
              setTimeout(() => {
                if (home5Text2Ref.current) {
                  home5Text2Ref.current.style.animation = 'appear_from_bottom ease 1.5s';
                  home5Text2Ref.current.style.opacity = 1;
                }
              }, 600);
            }, 600);
          }, 600);
          observer5.unobserve(home5TextRef.current);
        }
      }
    };

    if (home5TextRef.current) {
      observer5.observe(home5TextRef.current);
    }

    // Home5 스크롤에 따른 아이콘 등장 이벤트
    const home5AppearHandler = () => {
      if (home5IphoneRef.current && home5ImagesRef.current.length > 0) {
        const home5Iphone = home5IphoneRef.current;
        const home5Images = home5ImagesRef.current;
        const rect = home5Iphone.getBoundingClientRect();

        if (rect.bottom - 100 < windowHeight) {
          if (home5Images[3]) {
            home5Images[3].style.animation = 'appear ease-out 2.5s';
            home5Images[3].style.opacity = 1;
          }
        } else {
          if (home5Images[3]) {
            home5Images[3].style.animation = '';
            home5Images[3].style.opacity = 0;
          }
        }

        if (rect.bottom < windowHeight) {
          if (home5Images[2]) {
            home5Images[2].style.animation = 'appear ease-out 2.5s';
            home5Images[2].style.opacity = 1;
          }
          if (home5Images[4]) {
            home5Images[4].style.animation = 'appear ease-out 2.5s';
            home5Images[4].style.opacity = 1;
          }
        } else {
          if (home5Images[2]) {
            home5Images[2].style.animation = '';
            home5Images[2].style.opacity = 0;
          }
          if (home5Images[4]) {
            home5Images[4].style.animation = '';
            home5Images[4].style.opacity = 0;
          }
        }

        if (rect.bottom + 100 < windowHeight) {
          if (home5Images[1]) {
            home5Images[1].style.animation = 'appear ease-out 2.5s';
            home5Images[1].style.opacity = 1;
          }
          if (home5Images[5]) {
            home5Images[5].style.animation = 'appear ease-out 2.5s';
            home5Images[5].style.opacity = 1;
          }
        } else {
          if (home5Images[1]) {
            home5Images[1].style.animation = '';
            home5Images[1].style.opacity = 0;
          }
          if (home5Images[5]) {
            home5Images[5].style.animation = '';
            home5Images[5].style.opacity = 0;
          }
        }

        if (rect.bottom + 200 < windowHeight) {
          if (home5Images[0]) {
            home5Images[0].style.animation = 'appear ease-out 2.5s';
            home5Images[0].style.opacity = 1;
          }
          if (home5Images[6]) {
            home5Images[6].style.animation = 'appear ease-out 2.5s';
            home5Images[6].style.opacity = 1;
          }
        } else {
          if (home5Images[0]) {
            home5Images[0].style.animation = '';
            home5Images[0].style.opacity = 0;
          }
          if (home5Images[6]) {
            home5Images[6].style.animation = '';
            home5Images[6].style.opacity = 0;
          }
        }
      }
    };

    window.addEventListener('scroll', home5AppearHandler);

    // Home6 스크롤 width 조절 이벤트
    const home6WidthControlHandler = () => {
      if (home6WallRef.current) {
        const difference = windowHeight - home6WallRef.current.getBoundingClientRect().top;

        if (difference <= 150) {
          wallsRef.current.forEach(item => {
            if (item) item.style.width = `200px`;
          });
        }
        else if (difference > 150 && difference < 700) {
          wallsRef.current.forEach(item => {
            if (item) item.style.width = `${-(4 / 11) * difference + 255}px`;
          });
        }
        else if (difference >= 700) {
          wallsRef.current.forEach(item => {
            if (item) item.style.width = '0px';
          });
        }
      }
    };

    window.addEventListener('scroll', home6WidthControlHandler);

    // Home6 스크롤 이벤트
    const home6ScrollHandler = () => {
      const home6OpacityEvent = (item) => {
        if (item) {
          const difference = windowHeight - item.getBoundingClientRect().top;
          if (difference > 150 && difference < item.offsetHeight + 200) {
            item.style.opacity = (difference - 150) / (item.offsetHeight + 50);
          } else if (difference > item.offsetHeight + 200) {
            item.style.opacity = 1;
          } else {
            item.style.opacity = 0;
          }
        }
      };

      const home6OpacityTransitionEvent = (item) => {
        if (item) {
          const difference = windowHeight - item.getBoundingClientRect().top;
          if (difference > 150 && difference < item.offsetHeight + 200) {
            item.style.opacity = (difference - 150) / (item.offsetHeight + 50);
            item.style.transform = `translateY(${-100 * (difference - 150) / (item.offsetHeight + 50)}px)`;
          } else if (difference > item.offsetHeight + 200) {
            item.style.opacity = 1;
          } else {
            item.style.opacity = 0;
          }
        }
      };

      home6OpacityEvent(home6Content1ImgRef.current);
      home6OpacityEvent(home6Content1TextRef.current);
      home6OpacityEvent(home6Content2ImgRef.current);
      home6OpacityEvent(home6TextRef.current);
      home6OpacityEvent(home6Content3ImgRef.current);
      home6OpacityEvent(home6Text2Ref.current);
      home6OpacityTransitionEvent(home6Content2ItemRef.current);
    };

    window.addEventListener('scroll', home6ScrollHandler);

    // Observer7
    const observer7 = new IntersectionObserver(entries => {
      observer7cb(entries[0]);
    }, { threshold: 0.5 });

    const observer7cb = entry => {
      if (entry.isIntersecting) {
        if (home7TextRef.current) {
          home7TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home7TextRef.current.style.opacity = 1;

          setTimeout(() => {
            home7ContentsRef.current.forEach(item => {
              if (item) {
                item.style.animation = 'appear_from_bottom ease 1.5s';
                item.style.opacity = 1;
              }
            });
          }, 600);
          observer7.unobserve(home7TextRef.current);
        }
      }
    };

    if (home7TextRef.current) {
      observer7.observe(home7TextRef.current);
    }

    // Observer8
    const observer8 = new IntersectionObserver(entries => {
      observer8cb(entries[0]);
    }, { threshold: 0.4 });

    const observer8cb = entry => {
      if (entry.isIntersecting) {
        if (home8ImgRef.current) {
          home8ImgRef.current.style.animation = 'appear_from_bottom ease 1.5s';
          home8ImgRef.current.style.opacity = 1;

          setTimeout(() => {
            if (home8TextRef.current) {
              home8TextRef.current.style.animation = 'appear_from_bottom ease 1.5s';
              home8TextRef.current.style.opacity = 1;
            }

            setTimeout(() => {
              if (home8ContentRef.current) {
                home8ContentRef.current.style.animation = 'appear_from_bottom ease 1.5s';
                home8ContentRef.current.style.opacity = 1;
              }
            }, 600);
          }, 600);
          observer8.unobserve(home8ImgRef.current);
        }
      }
    };

    if (home8ImgRef.current) {
      observer8.observe(home8ImgRef.current);
    }

    return () => {
      window.removeEventListener('scroll', home5AppearHandler);
      window.removeEventListener('scroll', home6WidthControlHandler);
      window.removeEventListener('scroll', home6ScrollHandler);
    };
  }, []);

  return (
    <>
      <section className="home_wrap">
        <div className="home_container">
            <div className="home_text" ref={homeTextRef}>
            <h1>홈 · 소비</h1>
            <h2>내 돈 관리,</h2>
            <h2>지출부터 일정까지</h2>
            <h2>똑똑하게</h2>
            </div>
            <div className="home_image_container">
            <div className="iphone_wrap" ref={homeIphone1Ref}>
                <img className="image_item1" src={require('../assets/asset/newtossim/section1_1_home_01.png')} alt="smartphone image1" />
                <img className="image_iphone" src={require('../assets/asset/newtossim/iPhone12_Clay_Shadow.png')} alt="iphone" />
            </div>
            <div className="iphone_wrap" ref={homeIphone2Ref}>
                <img className="image_item1" src={require('../assets/asset/newtossim/section1_1_home_02.png')} alt="smartphone image2" />
                <img className="image_iphone" src={require('../assets/asset/newtossim/iPhone12_Clay_Shadow.png')} alt="iphone" />
            </div>
            </div>
            <div className="home_text2" ref={homeText2Ref}>
            <h3>토스에 계좌와 카드를 연결하세요.</h3>
            <h3>계좌 잔액, 대출 및 투자 내역을 기본으로,</h3>
            <h3>일자별 소비와 수입을 한 번에 확인할 수 있습니다.</h3>
            </div>
        </div>
        </section>

      <section className="home2_wrap">
        <div className="home2_container">
          <div className="home2_textwrap" ref={home2TextRef}>
            <h1>송금</h1>
            <h2>간편하고 안전하게</h2>
            <h2>수수료는 평생 무료로,</h2>
            <h2>이런 송금 써보셨나요?</h2>
          </div>

        <div className="home2_content">
        <div className="home2_item">
              <div className="home2_content">
                <h1>평생 무료 송금</h1>
                <h2>토스 평생 무료 송금으로</h2>
                <h2>모두의 금융에 자유를</h2>
                <h3>누구에게 보내든 은행 상관 없이,</h3>
                <h3>이제 토스와 함께 수수료 걱정 없이 송금하세요.</h3>
              </div>
              <div className="home2_image_container">
                <img src={require('../assets/asset/newtossim/section1_2_01.png')} alt="" />
              </div>
            </div>
          </div>

          <div className="home2_flex_container">
            <div className="home2_item">
              <div className="home2_image_container">
                <img src={require('../assets/asset/newtossim/section1_2_02.png')} alt="" />
              </div>

              <div className="home2_content">
                <h1>사기계좌 조회</h1>
                <h2>송금 전 사기 내역 조회로</h2>
                <h2>피해를 미리 방지할 수 있어요</h2>
                <h3>송금 전 토스가 알아서 사기 내역조회를 해드려요</h3>
                <h3>상대방의 연락처 또는 계좌가 사기 계좌인지 조회해</h3>
                <h3>안전하게 송금할 수 있어요.</h3>
              </div>
            </div>
          </div>

          <div className="home2_flex_container">
            <div className="home2_item">
              <div className="home2_content">
                <h1>자동이체 예약</h1>
                <h2>은행 점검 시간,</h2>
                <h2>기다릴 필요 없어요</h2>
                <h3>은행 점검 시간에는 자동이체 예약을 이용해보세요.</h3>
                <h3>점검 시간이 끝나면 토스가 알아서 송금해드릴게요.</h3>
              </div>
              <div className="home2_image_container">
                <img src={require('../assets/asset/newtossim/section1_2_03.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home3_wrap">
        <div className="home3_container">
          <div className="home3_container_inner">
            <div className="home3_textwrap" ref={home3TextRef}>
              <h1>대출</h1>
              <h2>
                여러 은행의 조건을<br />
                1분 만에<br />
                확인해보세요
              </h2>
            </div>

            <div className="home3_image_container">
              <div className="iphone_wrap" ref={home3ImageContainerRef}>
                <img
                  className="image_item1"
                  src={require('../assets/asset/newtossim/section1_3_loan_01.png')}
                  alt="smartphone loan image1"
                />
                <img
                  className="image_item2"
                  src={require('../assets/asset/newtossim/section1_3_loan_02.png')}
                  alt="smartphone loan image2"
                />
                <img
                  className="image_item3"
                  src={require('../assets/asset/newtossim/section1_3_loan_03.png')}
                  alt="smartphone loan image3"
                />
                <img
                  className="image_iphone"
                  src={require('../assets/asset/newtossim/iPhone12_Clay_Shadow.png')}
                  alt="iphone"
                />
              </div>
            </div>

            <div className="home3_textwrap2">
              <h3>한도는 높게,</h3>
              <h3>
                금리는 <span className="gray_text">낮게,</span>
              </h3>
              <h3>
                부담은 <span className="light_gray_text">적게.</span>
              </h3>
              <p>
                앉은 자리에서 여러 은행의 한도와 금리를 비교하고<br />
                내게 꼭 맞는 대출을 찾아보세요. <br />
                신용, 비상금, 대환, 주택담보대출 모두 가능해요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home4_wrap">
        <div className="home4_container">
          <div className="home4_container_inner">
            <div className="home4_textwrap" ref={home4TextRef}>
              <h1>신용</h1>
              <h2>금융 생활의 첫 걸음,</h2>
              <h2>신용점수를 미리</h2>
              <h2>무료로 관리하세요</h2>
            </div>

            <div className="home4_grid_container">
              <div className="home4_content">
                <img src={require('../assets/asset/icons_4x/icon-credit-grade-check-2.png')} alt="" />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[0] = el}>
                  <h1>내 신용점수</h1>
                  <h2>언제 어디서든, 원할때 간편하게</h2>
                  <h2>KCB, NICE 신용점수를 한 곳에서 </h2>
                  <h2>확인할 수 있어요.</h2>
                </div>
              </div>

              <div className="home4_content">
                <img src={require('../assets/asset/icons_4x/icon-credit-grade-up-2.png')} alt="" />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[1] = el}>
                  <h1>신용점수 올리기</h1>
                  <h2>통신비, 일반 납부내역 등의 서류를</h2>
                  <h2>토스에서 바로 제출해 신용점수를</h2>
                  <h2>올릴 수 있어요.</h2>
                </div>
              </div>

              <div className="home4_content">
                <img src={require('../assets/asset/icons_4x/icon-alarm-3.png')} alt="" />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[2] = el}>
                  <h1>신용관리 알림</h1>
                  <h2>신용점수에 변동이 생기면 토스가 알람을 보내드려요.</h2>
                  <h2>나의 신용점수가 바뀔 때마다 바로 확인하세요.</h2>
                </div>
              </div>

              <div className="home4_content">
                <img src={require('../assets/asset/icons_4x/icon-bulb-2.png')} alt="" />
                <div className="home4_content_textwrap">
                  <h1>신용관리 팁</h1>
                  <h2>신용점수 관리가 막막하다면?</h2>
                  <h2>신용관리 팁 콘텐츠를 한번 읽어보세요. </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home5_wrap">
        <div className="home5_container">
          <div className="home5_textwrap" ref={home5TextRef}>
            <h1>투자</h1>
            <h2>투자,</h2>
            <h2>모두가 할 수 있도록</h2>
          </div>
          <div className="home5_content" style={{ position: 'relative' }}>
            <div className="iphone_wrap" ref={home5IphoneRef}>
              <img
                className="image_item1"
                src={require('../assets/asset/newtossim/section1_5_stock_01.png')}
                alt="smartphone image6"
              />
              <img
                className="image_iphone"
                src={require('../assets/asset/newtossim/iPhone12_Clay_Shadow.png')}
                alt="iphone"
              />
              <img
                className="image_iphone_highz"
                src={require('../assets/asset/newtossim/iPhone12_Clay_Shadow.png')}
                alt="iphone"
              />
              <div className="home5_icon_wrap" ref={home5IphoneRef}>
                <img src={require('../assets/asset/newtossim/section1_5_stock_02.png')} alt="구매 Top100" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_03.png')} alt="수익률 Top100" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_04.png')} alt="영업이익률 Top100" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_05.png')} alt="거래량 Top100" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_06.png')} alt="새로운계약소식" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_07.png')} alt="관심 Top100" />
                <img src={require('../assets/asset/newtossim/section1_5_stock_08.png')} alt="매출성장률 Top100" />
              </div>
            </div>
            <div className="home5_content_text">
              <div className="home5_content_text_inner" ref={home5P1Ref}>
                <p>
                  이해하기 쉬운 용어<br />
                  설명이 필요 없는<br />
                  직관적인 화면 구성
                </p>
                <p>
                  송금처럼 쉬운 구매 경험<br />
                  그리고 투자 판단에 <br />
                  도움을 주는 컨텐츠까지
                </p>
              </div>
            </div>
            <div className="home5_textwrap2" ref={home5Text2Ref}>
              <h4>별도 앱 설치 없이 토스에서 바로,</h4>
              <h4>토스증권으로 나만의 투자를 시작해 보세요.</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="home6_wrap">
        <div className="home6_container">
          <div className="home6_wallpaper" ref={home6WallRef}>
            <h1>꼭 필요했던 금융</h1>
            <div className="home6_wallpaper_wall">
              <div className="home6_wall" ref={el => wallsRef.current[0] = el}></div>
              <div className="home6_wall" ref={el => wallsRef.current[1] = el}></div>
            </div>
          </div>

          <div className="home6_container_inner">
            <div className="home6_content1">
              <h1>
                토스로<br />
                나에게 딱 맞게
              </h1>
              <img src={require('../assets/asset/newtossim/section2_1_document.jpg').default} alt="women touch smartphone" ref={home6Content1ImgRef} />
              <div className="home6_content1_textwrap" ref={home6Content1TextRef}>
                <h2>
                  내 문서함 <span>공공문서 확인부터 납부까지 한 번에</span>
                </h2>
                <p>
                  건강검진, 국가장학금 신청, 교통범칙금·과태료 납부.<br />
                  그동안 종이로 받았던 문서들 꼼꼼히 챙기느라 고생했어요.<br />
                  앞으로는 토스 내 문서함에서 간단히 받아보고 납부할 수 있어요.
                </p>
              </div>
            </div>

            <div className="home6_content2">
              <img src={require('../assets/asset/newtossim/section2_2_insu_01.jpg')} alt="" />
              <div className="home6_content2_item" ref={home6Content2ItemRef}>
                <img src={require('../assets/asset/newtossim/section2_2_insu_02.jpg')} alt="" />
                <p>
                  또래부터 보험료는 적절하게 내고 있는지, 낸 만큼 보장받고 있는지 확인해 보세요.<br />
                  전문가와의 상담을 통해 내게 딱 맞는 보험을 추천받고, 병원비를 간편하게 청구할 수 있어요.
                </p>
              </div>
            </div>
            <div className="home6_textwrap">
              <h2>
                보험<br />
                <span>조회부터 상담,<br />
                병원비 돌려받기를 간편하게</span>
              </h2>
            </div>

            <div className="home6_content3">
              <img src={require('../assets/asset/newtossim/section2_3_apt_01.jpg')} alt="" />
              <div className="home6_textwrap2" ref={home6Text2Ref}>
                <h2>
                  내 부동산 · 자동차<br /> <span>정기적으로 관리해보세요</span>
                </h2>
                <p>
                  집과 자동차의 공통점은 잘 사서, 잘 관리하고, 잘 팔아야 한다는 것.<br />
                  시세조회부터 아파트 관리비 납부, 자동차 보험료 조회까지 부동산과 자동차 관리도 토스에서 시작해 보세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home7_wrap">
        <div className="home7_container">
          <div className="home7_container_inner">
            <div className="home7_textwrap" ref={home7TextRef}>
              <h1>알면 좋은 금융</h1>
              <h2>이런 서비스도<br />한번 써보세요</h2>
            </div>

            <div className="home7_grid_container">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="home7_content" key={index} ref={el => home7ContentsRef.current[index] = el}>
                  <div className="icon_container" style={{ backgroundColor: '#f2f4f6' }}>
                    <img className="icon" src={require('../assets/asset/icons_4x/home.svg')} alt="service icon" />
                  </div>
                  <h1>서비스 이름</h1>
                  <p>
                    서비스 설명 내용.<br />
                    추가 설명
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="home8_wrap">
        <div className="home8_container">
          <img src={require('../assets/asset/newtossim/section4_device.jpg')} alt="" ref={home8ImgRef} />
          <div className="home8_container_inner">
            <div className="home8_textwrap" ref={home8TextRef}>
              <h1>사업도 토스와 함께</h1>
              <h2>
                사업을 시작하셨나요?<br />
                사업의 시작부터 관리까지<br />
                이제 토스와 함께 하세요.
              </h2>
            </div>
            <div className="home8_content" ref={home8ContentRef}>
              <div className="home8_content_item">
                <h3>토스결제</h3>
                <p>
                  합리적인 수수료,<br />
                  간편한 결제 경험으로 비용은<br />
                  절감하고 매출은 늘리세요.
                </p>
                <a className="button" href="http://127.0.0.1:5500/index.html">가맹점 문의하기</a>
              </div>
              <div className="home8_content_item">
                <h3>내 매출 장부</h3>
                <p>
                  내 매출 장부 따로 관리할 필요 없어요. <br />
                  총 매출, 총 입금, 총 지출을 보기 쉽게 알려드려요,
                </p>
                <a className="button" href="http://127.0.0.1:5500/index.html">자세히 알아보기</a>
              </div>
              <div className="home8_content_item">
                <h3>토스페이먼츠</h3>
                <p>
                  시작하기 어려웠던 온라인 비즈니스,<br />
                  온라인 결제 토스페이먼츠와 함께 해보세요.
                </p>
                <a className="button" href="http://127.0.0.1:5500/index.html">홈페이지 바로가기</a>
              </div>
              <div className="home8_content_item">
                <h3>토스플레이스</h3>
                <p>
                  포스·주문·결제 시스템까지<br />
                  오프라인 매장을 위한<br />
                  모든 것이 준비되어 있어요.
                </p>
                <a className="button" href="http://127.0.0.1:5500/index.html">홈페이지 바로가기</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;