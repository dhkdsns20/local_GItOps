import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    // 1. 헤더 전체 컨테이너 (흰색 배경, 하단 테두리)
    <header style={{ 
      backgroundColor: '#ffffff', 
      padding: '15px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // 살짝 그림자 추가
      position: 'sticky', // 스크롤 내려도 상단에 고정 (선택사항)
      top: 0,
      zIndex: 100 // 다른 요소보다 위에 오도록
    }}>
      
      {/* 2. 로고 이미지 (클릭하면 메인으로 이동) */}
      <img 
        src="/logo.png" // public 폴더에 넣은 이미지는 이렇게 /로 바로 접근 가능
        alt="Olive Young Logo"
        style={{ height: '30px', cursor: 'pointer' }} // 높이 조절, 커서 손가락 모양
        onClick={() => navigate('/')} // 클릭 시 홈으로
      />

      {/* (선택사항) 오른쪽에 추가 메뉴를 넣을 공간 */}
      <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#666', cursor: 'pointer' }}>
        <span>로그인 | 장바구니</span>
      </div>

    </header>
  );
};

export default Header;