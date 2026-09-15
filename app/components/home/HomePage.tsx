import { HomeShell } from "./HomeShell";
import { Readme } from "./Readme";
import { projects } from "@/app/lib/projects";
import { getAllPosts } from "@/app/lib/writing";

export default function HomePage() {
  const latestProjects = projects.slice(0, 3);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <HomeShell>
      <Readme latestProjects={latestProjects} latestPosts={latestPosts} />
    </HomeShell>
  );
}
