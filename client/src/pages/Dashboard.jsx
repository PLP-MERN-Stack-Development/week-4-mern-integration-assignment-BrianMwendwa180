import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import PostDialog from "../components/PostDialog";
import Navbar from "../components/Navbar";
import { toast } from "sonner";

export default function DeveloperDashboard() {
  const [Posts, setPosts] = useState([]);

  const load = async () => {
    const res = await API.get("/Posts/me");
    setPosts(res.data);
  };

  useEffect(() => { load(); }, []);

  const createPost = async (payload) => {
    const res = await API.post("/Posts", payload);
    setPosts(prev => [res.data, ...prev]);
    toast("Post created ✔️");
  };

  const togglePost = async (id) => {
    const Post = Posts.find(t => t._id === id);
    const res = await API.put(`/Posts/${id}`, { completed: !Post.completed });
    setPosts(prev => prev.map(t => (t._id === id ? res.data : t)));
  };

  const deletePost = async (id) => {
    await API.delete(`/Posts/${id}`);
    setPosts(prev => prev.filter(t => t._id !== id));
    toast("Post deleted 🗑️" );
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your personal Posts</p>
          </div>
          <PostDialog onSubmit={createPost} />
        </div>

        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h2 className="font-semibold text-green-900 dark:text-green-100">Developer View</h2>
          <p className="text-sm text-green-700 dark:text-green-300">
            You can create, edit, and delete your own Posts. Total Posts: {Posts.length}
          </p>
        </div>

        <section
          className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
        >
          {Posts.map(t => (
            <PostCard
              key={t._id}
              Post={t}
              onToggle={togglePost}
              onDelete={deletePost}
            />
          ))}
        </section>
      </main>
    </>
  );
}