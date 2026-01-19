import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Chat from './chat/Chat';
import LobbyPage from './LobbyPage';
import Header from './Header';
import './App.css';
import oliveYoungImage from '../assets/streaming-wait.png';

// 방송 화면 컴포넌트
const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("서버 연결 실패:", err));
  }, [id]);

  const handleOrder = () => {
    if (!product) return;
    fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(`🎉 주문 성공! 남은 수량: ${data.remainingStock}개`);
        setProduct(prev => ({ ...prev, stock: data.remainingStock }));
      } else {
        alert('🚫 ' + data.message);
      }
    })
    .catch(err => console.error("주문 실패:", err));
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100%', backgroundColor: '#fff' }}>
      
      {/* === 왼쪽: 방송 & 커머스 영역 (70%) === */}
      <div style={{ flex: 7, position: 'relative', borderRight: '1px solid #eee' }}>
        
        {/* 나가기 버튼 */}
        <button 
          onClick={() => navigate('/')}
          style={{ 
            position: 'absolute', top: '20px', left: '20px', zIndex: 10,
            backgroundColor: 'white', color: '#333', border: '1px solid #ddd',
            padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          ← 목록으로
        </button>

        {/* [수정 2] 비디오 플레이어 영역 구조 변경 */}
        <div style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: '#000', 
            overflow: 'hidden',
            // 내용물을 정중앙에 배치하기 위한 Flex 설정 추가
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
          
          {/* [수정 3] 16:9 비율을 유지하는 래퍼(Wrapper) 추가 */}
          <div style={{
              width: '100%',
              maxWidth: '100%', 
              aspectRatio: '16 / 9', // 16:9 비율 고정 (브라우저 크기에 따라 위아래 여백 생김)
              position: 'relative'   // 내부 이미지 배치를 위해
          }}>
              <img 
                src={oliveYoungImage} 
                alt="올리브영 이미지"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain' // [핵심] cover -> contain으로 변경하여 잘림 방지
                }} 
              />
          </div>

          {/* LIVE 뱃지 (검은 배경 기준 우상단 고정) */}
          <div style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            backgroundColor: 'red', color: 'white', padding: '5px 12px', 
            borderRadius: '20px', fontWeight: 'bold', fontSize: '14px',
            zIndex: 5
          }}>
            LIVE 🔴
          </div>
        </div>

        {/* 상품 배너 */}
        {product && (
        <div style={{
          position: 'absolute', bottom: '30px', left: '30px', 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderRadius: '15px',
          display: 'flex', alignItems: 'center', gap: '20px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          minWidth: '350px', border: '1px solid #eee'
        }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '8px', color:'#999', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px' }}>IMG</div>
          
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: '#222', fontSize: '16px' }}>{product.name}</div>
            <div style={{ color: '#FF7878', fontWeight: 'bold' }}>{product.price.toLocaleString()}원</div>
            <div style={{ fontSize: '12px', color: product.stock === 0 ? 'red' : '#888', marginTop: '4px' }}>
              {product.stock === 0 ? '🚨 품절되었습니다' : `남은 수량: ${product.stock}개`}
            </div>
          </div>

          <button 
            onClick={handleOrder}
            disabled={product.stock === 0} 
            style={{ 
              backgroundColor: product.stock > 0 ? '#82DC28' : '#95a5a6',
              color: 'white', border: 'none', padding: '12px 24px', 
              borderRadius: '8px', cursor: product.stock > 0 ? 'pointer' : 'not-allowed', 
              fontWeight: 'bold', fontSize: '14px' 
            }}
          >
            {product.stock > 0 ? '구매하기' : 'SOLD OUT'}
          </button>
        </div>
        )}

        {/* 좋아요 버튼 */}
        <div style={{ position: 'absolute', bottom: '30px', right: '30px', textAlign: 'center' }}>
          <button 
            onClick={() => setLikes(likes + 1)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)', border: '2px solid white', borderRadius: '50%',
              width: '60px', height: '60px', fontSize: '30px', cursor: 'pointer',
              backdropFilter: 'blur(5px)'
            }}
          >
            ❤️
          </button>
          <div style={{ color: 'white', marginTop: '5px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{likes}</div>
        </div>

      </div>

      {/* === 오른쪽: 채팅 영역 === */}
      <div style={{ flex: 3, backgroundColor: '#fff', borderLeft: '1px solid #eee' }}>
        <Chat />
      </div>

    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ height: 'calc(100vh - 65px)', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<LobbyPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;