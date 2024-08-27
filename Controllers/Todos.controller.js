import Todo from "../Models/Todos.models.js";
import SubTodo from "../Models/sub_Todos.models.js";

export const fetchTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("SubTodos").exec();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addContainer = async (req, res) => {
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
};

export const addTodo = async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const addTodo = new SubTodo({
      title,
      message,
    });
    const saveTodo = await addTodo.save();
    const todosData = await Todo.findOne({ Type: type });
    if (todosData) {
      todosData.SubTodos.push(saveTodo._id);
      await todosData.save();
      await todosData.populate("SubTodos");
      res.status(200).json(todosData);
    } else {
      res.status(404).json({ message: "todo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const moveTodo = async (req, res) => {
  const { sourceType, targetType, todoId } = req.body;
  try {
    await Todo.findOneAndUpdate(
      { Type: sourceType },
      {
        $pull: { SubTodos: todoId },
      }
    );
    await Todo.findOneAndUpdate(
      { Type: targetType },
      {
        $push: { SubTodos: todoId },
      }
    );
    res.status(200).json({ sourceType, targetType, todoId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const reorderTodo = async (req, res) => {
  const { type, sourceIndex, destinationIndex } = req.body;
  try {
    const Todos = await Todo.findOne({ Type: type }).populate("SubTodos");
    if (!Todos) res.status(404).json({ message: "Todo not found" });
    let swap = Todos.SubTodos[sourceIndex];
    Todos.SubTodos[sourceIndex] = Todos.SubTodos[destinationIndex];
    Todos.SubTodos[destinationIndex] = swap;
    await Todos.save();
    res.status(200).json(Todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const editTodo=async(req,res)=>{
  const{Type,_id,title,message}=req.body;
  try {
    const updateTodo=await SubTodo.findByIdAndUpdate(_id,{title,message},{new:true});
    if(!updateTodo) res.status(404).json({message:"update failed"});
    res.status(200).json({updateTodo,Type});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"server error"})
  }
}

export const deleteTodo = async (req, res) => {
  const { type, id } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { Type: type },
      { $pull: { SubTodos:id}},
      { new: true }
    );
   const sub_Todos= await SubTodo.findByIdAndDelete(id); 
    res.status(200).json({Type:todo.Type,subtodo_id:sub_Todos._id});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server erroe" });
  }
};
