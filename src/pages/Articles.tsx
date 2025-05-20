import React, { useState } from 'react';
import { Search, ChevronRight, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Automata Theory",
    excerpt: "Dive deep into the fundamentals of automata theory and its practical applications in computer science. Learn about the core concepts that drive computational theory.",
    image: "https://i.ibb.co/fzF8dchB/automatatheory.png",
    date: "March 23, 2025",
    readTime: "1 min read",
    category: "Theory",
    tags: ["Automata", "Computer Science", "Theory"],
    author: "Richmond Constante",
    authorRole: "Computer Science Student",
    authorImage: "https://i.ibb.co/fWC8GYX/Rich.png",
    content: `
      <div class="prose">
        <h2>Introduction to Automata Theory</h2>
        <p>Automata theory is a fundamental branch of theoretical computer science that deals with abstract machines and their computational capabilities. These abstract machines, or automata, serve as mathematical models for computing devices and help us understand the limits and possibilities of computation.</p>

        <h2>Core Concepts</h2>
        <p>The field of automata theory encompasses several key concepts:</p>
        <ul>
          <li>Finite automata (DFA and NFA)</li>
          <li>Regular expressions and regular languages</li>
          <li>Context-free grammars</li>
          <li>Pushdown automata</li>
          <li>Turing machines</li>
        </ul>

        <h2>Applications in Computer Science</h2>
        <p>Automata theory finds practical applications in various areas:</p>
        <ul>
          <li>Compiler design and lexical analysis</li>
          <li>Pattern matching and text processing</li>
          <li>Protocol verification</li>
          <li>Digital circuit design</li>
        </ul>

        <h2>Historical Development</h2>
        <p>The development of automata theory has been crucial in understanding computation:</p>
        <ul>
          <li>Early work by Alan Turing on computational models</li>
          <li>Development of regular expressions by Stephen Kleene</li>
          <li>Contributions to formal language theory by Noam Chomsky</li>
        </ul>

        <h2>Modern Relevance</h2>
        <p>Today, automata theory continues to be relevant in:</p>
        <ul>
          <li>Natural language processing</li>
          <li>Machine learning algorithms</li>
          <li>Software verification</li>
          <li>Artificial intelligence</li>
        </ul>
      </div>
    `
  },
  {
    id: 2,
    title: "Regular Expressions in Practice",
    excerpt: "Learn how to effectively use regular expressions for pattern matching and text processing. Discover practical examples and best practices.",
    image: "https://i.ibb.co/Z1f0WP7B/regex.png",
    date: "March 10, 2024",
    readTime: "1 min read",
    category: "Tutorial",
    tags: ["Regex", "Pattern Matching", "Programming"],
    author: "Richmond Constante",
    authorRole: "Computer Science Student",
    authorImage: "https://i.ibb.co/fWC8GYX/Rich.png",
    content: `
      <div class="prose">
        <h2>Understanding Regular Expressions</h2>
        <p>Regular expressions (regex) are powerful tools for pattern matching and text manipulation. They provide a concise and flexible means for identifying strings of text, such as particular characters, words, or patterns of characters.</p>

        <h2>Basic Syntax Elements</h2>
        <p>Regular expressions use various special characters:</p>
        <ul>
          <li>Character classes: [abc], [^abc], [a-z]</li>
          <li>Quantifiers: *, +, ?, {n}, {n,}, {n,m}</li>
          <li>Anchors: ^, $, \\b, \\B</li>
          <li>Groups and capturing: (), (?:), \\1</li>
        </ul>

        <h2>Common Use Cases</h2>
        <p>Regular expressions are commonly used for:</p>
        <ul>
          <li>Form validation</li>
          <li>Data extraction</li>
          <li>String replacement</li>
          <li>Text parsing</li>
        </ul>

        <h2>Best Practices</h2>
        <p>When working with regular expressions:</p>
        <ul>
          <li>Keep expressions simple and readable</li>
          <li>Use appropriate tools for testing</li>
          <li>Consider performance implications</li>
          <li>Document complex patterns</li>
        </ul>
      </div>
    `
  },
  {
    id: 3,
    title: "Finite State Machines",
    excerpt: "Explore the concept of finite state machines and their role in software development. Understand how FSMs can be used to model complex systems.",
    image: "https://i.ibb.co/d0X50hmq/fsm.png",
    date: "March 5, 2024",
    readTime: "30 sec read",
    category: "Implementation",
    tags: ["FSM", "State Machines", "Design"],
    author: "Richmond Constante",
    authorRole: "Computer Science Student",
    authorImage: "https://i.ibb.co/fWC8GYX/Rich.png",
    content: `
      <div class="prose">
        <h2>Introduction to Finite State Machines</h2>
        <p>Finite State Machines (FSMs) are mathematical models of computation that represent systems with a finite number of states. They are particularly useful in designing and analyzing systems where the flow of control depends on previous events.</p>

        <h2>Key Components</h2>
        <p>A finite state machine consists of:</p>
        <ul>
          <li>States: Representing different conditions</li>
          <li>Transitions: Rules for moving between states</li>
          <li>Input alphabet: Valid inputs that trigger transitions</li>
          <li>Initial state: Starting point of the machine</li>
          <li>Final states: Accepting conditions</li>
        </ul>

        <h2>Types of FSMs</h2>
        <p>There are several types of finite state machines:</p>
        <ul>
          <li>Deterministic (DFA)</li>
          <li>Non-deterministic (NFA)</li>
          <li>Moore machines</li>
          <li>Mealy machines</li>
        </ul>

        <h2>Practical Applications</h2>
        <p>FSMs are used in various domains:</p>
        <ul>
          <li>Digital circuit design</li>
          <li>Protocol implementation</li>
          <li>Game development</li>
          <li>User interface design</li>
        </ul>
      </div>
    `
  }
];

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-gray-800 dark:to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Latest Articles & Insights</h1>
            <p className="text-xl text-gray-200">
              Explore our collection of articles on automata theory, formal languages, and computational concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                       focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Theory", "Tutorial", "Implementation"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                       transition-transform hover:transform hover:scale-[1.02]
                       dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                       dark:border dark:border-gray-700"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                               bg-indigo-50 dark:bg-indigo-900/50 
                               text-indigo-700 dark:text-indigo-300"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/article/${post.id}`}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 
                           hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                >
                  Read more
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}