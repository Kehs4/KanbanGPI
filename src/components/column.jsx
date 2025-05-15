import React from "react";
import { useDrop } from "react-dnd";
import Card from "./card";

const Column = ({ title, cards, columnKey, moveCard, onCardClick }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      if (item.fromColumn !== columnKey) {
        moveCard(item.fromColumn, columnKey, item.id);
      }
    },
  });

  return (
    <div ref={drop} className="column">
      <h2 className="column-title">{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} column={columnKey} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default Column;