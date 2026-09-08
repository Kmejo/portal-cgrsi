import React, { useState } from 'react';
import { BlogPost } from '../../types';
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  ArrowUp,
  Tag,
  X,
} from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onBackToTop: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onBackToTop }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = ['Todos', 'Mantenimiento', 'Normativa', 'Ingeniería', 'Casos de Éxito'];

  const filteredPosts = posts.filter(
    (p) =>
      p.isPublished &&
      (selectedCategory === 'Todos' || p.category === selectedCategory)
  );

  return (
    <section id="blog" className="w-full bg-[#f9f9f9] py-20 border-b border-gray-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#d35400]" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#d35400]">
                Publicaciones Técnicas & Casos de Éxito
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1a212a]">
              Ingeniería Aplicada & Novedades
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-600">
              Artículos técnicos redactados por nuestros ingenieros certificados sobre mantenimiento de alto impacto y normativas industriales.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded font-heading font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1a212a] text-white shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image Container */}
                <div className="relative h-48 bg-[#2f3640] overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 bg-[#d35400] text-white font-heading text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-3 text-white text-[11px] font-sans flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-[#fc7127]" />
                    {post.readTime}
                  </span>
                </div>

                {/* Article Snippet Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-sans mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#1a212a] mb-2.5 leading-snug group-hover:text-[#d35400] transition-colors">
                    {post.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setReadingPost(post)}
                  className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#1a212a] text-[#1a212a] hover:text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-gray-200"
                >
                  <span>Leer Artículo Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Back to top anchor */}
        <div className="mt-12 flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-gray-600 hover:text-[#d35400] transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[#d35400]" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>

      {/* Reader Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-[100] bg-[#1a212a]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setReadingPost(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-[#d35400] text-white font-heading font-bold px-2 py-0.5 rounded uppercase">
                  {readingPost.category}
                </span>
                <span className="text-gray-500 font-sans">{readingPost.date}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 font-sans">{readingPost.readTime}</span>
              </div>

              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1a212a] leading-tight">
                {readingPost.title}
              </h2>

              <div className="p-3 bg-gray-50 rounded border border-gray-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1a212a] text-white flex items-center justify-center font-heading font-bold text-sm">
                  {readingPost.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-heading font-bold text-xs text-[#1a212a]">
                    {readingPost.author}
                  </h5>
                  <p className="font-sans text-[11px] text-gray-500">
                    {readingPost.authorRole} — CGR Soluciones Integrales
                  </p>
                </div>
              </div>

              {/* Cover Image in Modal */}
              <div className="rounded-lg overflow-hidden h-64 bg-gray-900 relative">
                <img
                  src={readingPost.coverImageUrl}
                  alt={readingPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Formatted Content */}
              <div className="prose prose-sm max-w-none font-sans text-gray-800 leading-relaxed space-y-4 whitespace-pre-line border-t border-gray-100 pt-4">
                {readingPost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#d35400]" />
                {readingPost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Close button */}
              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setReadingPost(null)}
                  className="px-5 py-2 bg-[#1a212a] text-white rounded font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#2f3640]"
                >
                  Cerrar Artículo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
