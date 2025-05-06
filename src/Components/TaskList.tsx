import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FilterFormInputs } from "./FilterBar";
import { useTasks } from "../Hooks/useTask";
import FilterBar from "./FilterBar";
import { Task } from "../Context/TaskContext";

export default function TaskList() {
  const { tasks, setTasks } = useTasks();
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

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateStatus = (id: string, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus as Task["status"] }
          : task,
      ),
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

  return (
    <>
      {tasks.length > 0 && <FilterBar register={register} />}

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available.</p>
      ) : filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks matches criteria.</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`task-card ${task.status.toLowerCase()}`}
            >
              <h3>{task.title}</h3>
              <p>{task.desc}</p>
              <p>Status: {task.status}</p>
              <div className="list-btn">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="task-btn delete"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    navigate("/add", { state: { editId: task.id } })
                  }
                  className="task-btn edit"
                >
                  Edit
                </button>
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
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
      )}
    </>
  );
}
