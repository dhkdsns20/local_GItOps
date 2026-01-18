const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000; // 이 서버는 4000번 포트에서 실행됩니다.

// 모든 곳에서 내 서버에 접속할 수 있게 허용 (CORS)
app.use(cors());
app.use(express.json());

// ★ 서버 메모리에 저장된 "진짜 재고" (DB 대용)
let products = {
  1: { id: 1, name: '나이키 한정판 슈즈', price: 129000, stock: 5 },
  2: { id: 2, name: '봄맞이 메이크업 세트', price: 89000, stock: 10 },
  3: { id: 3, name: '개발자용 기계식 키보드', price: 155000, stock: 3 },
};

// [API 1] 상품 정보 조회 (GET /products/:id)
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = products[id];

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }
});

// [API 2] 상품 주문 (POST /orders)
app.post('/orders', (req, res) => {
  const { productId } = req.body;
  const product = products[productId];

  if (!product) {
    return res.status(404).json({ success: false, message: '상품 없음' });
  }

  if (product.stock > 0) {
    product.stock -= 1; // 재고 1 감소
    console.log(`[주문 접수] ${product.name} - 남은 재고: ${product.stock}개`);
    res.json({ success: true, remainingStock: product.stock });
  } else {
    res.json({ success: false, message: '이미 품절되었습니다.' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 쇼핑몰 서버가 http://localhost:${PORT} 에서 실행 중입니다!`);
});