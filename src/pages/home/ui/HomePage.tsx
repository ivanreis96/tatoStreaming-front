import { MovieList } from "./MovieList";
import { ToolsBar } from "./ToolsBar";

export function HomePage() {
  return (
    <div className="w-full h-full flex-col">
      <ToolsBar />
      <MovieList />
    </div>
  )
}
