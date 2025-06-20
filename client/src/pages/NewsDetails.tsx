import {
  FaCalendarAlt,
  FaBookmark,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogByIdQuery } from "../services/blog";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { Blog } from "../types/blog";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const NewsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: blogData,
    isLoading,
    isError,
  } = useGetBlogByIdQuery(id || "", {
    skip: !id,
  });

  const convertLexicalToHTML = (lexicalData: any) => {
    if (!lexicalData?.root?.children) return "";

    return lexicalData.root.children
      .map((child: any) => {
        if (child.type === "paragraph") {
          return `<p>${child.children
            .map((textNode: any) => {
              let content = textNode.text;
              if (textNode.format & 1) content = `<strong>${content}</strong>`; // Bold
              if (textNode.format & 2) content = `<em>${content}</em>`; // Italic
              return content;
            })
            .join("")}</p>`;
        }
        return "";
      })
      .join("");
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return <ErrorMessage message="Failed to load article. Please try again." />;
  }
  if (!blogData) return <Loader />;
  const article: Blog = blogData.data || blogData;
  const htmlContent = convertLexicalToHTML(article.content);

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
            News Details
          </h1>
          <div className="text-white flex justify-center items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span>News</span>
            <span>/</span>
            <span className="text-pink-700">Details</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 px-4 py-2 text-black rounded-lg shadow-md transition-all duration-300 group"
        >
          <FaArrowLeft className="text-black group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to News</span>
        </button>

        {/* Article content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FaBookmark /> {article.category}
              </span>

              {/* Date */}
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />{" "}
                {formatDate(article.date)}
              </span>

              {/* Read Time */}
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FaClock className="text-gray-400" /> {article.readTime} min
                read
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {article.title}
            </h1>

            {/* Article Image */}
            {article.image && (
              <img
                src={`${BASE_URL}${article.image.url}`}
                alt={article.image.alt}
                className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-md"
              />
            )}

            {/* Content */}
            <div className="prose max-w-none">
              <p className="text-gray-900 mb-6 text-lg leading-relaxed font-semibold">
                {article.preview}
              </p>

              <div
                className="text-gray-600 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default NewsDetails;
