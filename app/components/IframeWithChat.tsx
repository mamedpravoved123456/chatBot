'use client';

import { useState } from 'react';
import ChatContainer from './ChatContainer';
import styles from './IframeWithChat.module.css';

export default function IframeWithChat() {
  const [isChatVisible, setIsChatVisible] = useState(true);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className={styles.container}>
      <iframe
        src="https://xn--b1acdfjbh2acclca1a.xn--p1ai/"
        className={styles.iframe}
        title="Сайт Администрации Ленинского района"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
      
      {isChatVisible && (
        <div className={styles.chatOverlay}>
          <ChatContainer />
        </div>
      )}
      
      <button
        className={styles.toggleButton}
        onClick={toggleChat}
      >
        {isChatVisible ? 'Скрыть чат' : 'Показать чат'}
      </button>
    </div>
  );
} 