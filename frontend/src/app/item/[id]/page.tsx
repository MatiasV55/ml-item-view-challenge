"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";

import { Item } from "../../types/item";
import { Skeleton } from "../../components/ui/skeleton";
import { Alert, AlertDescription } from "../../components/ui/alert";
import Header from "../../components/Header";

const paymentMethods = ["Credit card", "Bank transfer"];

export default function ItemDetailPage() {
  const params = useParams();
  const [Item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/items/${params.id}`
        );

        if (!res.ok) {
          throw new Error("Error loading the item");
        }

        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading the item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <ItemSkeleton />
      </>
    );
  }

  if (error || !Item) {
    return (
      <>
        <Header />
        <Alert variant="destructive" className="max-w-7xl mx-auto mt-8">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>
            {error || "Error loading the item"}
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="relative aspect-square">
            <Image
              src={Item.images[selectedImage]}
              alt={Item.title}
              fill
              className="rounded-lg shadow object-cover"
              priority
            />
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
            {Item.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded border transition-all ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="rounded object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{Item.title}</h1>
          <div className="text-3xl text-green-600 font-bold">
            {Item.currency} ${Item.price.toLocaleString()}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-sm ${
                Item.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {Item.stock > 0 ? `${Item.stock} available` : "No stock"}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {Item.description}
            </p>
          </div>

          {paymentMethods && paymentMethods.length > 0 && (
            <div className="mt-6">
              <h2 className="font-medium mb-2">Payment methods</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {paymentMethods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 p-4 border rounded shadow-sm">
            <h3 className="text-sm text-gray-600">Sold by</h3>
            <div className="text-lg font-semibold">{Item.seller.name}</div>
            <div className="text-sm text-gray-500">
              Reputation: {Item.seller.rating}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ItemSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex mt-4 gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-20 h-20 rounded" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
