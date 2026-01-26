import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '', companyName: '', role: '', experience: ''
  });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/posts");
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error("API Error:", err); }
  };

  // FEATURE: Like a story
  const handleLike = async (id) => {
  if (!id) {
    console.error("No ID found for this post!");
    return;
  }
  try {
    // Uses the new PUT endpoint you created in Eclipse
    await axios.put(`http://localhost:8080/api/posts/${id}/like`);
    // CRITICAL: Refresh the data so the new like count shows up
    fetchPosts(); 
  } catch (err) {
    console.error("Like failed. Check if the backend is running on 8080.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/posts", formData);
      setFormData({ studentName: '', companyName: '', role: '', experience: '' });
      fetchPosts();
    } catch (err) { alert("Check Eclipse!"); }
  };

  const handleDelete = async (id) => {
    const password = prompt("Admin Key:");
    if (password === "admin123") {
      try {
        await axios.delete(`http://localhost:8080/api/posts/${id}`);
        fetchPosts();
      } catch (err) { alert("Delete failed!"); }
    }
  };

  const filteredPosts = posts.filter(post => 
    post.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-6xl font-black text-white mb-6">INSIGHTS</motion.h1>
          <input 
            type="text" placeholder="Search companies..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FORM */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] sticky top-12">
              <h2 className="text-xl font-bold text-white mb-6">Contribute</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="studentName" placeholder="Your Name" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl outline-none" required />
                <input name="companyName" placeholder="Company" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl outline-none" required />
                <input name="role" placeholder="Role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl outline-none" required />
                <textarea name="experience" placeholder="The story..." value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full bg-slate-900/50 border border-white/5 p-4 rounded-2xl h-40 outline-none" required />
                <button className="w-full py-4 rounded-2xl bg-blue-600 font-bold hover:bg-blue-500 transition-all">PUBLISH</button>
              </form>
            </div>
          </div>

          {/* FEED */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div key={post.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] group transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-5">
                      <img 
                        src={`https://logo.clearbit.com/${post.companyName.toLowerCase().replace(/\s/g, '')}.com`} 
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${post.companyName}&background=2563eb&color=fff`; }}
                        className="w-14 h-14 rounded-2xl bg-white p-1 object-contain"
                        alt="Logo"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white uppercase">{post.companyName}</h3>
                        <p className="text-blue-400 font-mono text-xs tracking-widest uppercase">{post.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       {/* FEATURE: Like Button */}
                      <button 
  onClick={() => handleLike(post.id)} //
  className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-500 rounded-xl hover:bg-pink-500 transition-all"
>
  ❤️ {post.likes || 0}
</button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
                    </div>
                  </div>

                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5 mb-4">
                    <p className="text-slate-400 italic">
                      {expandedId === post.id ? post.experience : `${post.experience.substring(0, 150)}${post.experience.length > 150 ? '...' : ''}`}
                    </p>
                    {post.experience.length > 150 && (
                      <button onClick={() => setExpandedId(expandedId === post.id ? null : post.id)} className="mt-3 text-blue-500 font-bold text-sm">
                        {expandedId === post.id ? "Show Less ↑" : "Read Full Story ↓"}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-600 tracking-widest">
                    <span>BY: {post.studentName}</span>
                    <span>• ID: {post.id}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;