// MakeBurger.tsx
import React from 'react';
import styles from './MakeBurgerPage.module.css';
import BurgerWhole from '../../components/Burger/BurgerWhole';


export const MakeBurgerPage = () => {
    return (
        <>
            <div>
                <h1>MakeBurgerPage</h1>
                <p style={{'height':'200px', 'border':'2px solid blue'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat veritatis similique, quae nulla beatae non corrupti, porro et sint rerum sapiente provident fugit quisquam ex molestias deleniti expedita numquam ipsa!
                    Voluptates veniam quasi labore reprehenderit odit sint quisquam molestiae fuga distinctio, quaerat, porro, nobis officiis doloribus commodi. Cupiditate libero iusto, non magni quibusdam unde architecto dolor veritatis atque beatae dolorum?cepturi officiis eius dolorum provident alias voluptatum maiores ducimus ipsum eligendi voluptates autem veniam totam a praesentium doloremque minus, labore suscipit impedit deleniti unde quisquam distinctio temporibus. Sunt, porro deserunt?
                </p>
                <div style={{'height':'600px', 'border':'2px solid yellow', width: '100%'}}>
                    <BurgerWhole />
                </div>


            </div>
        </>
    )
}
