// contexts/booking-selection-context.tsx
'use client';
import { SeatStatus } from '#/services/trip/trips-request';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

export interface PassengerInfo {
  fullname: string;
  email: string;
  phoneNumber: string;
  note?: string;
}

export interface SelectedSeat {
  id: string;
  number: string;
  price?: number;
  deckId: string;
  rowId: string;
  status?: SeatStatus;
}

interface BookingSelectionContextType {
  selectedSeats: SelectedSeat[];
  selectedPickingId: string | null;
  selectedDropingId: string | null;
  isSubmit: boolean;
  totalPrice: number;
  savedTotalPrice: number | null;
  unavailableSeats: string[]; // Danh sách ghế đã bị book bởi người khác
  passengerInfo: PassengerInfo | null;
  setPassengerInfo: (info: PassengerInfo) => void;
  setIsSubmit: (value: boolean) => void;
  selectSeat: (seat: SelectedSeat) => void;
  deselectSeat: (seatNumber: string) => void;
  isSeatSelected: (seatNumber: string) => boolean;
  clearSelectedSeats: () => void;
  setSelectedPickingId: (id: string) => void;
  setSelectedDropingId: (id: string) => void;
  saveTotalPrice: () => void;
  markSeatAsUnavailable: (seatNumber: string) => void;
  validateSelectedSeats: () => {
    isValid: boolean;
    unavailableSeats: string[];
  };
  getAvailableSeats: () => SelectedSeat[];
  getTotalPriceForAvailableSeats: () => number;
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
  const [unavailableSeats, setUnavailableSeats] = useState<string[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo | null>(
    null,
  );

  // Tính tổng tiền cho tất cả ghế đã chọn
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => {
      if (seat && seat.price) {
        return total + seat.price;
      }
      return 0;
    }, 0);
  }, [selectedSeats]);

  // Lấy danh sách ghế còn available (chưa bị book bởi người khác)
  const getAvailableSeats = useCallback(() => {
    return selectedSeats.filter(
      seat => !unavailableSeats.includes(seat.number),
    );
  }, [selectedSeats, unavailableSeats]);

  // Tính tổng tiền cho ghế còn available
  const getTotalPriceForAvailableSeats = useCallback(() => {
    return getAvailableSeats().reduce((total, seat) => {
      if (seat && seat.price) {
        return total + seat.price;
      }
      return 0;
    }, 0);
  }, [getAvailableSeats]);

  // Đánh dấu ghế là không available
  const markSeatAsUnavailable = useCallback((seatNumber: string) => {
    setUnavailableSeats(prev => {
      if (!prev.includes(seatNumber)) {
        return [...prev, seatNumber];
      }
      return prev;
    });
  }, []);

  // Validate ghế đã chọn trước khi submit
  const validateSelectedSeats = useCallback(() => {
    const conflictSeats = selectedSeats.filter(seat =>
      unavailableSeats.includes(seat.number),
    );

    return {
      isValid: conflictSeats.length === 0,
      unavailableSeats: conflictSeats.map(seat => seat.number),
    };
  }, [selectedSeats, unavailableSeats]);

  const selectSeat = (seat: SelectedSeat) => {
    setSelectedSeats(prev => {
      const isAlreadySelected = prev.some(s => s.number === seat.number);
      return isAlreadySelected
        ? prev.filter(s => s.number !== seat.number)
        : [
            ...prev,
            {
              id: seat.id,
              number: seat.number,
              price: seat.price,
              deckId: seat.deckId,
              rowId: seat.rowId,
              status: seat.status,
            },
          ];
    });
  };

  const deselectSeat = (seatNumber: string) => {
    setSelectedSeats(prev => prev.filter(seat => seat.number !== seatNumber));
    // Xóa khỏi danh sách unavailable nếu có
    setUnavailableSeats(prev => prev.filter(seat => seat !== seatNumber));
  };

  const isSeatSelected = (seatNumber: string) =>
    selectedSeats.some(seat => seat.number === seatNumber);

  const saveTotalPrice = () => {
    setSavedTotalPrice(totalPrice);
  };

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
    setUnavailableSeats([]);
  };

  return (
    <BookingSelectionContext.Provider
      value={{
        totalPrice,
        savedTotalPrice,
        selectedSeats,
        selectedPickingId,
        selectedDropingId,
        isSubmit,
        unavailableSeats,
        passengerInfo,
        setPassengerInfo,
        setIsSubmit,
        selectSeat,
        deselectSeat,
        isSeatSelected,
        clearSelectedSeats,
        setSelectedPickingId,
        setSelectedDropingId,
        saveTotalPrice,
        markSeatAsUnavailable,
        validateSelectedSeats,
        getAvailableSeats,
        getTotalPriceForAvailableSeats,
      }}
    >
      {children}
    </BookingSelectionContext.Provider>
  );
};
