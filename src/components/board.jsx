import React, { useState } from "react";
import Column from "./column";
import ViewTask from "./viewtask";

// Componente principal do Board
// Este componente gerencia o estado das colunas e tarefas
const Board = () => {
    const [columns, setColumns] = useState({
        todo: [
            {
                id: 1,
                text: "Adicionar data/hora",
                description: "Adicionar data/hora nos cards.",
                status: "Em progresso",
                comments: [],
                createdAt: "15/05/2025 10:00", // Adicionando data/hora de criação
                updates: [], // Histórico de atualizações vazio inicialmente
            },
        ],
        inProgress: [
            {
                id: 2,
                text: "Configurar projeto",
                description: "Realizando a criação das funções.",
                status: "Em progresso",
                comments: ["Faltam alguns ajustes."],
                createdAt: "15/05/2025 09:30",
            },
        ],
        done: [
            {
                id: 3,
                text: "Implementar Board",
                description: "Criar os boards/cards.",
                status: "Finalizado",
                comments: ["Finalizado!"],
                createdAt: "14/05/2025 14:00",
            },
            {
                id: 4,
                text: "Criar página Task",
                description: "Criar a página de Tarefas da GPI.",
                status: "Finalizado",
                comments: ["Feito!"],
                createdAt: "14/05/2025 15:00",
                updates: [],
            },
            {
                id: 5,
                text: "Criar componentes",
                description: "Criar as funções de board, card, modal.",
                status: "Finalizado",
                comments: ["Finalizado!"],
                createdAt: "14/05/2025 16:00",
                updates: [],
            },
            {
                id: 6,
                text: "Criar modal",
                description: "Criar o modal ao clicar na task.",
                status: "Finalizado",
                comments: ["Feito!"],
                createdAt: "14/05/2025 17:00",
                updates: [],
            },
            {
                id: 7,
                text: "Criar drag and drop",
                description: "Criar função de mover cards para outras colunas.",
                status: "Finalizado",
                comments: ["Feito!"],
                createdAt: "14/05/2025 18:00",
                updates: [],
            },
        ],
    });

    const [selectedTask, setSelectedTask] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    // Função para mover task entre colunas
    const moveCard = (sourceColumn, targetColumn, cardId) => {
        const card = columns[sourceColumn].find((card) => card.id === cardId);
        if (!card) return;

        setColumns((prevColumns) => {
            const updatedSourceColumn = prevColumns[sourceColumn].filter(
                (card) => card.id !== cardId
            );
            const updatedTargetColumn = [...prevColumns[targetColumn], card];

            return {
                ...prevColumns,
                [sourceColumn]: updatedSourceColumn,
                [targetColumn]: updatedTargetColumn,
            };
        });
    };

    // Função para adicionar nova task
    const handleCreateTask = (newTask) => {
        const now = new Date();
        setColumns((prev) => ({
            ...prev,
            todo: [
                ...prev.todo,
                {
                    ...newTask,
                    id: Date.now(),
                    description: newTask.description || "",
                    status: newTask.status || "Aguardando",
                    comments: newTask.comments || [],
                    createdAt: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, // Adicionando data/hora de criação
                },
            ],
        }));
        setIsCreating(false);
    };

    // Função para deletar task
    const handleDeleteTask = (taskId) => {
        setColumns((prev) => {
            const newCols = { ...prev };
            Object.keys(newCols).forEach((col) => {
                newCols[col] = newCols[col].filter((t) => t.id !== taskId);
            });
            return newCols;
        });
        setSelectedTask(null);
    };

    return (
        // Renderiza as colunas e a task selecionada
        <div className="board">
            {["todo", "inProgress", "done"].map((colKey) => (
                <Column
                    key={colKey}
                    title={
                        colKey === "todo"
                            ? "Pendente"
                            : colKey === "inProgress"
                            ? "Em Progresso"
                            : "Realizadas"
                    }
                    cards={columns[colKey]}
                    columnKey={colKey}
                    moveCard={moveCard}
                    onCardClick={setSelectedTask}
                />
            ))}
            {selectedTask && (
                <ViewTask
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdate={(updatedTask) => {
                    setColumns((prev) => {
                        const newCols = { ...prev };
                        Object.keys(newCols).forEach((col) => {
                            newCols[col] = newCols[col].map((t) =>
                                t.id === updatedTask.id ? updatedTask : t
                            );
                        });
                        return newCols;
                    });
                    setSelectedTask(updatedTask); // Atualiza a tarefa selecionada
                }}
                onDelete={handleDeleteTask}
            />
            )}
            {isCreating && (
                <ViewTask
                    task={{ text: "", description: "", status: "Aguardando", comments: [] }}
                    onClose={() => setIsCreating(false)}
                    onUpdate={handleCreateTask}
                    isCreateMode
                />
            )}
            <button className="new-task-btn" onClick={() => setIsCreating(true)}>
                + Nova Task
            </button>
        </div>
    );
};

export default Board;