import { Province, TravelBox, Quest, AudioStory } from "@/types";
import { MOCK_PROVINCES, MOCK_TRAVEL_BOXES, MOCK_QUESTS, MOCK_AUDIO_STORIES } from "./mockData";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function fetchProvinces(): Promise<Province[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/provinces`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Backend offline");
    const data = await res.json();
    return data.docs || MOCK_PROVINCES;
  } catch (error) {
    return MOCK_PROVINCES;
  }
}

export async function fetchTravelBoxes(): Promise<TravelBox[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/boxes`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Backend offline");
    const data = await res.json();
    return data.docs || MOCK_TRAVEL_BOXES;
  } catch (error) {
    return MOCK_TRAVEL_BOXES;
  }
}

export async function fetchQuests(): Promise<Quest[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/quests`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Backend offline");
    const data = await res.json();
    return data.docs || MOCK_QUESTS;
  } catch (error) {
    return MOCK_QUESTS;
  }
}

export async function fetchAudioStories(): Promise<AudioStory[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/audio-stories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Backend offline");
    const data = await res.json();
    return data.docs || MOCK_AUDIO_STORIES;
  } catch (error) {
    return MOCK_AUDIO_STORIES;
  }
}
