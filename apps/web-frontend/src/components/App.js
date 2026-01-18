import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Chat from './chat/Chat';
import LobbyPage from './LobbyPage';
import Header from './Header'; // 헤더 포함

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
    // [수정 1] 전체 배경을 흰색(#fff)으로 변경
    <div style={{ display: 'flex', width: '100vw', height: '100%', backgroundColor: '#fff' }}>
      
      {/* === 왼쪽: 방송 & 커머스 영역 (70%) === */}
      <div style={{ flex: 7, position: 'relative', borderRight: '1px solid #eee' }}>
        
        {/* 나가기 버튼 (흰 배경이므로 버튼 스타일 변경) */}
        <button 
          onClick={() => navigate('/')}
          style={{ 
            position: 'absolute', top: '20px', left: '20px', zIndex: 10,
            backgroundColor: 'white', color: '#333', border: '1px solid #ddd', // 흰색 버튼으로 변경
            padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          ← 목록으로
        </button>

        {/* 비디오 플레이어 영역 */}
        <div style={{ width: '100%', height: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
          <ReactPlayer
            url="data:image/jpeg;base64,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RhEMha2YN6ZLBtcPeYzj9lSlx4e3u4cT26infRm2trIpg3mu5gbG1uBt247t81bOJGmH6r0xJQU3KbWRyNlpnynDQ4HByfDLS4fFBlvBKI3DX9wuTv1aeaU/ekkH/Jc1+DDx2Pp2BH9Z036fbGyPb/kr7wl0Nc9Iz3Se7upS+pbEyL0eQvwGlxOctHmE4n8OJNT1DLrZ5o4bmxgZIyUlrJmjt1HZw8/H4IOziXo2s1Q6kqYb422U9FFIZMscQc4JcSHDsGqgcCW1FTrGsmNRNNT09E8Ze9xBLntDTgnpkBy9Z9I8U7tTfVdxrnehOw13PrGbXD2loLnD2Fabw/0bTaOtTqdknPrJyH1NRjG4jsAPBo8PeUFoREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//2Q=="
            playing={true}
            muted={true}
            controls={true}
            width="100%"
            height="100%"
            onError={(e) => console.log("비디오 오류 무시:", e)}
          />
          
          <div style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            backgroundColor: 'red', color: 'white', padding: '5px 12px', 
            borderRadius: '20px', fontWeight: 'bold', fontSize: '14px' 
          }}>
            LIVE 🔴
          </div>
        </div>

        {/* 상품 배너 (흰 배경에 맞게 그림자 강조) */}
        {product && (
        <div style={{
          position: 'absolute', bottom: '30px', left: '30px', 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '20px', borderRadius: '15px',
          display: 'flex', alignItems: 'center', gap: '20px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)', // 그림자를 더 진하게
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
              backgroundColor: product.stock > 0 ? '#82DC28' : '#95a5a6', // 올리브영 연두색(#82DC28) 적용
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

// 메인 App 컴포넌트
const App = () => {
  return (
    <Router>
      <Header />
      {/* 헤더 높이(약 60px)만큼 뺀 높이로 설정 */}
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