import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { projectPeople } from "./mockData";
import {
  PROJECT_TYPES,
  type CreateProjectInput,
  type Project,
  type ProjectType,
} from "./types";

interface ProjectFormValues {
  name: string;
  key: string;
  description: string;
  projectType: ProjectType;
  lead: string;
  members: string[];
}

interface ProjectFormProps {
  project?: Project;
  submitLabel: string;
  onSubmit: (input: CreateProjectInput) => void;
  onCancel: () => void;
}

const fieldClassName =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500";

const ProjectForm = ({
  project,
  submitLabel,
  onSubmit,
  onCancel,
}: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      name: "",
      key: "",
      description: "",
      projectType: "Software",
      lead: projectPeople[0] ?? "",
      members: [],
    },
  });

  const selectedMembers = watch("members") ?? [];

  useEffect(() => {
    if (!project) {
      return;
    }
    reset({
      name: project.name,
      key: project.key,
      description: project.description,
      projectType: project.projectType,
      lead: project.lead,
      members: project.members,
    });
  }, [project, reset]);

  const toggleMember = (person: string) => {
    const next = selectedMembers.includes(person)
      ? selectedMembers.filter((member) => member !== person)
      : [...selectedMembers, person];
    setValue("members", next);
  };

  const submit: SubmitHandler<ProjectFormValues> = (data) => {
    onSubmit({
      name: data.name.trim(),
      key: data.key.trim(),
      description: data.description.trim(),
      projectType: data.projectType,
      lead: data.lead,
      members: data.members,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-2xl space-y-4 rounded-xl border border-gray-100 bg-white p-6"
    >
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Name</label>
        <input
          className={fieldClassName}
          {...register("name", { required: "Name is required" })}
        />
        <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Key</label>
        <input
          className={`${fieldClassName} uppercase`}
          maxLength={4}
          {...register("key", {
            required: "Key is required",
            minLength: { value: 2, message: "Use at least 2 letters" },
          })}
        />
        <p className="mt-1 text-sm text-red-500">{errors.key?.message}</p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea rows={4} className={fieldClassName} {...register("description")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Type</label>
          <select className={fieldClassName} {...register("projectType")}>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Lead</label>
          <select className={fieldClassName} {...register("lead", { required: true })}>
            {projectPeople.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Members</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {projectPeople.map((person) => (
            <label key={person} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedMembers.includes(person)}
                onChange={() => toggleMember(person)}
              />
              {person}
            </label>
          ))}
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

export default ProjectForm;
