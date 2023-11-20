// MakeBurger.tsx
import React, { useEffect, useState } from 'react';
import styles from './MakeBurgerPage.module.scss';
import Summary from '../../components/Summary';
import Ingredient from '../../components/Ingredient';
import ingredientsData from '../../data/BurgerIngredients.json';

export const MakeBurgerPage = () => {
    interface Ingredient {
        name: string;
        img: string;
    }

    const [burger, setBurger] = useState<Ingredient[]>([ingredientsData[0]]); 
    const ingredientsDataFilter = ingredientsData.filter(
        (ingredient) => ingredient.name !== 'Bun-top' && ingredient.name !== 'Bun-bottom'
    );


    const addIngredient = (ingredient: Ingredient) => {
        setBurger((prevBurger) => [...prevBurger, ingredient]);
    };

    const removeIngredient = (ingredient: Ingredient) => {
        setBurger((prevBurger) => {
            const index = prevBurger.findIndex((item) => item === ingredient);
            if (index !== -1) {
                const updatedBurger = [...prevBurger];
                updatedBurger.splice(index, 1);
                return updatedBurger;
            }
            return prevBurger;
        });
    };


    return (
        <main>
            <div className={`${styles.main_container} container`}>
                <h1 className={styles.main_header}>Make <br /> Your <br /> Burger </h1>
                <div className={styles.main_grid}>


                    <div className={styles.main_burger}>
                        <div className={styles.main_burger__scene}>
                            {burger.map((ingredient, index) => (
                                <img
                                    key={`${ingredient.name}-${index}`}
                                    className={styles.main_burger__scene__element}
                                    src={ingredient.img}
                                    alt="Bun-bottom"
                                />
                            ))}
                        </div>

                    </div>
                    <div className={styles.main_summary}>
                        <Summary />
                    </div>
                </div>

                <div className={styles.main_ingredients}>
                    {ingredientsDataFilter.map((ingredient, index) => (
                        <Ingredient
                            key={`${ingredient.name}-${index}`}
                            name={ingredient.name}
                            imgSrc={ingredient.img}
                            onAddIngredient={() => addIngredient(ingredient)}
                            onDeleteIngredient={() => removeIngredient(ingredient)}
                            quantity={burger.filter((item) => item === ingredient).length}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}
