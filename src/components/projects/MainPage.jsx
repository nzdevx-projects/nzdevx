'use client';

import ReactPaginate from 'react-paginate';
import { CustomSelect } from './SmallUI.jsx';
import { useState, useEffect, useMemo } from 'react';
import { ProjectCard, SkeletonProjectCard } from './Card.jsx';
import { getProjectsWithFilters } from '@/hooks/useProjects.js';
import { Search, Filter, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// ──────────────────────────────────────────────── Main Projects Page UI Component */
export default function MainPageUI() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // ─── Static category and subcategory options
  const categories = useMemo(
    () => ({
      Business: [
        'Business & Services',
        'Ecommerce & Store',
        'Restaurant & Food',
        'Travel & Tourism',
        'Healthcare & Fitness',
        'Property Management',
      ],
      Creative: ['Blog', 'Personal', 'Creative Media'],
      Community: ['Events', 'Education', 'Nonprofit'],
    }),
    []
  );

  // ─── Create options arrays for custom selects
  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'All Categories' },
      ...Object.keys(categories).map((cat) => ({ value: cat, label: cat })),
    ],
    [categories]
  );

  // ─── Create subcategory options based on selected category
  const subcategoryOptions = useMemo(() => {
    const options = [{ value: '', label: 'All Subcategories' }];
    if (selectedCategory && categories[selectedCategory]) {
      options.push(...categories[selectedCategory].map((sub) => ({ value: sub, label: sub })));
    }
    return options;
  }, [selectedCategory, categories]);

  // ─── Get filtered projects (instant - no API calls!)
  const projectsData = useMemo(() => {
    return getProjectsWithFilters({
      page: currentPage,
      limit: 12,
      search: searchTerm,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    });
  }, [currentPage, searchTerm, selectedCategory, selectedSubcategory]);

  const { projects, pagination } = projectsData;

  // ─── Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // ─── Clear subcategory if it's not valid for the selected category
  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const validSubcategories = categories[selectedCategory] || [];
      if (!validSubcategories.includes(selectedSubcategory)) {
        setSelectedSubcategory('');
      }
    }
  }, [selectedCategory, selectedSubcategory, categories]);

  // ─── Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSubcategory]);

  // ─── Handle pagination click
  const handlePageClick = ({ selected }) => {
    setLoading(true);
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  // ─── Clear all filters and reset state
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setCurrentPage(1);
  };

  // ─── Handle category change and reset subcategory
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        {/* ─── Search and Filter Section */}
        <div className="relative bg-secondary shadow-secondary rounded-md p-4 mb-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {/* ─── Search Input */}
          <div className="relative bg-primary rounded-md border-primary w-full sm:col-span-2 xl:col-span-2">
            {searchTerm || selectedCategory || selectedSubcategory ? (
              <button
                onClick={clearFilters}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                aria-label="Clear search and filters"
              >
                <XCircle className="size-4.5 text-red-500" />
              </button>
            ) : (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 size-5" />
            )}
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 pr-4 py-3"
            />
          </div>

          {/* ─── Category Filter */}
          <CustomSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="All Categories"
          />

          {/* ─── Subcategory Filter */}
          <CustomSelect
            options={subcategoryOptions}
            value={selectedSubcategory}
            onChange={setSelectedSubcategory}
            placeholder="All Subcategories"
            disabled={!selectedCategory}
          />
        </div>

        {/* ─── Projects List */}
        {loading ? (
          /* ─── Loading Skeleton Grid */
          <div className=" mb-16 max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 6xl:grid-cols-4 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonProjectCard key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          /* ─── Empty State Message */
          <div className="text-center py-20">
            <Filter size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-gradient text-2xl md:text-3xl">No projects found</h3>
            <p className="mb-4">Try adjusting your search terms or filters</p>
            <button onClick={clearFilters} className="text-primary font-medium hover:underline mx-auto">
              Clear all filters
            </button>
          </div>
        ) : (
          /* ─── Projects Grid */
          <div className=" mb-16 max-w-[340px] md:max-w-[735px] 2xl:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 6xl:grid-cols-4 gap-6 md:gap-10 2xl:gap-6 3xl:gap-10 4xl:gap-16 6xl:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* ─── Pagination Component */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center mb-16">
            <ReactPaginate
              pageCount={pagination.totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              containerClassName="flex items-center gap-x-2 p-1 bg-primary rounded-md shadow-secondary overflow-hidden cursor-pointer"
              pageClassName="bg-primary-card rounded-md"
              pageLinkClassName="px-3 py-1.5 rounded-md text-sm"
              activeClassName="bg-tertiary text-white"
              activeLinkClassName="bg-tertiary text-white"
              previousLabel={<ChevronLeft size={20} className="pointer-events-none" />}
              nextLabel={<ChevronRight size={20} className="pointer-events-none" />}
              previousLinkClassName="btn-primary px-3 py-1.5 rounded-md hover:-translate-y-0"
              nextLinkClassName="btn-primary px-3 py-1.5 rounded-md hover:-translate-y-0"
              disabledClassName="opacity-50 cursor-not-allowed hover:translate-0"
              disabledLinkClassName="cursor-not-allowed hover:translate-0"
              breakLabel="..."
              breakClassName="px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
