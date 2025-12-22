const books = [
  null, // placeholder (keeps indexing simple)
  {
    id: 1,
    title: "Becoming Your Own Banker",
    author: "R. Nelson Nash",
    published: 2000,
    read: 2025,
    rating: 5,
    cover: "https://m.media-amazon.com/images/I/81AbCHNRvEL._SL1500_.jpg",
    thoughts: "A transformative look at using whole life insurance as your own banking system. Mind-blowing shift in how I view money and control."
  },
  {
    id: 2,
    title: "The Ra Material (The Law of One)",
    author: "Ra (channeled by Don Elkins, Carla Rueckert, Jim McCarty)",
    published: "1984 (Book I)",
    read: 2020,
    rating: 5,
    cover: "https://m.media-amazon.com/images/I/71YBS+FBNLL._SL1500_.jpg",
    thoughts: "Profound channeled material on unity, densities, and the nature of reality. One of the most impactful spiritual texts I've encountered."
  }
];

books.sort((a, b) => (b ? b.read : 0) - (a ? a.read : 0));  // Add this for descending sort by read year

function showBookDetail(bookId) {
  const book = books[bookId];
  const detail = document.getElementById('book-detail');
  detail.innerHTML = `
    <button onclick="document.getElementById('book-detail').classList.add('hidden')" class="flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6">
      ← Back to bookshelf
    </button>
    <div class="grid md:grid-cols-3 gap-8">
      <div>
        <img src="${book.cover}" alt="${book.title} cover" class="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl">
      </div>
      <div class="md:col-span-2 space-y-8">
        <div>
          <h3 class="text-4xl font-light mb-3 text-amber-400">${book.title}</h3>
          <p class="text-2xl text-slate-300 mb-6">${book.author}</p>
          <div class="flex flex-wrap gap-6 text-slate-400">
            <div>Published: ${book.published}</div>
            <div>Read: ${book.read}</div>
            <div class="flex items-center gap-1">
              Rating: ${'★'.repeat(book.rating)}${'☆'.repeat(5 - book.rating)}
            </div>
          </div>
        </div>
        <div class="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h4 class="text-xl font-medium mb-4 text-emerald-400">My Thoughts & Summary</h4>
          <p class="text-slate-300 leading-relaxed">${book.thoughts}</p>
        </div>
      </div>
    </div>
  `;
  detail.classList.remove('hidden');
  window.scrollTo(0, 0);
}
