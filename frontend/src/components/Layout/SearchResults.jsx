import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dummyResults = [
  { id: 1, title: "React Tutorial", link: "/videos/1" },
  { id: 2, title: "Node.js Crash Course", link: "/videos/2" },
  { id: 3, title: "MongoDB Aggregation", link: "/videos/3" },
  { id: 4, title: "Tailwind CSS Basics", link: "/videos/4" },
  { id: 5, title: "Express.js Guide", link: "/videos/5" },
];

export const SearchResults = ({ query, onClose }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const results = dummyResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!filtered.length) return;

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prev) => (prev + 1) % filtered.length);
        break;
      case "ArrowUp":
        setActiveIndex((prev) =>
          prev === 0 ? filtered.length - 1 : prev - 1
        );
        break;
      case "Enter":
        navigate(filtered[activeIndex].link);
        onClose?.(); // Optional: close the dropdown or mobile search
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!query || filtered.length === 0) return null;

  return (
    <div className="absolute z-50 mt-3 w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg ">
      <ul className="max-h-60 overflow-auto">
        {filtered.map((item, index) => (
          <li
            key={item.id}
            className={`px-4 py-2 cursor-pointer ${
              index === activeIndex ? "bg-red-100 text-red-600" : "hover:bg-gray-100"
            }`}
            onClick={() => {
              navigate(item.link);
              onClose?.();
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
