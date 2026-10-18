import CategorySection from "../components/home/CategorySection"
import { usePageTitle } from "../hooks/usePageTitle"

export default function CategoriesPage() {
  usePageTitle("Categories")

  return (
    <CategorySection
      id="category-directory"
      heading="Shop by Category"
      hrefFor={(id) => `/shop?category=${id}#catalog`}
    />
  )
}
