import toast from "react-hot-toast";
import { create } from "zustand";

interface ForecastItem {
  posItemId: string;
  posItemName: string;
  forecastedQuantity: number;
  unit?: string;
  forecastId?: string;
  forecastGeneratedAt?: string;
  dayPart?: string;
}

interface ForecastState {
  modifiedBy: string;
  date: string;
  forecasts: Record<string, ForecastItem[]>;
  refreshTrigger: number;
  updateItem: (dayPart: string, item: ForecastItem) => void;
  approveForecasts: () => Promise<void>;
  triggerRefresh: () => void;
  setModifiedBy: (name: string) => void;
}

interface DayCountState {
  dayCount: string;
  setDayCount: (value: string) => void;
}

export const useDayCountStore = create<DayCountState>((set) => ({
  dayCount: "Daily Count",
  setDayCount: (value) => set({ dayCount: value }),
}));

interface InsightsState {
  insightsState: string;
  setInsightsState: (value: string) => void;
}

export const useInsightsStore = create<InsightsState>((set) => ({
  insightsState: "Yesterday",
  setInsightsState: (value) => set({ insightsState: value }),
}));

interface ForecastStatusState {
  forecastState: string;
  setForecastState: (value: string) => void;
}

export const useForecastStatusStore = create<ForecastStatusState>((set) => ({
  forecastState: "modify",
  setForecastState: (value) => set({ forecastState: value }),
}));

interface StatusState {
  status: string;
  setStatus: (value: string) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  status: "modify",
  setStatus: (value) => set({ status: value }),
}));

export const useForecastStore = create<ForecastState>((set, get) => ({
  modifiedBy: "unknown",
  // date: new Date().toISOString().split("T")[0],
  date: "2025-08-06",
  forecasts: {},
  refreshTrigger: 0,

  updateItem: (dayPart, item) =>
    set((state) => {
      const dayItems = state.forecasts[dayPart] || [];
      const updatedItems = dayItems.filter(
        (i) => i.posItemId !== item.posItemId
      );
      updatedItems.push(item);
      return {
        forecasts: {
          ...state.forecasts,
          [dayPart]: updatedItems,
        },
      };
    }),

  approveForecasts: async () => {
    const { date, modifiedBy, forecasts } = get();

    const body = {
      date,
      modifiedBy,
      forecasts: Object.keys(forecasts).map((dayPart) => ({
        dayPart,
        items: forecasts[dayPart],
      })),
    };

    try {
      const res = await fetch(
        "https://qb4rj4gqfe.execute-api.us-east-1.amazonaws.com/prod/approved-forecast",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      toast.success("Approved successfully");

      set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }));
    } catch (err) {
      console.error("Error approving:", err);
    }
  },

  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),

  setModifiedBy: (name: string) => set({ modifiedBy: name }),
}));

interface RefreshStore {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
