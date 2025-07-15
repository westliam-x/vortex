"use client";

const projects = [
  { id: 1, title: "Portfolio Site", client: "Dami", status: "In Progress" },
  { id: 2, title: "Storefront", client: "Chuka", status: "Completed" },
  { id: 3, title: "SaaS Platform", client: "Ada", status: "In Review" },
];

const ProjectOverview = () => {
  return (
    <div className="bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <h2 className="text-white text-lg font-semibold mb-4">Latest Projects</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="min-w-[200px] bg-[#141421] rounded-lg border border-cyan-900/30 p-4 text-white shadow"
          >
            <h3 className="text-base font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-400">Client: {project.client}</p>
            <span className="text-xs inline-block mt-2 px-2 py-1 bg-cyan-800/30 text-cyan-300 rounded-full">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectOverview;