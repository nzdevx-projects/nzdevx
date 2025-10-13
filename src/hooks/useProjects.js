import creative from '@/data/projects/creative.json';
import community from '@/data/projects/community.json';
import businessServices from '@/data/projects/business-services.json';

// ─── Link category names to their JSON data files
const CATEGORY_DATA = {
  'Business & Services': businessServices,
  Creative: creative,
  Community: community,
};

/* ──────────────────────────────────────────────── Get All Projects */
// Collect all projects and assign categories from top-level data
export const getAllProjects = () => {
  const allProjects = [];
  Object.entries(CATEGORY_DATA).forEach(([categoryName, categoryData]) => {
    if (Array.isArray(categoryData.projects)) {
      // Assign category to each project from top-level category
      const projectsWithCategory = categoryData.projects.map((project) => ({
        ...project,
        category: categoryName,
      }));
      allProjects.push(...projectsWithCategory);
    }
  });
  return allProjects;
};

/* ──────────────────────────────────────────────── Get Projects by Category */
// Return projects from a specific category (e.g., "Business & Services")
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

  // ─── Filter by search text (title, description, or technologies)
  if (filters.search) {
    const searchRegex = new RegExp(filters.search, 'i');
    filteredProjects = filteredProjects.filter(
      (project) =>
        searchRegex.test(project.title) ||
        searchRegex.test(project.shortDescription) ||
        searchRegex.test(project.detailedDescription) ||
        project.technologies.some((tech) => searchRegex.test(tech))
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

/* ──────────────────────────────────────────────── Sort Projects */
// Sort projects: shuffle if featured, otherwise sort by newest first
export const sortProjects = (projects, isFeatured) => {
  if (isFeatured === 'true') {
    return projects.sort(() => Math.random() - 0.5);
  } else {
    return projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

/* ──────────────────────────────────────────────── Paginate Projects */
// Split projects into pages based on page number and items per page
export const paginateProjects = (projects, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return projects.slice(startIndex, endIndex);
};

/* ──────────────────────────────────────────────── Get Featured Projects */
// Return only featured projects, randomly shuffled with a limit
export const getFeaturedProjects = (limit = 6) => {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.isFeatured);
  const shuffled = featuredProjects.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
};

/* ──────────────────────────────────────────────── Get Projects with Filters */
// Main function: combine filtering, sorting, and pagination together
export const getProjectsWithFilters = (filters = {}) => {
  const { page = 1, limit = 12, search = '', category = '', subcategory = '', isFeatured = '' } = filters;

  // ─── Step 1: Get initial projects (all projects or by category)
  let allProjects;
  if (category && category.toLowerCase() !== 'all' && CATEGORY_DATA[category]) {
    allProjects = getProjectsByCategory(category);
  } else {
    allProjects = getAllProjects();
  }

  // ─── Step 2: Apply all filters
  const filteredProjects = filterProjects(allProjects, {
    search,
    category,
    subcategory,
    isFeatured,
  });

  // ─── Step 3: Sort projects
  const sortedProjects = sortProjects(filteredProjects, isFeatured);

  // ─── Step 4: Handle featured projects (no pagination needed)
  if (isFeatured === 'true') {
    const limitedProjects = sortedProjects.slice(0, limit);
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

  // ─── Step 5: Apply pagination for normal projects
  const totalCount = sortedProjects.length;
  const totalPages = Math.ceil(totalCount / limit);
  const paginatedProjects = paginateProjects(sortedProjects, page, limit);

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
