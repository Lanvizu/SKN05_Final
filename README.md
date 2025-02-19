<img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/python-3776AB?style=flat&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/django-092E20?style=flat&logo=django&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=flat&logo=mysql&logoColor=white"> ![Nginx](https://img.shields.io/badge/nginx-009639?style=flat&logo=nginx&logoColor=white)
![Gunicorn](https://img.shields.io/badge/gunicorn-444444?style=flat&logo=gunicorn&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009485?style=flat&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-2FBF71?style=flat&logo=uvicorn&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FF7A25?style=flat&logo=huggingface&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=flat&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)



# 금융 정보 분석 및 추천 서비스: 퀀톡

### <a href="https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN05-FINAL-2TEAM"> SK 네트웍스 Family AI 캠프 5기 중 진행한 프로젝트입니다.

## 프로젝트 개요

개인 투자자와 모바일 기반 사용자의 증가와 함께 금융 챗봇 시장은 연평균 24% 이상의 성장세를 보이고 있습니다.

이러한 흐름 속에서 **퀀톡**은 다양한 금융 정보 분석과 추천 서비스를 통해 사용자들에게 맞춤형 투자 솔루션을 제공하며, 급변하는 디지털 금융 환경에 최적화된 서비스를 목표로 합니다.

 ## 시연 영상 <a href="https://youtu.be/V82EvzZ0SQE">( Youtube )</a>

  <p>
    <img src = "https://github.com/user-attachments/assets/9bd11161-0cde-47a8-88d0-7e96c31924f4">
  </p>
 

<details>
<summary><h2>빌드 방법</h2></summary>

## AWS EC2 설정

### 초기 설정
- Ubuntu 서버 선택
- 키페어 설정
- 보안 그룹 설정
- 스토리지 구성 (30GB)

### 접속 및 스왑 메모리 설정
- mobaXterm으로 실행
- 빌드 시 RAM 부족 해결을 위한 스왑 메모리 설정:

```bash
sudo dd if=/dev/zero of=/swapfile bs=128M count=16

sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

sudo swapon -s

sudo vi /etc/fstab
```

- `/etc/fstab` 파일의 마지막 줄에 추가:

```
/swapfile swap swap defaults 0 0
```

## 프로젝트 설정

### 프로젝트 클론
```bash
git clone https://github.com/Lanvizu/SKN05_Final.git
```

### AWS 빌드 시 파일 경로 설정 변경
- `backend/.env` 파일 생성: IPV4_ADDRESS, DNS_ADDRESS, NGROK_URL 수정
  <details>
  <summary>.env 파일 예시</summary>
    
    ```
    IPV4_ADDRESS=''
    DNS_ADDRESS=''
    
    BACKEND_PORT=8000
    FRONTEND_PORT=3000
    
    BASE_URL=http://${IPV4_ADDRESS}:${BACKEND_PORT}/
    BASE_FRONTEND_URL=http://${IPV4_ADDRESS}:${FRONTEND_PORT}
    BASE_DNS_ADDRESS=http://${DNS_ADDRESS}:${FRONTEND_PORT}
    
    NGROK_URL=''
    CURRENTS_API_KEY=''
    
    GOOGLE_CLIENT_ID=''
    GOOGLE_CLIENT_SECRET=''
    GOOGLE_TOKEN_API=https://oauth2.googleapis.com/token
    GOOGLE_REDIRECT_URI=http://${DNS_ADDRESS}:${FRONTEND_PORT}/auth/google/callback
    
    NAVER_CLIENT_ID=''
    NAVER_CLIENT_SECRET=''
    NAVER_REDIRECT_URI=http://${DNS_ADDRESS}:${FRONTEND_PORT}/auth/naver/callback
    
    GOOGLE_HOST_PASSWORD=''
    SECRET_KEY=''
    
    MYSQL_ROOT_PASSWORD=''
    MYSQL_DATABASE=skn0502
    MYSQL_USER=user
    MYSQL_PASSWORD=''
    ```
  </details>
    
- `web/project.conf` 파일 변경: server_name 수정
- `frontend/.env` 파일 생성: REACT_APP_BASE_URL, REACT_APP_DNS_ADDRESS, REACT_APP_IP_ADDRESS 설정
  <details>
  <summary>.env 파일 예시</summary>
    
    ```
    REACT_APP_BASE_URL=http://'':8000
    REACT_APP_DNS_ADDRESS=''
    REACT_APP_IP_ADDRESS=''
    ```
  </details>
- `frontend/package.json` 파일 변경: proxy 수정

## 환경 설정

### Docker 설치
```bash
sudo apt-get update

sudo apt-get upgrade -y

sudo apt-get dist-upgrade

sudo apt update

sudo apt-get install apt-transport-https ca-certificates curl

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) \
stable"

sudo apt update

sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo docker run hello-world

sudo docker version

sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker

sudo apt install docker-compose
```

### Docker Compose 실행
```bash
docker-compose down --volumes && docker-compose up --build
```

## 향후 계획
최소한의 설정 변경 후 Jenkins를 통한 CI/CD 관리 구현

</details>

<details>
<summary><h2>👀 사용자 경험 미리보기</h2></summary>

  ## 회원가입 (이메일 인증)
  
  <p>
    <img src = "https://github.com/user-attachments/assets/18f23b6e-94bd-4ef8-85dd-4c7bfb442cbe">
  </p>
  
  ## 로그인
  
  <p>
    <img src = "https://github.com/user-attachments/assets/69a42fcf-3ebe-4afe-b397-88d5be0c8db0">
  </p>

  ## 관심 주식 설정

  <p>
    <img src = "https://github.com/user-attachments/assets/40101436-7911-4a90-ab8f-5ac79fa1a223">
  </p>
  

  ## 기업 분석

  <p>
    <img src = "https://github.com/user-attachments/assets/c6299c5b-7bad-436f-9b18-b7bd9b1a410c">
  </p>

  ## 뉴스 분석

  <p>
    <img src = "https://github.com/user-attachments/assets/331f0311-12c7-4cfc-8760-34a368b9b0de">
  </p>
  
   ## 차트 분석

  <p>
    <img src = "https://github.com/user-attachments/assets/5eed10fb-d4fb-4f87-8c43-b76a42300a8f">
  </p>
  
</details>


<details>
<summary><h2>프로젝트 환경</h2></summary>

 <h2>ERD</h2>
 <p>
   <img src = "https://github.com/user-attachments/assets/775d1321-2cf2-43a8-9d08-ee7beaa5a867">
 </p>

 <h2>시스템 아키텍처</h2>
 <p>
   <img src = "https://github.com/user-attachments/assets/e507d410-bc1a-4a8d-a2ad-394fab1246b5">
 </p>

 <h2>플로우 차트</h2>
 <p>
   <img src = "https://github.com/user-attachments/assets/211456f0-36f4-4858-ad95-d6ed77d64125">
 </p>

</details>

**개발기간**: 2024.12.20 - 2025.02.19
