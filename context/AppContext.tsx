'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import farmersData from '@/data/farmers.json';
import innovationsData from '@/data/innovations.json';
import commentsData from '@/data/comments.json';

export interface User {
  id: string;
  name: string;
  village: string;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  state: string;
  image: string;
  bio: string;
  joinedDate: string;
  innovations: string[];
  totalLikes: number;
}

export interface Innovation {
  id: string;
  title: string;
  description: string;
  farmerId: string;
  farmerName: string;
  category: string;
  image: string;
  images: string[];
  materials: string[];
  estimatedCost: number;
  replicationSteps: string[];
  village: string;
  state: string;
  likes: number;
  createdAt: string;
  license?: string;
}

export interface Comment {
  id: string;
  innovationId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface AppContextType {
  user: User | null;
  isLoaded: boolean;
  setUser: (user: User | null) => void;
  signOut: () => void;
  farmers: Farmer[];
  innovations: Innovation[];
  comments: Comment[];
  likedInnovations: string[];
  cart: string[];
  toggleLike: (innovationId: string) => void;
  addComment: (innovationId: string, text: string, guestName?: string) => void;
  addInnovation: (innovation: Omit<Innovation, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  addFarmer: (farmer: Omit<Farmer, 'id' | 'joinedDate' | 'innovations' | 'totalLikes'>) => { success: boolean; error?: string };
  getInnovationComments: (innovationId: string) => Comment[];
  getFarmerById: (farmerId: string) => Farmer | undefined;
  getInnovationById: (innovationId: string) => Innovation | undefined;
  getFarmerInnovations: (farmerId: string) => Innovation[];
  getLikeCount: (innovationId: string) => number;
  isLiked: (innovationId: string) => boolean;
  addToCart: (innovationId: string) => void;
  removeFromCart: (innovationId: string) => void;
  clearCart: () => void;
  isInCart: (innovationId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>(farmersData as Farmer[]);
  const [innovations, setInnovations] = useState<Innovation[]>(innovationsData as Innovation[]);
  const [comments, setComments] = useState<Comment[]>(commentsData as Comment[]);
  const [likedInnovations, setLikedInnovations] = useState<string[]>([]);
  const [likeDeltas, setLikeDeltas] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('rih_user');
      if (savedUser) setUserState(JSON.parse(savedUser));

      const savedLikes = localStorage.getItem('rih_liked');
      if (savedLikes) setLikedInnovations(JSON.parse(savedLikes));

      const savedDeltas = localStorage.getItem('rih_like_deltas');
      if (savedDeltas) setLikeDeltas(JSON.parse(savedDeltas));

      const savedComments = localStorage.getItem('rih_comments');
      if (savedComments) {
        const extra: Comment[] = JSON.parse(savedComments);
        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          return [...prev, ...extra.filter((c) => !existingIds.has(c.id))];
        });
      }

      const savedInnovations = localStorage.getItem('rih_innovations');
      if (savedInnovations) {
        const extra: Innovation[] = JSON.parse(savedInnovations);
        setInnovations((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          return [...prev, ...extra.filter((i) => !existingIds.has(i.id))];
        });
      }

      const savedFarmers = localStorage.getItem('rih_farmers');
      if (savedFarmers) {
        const extra: Farmer[] = JSON.parse(savedFarmers);
        setFarmers((prev) => {
          const existingIds = new Set(prev.map((f) => f.id));
          return [...prev, ...extra.filter((f) => !existingIds.has(f.id))];
        });
      }

      const savedCart = localStorage.getItem('rih_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      // localStorage not available (SSR) — safe to ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    try {
      if (newUser) {
        localStorage.setItem('rih_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('rih_user');
      }
    } catch {}
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const toggleLike = useCallback(
    (innovationId: string) => {
      setLikedInnovations((prev) => {
        const alreadyLiked = prev.includes(innovationId);
        const updated = alreadyLiked
          ? prev.filter((id) => id !== innovationId)
          : [...prev, innovationId];
        try {
          localStorage.setItem('rih_liked', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      setLikeDeltas((prev) => {
        const alreadyLiked = likedInnovations.includes(innovationId);
        const current = prev[innovationId] ?? 0;
        const updated = {
          ...prev,
          [innovationId]: alreadyLiked ? current - 1 : current + 1,
        };
        try {
          localStorage.setItem('rih_like_deltas', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    [likedInnovations]
  );

  const addComment = useCallback(
    (innovationId: string, text: string, guestName?: string) => {
      const authorName = user?.name ?? guestName?.trim();
      if (!authorName || !text.trim()) return;
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        innovationId,
        userId: user?.id ?? `guest-${Date.now()}`,
        userName: authorName,
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => {
        const updated = [...prev, newComment];
        const seedIds = new Set((commentsData as Comment[]).map((c) => c.id));
        const extras = updated.filter((c) => !seedIds.has(c.id));
        try {
          localStorage.setItem('rih_comments', JSON.stringify(extras));
        } catch {}
        return updated;
      });
    },
    [user]
  );

  const SUBMIT_COOLDOWN_MS = 60_000;

  const addInnovation = useCallback(
    (innovation: Omit<Innovation, 'id' | 'createdAt'>): { success: boolean; error?: string } => {
      // Rate-limit: one innovation per minute per browser
      try {
        const stored = localStorage.getItem('rih_last_submit');
        const stamps: Record<string, number> = stored ? JSON.parse(stored) : {};
        const now = Date.now();
        if (stamps.innovation && now - stamps.innovation < SUBMIT_COOLDOWN_MS) {
          const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - (now - stamps.innovation)) / 1000);
          return { success: false, error: `Please wait ${secsLeft}s before submitting another innovation.` };
        }
      } catch {}

      // Duplicate title check (case-insensitive)
      const titleNorm = innovation.title.trim().toLowerCase();
      const duplicate = innovations.some((i) => i.title.trim().toLowerCase() === titleNorm);
      if (duplicate) {
        return { success: false, error: 'An innovation with this title already exists.' };
      }

      const newInnovation: Innovation = {
        ...innovation,
        id: `innovation-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setInnovations((prev) => {
        const updated = [...prev, newInnovation];
        const seedIds = new Set((innovationsData as Innovation[]).map((i) => i.id));
        const extras = updated.filter((i) => !seedIds.has(i.id));
        try {
          localStorage.setItem('rih_innovations', JSON.stringify(extras));
        } catch {}
        return updated;
      });

      // Record submission timestamp
      try {
        const stored = localStorage.getItem('rih_last_submit');
        const stamps: Record<string, number> = stored ? JSON.parse(stored) : {};
        localStorage.setItem('rih_last_submit', JSON.stringify({ ...stamps, innovation: Date.now() }));
      } catch {}

      return { success: true };
    },
    [innovations]
  );

  const addFarmer = useCallback(
    (farmer: Omit<Farmer, 'id' | 'joinedDate' | 'innovations' | 'totalLikes'>): { success: boolean; error?: string } => {
      // Rate-limit: one farmer per minute per browser
      try {
        const stored = localStorage.getItem('rih_last_submit');
        const stamps: Record<string, number> = stored ? JSON.parse(stored) : {};
        const now = Date.now();
        if (stamps.farmer && now - stamps.farmer < SUBMIT_COOLDOWN_MS) {
          const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - (now - stamps.farmer)) / 1000);
          return { success: false, error: `Please wait ${secsLeft}s before adding another farmer.` };
        }
      } catch {}

      // Duplicate name check (case-insensitive)
      const nameNorm = farmer.name.trim().toLowerCase();
      const duplicate = farmers.some((f) => f.name.trim().toLowerCase() === nameNorm);
      if (duplicate) {
        return { success: false, error: 'A farmer with this name already exists.' };
      }

      const newFarmer: Farmer = {
        ...farmer,
        id: `farmer-${Date.now()}`,
        joinedDate: new Date().toISOString().split('T')[0],
        innovations: [],
        totalLikes: 0,
      };
      setFarmers((prev) => {
        const updated = [...prev, newFarmer];
        const seedIds = new Set((farmersData as Farmer[]).map((f) => f.id));
        const extras = updated.filter((f) => !seedIds.has(f.id));
        try {
          localStorage.setItem('rih_farmers', JSON.stringify(extras));
        } catch {}
        return updated;
      });

      // Record submission timestamp
      try {
        const stored = localStorage.getItem('rih_last_submit');
        const stamps: Record<string, number> = stored ? JSON.parse(stored) : {};
        localStorage.setItem('rih_last_submit', JSON.stringify({ ...stamps, farmer: Date.now() }));
      } catch {}

      return { success: true };
    },
    [farmers]
  );

  const getInnovationComments = useCallback(
    (innovationId: string) => comments.filter((c) => c.innovationId === innovationId),
    [comments]
  );

  const getFarmerById = useCallback(
    (farmerId: string) => farmers.find((f) => f.id === farmerId),
    [farmers]
  );

  const getInnovationById = useCallback(
    (innovationId: string) => innovations.find((i) => i.id === innovationId),
    [innovations]
  );

  const getFarmerInnovations = useCallback(
    (farmerId: string) => innovations.filter((i) => i.farmerId === farmerId),
    [innovations]
  );

  const getLikeCount = useCallback(
    (innovationId: string) => {
      const base = innovations.find((i) => i.id === innovationId)?.likes ?? 0;
      const delta = likeDeltas[innovationId] ?? 0;
      return Math.max(0, base + delta);
    },
    [innovations, likeDeltas]
  );

  const isLiked = useCallback(
    (innovationId: string) => likedInnovations.includes(innovationId),
    [likedInnovations]
  );

  const addToCart = useCallback((innovationId: string) => {
    setCart((prev) => {
      if (prev.includes(innovationId)) return prev;
      const updated = [...prev, innovationId];
      try { localStorage.setItem('rih_cart', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((innovationId: string) => {
    setCart((prev) => {
      const updated = prev.filter((id) => id !== innovationId);
      try { localStorage.setItem('rih_cart', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try { localStorage.removeItem('rih_cart'); } catch {}
  }, []);

  const isInCart = useCallback(
    (innovationId: string) => cart.includes(innovationId),
    [cart]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        isLoaded,
        setUser,
        signOut,
        farmers,
        innovations,
        comments,
        likedInnovations,
        toggleLike,
        addComment,
        addInnovation,
        addFarmer,
        getInnovationComments,
        getFarmerById,
        getInnovationById,
        getFarmerInnovations,
        getLikeCount,
        isLiked,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
