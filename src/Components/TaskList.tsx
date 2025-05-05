import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { TaskContext } from "../Context/TaskContext";
import FilterBar from "./FilterBar";

type FilterFormInputs = {
  searchTitle: string;
  searchDesc: string;
  searchAll: string;
  status: string;
};

export default function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext)!;
  const navigate = useNavigate();

  const { register, watch } = useForm<FilterFormInputs>({
    defaultValues: {
      searchTitle: "",
      searchDesc: "",
      searchAll: "",
      status: "",
    },
  });

  const filters = watch();

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateStatus = (index: number, newStatus: string) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, status: newStatus as any } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesTitle = filters.searchTitle
        ? task.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
        : true;
      const matchesDesc = filters.searchDesc
        ? task.desc.toLowerCase().includes(filters.searchDesc.toLowerCase())
        : true;
      const matchesAll = filters.searchAll
        ? (task.title + task.desc)
            .toLowerCase()
            .includes(filters.searchAll.toLowerCase())
        : true;
      const matchesStatus = filters.status
        ? task.status === filters.status
        : true;

      return matchesTitle && matchesDesc && matchesAll && matchesStatus;
    });
  }, [filters, tasks]);

  return tasks.length === 0 ? (
    <p className="no-tasks">No tasks here.</p>
  ) : (
    <>
      <FilterBar register={register} />
      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task-card ${task.status.toLowerCase()}`}>
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            <p>Status: {task.status}</p>
            <div className="list-btn">
              <button
                onClick={() => deleteTask(index)}
                className="task-btn delete"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  navigate("/add", { state: { editIndex: index } })
                }
                className="task-btn edit"
              >
                Edit
              </button>
              <select
                value={task.status}
                onChange={(e) => updateStatus(index, e.target.value)}
                className="status-select"
              >
                <option value="todo">To-Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
