// contexts/booking-selection-context.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SelectedSeat {
  number: string;
  price?: string;
  deckId: string;
  rowId: string;
}

interface BookingSelectionContextType {
  selectedSeats: SelectedSeat[];
  selectedPickingId: string | null;
  selectedDropingId: string | null;
  isSubmit: boolean;
  setIsSubmit: (value: boolean) => void;
  selectSeat: (seat: SelectedSeat) => void;
  deselectSeat: (seatNumber: string) => void;
  isSeatSelected: (seatNumber: string) => boolean;
  clearSelectedSeats: () => void;
  setSelectedPickingId: (id: string) => void;
  setSelectedDropingId: (id: string) => void;
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

  const clearSelectedSeats = () => setSelectedSeats([]);

  return (
    <BookingSelectionContext.Provider
      value={{
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
      }}
    >
      {children}
    </BookingSelectionContext.Provider>
  );
};
