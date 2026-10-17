import { Link, useParams } from "react-router";
import { AppNavbar } from "@/components/common/app-navbar";
import { Section } from "@/components/ui/section";
import { RecipeDetails } from "@/components/features/recipe/recipe-details";

export default function RecipePage() {
  const { id } = useParams();

  // The page reads the URL; the feature fetches and displays that recipe.
  return (
    <>
      <AppNavbar />
      <Section>
        <Link
          to="/user"
          className="inline-flex items-center gap-2 text-sm font-medium text-deep-500 transition-colors hover:text-azure-600"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to recipes
        </Link>

        {id && <RecipeDetails key={id} id={id} />}
      </Section>
    </>
  );
}
