import Navbar from "../../Layout/Navbar";
import { useState } from "react";
import {
  UserRound,
  MessageSquareMore,
  ClipboardPlus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const stats = [
  {
    icon: AlertCircle,
    number: 12,
    label: "Open Issues",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Clock,
    number: 5,
    label: "In Progress",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: CheckCircle2,
    number: 3,
    label: "Done Today",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: ListTodo,
    number: 24,
    label: "All Issues",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
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
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className={`space-y-6 pb-10 p-6 pt-20 transition-all duration-300 ${isMenuOpen ? "ml-64" : "ml-0"}`}>
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Good morning, Azib 
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your work today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {stat.label}
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2">
                      {stat.number}
                    </h2>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}
                  >
                    <Icon className={`${stat.color}`} size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid - Issues and Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent Issues */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                My Recent Issues
              </h2>

              <div className="space-y-4">
                {recentIssues.map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between hover:bg-gray-50 px-3 py-3 rounded-lg transition"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span
                        className={`text-white text-[10px] font-bold px-2 py-1 rounded-md ${issue.typeColor}`}
                      >
                        {issue.type}
                      </span>

                      <span className="text-sm text-gray-600 font-medium min-w-fit">
                        {issue.id}
                      </span>

                      <h3 className="text-sm font-medium text-gray-800">
                        {issue.title}
                      </h3>
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${issue.statusColor}`}
                    >
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-6 text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1">
                View all issues
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                My Projects
              </h2>

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-all cursor-pointer"
                  >
                    {/* Project Logo */}
                    <div
                      className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${project.bg}`}
                    >
                      {project.initials}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500">{project.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1">
                View all projects
                <ArrowRight size={16} />
              </button>
            </div>
        </div>

        {/* Activity and Calendar Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Activity
              </h2>
              <div className="space-y-5">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-gray-700" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {activity.title}
                        </h3>

                        <p className="text-gray-600 mt-1 text-xs">
                          <span className="font-medium text-gray-900">
                            {activity.project}
                          </span>{" "}
                          {activity.description}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="mt-6 text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1">
                View all activity
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                Calendar
              </h2>

              <Calendar
                className="w-full border-none"
                value={new Date(2025, 4, 14)}
              />
            </div>
        </div>
      </section>
    </>
  );
};


export default Home;
