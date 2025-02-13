import React, { useEffect, useRef } from 'react';
import stockChart from '../../assets/asset/newtossim/주식차트.png';
import insu02 from '../../assets/asset/newtossim/section2_2_insu_02.jpg';
import financialAnalysis from '../../assets/asset/newtossim/재무재표분석.png';
import newsAnalysis from '../../assets/asset/newtossim/주요뉴스분석.png';

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
          homeTextRef.current.style.animation = `appear_from_bottom ease 1s`;

          setTimeout(() => {
            if (homeIphone1Ref.current) {
              homeIphone1Ref.current.style.opacity = 1;
              homeIphone1Ref.current.style.animation = `appear_from_bottom ease 1s`;
            }
            setTimeout(() => {
              if (homeIphone2Ref.current) {
                homeIphone2Ref.current.style.opacity = 1;
                homeIphone2Ref.current.style.animation = `appear_from_bottom ease 1s`;
              }
              setTimeout(() => {
                if (homeText2Ref.current) {
                  homeText2Ref.current.style.opacity = 1;
                  homeText2Ref.current.style.animation = `appear_from_bottom ease 1s`;
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
            <h1>FOR 투자 전문가</h1>
            <h2>빠른 정보 검색을 원하는</h2>
            <h2>전문가를 위한</h2>
          </div>
          <div className="iphone_wrap" ref={homeIphone2Ref}>
            <img className="image_item1" src={require('../../assets/asset/newtossim/전문장점.png')} alt="smartphone image2" />
          </div>
        </div>
      </section>

      <section className="home2_wrap">
        <div className="home2_container">
          <div className="home2_textwrap" ref={home2TextRef}>
            <h1>FOR 투자 초보자</h1>
            <h2>아무것도 모르는</h2>
            <h2>투자 초보자를 위한</h2>
          </div>
          <div className="iphone_wrap" ref={homeIphone1Ref}>
            <img className="image_item1" src={require('../../assets/asset/newtossim/초보장점.png')} alt="smartphone image1" />
          </div>
        </div>
      </section>
      <section className="home5_scroll">
        <div className="home5_container">
            <div className="home5_textwrap" ref={home5TextRef}>
                <h1>다양한 자료</h1>
                <h2>투자,</h2>
                <h2>모두가 할 수 있도록</h2>
            </div>
            <div className="home5_scroll_container">
                <img src={require('../../assets/asset/newtossim/거래량.png')} alt="거래량" />
                <img src={require('../../assets/asset/newtossim/실시간차트.png')} alt="실시간차트" />
                <img src={require('../../assets/asset/newtossim/재무재표.png')} alt="재무재표" />
                <img src={require('../../assets/asset/newtossim/증시일정.png')} alt="증시일정" />
                <img src={require('../../assets/asset/newtossim/회사정보.png')} alt="회사정보" />
                <img src={require('../../assets/asset/newtossim/투자지표.png')} alt="투자지표" />
                </div>
            </div>
        </section>
      <section className="home4_wrap">
        <div className="home4_container">
          <div className="home4_container_inner">
            <div className="home4_textwrap" ref={home4TextRef}>
              <h1>정보 기반 분석</h1>
              <h2>금융 생활의 첫 걸음,</h2>
              <h2>다양한 분석 정보를</h2>
              <h2>무료로 참고하세요</h2>
            </div>

            <div className="home4_grid_container">
              <div className="home4_content">
                <img
                    src={require('../../assets/asset/icons_4x/icon-credit-grade-check-2.png')}
                    alt=""
                    ref={el => home4ImagesRef.current[0] = el}  // 여기에 ref 추가
                />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[0] = el}>
                    <h1>차트분석</h1>
                    <h2>이전에 유사한 차트가 있었는지</h2>
                    <h2>확인하고 예측까지</h2>
                    <h2>차트로 보는 주가 예측</h2>
                </div>
                </div>

              <div className="home4_content">
                <img
                    src={require('../../assets/asset/icons_4x/icon-credit-grade-up-2.png')}
                    alt=""
                    ref={el => home4ImagesRef.current[1] = el}  // ref 추가
                />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[1] = el}>
                    <h1>문서 분석</h1>
                    <h2>어려운 재무재표</h2>
                    <h2>번역과 해석을 동시에</h2>
                    <h2>이젠 나도 애널리스트</h2>
                </div>
                </div>

                <div className="home4_content">
                <img
                    src={require('../../assets/asset/icons_4x/icon-alarm-3.png')}
                    alt=""
                    ref={el => home4ImagesRef.current[2] = el}  // ref 추가
                />
                <div className="home4_content_textwrap" ref={el => home4ContentsRef.current[2] = el}>
                    <h1>지표분석</h1>
                    <h2>방대한 지표정보를</h2>
                    <h2>해석해드립니다.</h2>
                    <h2>분석은 빠르게</h2>
                    <h2>내용은 간결하게</h2>
                    <h2>해석은 쉽게</h2>
                </div>
                </div>
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
                퀀텀과<br />
                나에게 딱 맞게
                </h1>
                <img 
                src={stockChart} 
                alt="주식 차트" 
                ref={home6Content1ImgRef} 
                />
                <div className="home6_content1_textwrap" ref={home6Content1TextRef}>
                <h2>
                    주식 차트 <span>이전의 유사한 패턴 조회와 예측까지 한번에</span>
                </h2>
                <p>
                    주식시장에는 일정한 사이클이 있다던데<br />
                    지금과 비슷한 상황이 발생했던 과거에는 어떤 차트 모양을 보여줬을까?<br />
                    앞으로는 퀀톡을 통해 확인할 수 있어요.
                </p>
                </div>
            </div>

            <div className="home6_content2">
                <img src={financialAnalysis} alt="" />
                <div className="home6_content2_item" ref={home6Content2ItemRef}>
                <img src={insu02} alt="세부지표" ref={home6Content2ImgRef} />
                <h2>
                    세부 지표<br />
                    <span>
                    주가들이 보여주는 세부지표<br />
                    이해하기 쉽게 정리하여 보여드립니다.
                    </span>
                </h2>
                </div>
            </div>

            <div className="home6_textwrap2">
                <h2>
                재무재표<br />
                <span>
                    그냥 봐도 어려운 재무재표<br />
                    한국어 번역으로, 요약보기 까지
                </span>
                </h2>
            </div>

            <div className="home6_content3">
                <img src={newsAnalysis} alt="" />
                <div className="home6_textwrap2" ref={home6Text2Ref}>
                <h2>
                    최신 뉴스<br /> <span>매일매일 확인해보세요</span>
                </h2>
                <p>
                    종목에 관련된 최신 뉴스를 번역해 보여드립니다.<br />
                    퀀텀의 학습 모델을 통해 뉴스가 주가에 긍정적인지 부정적인지 예측해드립니다.
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>

      <section className="home7_wrap">
        <div className="home7_content1">
            <h1>
            이외에도<br />
            제공하는 다양한 서비스
            </h1>
            <div className="home7_grid_container">
            {serviceData.map((service, index) => (
                <div className="home7_content" key={index} ref={el => home7ContentsRef.current[index] = el}>
                {index === 0 && <h2>백 테스팅</h2>}
                {index === 1 && <h2>리서치</h2>}
                {index === 2 && <h2>포트폴리오 관리</h2>}
                {index === 3 && <h2>데이터 분석</h2>}
                {index === 0 && (
                    <p>
                    백 테스팅 서비스 설명 내용.<br />
                    추가 설명 1
                    </p>
                )}
                {index === 1 && (
                    <p>
                    리서치 서비스 설명 내용.<br />
                    추가 설명 2
                    </p>
                )}
                {index === 2 && (
                    <p>
                    포트폴리오 관리 서비스 설명 내용.<br />
                    추가 설명 3
                    </p>
                )}
                {index === 3 && (
                    <p>
                    데이터 분석 서비스 설명 내용.<br />
                    추가 설명 4
                    </p>
                )}
                </div>
            ))}
            </div>
        </div> {/* <-- 누락된 닫는 태그 추가 */}
        </section>
      
      
    </>
  );
};
// 예시: 서비스 데이터 배열 (여기서 <br/>를 사용하려면 dangerouslySetInnerHTML를 사용)
const serviceData = [
    {
      title: '백 테스팅',
      description: '백 테스팅 서비스 설명 내용.<br />추가 설명 1'
    },
    {
      title: '리서치',
      description: '리서치 서비스 설명 내용.<br />추가 설명 2'
    },
    {
      title: '포트폴리오 관리',
      description: '포트폴리오 관리 서비스 설명 내용.<br />추가 설명 3'
    },
    {
      title: '데이터 분석',
      description: '데이터 분석 서비스 설명 내용.<br />추가 설명 4'
    }
  ];
export default Home;