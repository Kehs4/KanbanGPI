import React, { useState } from "react";
import { useDrag } from "react-dnd";

const Card = ({ card, column, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, fromColumn: column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="card"
      style={{ opacity: isDragging ? 0.3 : 1, cursor: "pointer" }}
      onClick={() => onClick(card)}
    >
      <div className="card-header" style={{ display: "flex"}}>
        <strong style={{ color: "#ff8500", fontSize: "16px", marginRight: "8px" }}>Tarefa:</strong>
        <p style={{ color: "black", fontWeight: "200"}}>{card.text}</p>
      </div>
      
      {card.description && (
        <small style={{ color: "#5c5c5c" }}>
          {card.description.length > 60
            ? card.description.slice(0, 60) + "..."
            : card.description}
        </small>
      )}
      <small>Status: {card.status}</small>
      
      <small>Criado em: {card.createdAt}</small>

    </div>
  );
};

export default Card;