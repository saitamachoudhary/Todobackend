import express from "express";

import Todo from "../Models/Todos.models.js";
import SubTodo  from "../Models/sub_Todos.models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { Type } = req.body;
  const addcontainer = new Todo({
    Type,
  });
  try {
    const container = await addcontainer.save();
    res.json(container);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/subTodos", async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const addTodo=new SubTodo({
      title,
      message,
    })
    await addTodo.save();
    const todosData = await Todo.findOne({ Type: type });
    if(todosData){
      todosData.SubTodos.push(addTodo);
      await todosData.save();
     res.status(200).json({addTodo,type});
    }
    else{
      res.status(404).json({message:"todo not found"}) 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'server error'});
  }
});

export default router;
