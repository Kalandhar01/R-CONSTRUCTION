"use client";

import { useEffect, useState } from "react";
import FeaturedConstructionProjects from "@/components/FeaturedConstructionProjects";
import type { OurWorkProject } from "@/lib/our-works";

export default function FeaturedProjectsWrapper() {
  const [projects, setProjects] = useState<OurWorkProject[]>([]);

  useEffect(() => {
    fetch("/api/our-works?division=Construction&limit=4")
      .then((r) => r.json())
      .then((data) => {
        const list = data.works || [];
        setProjects(Array.isArray(list) ? list.slice(0, 4) : []);
      })
      .catch(() => setProjects([]));
  }, []);

  return <FeaturedConstructionProjects projects={projects} />;
}
