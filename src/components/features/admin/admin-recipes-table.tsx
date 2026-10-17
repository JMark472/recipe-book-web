import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import type { AdminRecipe } from "@/services/recipe-service";

export type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
  recipes: AdminRecipe[];
  loading: boolean;
};

const difficultyStyles: Record<string, string> = {
  Easy: "border-jade-200 bg-jade-50 text-jade-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Hard: "border-rose-200 bg-rose-50 text-rose-700",
};

// Display only: fetching data and handling errors belongs to AdminRecipes.
export function AdminRecipesTable({ recipes, loading }: AdminRecipesTableProps) {
  return (
    <Table>
      <caption className="sr-only">Recipes from all users</caption>
      <thead>
        <tr>
          <th scope="col">Recipe</th>
          <th scope="col">Cuisine</th>
          <th scope="col">Meal type</th>
          <th scope="col">Difficulty</th>
          <th scope="col">Cook time</th>
          <th scope="col">Owner</th>
        </tr>
      </thead>
      <tbody>
        {!loading && recipes.length === 0 && (
          <tr>
            <td colSpan={6} className="py-12 text-center text-deep-400">
              No recipes have been created yet.
            </td>
          </tr>
        )}
        {recipes.map(function renderRecipe(recipe) {
          return (
            <tr key={recipe.id}>
              <td>
                <div className="flex min-w-52 items-center gap-3">
                  <img src={recipe.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                  <span className="font-medium text-deep-900">{recipe.name}</span>
                </div>
              </td>
              <td className="text-deep-600">{recipe.cuisine}</td>
              <td className="text-deep-600">{recipe.mealType.join(", ")}</td>
              <td>
                <Tag className={difficultyStyles[recipe.difficulty]}>{recipe.difficulty}</Tag>
              </td>
              <td className="text-deep-600">{recipe.cookTimeMinutes} min</td>
              <td>
                <div className="min-w-40">
                  <p className="font-medium text-deep-800">{recipe.ownerName || "Unnamed user"}</p>
                  <p className="font-mono text-[11px] text-deep-400">{recipe.userId.slice(0, 8)}…</p>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
