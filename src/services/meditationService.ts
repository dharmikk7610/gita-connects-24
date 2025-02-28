
import { 
  db, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "@/lib/firebase";
import { User } from "firebase/auth";

// Types
export interface MeditationJourney {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  imageUrl: string;
  bgColor: string;
  category: string;
  featured: boolean;
}

export interface ScheduleItem {
  id: string;
  day: string;
  practice: string;
  time: string;
  duration: number;
  userId: string;
}

// Firebase collection names
const COLLECTIONS = {
  JOURNEYS: "meditation_journeys",
  SCHEDULES: "meditation_schedules",
  USER_STATS: "user_stats"
};

// Get all meditation journeys
export const getAllJourneys = async (): Promise<MeditationJourney[]> => {
  try {
    const journeysCollection = collection(db, COLLECTIONS.JOURNEYS);
    const journeysSnapshot = await getDocs(journeysCollection);
    
    const journeys: MeditationJourney[] = [];
    journeysSnapshot.forEach(doc => {
      journeys.push({ id: doc.id, ...doc.data() } as MeditationJourney);
    });
    
    return journeys;
  } catch (error) {
    console.error("Error fetching meditation journeys:", error);
    throw error;
  }
};

// Get meditation journeys by category
export const getJourneysByCategory = async (category: string): Promise<MeditationJourney[]> => {
  try {
    const journeysCollection = collection(db, COLLECTIONS.JOURNEYS);
    const categoryQuery = query(journeysCollection, where("category", "==", category));
    const journeysSnapshot = await getDocs(categoryQuery);
    
    const journeys: MeditationJourney[] = [];
    journeysSnapshot.forEach(doc => {
      journeys.push({ id: doc.id, ...doc.data() } as MeditationJourney);
    });
    
    return journeys;
  } catch (error) {
    console.error("Error fetching meditation journeys by category:", error);
    throw error;
  }
};

// Get featured meditation journeys
export const getFeaturedJourneys = async (): Promise<MeditationJourney[]> => {
  try {
    const journeysCollection = collection(db, COLLECTIONS.JOURNEYS);
    const featuredQuery = query(journeysCollection, where("featured", "==", true));
    const journeysSnapshot = await getDocs(featuredQuery);
    
    const journeys: MeditationJourney[] = [];
    journeysSnapshot.forEach(doc => {
      journeys.push({ id: doc.id, ...doc.data() } as MeditationJourney);
    });
    
    return journeys;
  } catch (error) {
    console.error("Error fetching featured meditation journeys:", error);
    throw error;
  }
};

// Get user's meditation schedule
export const getUserSchedule = async (userId: string): Promise<ScheduleItem[]> => {
  try {
    const schedulesCollection = collection(db, COLLECTIONS.SCHEDULES);
    const userScheduleQuery = query(schedulesCollection, where("userId", "==", userId));
    const scheduleSnapshot = await getDocs(userScheduleQuery);
    
    const scheduleItems: ScheduleItem[] = [];
    scheduleSnapshot.forEach(doc => {
      scheduleItems.push({ id: doc.id, ...doc.data() } as ScheduleItem);
    });
    
    return scheduleItems;
  } catch (error) {
    console.error("Error fetching user schedule:", error);
    throw error;
  }
};

// Add a new schedule item
export const addScheduleItem = async (
  userId: string, 
  scheduleItem: Omit<ScheduleItem, "id" | "userId">
): Promise<ScheduleItem> => {
  try {
    const schedulesCollection = collection(db, COLLECTIONS.SCHEDULES);
    const newItemData = { ...scheduleItem, userId };
    
    const docRef = await addDoc(schedulesCollection, newItemData);
    
    return {
      id: docRef.id,
      ...newItemData,
    } as ScheduleItem;
  } catch (error) {
    console.error("Error adding schedule item:", error);
    throw error;
  }
};

// Update a schedule item
export const updateScheduleItem = async (
  scheduleItem: ScheduleItem
): Promise<void> => {
  try {
    const scheduleDocRef = doc(db, COLLECTIONS.SCHEDULES, scheduleItem.id);
    await updateDoc(scheduleDocRef, { ...scheduleItem });
  } catch (error) {
    console.error("Error updating schedule item:", error);
    throw error;
  }
};

// Delete a schedule item
export const deleteScheduleItem = async (scheduleItemId: string): Promise<void> => {
  try {
    const scheduleDocRef = doc(db, COLLECTIONS.SCHEDULES, scheduleItemId);
    await deleteDoc(scheduleDocRef);
  } catch (error) {
    console.error("Error deleting schedule item:", error);
    throw error;
  }
};

// Initialize the database with sample meditation journeys
export const initializeMeditationDatabase = async (): Promise<void> => {
  try {
    const journeysCollection = collection(db, COLLECTIONS.JOURNEYS);
    const journeysSnapshot = await getDocs(journeysCollection);
    
    // Only initialize if the collection is empty
    if (journeysSnapshot.empty) {
      const sampleJourneys = [
        {
          title: "Chakra Healing",
          description: "Align and balance your seven chakras through guided visualization and energy work.",
          duration: 20,
          level: "All Levels",
          imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
          bgColor: "from-purple-500 to-indigo-600",
          category: "energy",
          featured: true
        },
        {
          title: "Astral Travel",
          description: "Experience a guided journey beyond the physical realm into the astral plane.",
          duration: 30,
          level: "Intermediate",
          imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&q=80",
          bgColor: "from-blue-500 to-purple-600",
          category: "advanced",
          featured: false
        },
        {
          title: "Gita Reflections",
          description: "Deep contemplation on key verses from the Bhagavad Gita for spiritual insight.",
          duration: 25,
          level: "All Levels",
          imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&q=80", 
          bgColor: "from-gold-400 to-amber-600",
          category: "scripture",
          featured: true
        },
        {
          title: "Inner Peace Sanctuary",
          description: "Find refuge in a tranquil mental sanctuary cultivated through focused breathing and visualization.",
          duration: 15,
          level: "Beginner",
          imageUrl: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=500&q=80",
          bgColor: "from-green-400 to-teal-500",
          category: "beginner",
          featured: false
        },
        {
          title: "Cosmic Connection",
          description: "Connect with universal consciousness and explore your place in the cosmic web of existence.",
          duration: 35,
          level: "Advanced",
          imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
          bgColor: "from-deepBlue-500 to-indigo-700",
          category: "advanced",
          featured: true
        },
        {
          title: "Divine Love Meditation",
          description: "Open your heart to universal love and compassion through bhakti-inspired meditation.",
          duration: 20,
          level: "All Levels",
          imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&q=80",
          bgColor: "from-pink-400 to-rose-600",
          category: "devotional",
          featured: false
        },
        {
          title: "Sacred Sound Healing",
          description: "Harness the vibrational power of mantras and primordial sounds to harmonize your energy field.",
          duration: 25,
          level: "All Levels",
          imageUrl: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=500&q=80",
          bgColor: "from-amber-400 to-orange-600",
          category: "energy",
          featured: false
        },
        {
          title: "Krishna Consciousness",
          description: "Connect with the divine presence of Lord Krishna through devotional visualization.",
          duration: 30,
          level: "All Levels",
          imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500&q=80",
          bgColor: "from-blue-400 to-blue-600",
          category: "devotional",
          featured: true
        },
        {
          title: "Mindful Awareness",
          description: "Develop presence and clarity through simple but powerful mindfulness techniques.",
          duration: 10,
          level: "Beginner",
          imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&q=80",
          bgColor: "from-yellow-400 to-amber-500",
          category: "beginner",
          featured: false
        },
      ];
      
      // Add each journey to Firestore
      for (const journey of sampleJourneys) {
        await addDoc(journeysCollection, journey);
      }
      
      console.log("Sample meditation journeys have been added to Firestore");
    }
  } catch (error) {
    console.error("Error initializing meditation database:", error);
    throw error;
  }
};
