import React, { useState } from 'react';
import { ProductItem } from '../../types';
import { Package, ArrowUp, CheckCircle, Search } from 'lucide-react';

interface ProductsSectionProps {
  products: ProductItem[];
  onQuoteProduct: (productLabel: string) => void;
  onBackToTop: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onQuoteProduct,
  onBackToTop,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'valvulas', label: 'Válvulas' },
    { id: 'transmision', label: 'Transmisión' },
    { id: 'motores', label: 'Motores' },
    { id: 'epp', label: 'EPP' },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'todos' || prod.category === selectedCategory;
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="productos" className="w-full bg-white py-20 border-b border-gray-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#d35400]" />
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#d35400]">
                Catálogo Técnico Homologado
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1a212a]">
              Líneas de Suministro Industrial
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-600">
              Disponibilidad en almacén fiscal y pedido programado con certificados de fábrica y cumplimiento dimensional internacional.
            </p>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar SKU o producto..."
                className="pl-9 pr-3 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#d35400] w-full sm:w-48"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded font-heading font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1a212a] text-white shadow-sm'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="font-heading font-bold text-gray-600">No se encontraron productos con ese criterio</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#d35400] font-bold underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Product Visual Container */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#1a212a] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                      {product.standard}
                    </span>
                    {product.stockStatus === 'In Stock' && (
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Stock
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="font-mono text-xs text-[#d35400] font-bold block mb-1">
                      SKU: {product.sku}
                    </span>
                    <h4 className="font-heading font-bold text-base text-[#1a212a] mb-2 leading-snug">
                      {product.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-600 mb-3 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="p-2 bg-gray-50 rounded font-mono text-[11px] text-gray-600 border border-gray-100 mb-3">
                      {product.specsSummary}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() =>
                      onQuoteProduct(`${product.title} (SKU: ${product.sku})`)
                    }
                    className="w-full py-2 bg-[#d35400] hover:bg-[#a23f00] text-white rounded font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    Cotizar Producto
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </section>
  );
};
