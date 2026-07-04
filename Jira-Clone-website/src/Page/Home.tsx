import Navbar from "../Layout/Navbar";
import {
  Smartphone,
  Globe,
  Megaphone,
  Users,
  UserRound,
  MessageSquareMore,
  ClipboardPlus,
  ArrowRight,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const card = [
  {
    title: "Mobile App",
    subtitle: "Software project",
    icon: Smartphone,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Website Revamp",
    subtitle: "Business project",
    icon: Globe,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Marketing",
    subtitle: "Business project",
    icon: Megaphone,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "HR Management",
    subtitle: "Business project",
    icon: Users,
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

const recentIssues = [
  {
    type: "BUG",
    id: "PROJ-101",
    title: "Login page UI broken",
    status: "TO DO",
    typeColor: "bg-red-500",
    statusColor: "bg-gray-100 text-gray-700",
  },
  {
    type: "FEAT",
    id: "PROJ-102",
    title: "Implement authentication",
    status: "IN PROGRESS",
    typeColor: "bg-green-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
  {
    type: "TASK",
    id: "PROJ-103",
    title: "Fix sidebar responsiveness",
    status: "DONE",
    typeColor: "bg-blue-500",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    type: "BUG",
    id: "PROJ-104",
    title: "Error on issue create",
    status: "TO DO",
    typeColor: "bg-red-500",
    statusColor: "bg-gray-100 text-gray-700",
  },
  {
    type: "TASK",
    id: "PROJ-105",
    title: "Add loader component",
    status: "IN PROGRESS",
    typeColor: "bg-blue-500",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

const projects = [
  {
    initials: "WR",
    title: "Website Redesign",
    subtitle: "Team managed",
    bg: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    initials: "MA",
    title: "Mobile App",
    subtitle: "Team managed",
    bg: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    initials: "CS",
    title: "CRM System",
    subtitle: "Team managed",
    bg: "bg-gradient-to-br from-orange-400 to-orange-600",
  },
];

const activities = [
  {
    icon: UserRound,
    title: "You updated an issue",
    project: "PROJ-101",
    description: "Login page UI broken",
    time: "2m ago",
  },
  {
    icon: MessageSquareMore,
    title: "You commented on an issue",
    project: "PROJ-102",
    description: "Implement authentication",
    time: "15m ago",
  },
  {
    icon: ClipboardPlus,
    title: "You created an issue",
    project: "PROJ-105",
    description: "Add loader component",
    time: "1h ago",
  },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Good morning, Azib
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your work today.
          </p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {card.map((project, index) => {
            const Icon = project.icon;

            return (
              <div
                key={index}
                className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${project.bg}`}
                  >
                    <Icon className={project.color} size={24} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-500">{project.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/*Progress */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-5">
            My Recent Issues
          </h2>

          <div className="space-y-4">
            {recentIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-slate-50 px-2 py-2 rounded-lg transition"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-white text-[10px] font-bold px-2 py-1 rounded ${issue.typeColor}`}
                  >
                    {issue.type}
                  </span>

                  <span className="text-sm text-gray-500 font-medium">
                    {issue.id}
                  </span>

                  <h3 className="text-sm font-medium text-slate-700">
                    {issue.title}
                  </h3>
                </div>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${issue.statusColor}`}
                >
                  {issue.status}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-6 text-blue-600 font-medium text-sm hover:underline">
            View all issues →
          </button>
        </div>
        {/* Projects */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            My Projects
          </h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center gap-4 hover:bg-slate-50 p-2 rounded-lg transition-all cursor-pointer"
              >
                {/* Project Logo */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm ${project.bg}`}
                >
                  {project.initials}
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500">{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-blue-600 font-medium text-sm hover:underline flex items-center gap-1">
            View all projects
            <span>→</span>
          </button>
        </div>
        {/* Activity */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Activity
          </h2>

          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon size={20} className="text-slate-700" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {activity.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        <span className="font-medium">{activity.project}</span>{" "}
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
          <button className="mt-8 flex items-center gap-2 text-blue-600 font-medium hover:underline">
            View all activity
            <ArrowRight size={16} />
          </button>
        </div>
        {/* Calendar */}
        <div className="bg-white border rounded-xl shadow-sm p-6 mt-5">
          <h2 className="text-xl font-semibold mb-5">Calendar</h2>

          <Calendar
            className="w-full border-none"
            value={new Date(2025, 4, 14)} // creates a JavaScript Date object
          />
        </div>
      </section>
    </>
  );
};

export default Home;
