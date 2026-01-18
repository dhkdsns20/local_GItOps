import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, username: '관리자', content: '방송에 오신 것을 환영합니다! 🎉' },
    { id: 2, username: 'User123', content: '안녕하세요~' },
    { id: 3, username: '홍길동', content: '한정판 언제 나오나요?' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      username: '나(Guest)',
      content: inputText,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
      
      {/* 1. 채팅 메시지 목록 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#555' }}>{msg.username}:</span>
            <span style={{ color: '#333' }}>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* 2. 입력창 및 전송 버튼 */}
      <form onSubmit={handleSendMessage} style={{ 
        padding: '15px', 
        borderTop: '1px solid #eee', 
        display: 'flex',             
        alignItems: 'center',        
        gap: '10px'                  
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요..."
          style={{ 
            flex: 1,                 
            padding: '12px', 
            borderRadius: '20px',    
            border: '1px solid #ddd',
            backgroundColor: '#f8f8f8',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            // [수정] 파란색(#007bff) -> 올리브영 초록색(#9bce26)으로 변경
            backgroundColor: '#9bce26', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '20px',    
            cursor: 'pointer', 
            fontWeight: 'bold',
            whiteSpace: 'nowrap'     
          }}
        >
          전송
        </button>
      </form>

    </div>
  );
};

export default Chat;