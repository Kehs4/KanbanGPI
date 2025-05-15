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

  // State to manage update history
  const [updateHistory, setUpdateHistory] = useState(card.updates || []);

  // Function to simulate an update
  const handleUpdate = (updatedBy) => {
    const now = new Date();
    const newUpdate = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      updatedBy,
    };
    setUpdateHistory([...updateHistory, newUpdate]);
  };

  return (
    <div
      ref={drag}
      className="card"
      style={{ opacity: isDragging ? 0.3 : 1, cursor: "pointer" }}
      onClick={() => onClick(card)}
    >
      <p>{card.text}</p>
      {card.description && (
        <small style={{ color: "#5c5c5c" }}>
          {card.description.length > 60
            ? card.description.slice(0, 60) + "..."
            : card.description}
        </small>
      )}
      <small>Status: {card.status}</small>
      
      {/* Display creation date */}
      <small>Criado às: {card.createdAt}</small>

    </div>
  );
};

export default Card;