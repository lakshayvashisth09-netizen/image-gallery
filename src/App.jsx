import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchData = async (pageNumber) => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=9`
      )

      setData(res.data)
    } catch {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <div className="bg-black min-h-screen p-4 text-white">
      <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>

      {/* CENTER LOADING */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <h2 className="text-xl font-medium animate-pulse">Loading...</h2>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {data.map(item => (
          <div key={item.id} className="bg-gray-800 p-3 rounded-lg">
            <img
              src={item.download_url}
              alt={item.author}
              className="w-full h-40 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedImage(item.download_url)}
            />
            <p className="mt-2 text-sm opacity-80">{item.author}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || loading}
          className={`px-6 py-2 rounded-full font-medium transition
            ${
              page === 1
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-linear-to-r from-pink-500 to-red-500 hover:scale-105'
            }`}
        >
          ◀ Prev
        </button>

        <span className="text-sm opacity-70">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={loading}
          className="px-6 py-2 rounded-full font-medium bg-linear-to-r from-cyan-400 to-blue-600 hover:scale-105 transition"
        >
          Next ▶
        </button>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default App
