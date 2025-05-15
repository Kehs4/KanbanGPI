import React, { useState } from "react";

function ViewTask({ task, onClose, onUpdate, isCreateMode, onDelete }) {
  const [editMode, setEditMode] = useState(isCreateMode || false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleSave = () => {
    onUpdate({ ...task, text, description, status, comments });
    if (!isCreateMode) setEditMode(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="modal-overlay">
    <div className="modal">
      <button className="close-btn" onClick={onClose}>X</button>
      {editMode ? (
        <>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Título da tarefa"
            autoFocus
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição da tarefa"
            rows={4}
            style={{ marginBottom: 12 }}
          />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Aguardando">Aguardando</option>
            <option value="Em progresso">Em Progresso</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          <button className="task-save-btn" onClick={handleSave}>{isCreateMode ? "Criar" : "Salvar"}</button>
        </>
      ) : (
        <>
          <h2 className="task-title">{task.text}</h2>
          <p className="task-status">Status: {task.status}</p>
          <p className="task-description"><b>Descrição:</b> {task.description || <i>Sem descrição</i>}</p>
          <div className="task-options">
            <button className="task-edit-btn" onClick={() => setEditMode(true)}>Editar</button>
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
      {/* Só mostra comentários se NÃO estiver criando uma nova task */}
      {!isCreateMode && (
        <div className="comments-section">
          <h3 className="comment-title">Comentários</h3>
          <div className="comments-list">
            {comments.map((c, i) => (
              <div key={i} className="comment">{c}</div>
            ))}
          </div>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Adicione um comentário"
            rows="5"
            cols={30}
          />
          <button className='modal-comment-btn' onClick={handleAddComment}>Comentar</button>
        </div>
      )}
    </div>
  </div>
  );
}

export default ViewTask;