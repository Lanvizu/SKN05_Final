# SKN05_Final

<details>
<summary>빌드 정리 접기/펼치기</summary>

## AWS EC2 설정

### 초기 설정
- Ubuntu 선택
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
<summary>gif</summary>
  
  ## 로그인
  
  <p align="center">
    <img src = "https://github.com/user-attachments/assets/69a42fcf-3ebe-4afe-b397-88d5be0c8db0">
  </p>

  ## 기업 분석

  <p align="center">
    <img src = "https://github.com/user-attachments/assets/c6299c5b-7bad-436f-9b18-b7bd9b1a410c">
  </p>
  
</details>
