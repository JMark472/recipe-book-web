import { useEffect, useState } from "react";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { AdminRecipesTable, type AdminRecipe } from "./admin-recipes-table";

// This feature owns the recipe request, refresh button, and request state.
export function AdminRecipes() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(function fetchRecipes() {
    let active = true;

    async function loadAllRecipes() {
      setLoading(true);
      setError("");

      try {
        const rows = await getAllRecipesService();
        if (active) {
          setRecipes(rows);
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAllRecipes();

    // Ignore late responses after leaving the page or starting a new request.
    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [reload]);

  function handleRefresh() {
    // Changing this value runs the fetching effect again.
    setReload(function incrementReload(currentReload) {
      return currentReload + 1;
    });
  }

  return (
    <section aria-label="All recipes" className="animate-rise">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-deep-500">
          {loading ? (
            "Loading recipes…"
          ) : (
            <>
              Showing <span className="font-semibold text-deep-900">{recipes.length}</span>{" "}
              {recipes.length === 1 ? "recipe" : "recipes"} across all users
            </>
          )}
        </p>
        <Button variant="secondary" disabled={loading} onClick={handleRefresh}>
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 11a8 8 0 1 0-.9 3.7M20 5v6h-6" />
          </svg>
          Refresh
        </Button>
      </div>

      {error ? (
        <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : (
        <AdminRecipesTable recipes={recipes} loading={loading} />
      )}
    </section>
  );
}
