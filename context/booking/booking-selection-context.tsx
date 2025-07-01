// contexts/booking-selection-context.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

export interface SelectedSeat {
  number: string;
  price?: number;
  deckId: string;
  rowId: string;
}

interface BookingSelectionContextType {
  selectedSeats: SelectedSeat[];
  selectedPickingId: string | null;
  selectedDropingId: string | null;
  isSubmit: boolean;
  totalPrice: number;
  savedTotalPrice: number | null;
  setIsSubmit: (value: boolean) => void;
  selectSeat: (seat: SelectedSeat) => void;
  deselectSeat: (seatNumber: string) => void;
  isSeatSelected: (seatNumber: string) => boolean;
  clearSelectedSeats: () => void;
  setSelectedPickingId: (id: string) => void;
  setSelectedDropingId: (id: string) => void;
  saveTotalPrice: () => void;
}

const BookingSelectionContext = createContext<
  BookingSelectionContextType | undefined
>(undefined);

export const useBookingSelection = () => {
  const context = useContext(BookingSelectionContext);
  if (!context) {
    throw new Error(
      'useBookingSelection must be used within a BookingSelectionProvider',
    );
  }
  return context;
};

export const BookingSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [selectedPickingId, setSelectedPickingId] = useState<string | null>(
    null,
  );
  const [selectedDropingId, setSelectedDropingId] = useState<string | null>(
    null,
  );
  const [savedTotalPrice, setSavedTotalPrice] = useState<number | null>(null);
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => {
      if (seat && seat.price) {
        return total + seat.price;
      }
      return 0;
    }, 0);
  }, [selectedSeats]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const selectSeat = (seat: SelectedSeat) => {
    setSelectedSeats(prev => {
      const isAlreadySelected = prev.some(s => s.number === seat.number);
      return isAlreadySelected
        ? prev.filter(s => s.number !== seat.number)
        : [...prev, seat];
    });
  };

  const deselectSeat = (seatNumber: string) => {
    setSelectedSeats(prev => prev.filter(seat => seat.number !== seatNumber));
  };

  const isSeatSelected = (seatNumber: string) =>
    selectedSeats.some(seat => seat.number === seatNumber);

  const saveTotalPrice = () => {
    setSavedTotalPrice(totalPrice);
  };

  const clearSelectedSeats = () => setSelectedSeats([]);

  return (
    <BookingSelectionContext.Provider
      value={{
        totalPrice,
        savedTotalPrice,
        selectedSeats,
        selectedPickingId,
        selectedDropingId,
        isSubmit,
        setIsSubmit,
        selectSeat,
        deselectSeat,
        isSeatSelected,
        clearSelectedSeats,
        setSelectedPickingId,
        setSelectedDropingId,
        saveTotalPrice,
      }}
    >
      {children}
    </BookingSelectionContext.Provider>
  );
};
