import React, { useEffect, useState } from "react";
import { imgs } from "../data";
import { Card } from "./card";
import { Modal } from "./modal";

// Define types for cards and images
interface Image {
   id: string; // Changed to string for compatibility
   src: string;
}

interface CardType extends Image {
   flipped: boolean;
   matched: boolean;
}

// Generic function to shuffle an array of any type
const shuffleArray = <T,>(array: T[]): T[] => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; //positions are reversed
   }
   return array; // Return the fully shuffled array
};

export const Board = (): JSX.Element => {
   const [cards, setCards] = useState<CardType[]>([]);
   const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
   const [isDisabled, setIsDisabled] = useState<boolean>(false);
   const [moves, setMoves] = useState<number>(0);
   const [gameOver, setGameOver] = useState<boolean>(false);

   //A new function is created (createBoard) where the images are imported from the data.js array, a flatMap is used to create a duplicate array to match the same images, we have an array with 10 elements then it will be duplicated to 20 elements, and each element will be modified with the ID, two pairs of images but with different IDs

   const createBoard = (): void => {
      const duplicateCards: Image[] = imgs.flatMap((img: Image) => {
         const duplicate: Image = {
            ...img,
            id: img.id + imgs.length,
         };
         return [img, duplicate];
      });

      const newCards: Image[] = shuffleArray(duplicateCards);

      const cards: CardType[] = newCards.map((card) => ({
         ...card,
         flipped: false,
         matched: false,
      }));

      setCards(cards);
   };

   useEffect(() => {
      createBoard();
   }, []);

   // Handle card click
   const handleCardClick = (id: string): void => {
      if (isDisabled) return;

      const currentCard = cards.find((card: CardType) => card.id === id);

      if (currentCard && !currentCard.flipped && !currentCard.matched) {
         currentCard.flipped = true;

         const newFlippedCards = [...flippedCards, currentCard];
         setFlippedCards(newFlippedCards);

         if (newFlippedCards.length === 2) {
            setIsDisabled(true);
            const [firstCard, secondCard] = newFlippedCards;

            if (firstCard.src === secondCard.src) {
               firstCard.matched = true;
               secondCard.matched = true;
               setIsDisabled(false);
            } else {
               setTimeout(() => {
                  firstCard.flipped = false;
                  secondCard.flipped = false;
                  setCards([...cards]);
                  setIsDisabled(false);
               }, 1000);
            }

            setFlippedCards([]);
            setMoves(moves + 1);
         }

         setCards([...cards]);
      }

      if (cards.every((card) => card.matched)) {
         setGameOver(true);
         setIsDisabled(true);
      }
   };

   // Reset the game
   const handleNewGame = (): void => {
      setCards([]);
      createBoard();
      setMoves(0);
      setGameOver(false);
      setIsDisabled(false);
   };

   return (
      <>
         {gameOver && (
            <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
         )}

         <div className="relative h-screen flex items-center">
            <div className="mx-auto flex flex-col justify-center items-center">
               <h1 className="font-bold text-4xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl">
                  Memory Card Cat Game
               </h1>
               <div className="grid grid-cols-4 gap-3 justify-center items-center px-3 py-5 my-3">
                  {cards.map((card) => (
                     <Card
                        card={card}
                        key={card.id}
                        handleCardClick={handleCardClick}
                     />
                  ))}
               </div>
               <button
                  className="bg-black font-semibold text-white rounded-md px-5 py-1 hover:bg-yellow-500 hover:text-black transition-all mb-3"
                  onClick={handleNewGame}>
                  New cats game
               </button>
            </div>

            <Modal
               gameOver={gameOver}
               moves={moves}
               handleNewGame={handleNewGame}
            />
         </div>
      </>
   );
};
