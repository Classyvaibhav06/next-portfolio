"use client";

import { useState, useEffect, useCallback } from "react";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");

  // Restore default cursor on admin page
  useEffect(() => {
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);
  const [authenticated, setAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/contacts?password=${encodeURIComponent(password)}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts);
        setAuthenticated(true);
      } else {
        setError(data.msg || "Authentication failed");
        setAuthenticated(false);
      }
    } catch {
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  }, [password]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchContacts();
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.msg || "Failed to delete");
      }
    } catch {
      alert("Error deleting contact");
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchContacts();
    }
  }, [authenticated, fetchContacts]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-black text-center mb-8">
            <span className="text-yellow-400">Admin</span> Dashboard
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-yellow-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors font-mono"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm font-mono">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">
            <span className="text-yellow-400">Admin</span> Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 font-mono text-sm">
              {contacts.length} messages
            </span>
            <button
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
                setContacts([]);
              }}
              className="px-4 py-2 border border-neutral-700 text-neutral-400 rounded-lg hover:border-red-400 hover:text-red-400 transition-colors font-mono text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center text-neutral-500 font-mono py-20">
            No messages yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-yellow-400/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {contact.name}
                    </h3>
                    <p className="text-yellow-400 font-mono text-sm">
                      {contact.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500 text-xs font-mono">
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="text-neutral-600 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">
                    Subject:
                  </span>
                  <p className="text-white font-mono text-sm mt-1">
                    {contact.subject}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider">
                    Message:
                  </span>
                  <p className="text-neutral-300 text-sm mt-1 leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
