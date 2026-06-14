"use client";

import { useState } from "react";

export default function HelpfulVote() {
  const [voted, setVoted] = useState(false);

  if (voted) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-500">Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <p className="text-sm text-gray-600 font-medium">Was this review helpful?</p>
      <div className="flex gap-2">
        <button
          onClick={() => setVoted(true)}
          className="border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 rounded-lg px-4 py-2 transition-colors"
        >
          👍 Yes
        </button>
        <button
          onClick={() => setVoted(true)}
          className="border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 rounded-lg px-4 py-2 transition-colors"
        >
          👎 No
        </button>
      </div>
    </div>
  );
}
