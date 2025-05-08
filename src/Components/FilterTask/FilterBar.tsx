import { UseFormRegister } from "react-hook-form";

export interface FilterFormInputs {
  searchTitle?: string;
  searchDesc?: string;
  searchAll?: string;
  status?: string;
}
interface FilterBarProps {
  register: UseFormRegister<FilterFormInputs>;
}

export default function FilterBar({ register }: FilterBarProps) {
  return (
    <div className="filter-section">
      <input
        type="text"
        placeholder="Search by Title"
        className="filter-input search-title"
        {...register("searchTitle")}
      />

      <input
        type="text"
        placeholder="Search by Description"
        className="filter-input search-desc"
        {...register("searchDesc")}
      />

      <input
        type="text"
        placeholder="Search Title or Description"
        className="filter-input search-all"
        {...register("searchAll")}
      />

      <select className="status-filter" {...register("status")}>
        <option value="">All Status</option>
        <option value="todo">To-Do</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
