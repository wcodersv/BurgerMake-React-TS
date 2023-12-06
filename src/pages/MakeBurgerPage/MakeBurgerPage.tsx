// MakeBurger.tsx
import React, { useEffect, useMemo, useState } from 'react';
import styles from './MakeBurgerPage.module.scss';
import Summary from '../../components/Summary';
import Ingredient from '../../components/Ingredient';
import ingredientsData from '../../data/BurgerIngredients.json';
import { animated, config, useSpring, useSprings } from 'react-spring';
import PlaceholderQuestion from '../../components/PlaceholderQuestion';
import ModalCheckout from '../../components/modal/ModalCheckout';
import TotalAmount from '../../components/TotalAmount';

export type BurgerIngredient = {
    name: string,
    kcal: number,
    oz: number,
    price: number,
    time: number,
    img: string,
    height: number,
    width: number,
    left: number,
    img_group?: string,
}

export type BurgerState = {
    ingredients: string[];
    price: string;
    tomatoKetchup: boolean;
}


export const MakeBurgerPage = () => {


    const finishIngredientData = ingredientsData[1]; // Верхняя булка
    const initialIngredientData = ingredientsData[0]; // Нижняя булка
    const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>([initialIngredientData]);
    const [burgerTime, setBurgerTime] = useState<number>(initialIngredientData.time);
    const [burgerWeight, setBurgerWeight] = useState<number>(initialIngredientData.oz);
    const [burgerKcal, setBurgerKcal] = useState<number>(initialIngredientData.kcal);
    const [burgerPrice, setBurgerPrice] = useState<number>(initialIngredientData.price);

    // Дополнительные состояния для управления анимациями и верхней булкой
    const [isImageVisible, setIsImageVisible] = useState<boolean>(false);// анимация при добавление ингредиентов
    const [bottomIngredientPositions, setBottomIngredientPositions] = useState<number[]>([0, initialIngredientData.height]);
    const [isTopBunAdded, setIsTopBunAdded] = useState<boolean>(false);
    const [isAddingBurger, setIsAddingBurger] = useState<boolean>(false);

    const [tomatoKetchup, setTomatoKetchup] = useState<boolean>(false);
    const [isCheckoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

    // Для сохранения состояния бургера перед открытием модального окна
    const [savedBurgerState, setSavedBurgerState] = useState<BurgerState | null>(null);


    useEffect(() => {
        if (!initialIngredientData || !finishIngredientData) {
            console.error('Invalid JSON file structure.');
            alert('Invalid JSON file structure.')
        }
    }, [initialIngredientData, finishIngredientData]);


    const filteredIngredients = useMemo(() => {
        return ingredientsData.filter(
            (ingredient) => ingredient.name !== 'Bun-top' && ingredient.name !== 'Bun-bottom'
        );
    }, [ingredientsData]);


    const updateStats = (ingredient: BurgerIngredient, operation: 'add' | 'remove') => {
        setBurgerTime((prev) => operation === 'add' ? prev + ingredient.time : Math.max(initialIngredientData.time, prev - ingredient.time));
        setBurgerWeight((prev) => operation === 'add' ? prev + ingredient.oz : Math.max(initialIngredientData.oz, prev - ingredient.oz));
        setBurgerKcal((prev) => operation === 'add' ? prev + ingredient.kcal : Math.max(initialIngredientData.kcal, prev - ingredient.kcal));
        setBurgerPrice((prev) => operation === 'add' ? prev + ingredient.price : Math.max(initialIngredientData.price, prev - ingredient.price));
    };

    // Добавление верхней булки
    const addTopBunIfNotAdded = () => {
        if (!isTopBunAdded) {
            setBurgerIngredients((prevBurger) => [...prevBurger, finishIngredientData]);
            setBottomIngredientPositions((prev) => [...prev, prev[prev.length - 1] + finishIngredientData.height]);
            setIsTopBunAdded(true);
        }
    };

    // Удаление верхней булки
    const removeTopBunIfExists = () => {
        if (isTopBunAdded) {
            setBurgerIngredients((prevBurger) => prevBurger.filter(item => item !== finishIngredientData));
            setIsTopBunAdded(false);
        }
    };


    // Добавление ингредиента на бургер
    const addIngredient = (ingredient: BurgerIngredient) => {
        if (isTopBunAdded) {
            removeTopBunIfExists();
        }

        setBurgerIngredients((prevBurger) => [...prevBurger, ingredient]);

        updateStats(ingredient, 'add');
        setBottomIngredientPositions((prev) => [...prev, prev[prev.length - 1] + ingredient.height]);
        setIsImageVisible(true);
        setIsAddingBurger(true);
    };


    // Удаление ингредиента с бургера
    const removeIngredient = (ingredient: BurgerIngredient) => {
        setBurgerIngredients((prevBurger) => {
            const index = prevBurger.lastIndexOf(ingredient);
            if (index !== -1) {
                const updatedBurger = [...prevBurger];
                updatedBurger.splice(index, 1);
                return updatedBurger;
            }
            return prevBurger;
        });

        updateStats(ingredient, 'remove');
        removeTopBunIfExists();
    };


    // Обработка изменений в burger
    useEffect(() => {
        if (burgerIngredients.length > 1) {
            const timeoutId = setTimeout(() => {
                if (!isTopBunAdded) {
                    addTopBunIfNotAdded();
                    setIsTopBunAdded(true);
                }
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        } else {
            removeTopBunIfExists();
        }
    }, [burgerIngredients, isAddingBurger]);

    // Добавить или удалить вес кетчупа
    useEffect(() => {
        if (tomatoKetchup) {
            setBurgerWeight((prev) => prev + 1.2);
        } else {
            setBurgerWeight((prev) => Math.max(initialIngredientData.oz, prev - 1.2));
        }
    }, [tomatoKetchup]);


    // Обновление анимации при изменении isImageVisible
    useEffect(() => {
        setIsImageVisible(true);
    }, [burgerIngredients]);

    // Анимация translateY для каждого ингредиента в burger при появление ингредиентов
    const ingredientSprings = useSprings(
        burgerIngredients.length,
        burgerIngredients.map(() => ({
            from: { translateY: -50 },
            to: { translateY: isImageVisible ? 0 : -50 },
            config: config.stiff,
        }))
    );

    //Анимация появления и исчезнования кетчупа
    const ketchupShowSpring = useSpring({
        reset: tomatoKetchup,
        right: tomatoKetchup ? '2rem' : '0',
        opacity: tomatoKetchup ? 1 : 0,
        config: { duration: 300 },
    });

    const placeholderQuestionShowSpring = useSpring({
        opacity: burgerKcal > 1500 ? 1 : 0,
        config: { duration: 300 },
    })


    const handleTomatoKetchupClick = () => {
        setTomatoKetchup(!tomatoKetchup);
    };


    const toggleModal = () => {
        setCheckoutModalOpen(!isCheckoutModalOpen);

        // Если модальное окно закрывается, восстанавливаем сохраненное состояние бургера
        if (isCheckoutModalOpen) {
            setBurgerIngredients([initialIngredientData]);
            setBurgerTime(initialIngredientData.time);
            setBurgerWeight(initialIngredientData.oz);
            setBurgerKcal(initialIngredientData.kcal);
            setBurgerPrice(initialIngredientData.price);
            setTomatoKetchup(false);
        } else {
            // Если модальное окно открывается и верхней булки нет, добавляем ее
            if (!isTopBunAdded) {
                addTopBunIfNotAdded()
            }

            // Добавляем верхнюю булку в текущее состояние бургера перед сохранением
            const updatedBurgerIngredients = isTopBunAdded
                ? [...burgerIngredients]
                : [...burgerIngredients, finishIngredientData];

            // Сохраняем текущее состояние бургера
            const ingredientNames = updatedBurgerIngredients.map((ingredient) => ingredient.name);
            setSavedBurgerState({
                ingredients: ingredientNames,
                price: `$${burgerPrice.toFixed(2)}`,
                tomatoKetchup: tomatoKetchup,
            });
        }
    };

    return (
        <main className={styles.main}>
            <div className={`${styles.main_container} container`}>
                <h1 className={styles.main_header}>Make <br /> Your <br /> Burger </h1>
                <div className={styles.main_grid}>

                    <div className={styles.main_burger}>
                        <div className={styles.main_burger__scene}>
                            {ingredientSprings.map((spring, index) => (
                                <animated.img
                                    key={`${burgerIngredients[index].name}-${index}`}
                                    className={styles.main_burger__scene__element}
                                    src={`${process.env.PUBLIC_URL}${burgerIngredients[index].img_group || burgerIngredients[index].img}`}
                                    alt={`${burgerIngredients[index].name}`}
                                    style={{
                                        bottom: `${bottomIngredientPositions[index]}%`,
                                        width: `${burgerIngredients[index].width}%`,
                                        left: `${burgerIngredients[index].left}%`,
                                        zIndex: index,
                                        ...spring,
                                    }}
                                />
                            ))}

                            <animated.img
                                src={`${process.env.PUBLIC_URL}/assets/burger/ketchup1.webp`}
                                alt=' '
                                className={styles.main_burger_ketchup}
                                style={ketchupShowSpring}
                            />
                        </div>

                    </div>
                    <div className={styles.main_summary}>
                        <Summary
                            time={burgerTime}
                            weight={burgerWeight}
                            kcal={burgerKcal}
                            price={burgerPrice}
                            toggleModal={toggleModal}
                        />

                        <div
                            onClick={handleTomatoKetchupClick}
                            className={styles.main_summary_ketchup}
                        >
                            <span className={styles.main_summary_ketchup_title}>{`${tomatoKetchup ? '–' : '+'} Tomato Ketchup`}</span>
                            <span className={styles.main_summary_ketchup_weight}> 1.2 oz</span>
                        </div>
                    </div>
                </div>

                <div className={styles.main_ingredients}>
                    {filteredIngredients.map((ingredient, index) => (
                        <Ingredient
                            key={`${ingredient.name}-${index}`}
                            name={ingredient.name}
                            imgSrc={ingredient.img}
                            onAddIngredient={() => addIngredient(ingredient)}
                            onDeleteIngredient={() => removeIngredient(ingredient)}
                            quantity={burgerIngredients.filter((item) => item === ingredient).length}
                        />
                    ))}
                </div>

                <div className={styles.main_total}>
                    <TotalAmount
                        price={burgerPrice}
                        toggleModal={toggleModal}
                    />
                </div>

                <animated.div
                    className={styles.main_question}
                    style={placeholderQuestionShowSpring}>
                    <PlaceholderQuestion />
                </animated.div>
            </div>
            {isCheckoutModalOpen ? <ModalCheckout toggleModal={toggleModal} dataBurger={savedBurgerState} /> : ''}

        </main>
    )
}
