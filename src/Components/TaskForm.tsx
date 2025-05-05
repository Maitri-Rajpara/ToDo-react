import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { TaskContext, Task } from "../Context/TaskContext";
import "./taskform.css";

type FormValues = {
  title: string;
  desc: string;
};

export default function TaskForm() {
  const { tasks, setTasks } = useContext(TaskContext)!;
  const navigate = useNavigate();
  const location = useLocation();

  const editIndex = location.state?.editIndex;
  const isEdit = editIndex !== undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (isEdit) {
      const task = tasks[editIndex];
      if (task) {
        reset({
          title: task.title,
          desc: task.desc,
        });
      }
    }
  }, [isEdit, editIndex, tasks, reset]);

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex
          ? { ...task, title: data.title, desc: data.desc }
          : task,
      );
      setTasks(updatedTasks);
    } else {
      const newTask: Task = {
        title: data.title,
        desc: data.desc,
        status: "todo",
      };
      setTasks([...tasks, newTask]);
    }
    navigate("/");
  };

  return (
    <div className="task-form">
      <h2>{isEdit ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          className="task-input"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Description"
          className="task-input"
          {...register("desc", { required: "Description is required" })}
        />
        {errors.desc && <p className="error">{errors.desc.message}</p>}

        <button type="submit" className="add-btn-e">
          {isEdit ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
