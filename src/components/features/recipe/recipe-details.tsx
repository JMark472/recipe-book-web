import { useEffect, useState } from "react";
import { getRecipeService, type Recipe } from "@/services/recipe-service";
import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";

export function RecipeDetails({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadRecipe(recipeId: string) {
      try {
        const result = await getRecipeService(recipeId);
        if (active) {
          setRecipe(result);
        }
      } catch {
        if (active) {
          setError("Recipe not found, or you do not have access to it.");
        }
      }
    }

    loadRecipe(id);

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [id]);

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleUpdated(updatedRecipe: Recipe) {
    setRecipe(updatedRecipe);
    closeForm();
  }

  // Keep recipe content and its update dialog together in this feature.
  return (
    <>
      {error ? (
        <p role="alert" className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : recipe ? (
        <>
          <article className="animate-rise mt-6 overflow-hidden rounded-3xl border border-deep-900/10 bg-white/85 shadow-sm shadow-deep-900/5">
            {/* Hero image with the recipe title and tags layered on top. */}
            <div className="relative h-64 bg-mist-200 sm:h-96">
              <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 via-deep-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  {recipe.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {recipe.tags.map((tag) => (
                        <Tag key={tag} className="border-white/20 bg-white/15 text-mist-50 backdrop-blur">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  )}
                  <h1 className="max-w-2xl font-display text-3xl leading-tight font-semibold text-mist-50 drop-shadow-sm sm:text-4xl">
                    {recipe.name}
                  </h1>
                </div>
                <Button variant="secondary" onClick={openForm}>
                  Update recipe
                </Button>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <RecipeMeta
                cuisine={recipe.cuisine}
                mealType={recipe.mealType}
                difficulty={recipe.difficulty}
                cookTimeMinutes={recipe.cookTimeMinutes}
              />

              <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <section>
                  <h2 className="font-display text-xl font-semibold text-deep-900">Ingredients</h2>
                  <ul className="mt-4 space-y-2.5">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={`${ingredient}-${index}`} className="flex items-start gap-3 text-sm text-deep-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azure-500" />
                        <span className="leading-relaxed">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-deep-900">Instructions</h2>
                  <ol className="mt-4 space-y-5">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={`${instruction}-${index}`} className="flex gap-4">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-relaxed text-deep-600">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </article>

          {/* The modal reuses the recipe form and updates this page after saving. */}
          <Modal open={open} onClose={closeForm} title="Update Recipe">
            <UpdateRecipeForm recipe={recipe} onSuccess={handleUpdated} />
          </Modal>
        </>
      ) : null}
    </>
  );
}
