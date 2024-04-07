# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:14-alpine as build

WORKDIR /app

# 컨테이너 내부로 package.json 파일들을 복사
# 먼저 진행하는 이유는 package.json 파일들을 복사하고 npm install을 실행하면
# package.json 파일이 변경되지 않았을 때 캐시된 레이어를 사용할 수 있기 때문
COPY package*.json ./

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

RUN npm run build


FROM nginx:1.25.4

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

RUN apt-get update && apt-get -y install cron && apt-get -y install dos2unix

# crontab 설정 파일을 복사한다.
COPY crontab /etc/cron.d/crontab
RUN dos2unix /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab
CMD ["cron" , "-f"]

EXPOSE 80
EXPOSE 443

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]
