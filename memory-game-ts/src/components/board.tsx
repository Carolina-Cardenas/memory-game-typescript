interface Image {
    id: number;
    src: string;

}

interface Card extends Image {
    flipped: boolean;
    matched: boolean;
}


const createBoard = (imgs: Image[], shuffleArray: (array: Image[]) => Image[]): void => {
    const duplicatecards: Image[] = imgs.flatMap((img: Image) => {
        const duplicate: Image = {
            ...img,
            id: img.id + imgs.length,
        };
        return [img, duplicate];
    });

    const newCards: Image[] = shuffleArray(duplicatecards);

    const cards: Card[] = newCards.map(card => ({
        ...card,
        flipped: false,
        matched: false,
    }));

    setCards(cards); 
