import React from 'react';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
  const navigate = useNavigate();

  // 가짜 방송 데이터 (3개의 채널)
  const channels = [
    { id: 1, title: '👟 나이키 한정판 런칭', host: '슈즈마스터', viewers: 1204, color: '#FF6B6B' },
    { id: 2, title: '💄 봄맞이 메이크업 꿀팁', host: '뷰티유튜버 A', viewers: 850, color: '#4ECDC4' },
    { id: 3, title: '💻 개발자 취업 특강', host: '개발자 A', viewers: 3400, color: '#45B7D1' },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>🔴 Olive Live</h1>
      
      {/* 방송 리스트 그리드 (카드 형태) */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', maxWidth: '1200px', margin: '0 auto' 
      }}>
        {channels.map((channel) => (
          <div 
            key={channel.id}
            onClick={() => navigate(`/watch/${channel.id}`)} // 클릭 시 해당 방으로 이동
            style={{ 
              backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* 썸네일 영역 */}
            <div style={{ height: '200px', backgroundColor: channel.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
              📺
            </div>
            
            {/* 정보 영역 */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{channel.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px' }}>
                <span>👤 {channel.host}</span>
                <span style={{ color: 'red', fontWeight: 'bold' }}>● {channel.viewers}명 시청중</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LobbyPage;