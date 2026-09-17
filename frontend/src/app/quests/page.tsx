"use client";

import React from "react";
import QuestList from "@/components/quests/QuestList";

export default function QuestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <QuestList />
    </div>
  );
}
