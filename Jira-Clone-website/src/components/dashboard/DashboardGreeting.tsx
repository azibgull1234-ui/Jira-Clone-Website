interface DashboardGreetingProps {
  firstName: string;
}

const DashboardGreeting = ({ firstName }: DashboardGreetingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
        Good morning, {firstName}
      </h1>
      <p className="mt-1 text-gray-500">
        Here's what's happening with your work today.
      </p>
    </div>
  );
};

export default DashboardGreeting;
