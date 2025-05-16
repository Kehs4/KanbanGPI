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

  console.log(cards.map((card) => card.createdAt)); // Verifique os valores de createdAt

  return (
    <div ref={drop} className="column">
      <h2 className="column-title">{title}</h2>
      <div
        className="column-cards"
        style={{
          maxHeight: "600px", // Limita a altura da coluna
          overflowY: "auto", // Adiciona barra de rolagem vertical
        }}
      >
        {cards
          .sort((a, b) => {
            // Converte as datas de criação para objetos Date
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            // Ordena os mais recentes (hoje ou futuros) acima dos mais antigos
            return dateB - dateA;
          })
          .map((card) => (
            <Card key={card.id} card={card} column={columnKey} onClick={onCardClick} />
          ))}
      </div>
    </div>
  );
};

export default Column;