import FeaturedConstructionProjects from "@/components/FeaturedConstructionProjects";
import { getAllProjects } from "@/lib/portfolio-data";

export default function FeaturedProjectsWrapper() {
  const projects = getAllProjects().slice(0, 4);
  return <FeaturedConstructionProjects projects={projects} />;
}
