import HealthCheckComponent from "../components/HealthCheck";

export default function Health() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div className="bg-black bg-opacity-70 border border-gray-700 rounded-lg p-8 max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Rails Nextjs Tailwind Starter
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          A starting point for your Ruby on Rails, PostgreSQL, Next.js, and
          Tailwind CSS project.
        </p>
        <div className="border-t border-gray-300 pt-6">
          <HealthCheckComponent />
        </div>
      </div>
    </div>
  );
}
