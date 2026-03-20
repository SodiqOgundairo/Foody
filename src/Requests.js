const MDB = "https://www.themealdb.com/api/json/v1/1";
const DJ = "https://dummyjson.com/recipes";

const requests = {
  // ── MealDB ──
  mdb: {
    categories: `${MDB}/categories.php`,
    listCategories: `${MDB}/list.php?c=list`,
    listAreas: `${MDB}/list.php?a=list`,
    search: (q) => `${MDB}/search.php?s=${q}`,
    random: `${MDB}/random.php`,
    byCategory: (c) => `${MDB}/filter.php?c=${c}`,
    byArea: (a) => `${MDB}/filter.php?a=${a}`,
    lookup: (id) => `${MDB}/lookup.php?i=${id}`,
  },

  // ── DummyJSON Recipes ──
  dj: {
    all: (limit = 50, skip = 0) => `${DJ}?limit=${limit}&skip=${skip}`,
    search: (q) => `${DJ}/search?q=${q}&limit=50`,
    tags: `${DJ}/tags`,
    byTag: (tag) => `${DJ}/tag/${tag}`,
  },
};

export default requests;
