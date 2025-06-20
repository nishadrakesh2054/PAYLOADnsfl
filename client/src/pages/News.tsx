import { useState, useMemo, useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaFutbol,
  FaUsers,
} from "react-icons/fa";
import { MdStadium, MdEmojiEvents } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../services/blog";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { Blog } from "../types/blog";
import ReactPaginate from "react-paginate";

// Constants
const ITEMS_PER_PAGE = 3;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Category configuration
const CATEGORIES = [
  { value: "all", label: "All News", icon: <FaFutbol /> },
  { value: "Match Reports", label: "Match Reports", icon: <MdStadium /> },
  { value: "League News", label: "League News", icon: <MdEmojiEvents /> },
  { value: "Team News", label: "Team News", icon: <FaUsers /> },
  { value: "Interviews", label: "Interviews", icon: <FaUser /> },
];

// Helper components
// Helper components
const NewsCard = ({
  article,
  getImageUrl,
  getCategoryLabel,
  formatDate,
}: {
  article: Blog;
  getImageUrl: (blog: Blog) => string;
  getCategoryLabel: (category: string) => string;
  formatDate: (dateString: string) => string;
  getTags: (tags: string) => string[];
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
    <div className="relative">
      <img
        src={getImageUrl(article)}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
          {getCategoryLabel(article.category)}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3 flex-wrap">
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <FaCalendarAlt /> {formatDate(article.date)}
        </span>
        <span className="text-gray-500 text-sm">
          {article.readTime} min read
        </span>
      </div>
      <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{article.preview}</p>
      <div className="flex items-center justify-between">
        <Link
          to={`/blogs/${article.id}`}
          className="text-red-600 font-medium flex items-center gap-2 hover:text-red-800 group"
        >
          Read More
          <span className="group-hover:translate-x-1 transition-transform">
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  </div>
);

const News = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const {
    data: blogsData,
    isLoading,
    isError,
  } = useGetBlogsQuery({
    page: currentPage + 1,
    limit: ITEMS_PER_PAGE,
    category: activeCategory !== "all" ? activeCategory : undefined,
  });

  useEffect(() => setCurrentPage(0), [activeCategory]);

  // Format date
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  // Get proper image url
  const getImageUrl = (blog: Blog) =>
    blog.image?.url
      ? `${BASE_URL}/${blog.image.url}`
      : "/image/default-news.jpg";

  // Get category label
  const getCategoryLabel = (category: string) =>
    ({
      "Match Reports": "Match Report",
      "League News": "League News",
      "Team News": "Team News",
      Interviews: "Exclusive Interview",
    }[category] || category);

  // Split tags
  const getTags = (tags: string | undefined) => (tags ? tags.split(",") : []);

  // Filter blogs by category
  const articles: Blog[] = blogsData?.docs || [];

  const filteredArticles = useMemo(
    () =>
      articles
        .filter(
          (article) =>
            activeCategory === "all" || article.category === activeCategory
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    [activeCategory, articles]
  );

  const [featuredArticle, regularArticles] = useMemo(
    () => [filteredArticles[0], filteredArticles.slice(1)],
    [filteredArticles]
  );

  // Pagination
  const pageCount = Math.ceil(regularArticles.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const offset = currentPage * ITEMS_PER_PAGE;
    return regularArticles.slice(offset, offset + ITEMS_PER_PAGE);
  }, [currentPage, regularArticles]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message="Failed to load news. Please try again." />;

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NSFL News
          </h1>
          <nav className="text-white flex justify-center items-center space-x-2">
            <Link to="/" className="hover:text-red-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-red-400">News</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === category.value
                    ? "bg-pink-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-96">
                  <img
                    src={getImageUrl(featuredArticle)}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <span className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Featured Story
                    </span>
                  </div>
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                      {getCategoryLabel(featuredArticle.category)}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <FaCalendarAlt /> {formatDate(featuredArticle.date)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {featuredArticle.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.preview}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blogs/${featuredArticle.id}`}
                      className="text-red-600 font-medium flex items-center gap-2 hover:text-red-800 group"
                    >
                      Read Full Story
                      <span className="group-hover:translate-x-1 transition-transform">
                        <FaArrowRight />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* News Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                getImageUrl={getImageUrl}
                getCategoryLabel={getCategoryLabel}
                formatDate={formatDate}
                getTags={getTags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              No articles found in this category
            </h3>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              View All News
            </button>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="my-10 flex justify-center">
            <ReactPaginate
              key={`${activeCategory}-${pageCount}`}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              previousLabel={<span className="text-xl">&laquo;</span>}
              nextLabel={<span className="text-xl">&raquo;</span>}
              breakLabel="..."
              containerClassName="inline-flex items-center justify-center gap-2 flex-wrap"
              pageClassName="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-red-100 hover:text-red-600"
              activeClassName="bg-red-600 text-white border-transparent"
              previousClassName="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600"
              nextClassName="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakClassName="px-3 py-2 text-gray-500"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default News;
