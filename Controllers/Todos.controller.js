import Todo from "../Models/Todos.models.js";
import SubTodo from "../Models/sub_Todos.models.js";

export const fetchTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate('SubTodos').exec();
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
    const saveTodo= await addTodo.save();
    const todosData = await Todo.findOne({ Type: type });
    if (todosData) {
      todosData.SubTodos.push(saveTodo._id);
      await todosData.save();
      await todosData.populate('SubTodos');
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
    await Todo.findOneAndUpdate({Type:sourceType},{
        $pull:{SubTodos:todoId}
    })
    await Todo.findOneAndUpdate({Type:targetType},{
        $push:{SubTodos:todoId}
    })
    res.status(200).json({sourceType, targetType, todoId});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

export const deleteTodo=async(req,res)=>{

}
