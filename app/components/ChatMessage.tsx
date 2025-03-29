'use client';

import { useEffect, useRef } from 'react';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.innerHTML = message;
    }
  }, [message]);

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.botMessage}`} ref={messageRef} />
  );
} 