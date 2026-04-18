import { createBrowserRouter, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { SubcategoryPage } from "./pages/SubcategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { AboutPage } from "./pages/AboutPage";
import { EditorsPage } from "./pages/EditorsPage";
import { ContactPage } from "./pages/ContactPage";
import { ThreeDPage } from "./pages/ThreeDPage";
import { PodcastPage } from "./pages/PodcastPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function Root() {
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "category/:categorySlug", Component: CategoryPage },
      { path: "category/:categorySlug/:subcategorySlug", Component: SubcategoryPage },
      { path: "article/:articleId", Component: ArticlePage },
      { path: "about", Component: AboutPage },
      { path: "three-d", Component: ThreeDPage },
      { path: "podcast", Component: PodcastPage },
      { path: "editors", Component: EditorsPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
