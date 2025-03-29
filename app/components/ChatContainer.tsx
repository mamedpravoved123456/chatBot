'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ChatContainer.module.css';
import ChatMessage from './ChatMessage';
import TopicButton from './TopicButton';

interface Message {
  content: string;
  isUser: boolean;
}

interface Topic {
  id: string;
  text: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const [containerWidth, setContainerWidth] = useState(400);
  const [containerHeight, setContainerHeight] = useState(600);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPositionRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    // Загрузка начального сообщения при монтировании компонента
    fetchInitialMessage();
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Обработчики событий для изменения размера чата
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startPositionRef.current.x;
      const deltaY = e.clientY - startPositionRef.current.y;
      
      const newWidth = startPositionRef.current.width - deltaX;
      const newHeight = startPositionRef.current.height - deltaY;
      
      if (newWidth >= 300) setContainerWidth(newWidth);
      if (newHeight >= 400) setContainerHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Загрузка начального сообщения от бота
  const fetchInitialMessage = async () => {
    try {
      // При статическом деплое не можем использовать серверный API
      // Вместо этого загружаем данные из JSON-файла
      // Учитываем basePath для продакшен версии
      const basePath = process.env.NODE_ENV === 'production' ? '/chat-bot-nextjs' : '';
      const response = await fetch(`${basePath}/data/responses.json`);
      const data = await response.json();
      
      setMessages([{
        content: "Здравствуйте! Я чат-бот Администрации Ленинского района. Выберите интересующую вас тему:",
        isUser: false
      }]);
      
      // Устанавливаем топики из загруженного JSON
      if (data.topicButtons) {
        setTopics(data.topicButtons);
      }
    } catch (error) {
      console.error('Error fetching initial message:', error);
      // В случае ошибки загрузки, используем базовый набор тем
      setTopics([
        { id: "какие мероприятия в этом месяце?", text: "Мероприятия" },
        { id: "адрес администрации ленинского района", text: "Адрес" },
        { id: "телефон администрации", text: "Телефон" }
      ]);
    }
  };

  // Отправка сообщения пользователя
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { content: message, isUser: true }]);
    setInput('');
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      
      // Добавляем ответ бота
      setMessages(prev => [...prev, { content: data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        content: 'Извините, произошла ошибка при обработке запроса.', 
        isUser: false 
      }]);
    }
  };

  // Обработка нажатия кнопки темы
  const handleTopicClick = (topic: string) => {
    handleSendMessage(topic);
  };

  // Обработка нажатия клавиши Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  // Начало изменения размера
  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true);
    startPositionRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: containerWidth,
      height: containerHeight
    };
  };

  return (
    <div 
      className={styles.chatContainer} 
      ref={containerRef}
      style={{ width: containerWidth + 'px', height: containerHeight + 'px' }}
    >
      <div className={styles.chatHeader}>
        Чат-бот Администрации Ленинского района
      </div>
      
      <div className={styles.chatMessages} ref={chatMessagesRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.content} isUser={msg.isUser} />
        ))}
        
        {topics.length > 0 && (
          <div className={styles.topicButtonsContainer}>
            {topics.map((topic) => (
              <TopicButton 
                key={topic.id} 
                topic={topic.id} 
                text={topic.text} 
                onClick={handleTopicClick} 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Введите ваш вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className={styles.resizeHandle} onMouseDown={handleResizeStart} />
    </div>
  );
} 