"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Item } from "./types/item";
import Header from "./components/Header";

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <Header />
        <p className="p-6 text-gray-500">Loading products...</p>
      </>
    );

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Available products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {item.images && item.images.length > 0 ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <div className="text-green-600 font-bold text-xl">
                  ${item.price.toLocaleString()}
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded text-sm ${
                    item.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.stock > 0 ? `${item.stock} available` : "No stock"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
