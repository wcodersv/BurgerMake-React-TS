// Ingredient.tsx
import React, { useState } from 'react';
import styles from './Ingredient.module.scss';
import ButtonAddDelete from '../ButtonAddDelete';

interface IngredientProps {
  name: string;
  imgSrc: string;
  onAddIngredient: () => void;
  onDeleteIngredient: () => void;
  quantity: number;
}

export const Ingredient = ({ name, imgSrc, onAddIngredient, onDeleteIngredient, quantity }: IngredientProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_ingredient}>
        <img
          src={imgSrc}
          alt={name}
          className={styles.container_ingredient__img}
        />
      </div>

      <p className={styles.container_description}>{name}</p>

      <div className={styles.container_actions}>
        <ButtonAddDelete imgSrc='/assets/svg/icon-minus.svg' onClick={onDeleteIngredient} />
        <span className={styles.container_actions__quantity}>{quantity}</span>
        <ButtonAddDelete imgSrc='/assets/svg/icon-plus.svg' onClick={onAddIngredient} />
      </div>
    </div>
  );
};
