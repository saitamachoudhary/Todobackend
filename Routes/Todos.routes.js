import express from "express";

import {fetchTodos,addContainer,addTodo,moveTodo,deleteTodo} from '../Controllers/Todos.controller.js';

const router = express.Router();

router.get("/",fetchTodos);

router.post("/",addContainer);

router.post("/subTodos",addTodo);

router.put("/moveTodos",moveTodo); 

router.delete("/deleteTodos",deleteTodo);

export default router;
