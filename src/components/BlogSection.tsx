import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Automata Theory",
    excerpt: "Dive deep into the fundamentals of automata theory and its practical applications in computer science. Learn about the core concepts that drive computational theory.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 22, 2025",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Regular Expressions in Practice",
    excerpt: "Learn how to effectively use regular expressions for pattern matching and text processing. Discover practical examples and best practices.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 10, 2024",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Finite State Machines",
    excerpt: "Explore the concept of finite state machines and their role in software development. Understand how FSMs can be used to model complex systems.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "March 5, 2024",
    readTime: "6 min read"
  }
];

export default function BlogSection() {
  const navigate = useNavigate();

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
          <p className="text-lg text-gray-600">Explore our comprehensive guides and tutorials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="blog-card cursor-pointer transform transition-transform hover:scale-[1.02]"
              onClick={() => handleArticleClick(post.id)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(post.id);
                  }}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}