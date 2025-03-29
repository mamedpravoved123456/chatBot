'use client';

import styles from './TopicButton.module.css';

interface TopicButtonProps {
  topic: string;
  text: string;
  onClick: (topic: string) => void;
}

export default function TopicButton({ topic, text, onClick }: TopicButtonProps) {
  return (
    <button 
      className={styles.topicButton}
      onClick={() => onClick(topic)}
    >
      {text}
    </button>
  );
} 