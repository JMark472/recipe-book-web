import { AppNavbar } from "@/components/common/app-navbar";
import { PageHeader } from "@/components/common/page-header";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <AppNavbar />
      <Section>
        <PageHeader
          eyebrow="Your kitchen companion"
          title="Recipe Book"
          description="Keep your favorite meals in one place and find your next inspiration."
        />
        <RecipeCollection />
      </Section>
    </>
  );
}
