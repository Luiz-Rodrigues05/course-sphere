import React from 'react';
import styles from './Lesson.module.css';

const LessonCard = ({ lesson }) => {
  const videoId = lesson.video_url.split('v=')[1]?.split('&')[0];
  const thumbnailUrl = videoId 
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
    : 'https://via.placeholder.com/320x180.png?text=Video+Indisponível';

  return (
    <div className={styles.card}>
      <img src={thumbnailUrl} alt={lesson.title} className={styles.thumbnail} />
      <div className={styles.info}>
        <h4 className={styles.title}>{lesson.title}</h4>
        <span className={`${styles.status} ${styles[lesson.status]}`}>
          {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
        </span>
      </div>
    </div>
  );
};

export default LessonCard;