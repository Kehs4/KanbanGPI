import React from "react";
import Board from "../components/board";
import Column from "../components/column";
import Card from "../components/card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../components/tasks.css'

function Tasks() {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className='header-title'>
            <h1 className="title-page">Tarefas da Programação</h1>
        </div>
        <Board />
    </DndProvider>
  );
}

export default Tasks;