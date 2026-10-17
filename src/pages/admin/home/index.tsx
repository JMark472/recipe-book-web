import { AppNavbar } from "@/components/common/app-navbar";
import { PageHeader } from "@/components/common/page-header";
import { AdminRecipes } from "@/components/features/admin/admin-recipes";
import { Section } from "@/components/ui/section";

export default function AdminPage() {
  return (
    <>
      <AppNavbar />
      <Section>
        <PageHeader
          eyebrow="Recipe Book · Administration"
          title="All recipes"
          description="Browse recipes across every account in the collection."
        />
        <AdminRecipes />
      </Section>
    </>
  );
}
