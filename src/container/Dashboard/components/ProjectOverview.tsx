"use client";

const projects = [
  { id: 1, title: "Portfolio Site", client: "Dami", status: "In Progress" },
  { id: 2, title: "Storefront", client: "Chuka", status: "Completed" },
  { id: 3, title: "SaaS Platform", client: "Ada", status: "In Review" },
];

const ProjectOverview = () => {
  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <h2 className="text-white text-lg font-semibold mb-4">Latest Projects</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="min-w-[200px] bg-[#090909] rounded-lg border-2 shadow-2xl border-[#25262A] p-4 text-white"
          >
            <h3 className="text-base font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-400">Client: {project.client}</p>
            <span className="text-xs inline-block mt-2 px-2 py-1 bg-[#985EFF] text-white rounded-full">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectOverview;