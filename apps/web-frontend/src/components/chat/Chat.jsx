import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; // 라이브러리 가져오기

// 백엔드 주소로 소켓 연결 (k8s LoadBalancer 주소)
const socket = io.connect("http://localhost:4000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  // 사용자 이름 랜덤 생성 (테스트용)
  const [username] = useState(`User${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    // 서버에서 메시지가 오면 받아서 리스트에 추가
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 컴포넌트가 꺼질 때 이벤트 정리
    return () => socket.off("receive_message");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageData = {
      id: Date.now(),
      username: username,
      content: inputText,
      time: new Date().toLocaleTimeString()
    };

    // 서버로 메시지 전송! (화면에 바로 추가하지 않고 서버가 돌려주면 추가함)
    socket.emit("send_message", messageData);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
      {/* 채팅 목록 영역 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontWeight: 'bold', color: msg.username === username ? '#007bff' : '#555' }}>
                {msg.username}
              </span>
              <span style={{ fontSize: '0.8em', color: '#aaa' }}>{msg.time}</span>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: msg.username === username ? '#e7f5ff' : '#f0f0f0', marginTop: '4px', maxWidth: '80%' }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      {/* 입력창 영역 */}
      <form onSubmit={handleSendMessage} style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="메시지 입력..." 
          style={{ flex: 1, padding: '12px', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: '#f8f8f8', outline: 'none' }} 
        />
        <button 
          type="submit" 
          style={{ backgroundColor: '#FF6B6B', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          전송
        </button>
      </form>
    </div>
  );
};
export default Chat;