import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
  },
  SubTodos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTodo",
    },
  ],
});

const Todo = mongoose.model("Todo", TodoSchema); 

export default Todo;
