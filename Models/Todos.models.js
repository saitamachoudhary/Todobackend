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
      // validate: {
      //   validator: function(value) {
      //     return Array.isArray(value) && value.every(v => mongoose.Types.ObjectId.isValid(v));
      //   },
      //   message: props => `${props.value} is not a valid ObjectId!`
      // }
    },
  ],
});

const Todo = mongoose.model("Todo", TodoSchema); 

export default Todo;
