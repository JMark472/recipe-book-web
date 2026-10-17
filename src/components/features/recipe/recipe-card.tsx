import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";
import RecipeMeta from "@/components/common/recipe-meta";

type RecipeCardProps = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: string) => void;
};

const difficultyStyles: Record<RecipeCardProps["difficulty"], string> = {
  Easy: "bg-jade-100/95 text-jade-700",
  Medium: "bg-amber-100/95 text-amber-700",
  Hard: "bg-rose-100/95 text-rose-700",
};

export default function RecipeCard({
  id,
  image,
  name,
  cuisine,
  mealType,
  difficulty,
  cookTimeMinutes,
  tags,
  onDelete,
}: RecipeCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-deep-900/10 bg-white/85 shadow-sm shadow-deep-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-azure-500/40 hover:shadow-xl hover:shadow-deep-900/10">
      <span aria-hidden="true" className="h-1 w-full bg-brand-gradient" />
      <div className="relative h-56 overflow-hidden bg-mist-200">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-deep-900/15 to-transparent" />
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur",
            difficultyStyles[difficulty],
          )}
        >
          {difficulty}
        </span>
        <h3 className="absolute inset-x-4 bottom-3 font-display text-xl leading-snug font-semibold text-mist-50 drop-shadow-sm">
          {name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <RecipeMeta
          cuisine={cuisine}
          mealType={mealType}
          difficulty={difficulty}
          cookTimeMinutes={cookTimeMinutes}
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link to={`/recipe/${id}`} className="flex-1">
            <Button className="w-full">View recipe</Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${name}`}
            className="px-3"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13h10l1-13" />
            </svg>
          </Button>
        </div>
      </div>
    </article>
  );
}
