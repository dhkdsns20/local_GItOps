# 1. 베이스 이미지 (Node.js 18)
FROM node:18

# 2. 작업 폴더 설정 (/app)
WORKDIR /app

# 3. 패키지 명세서 복사 (package.json)
COPY package.json .

# 4. 라이브러리 설치 (Express, Cors 등 설치됨)
RUN npm install

# 5. 소스 코드 전체 복사 (index.js 등)
COPY . .

# 6. 포트 열기 (백엔드는 4000번을 사용함)
EXPOSE 4000

# 7. 실행 명령어 (서버는 node index.js 로 실행함)
CMD ["node", "index.js"]