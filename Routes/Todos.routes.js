import express from "express";

import {
  fetchTodos,
  addContainer,
  addTodo,
  moveTodo,
  deleteTodo,
  reorderTodo,
} from "../Controllers/Todos.controller.js";

const router = express.Router();

router.get("/", fetchTodos);

router.post("/", addContainer);

router.post("/subTodos", addTodo);

router.put("/moveTodos", moveTodo);

router.put("/reorderTodos", reorderTodo);

router.delete("/deleteTodos", deleteTodo);

export default router;
