import mongoose, { Document, Schema } from 'mongoose';



//Definiera gränssnittet för en Task (uppgift)
export interface ITask extends Document {
  title: string; //upgiftens titel
  description: string; //uppgiftens beskrivning
  status: "to-do" | "pending" | "completed"; //uppgiftens status som är en av tre möjliga värden 
  createdAt: Date; //datum när uppgiften skapades
  finishedAt: Date | null; // datum när uppgiften slutfördes, eller null om den inte är slutförd
  assignedTo?: mongoose.Types.ObjectId | null; // referens till användaren som har tilldelats uppgiften, eller null om ingen användare är tilldelad.
}
//skapar ett nytt schema för Task med hjälp av Mongoose
const taskSchema = new Schema<ITask>({
  title: { type: String, required: true }, //uppgiftens title är obligatorisk är en sträng
  description: { type: String }, //uppgiftens description är en sträng
  status: { type: String, enum: ['to-do', 'pending', 'completed'], required: true }, //uppgiftens status är obligatorisk och måste vara en av de angivna värdena
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null }, //refernes till användaren som har tilldelats uppgiften, eller null om ingen användare är tilldelad.
  createdAt: { type: Date, default: Date.now }, //datum när uppgfiten skapades, standardvärde är
  finishedAt: { type: Date, default: null } // datum när uppgiften slutfördes, eller null om den inte är slutförd
});

export const Task = mongoose.model<ITask>('Task', taskSchema);