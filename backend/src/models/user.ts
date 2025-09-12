import {Schema,model,Document} from 'mongoose';

const UserSchema=new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true}
})
const User=model("User",UserSchema)
export default User
