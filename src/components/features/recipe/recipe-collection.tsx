import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { deleteRecipeService, getRecipesService, type Recipe } from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/features/recipe/recipe-card";
import AddRecipeForm from "@/components/features/recipe/add-recipe-form";
import { Navigate } from "react-router";

export function RecipeCollection() {
  const { user, ready } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(function fetchRecipes() {
    if (!ready || !user) {
      return;
    }

    let active = true;

    async function loadRecipes() {
      try {
        const result = await getRecipesService();
        if (active) {
          setRecipes(result);
          setError("");
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please try again.");
        }
      }
    }

    loadRecipes();

    // Ignore a response if the account changes or this feature is removed.
    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [ready, user]);

  async function handleDelete(id: string) {
    if (!confirm("Do you want to delete this recipe?")) return;
    try {
      await deleteRecipeService(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch {
      setError("Unable to delete this recipe. Please try again.");
    }
  }

  if (!ready) return null;

  if (!user) return <Navigate to="/auth/login" replace />;

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleCreated(newRecipe: Recipe) {
    setRecipes(function addRecipe(currentRecipes) {
      return [newRecipe, ...currentRecipes];
    });
    closeForm();
  }

  // The page supplies the header; this feature owns the collection and its dialog.
  return (
    <>
      {/* Collection heading and primary action wrap on narrow screens. */}
      <div className="animate-rise mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">Your recipes</h2>
          <p className="mt-1 text-sm text-ink-500">
            {recipes.length} saved {recipes.length === 1 ? "recipe" : "recipes"} to inspire your next meal
          </p>
        </div>
        <Button size="lg" onClick={openForm}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add recipe
        </Button>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
          {error}
        </p>
      )}

      {recipes.length === 0 ? (
        <div className="animate-rise rounded-3xl border border-dashed border-ink-900/20 bg-white/60 px-6 py-16 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-spice-50 text-spice-600">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 16.5h16M6.2 16.5c0-3.4 2.6-6.2 5.8-6.2s5.8 2.8 5.8 6.2" />
              <path d="M12 10.3c-.4-2.4 1.1-4.4 3.9-5.5-.3 2.6-1.5 4.4-3.9 5.5Z" />
            </svg>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">A fresh page for your favorites</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
            Save a family classic or something new you want to try.
          </p>
          <Button className="mt-6" onClick={openForm}>
            Add your first recipe
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Add the saved recipe to local state so the list updates immediately. */}
      <Modal open={open} onClose={closeForm} title="Add Recipe">
        <AddRecipeForm onSuccess={handleCreated} />
      </Modal>
    </>
  );
}
