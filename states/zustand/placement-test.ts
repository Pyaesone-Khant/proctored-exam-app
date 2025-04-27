import { create } from "zustand";

interface PlacementTestState {
    accessCode: string | null;
    setAccessCode: (code: string) => void;
    clearAccessCode: () => void;

    error: string | undefined;
    setError: (error: string | undefined) => void;

    loading: boolean;
    setLoading: (loading: boolean) => void;

}

export const usePlacementTestStore = create<PlacementTestState>((set) => ({
    accessCode: null,
    setAccessCode: (code: string) => set({ accessCode: code }),
    clearAccessCode: () => set({ accessCode: null }),

    error: undefined,
    setError: (error: string | undefined) => set({ error }),

    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
}))