import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { BLOG_POSTS } from './Articles';

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const article = id ? BLOG_POSTS.find(post => post.id === parseInt(id)) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h1>
          <Link to="/articles" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
            Return to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/articles"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to articles
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{article.author}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{article.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{article.readTime}</span>
                  </div>
                  <button 
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </header>

            <div 
              className="prose dark:prose-invert max-w-none
                         prose-headings:text-gray-900 dark:prose-headings:text-white
                         prose-p:text-gray-600 dark:prose-p:text-gray-300
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                         prose-strong:text-gray-900 dark:prose-strong:text-white
                         prose-ul:text-gray-600 dark:prose-ul:text-gray-300
                         prose-li:text-gray-600 dark:prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}