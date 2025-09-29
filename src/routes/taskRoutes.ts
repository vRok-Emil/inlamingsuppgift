import express, { Request, Response } from "express";
import { ITask, Task } from "../models/Task";
import { User } from "../models/User";

// Skapar en ny router för att hantera uppgiftsrelaterade rutter.
const router: express.Router = express.Router();

// Skapa en ny uppgift
router.post("/", async (req: Request<{}, {}, ITask>, res: Response) => {
    try {
        const { title, description, status, assignedTo } = req.body;
        if (!title || !status) {
            return res.status(400).json({ message: "Title and status are required" });
        }
        const allowedStatuses = ["to-do", "pending", "completed"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Status must be one of: ${allowedStatuses.join(", ")}` });
        }
        let assignedUser = null;
        if (assignedTo) {
            assignedUser = await User.findById(assignedTo);
            if (!assignedUser) {
                return res.status(400).json({ message: "Assigned user not found" });
            }
        }
        const task = new Task({
            title,
            description,
            status,
            assignedTo: assignedUser ? assignedUser._id : null,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Hämta en uppgift via ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo', 'username email');
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Uppdatera en uppgift via ID
router.put("/:id", async (req: Request<{ id: string }, {}, Partial<ITask>>, res: Response) => {
    try {
        const { title, description, status, assignedTo } = req.body;
        const update: any = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);
            if (!assignedUser) {
                return res.status(400).json({ message: "Assigned user not found" });
            }
            update.assignedTo = assignedUser._id;
        }
        if (status) {
            const allowedStatuses = ["to-do", "pending", "completed"];
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ message: `Status must be one of: ${allowedStatuses.join(", ")}` });
            }
            update.status = status;
            if (status === "completed") {
                update.finishedAt = new Date();
            } else {
                update.finishedAt = null;
            }
        }
        const task = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Ta bort en uppgift via ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;