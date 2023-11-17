// Ingredient.tsx
import React from 'react';
import styles from './Ingredient.module.scss';
import ButtonAddDelete from '../ButtonAddDelete';

interface IngredientProps {
  'name': string,
  'imgSrc': string,
}


export const Ingredient = ({ name, imgSrc }: IngredientProps) => {
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
        <ButtonAddDelete imgSrc='/assets/svg/icon-minus.svg' />
        <span className={styles.container_actions__quantity}>0</span>
        <ButtonAddDelete imgSrc='/assets/svg/icon-plus.svg' />
      </div>
    </div>
  )
}
