import { create } from "zustand";

const useGameStore = create((set) => ({
    score: 0,
    badges: [],
    addScore: (delta) => set((s) => ({ score: s.score + delta })),
    addBadge: (b) => set((s) => {
        if (s.badges.includes(b)) return s;
        return { badges: [...s.badges, b] };
    }),
}));

export default useGameStore;
