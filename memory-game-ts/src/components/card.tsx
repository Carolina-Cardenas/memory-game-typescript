import React from "react";

// Defines types for the card object and props
interface CardProps {
   card: {
      id: number;
      img: string;
      alt: string;
      flipped: boolean;
      matched: boolean;
   };
   handleCardClick: (id: number) => void;
}

// Convert the component to a typed functional component
export const Card = ({ card, handleCardClick }: CardProps) => {
   // The card information is exported here
   return (
      <div
         className={`drop-shadow-md flex items-center ${
            card.flipped ? "[transform: rotateY(10deg)]" : "bg-white"
         } justify-center cursor-pointer h-16 w-16 hover:scale-105 rounded-xl transition-all duration-1000`}
         onClick={() => handleCardClick(card.id)}>
         <div>
            <img
               src={card.img}
               alt={card.alt}
               className={`h-16 scale-110 ${
                  !card.flipped
                     ? "[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000"
                     : ""
               }`}
            />
         </div>
      </div>
   );
};

//The first div is where the styles are once provided.

// inside the same div there is a javascript logic within the same div.  there is a javascript logic card.flipped is a property to know if the card is flipped or not, if it is true it would use the flipped plus the CSS transform rotate syntax and, if it is false it will take bg-white. ${card.flipped ? '[transform: rotateY(10deg)]' : 'bg-white'

// In the second child div, another ternary or javascript logic is used with the intention of hiding the image that is selected. If it is true it will take this syntax '[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000' and if it is not true it will do nothing,
