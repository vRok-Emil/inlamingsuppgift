import mongoose, {Document, Schema} from "mongoose";
//definierar gränssnittet för en användare
export interface IUser extends Document {
  username: string; //användarnamn som är en sträng
  email: string; //email som är en sträng
  password: string; //lösenord som är en sträng
}
//skapar ett nytt schema för användare med hjälp av Mongoose
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true }, //användarnamn är obligatorisk och måste vara unik
  email: { type: String, required: true, unique: true }, //email är obligatorisk och måste vara unik
  password: { type: String, required: true }, //lösenord är obligatorisk
});

export const User = mongoose.model<IUser>("User", userSchema);