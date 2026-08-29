import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useProjects } from "../../context/ProjectsContext";
import { issueAssignees } from "./mockData";
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
  ISSUE_TYPES,
  type CreateIssueInput,
  type Issue,
  type IssuePriority,
  type IssueStatus,
  type IssueType,
  type SprintId,
  SPRINTS,
} from "./types";

interface IssueFormValues {
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  project: string;
  sprint: string;
  dueDate: string;
}

interface IssueFormProps {
  issue?: Issue;
  reporter: string;
  submitLabel: string;
  onSubmit: (input: CreateIssueInput) => void;
  onCancel: () => void;
}

const fieldClassName =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500";

const IssueForm = ({
  issue,
  reporter,
  submitLabel,
  onSubmit,
  onCancel,
}: IssueFormProps) => {
  const { projects } = useProjects();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueFormValues>({
    defaultValues: {
      title: "",
      description: "",
      type: "Task",
      status: "To Do",
      priority: "Medium",
      assignee: "",
      project: projects[0]?.name ?? "",
      sprint: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (!issue) {
      return;
    }

    reset({
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      priority: issue.priority,
      assignee: issue.assignee ?? "",
      project: issue.project,
      sprint: issue.sprint ?? "",
      dueDate: issue.dueDate ? issue.dueDate.slice(0, 10) : "",
    });
  }, [issue, reset]);

  const submit: SubmitHandler<IssueFormValues> = (data) => {
    onSubmit({
      title: data.title.trim(),
      description: data.description.trim(),
      type: data.type,
      status: data.status,
      priority: data.priority,
      assignee: data.assignee || null,
      reporter: issue?.reporter ?? reporter,
      project: data.project,
      sprint: (data.sprint || null) as SprintId | null,
      dueDate: data.dueDate || null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-2xl space-y-4 rounded-xl border border-gray-100 bg-white p-6"
    >
      {issue ? (
        <p className="text-sm font-medium text-gray-500">{issue.key}</p>
      ) : null}

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Title</label>
        <input
          className={fieldClassName}
          {...register("title", { required: "Title is required" })}
        />
        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea rows={5} className={fieldClassName} {...register("description")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Type</label>
          <select className={fieldClassName} {...register("type")}>
            {ISSUE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Status</label>
          <select className={fieldClassName} {...register("status")}>
            {ISSUE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Priority
          </label>
          <select className={fieldClassName} {...register("priority")}>
            {ISSUE_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Project</label>
          <select className={fieldClassName} {...register("project", { required: true })}>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Assignee</label>
          <select className={fieldClassName} {...register("assignee")}>
            <option value="">Unassigned</option>
            {issueAssignees.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Due date</label>
          <input type="date" className={fieldClassName} {...register("dueDate")} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Sprint</label>
          <select className={fieldClassName} {...register("sprint")}>
            <option value="">Backlog</option>
            {SPRINTS.map((sprint) => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2.5 font-medium text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default IssueForm;
