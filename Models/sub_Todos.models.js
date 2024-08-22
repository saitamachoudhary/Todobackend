import mongoose from "mongoose";

const SubTodo_schema=new mongoose.Schema(
    {
      title:{
        type:String,
        required:true
      },
       message:{
        type:String,
        required:true
       }
    }
)

const SubTodo=mongoose.model("SubTodo",SubTodo_schema); 
export default SubTodo;