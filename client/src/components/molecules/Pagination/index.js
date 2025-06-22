import React from 'react';
import Button from '../../atoms/Button';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <Button
        text="Anterior"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <Button
        text="Próxima"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;