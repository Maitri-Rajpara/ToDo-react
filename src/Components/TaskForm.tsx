import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Task } from "../Context/TaskContext";
import { useTasks } from "../Hooks/useTask";
import "../Styles/taskform.css";

type FormValues = {
  title: string;
  desc: string;
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  desc: yup.string().required("Description is required").min(5, "Description must be at least 5 characters"),
});

export default function TaskForm() {
  const { tasks, setTasks } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();

  const editId = location.state?.editId;
  const isEdit = Boolean(editId);
  const taskToEdit = tasks.find((task) => task.id === editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEdit && taskToEdit) {
      reset({
        title: taskToEdit.title,
        desc: taskToEdit.desc,
      });
    }
  }, [isEdit, taskToEdit]);

  const onSubmit = (data: FormValues) => {
    if (isEdit && taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId
          ? { ...task, title: data.title, desc: data.desc }
          : task,
      );
      setTasks(updatedTasks);
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
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
          {...register("title")}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <input
          type="text"
          placeholder="Description"
          className="task-input"
          {...register("desc")}
        />
        {errors.desc && <p className="error">{errors.desc.message}</p>}

        <button type="submit" className="add-btn-e">
          {isEdit ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
}
