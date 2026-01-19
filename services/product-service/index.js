const express = require('express');
const cors = require('cors');
const http = require('http'); // Node.js 기본 모듈
const { Server } = require('socket.io'); // Socket.io 불러오기

const app = express();
const PORT = 4000;

// Express 설정
app.use(cors());
app.use(express.json());

// 1. HTTP 서버 생성 (Express 앱을 감싸기)
const server = http.createServer(app);

// 2. Socket.io 서버 생성 및 CORS 설정
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 곳에서 접속 허용 (보안상 나중에 프론트 주소로 제한하는 게 좋음)
    methods: ["GET", "POST"]
  }
});

// 기존 상품 데이터
let products = {
  1: { id: 1, name: '나이키 한정판 슈즈', price: 129000, stock: 5 },
  2: { id: 2, name: '봄맞이 메이크업 세트', price: 89000, stock: 10 },
  3: { id: 3, name: '개발자용 기계식 키보드', price: 155000, stock: 3 },
};

// 기존 API 라우트
app.get('/products/:id', (req, res) => {
  const product = products[req.params.id];
  if (product) res.json(product);
  else res.status(404).json({ message: '상품 없음' });
});

app.post('/orders', (req, res) => {
  const { productId } = req.body;
  const product = products[productId];
  if (product && product.stock > 0) {
    product.stock -= 1;
    res.json({ success: true, remainingStock: product.stock });
  } else {
    res.json({ success: false, message: '품절되었습니다.' });
  }
});

// 3. Socket.io 이벤트 처리 (채팅 핵심 로직)
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 클라이언트가 'send_message'라고 보내면 받아서
  socket.on('send_message', (data) => {
    // 나를 포함한 모든 사람에게 'receive_message'로 뿌려줌
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// 4. 서버 시작 (app.listen -> server.listen 변경 중요!)
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});