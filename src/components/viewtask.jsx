import React, { useState } from "react";

function ViewTask({ task, onClose, onUpdate, isCreateMode, onDelete }) {
  const [editMode, setEditMode] = useState(isCreateMode || false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [newComment, setNewComment] = useState("");

  const handleSave = () => {
    onUpdate({ ...task, text, description, status });
    if (!isCreateMode) setEditMode(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const now = new Date();
      const newCommentObj = {
        text: newComment,
        author: "Kleyton Holanda", // Substitua por lógica para obter o nome do usuário atual
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      };
      const updatedComments = [...(task.comments || []), newCommentObj];
      onUpdate({ ...task, comments: updatedComments }); // Atualiza os comentários no estado global
      setNewComment(""); // Limpa o campo de entrada
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita quebra de linha no textarea
      handleAddComment();
    }
  };

  const getRandomColor = (name) => {
    if (!name || typeof name !== "string") {
      return "#CCCCCC"; // Cor padrão para casos inválidos
    }
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#8E44AD"];
    const index = name.charCodeAt(0) % colors.length; // Associa uma cor com base na inicial do nome
    return colors[index];
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        {editMode ? (
          <>
          <small>Tarefa: {text}</small>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Título da tarefa"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da tarefa"
              rows={4}
              style={{ marginBottom: 12 }}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <button className="task-save-btn" onClick={handleSave}>
              {isCreateMode ? "Criar" : "Salvar"}
            </button>
          </>
        ) : (
          <>
            <h2 className="task-title">{task.text}</h2>
            <p className="task-status">Status: {task.status}</p>
            <p className="task-description">
              <b>Descrição:</b> {task.description || <i>Sem descrição</i>}
            </p>
            <div className="task-options">
              <button className="task-edit-btn" onClick={() => setEditMode(true)}>
                Editar
              </button>
              {onDelete && (
                <button
                  className="delete-task-btn"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
                      onDelete(task.id);
                    }
                  }}
                >
                  Excluir
                </button>
              )}
            </div>
          </>
        )}
{/* Só mostra comentários se NÃO estiver no modo de edição e inclusão de tasks */}
        {!editMode && !isCreateMode && (
          <div className="comments-section">
            <h3 className="comment-title">Comentários</h3>
            <div className="comments-list">
              {(task.comments || [])
                .filter((c) => c.author && c.author.trim() !== "") // Filtra apenas comentários com autor válido
                .map((c, i) => (
                  <div key={i} className="comment">
                    <div className="comment-author-section">
                      <div
                        className="comment-avatar"
                        style={{ backgroundColor: getRandomColor(c.author) }}
                      >
                        {c.author[0]?.toUpperCase()}
                      </div>
                      <p className="comment-author">{c.author}</p>
                    </div>
                    <div className="comment-content">
                      <p className="comment-date">
                        {c.date} às {c.time}
                      </p>
                      <p className="comment-text">{c.text}</p>
                    </div>
                  </div>
                ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Adicione um comentário"
              rows="5"
              cols={30}
            />
            <button className="modal-comment-btn" onClick={handleAddComment}>
              Comentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTask;