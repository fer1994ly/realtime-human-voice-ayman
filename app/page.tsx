"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/auth/token');
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setAccessToken(data.accessToken);
        }
      } catch (err) {
        setError('Failed to fetch access token');
      }
    };

    fetchToken();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
    </div>
  );
}
