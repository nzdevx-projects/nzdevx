import creative from '@/data/projects/creative.json';
import community from '@/data/projects/community.json';
import businessServices from '@/data/projects/business.json';

// ─── Link category names to their JSON data files
const CATEGORY_DATA = {
  Business: businessServices,
  Creative: creative,
  Community: community,
};

// ─── Cache for shuffled projects (persists across calls)
let shuffledProjectsCache = null;

/* ──────────────────────────────────────────────── Get All Projects */
// Collect all projects, assign categories, and shuffle only once
export const getAllProjects = () => {
  // Return cached version if it exists
  if (shuffledProjectsCache) {
    return shuffledProjectsCache;
  }

  // Build projects array
  const allProjects = [];
  Object.entries(CATEGORY_DATA).forEach(([categoryName, categoryData]) => {
    if (Array.isArray(categoryData.projects)) {
      const projectsWithCategory = categoryData.projects.map((project) => ({
        ...project,
        category: categoryName,
      }));
      allProjects.push(...projectsWithCategory);
    }
  });

  // Separate featured and non-featured projects
  const featuredProjects = allProjects.filter((project) => project.isFeatured);
  const nonFeaturedProjects = allProjects.filter((project) => !project.isFeatured);

  // Shuffle each group separately
  const shuffledFeatured = featuredProjects.sort(() => Math.random() - 0.5);
  const shuffledNonFeatured = nonFeaturedProjects.sort(() => Math.random() - 0.5);

  // Put featured projects first, then non-featured
  shuffledProjectsCache = [...shuffledFeatured, ...shuffledNonFeatured];
  return shuffledProjectsCache;
};

/* ──────────────────────────────────────────────── Reset Shuffle Cache */
// Call this to force a new shuffle (useful for manual refresh)
export const resetProjectsShuffle = () => {
  shuffledProjectsCache = null;
};

/* ──────────────────────────────────────────────── Get Projects by Category */
// Return projects from a specific category (e.g., Business)
export const getProjectsByCategory = (categoryName) => {
  const categoryData = CATEGORY_DATA[categoryName];
  if (!categoryData?.projects) return [];

  // Assign category to each project
  return categoryData.projects.map((project) => ({
    ...project,
    category: categoryName,
  }));
};

/* ──────────────────────────────────────────────── Get Single Project by ID */
// Find and return one project using its unique ID
export const getProjectById = (id) => {
  const allProjects = getAllProjects();
  return allProjects.find((project) => project._id === id);
};

/* ──────────────────────────────────────────────── Filter Projects */
// Apply multiple filters: search text, category, subcategory, and featured status
export const filterProjects = (projects, filters) => {
  let filteredProjects = [...projects];

  // ─── Filter by search text (title, description, or keywords)
  if (filters.search) {
    const searchRegex = new RegExp(filters.search, 'i');
    filteredProjects = filteredProjects.filter(
      (project) =>
        searchRegex.test(project.title) ||
        searchRegex.test(project.shortDescription) ||
        searchRegex.test(project.detailedDescription) ||
        (project.keywords && project.keywords.some((keyword) => searchRegex.test(keyword)))
    );
  }

  // ─── Filter by category
  if (filters.category && filters.category.toLowerCase() !== 'all') {
    filteredProjects = filteredProjects.filter((project) => project.category === filters.category);
  }

  // ─── Filter by subcategory
  if (filters.subcategory && filters.subcategory.toLowerCase() !== 'all') {
    filteredProjects = filteredProjects.filter((project) => project.subcategory === filters.subcategory);
  }

  // ─── Filter by featured status
  if (filters.isFeatured && filters.isFeatured.toLowerCase() !== 'all') {
    filteredProjects = filteredProjects.filter((project) => project.isFeatured === (filters.isFeatured === 'true'));
  }

  return filteredProjects;
};

/* ──────────────────────────────────────────────── Paginate Projects */
// Split projects into pages based on page number and items per page
export const paginateProjects = (projects, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return projects.slice(startIndex, endIndex);
};

/* ──────────────────────────────────────────────── Get Featured Projects */
// Return only featured projects with a limit (uses cached shuffle)
export const getFeaturedProjects = (limit = 6) => {
  const allProjects = getAllProjects(); // Uses cached shuffle!
  const featuredProjects = allProjects.filter((project) => project.isFeatured);
  return featuredProjects.slice(0, limit);
};

/* ──────────────────────────────────────────────── Get Projects with Filters */
// Main function: combine filtering and pagination together
export const getProjectsWithFilters = (filters = {}) => {
  const { page = 1, limit = 12, search = '', category = '', subcategory = '', isFeatured = '' } = filters;

  // ─── Step 1: Get initial projects (all projects or by category)
  let allProjects;
  if (category && category.toLowerCase() !== 'all' && CATEGORY_DATA[category]) {
    allProjects = getProjectsByCategory(category);
  } else {
    allProjects = getAllProjects(); // Uses cached shuffle!
  }

  // ─── Step 2: Apply all filters
  const filteredProjects = filterProjects(allProjects, {
    search,
    category,
    subcategory,
    isFeatured,
  });

  // ─── Step 3: Handle featured projects (no pagination needed)
  if (isFeatured === 'true') {
    const limitedProjects = filteredProjects.slice(0, limit);
    return {
      projects: limitedProjects,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: limitedProjects.length,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  // ─── Step 4: Apply pagination for normal projects
  const totalCount = filteredProjects.length;
  const totalPages = Math.ceil(totalCount / limit);
  const paginatedProjects = paginateProjects(filteredProjects, page, limit);

  return {
    projects: paginatedProjects,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
