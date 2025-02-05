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

### 파일 경로 설정 변경
- `.env` 파일 생성: BASE_URL, REACT_APP_BASE_URL, BASE_FRONTEND_URL 설정
- `web/project.conf` 파일 변경: proxy_pass 수정
- `frontend/.env` 파일 생성: REACT_APP_BASE_URL 설정
- `frontend/package.json` 파일 변경: proxy 수정

## 환경 설정

### 시간대 설정
```bash
sudo timedatectl set-timezone 'Asia/Seoul'
```

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

## 발생 이슈

### Secure True 설정 관련 문제
- HTTPS를 통해서만 쿠키 설정 가능
- 현재 프로젝트는 HTTP로 진행 중이므로 로그인 불가능
- 해결 방법: Django의 `settings.py`에서 `REST_AUTH`의 `JWT_AUTH_SECURE`를 False로 수정

### 해결해야 할 문제
1. 일반 회원가입 시 간헐적으로 발생하는 이메일 전송 오류
2. 일반 회원가입 시 전송되는 이메일 양식 수정 불가
3. 일반 회원가입 성공 시 즉시 로그인되는 오류

### AWS 빌드 시 파일 경로 설정 변경
- `frontend/.env`: REACT_APP_BASE_URL
- `frontend/package.json`: proxy
- `web/project.conf`: proxy_pass
- `.env`: BASE_URL, REACT_APP_BASE_URL, BASE_FRONTEND_URL

## 향후 계획
최소한의 설정 변경 후 Jenkins를 통한 CI/CD 관리 구현

</details>
