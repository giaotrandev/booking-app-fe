import * as React from 'react';
import { create } from 'zustand';
import { cn } from '#/lib/utilities/cn';
import { Toast } from './toast';
import { toastVariants } from './toast'; // hoặc đúng đường dẫn
import { VariantProps } from 'class-variance-authority';

type ToastVariant = VariantProps<typeof toastVariants>['variant'];
type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  action?: React.ReactNode;
};

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string; // trả về id
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  addToast: toast => {
    const id = crypto.randomUUID();
    const newToast = { id, ...toast };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    return id;
  },
  removeToast: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    })),
}));

export function useToast() {
  const addToast = useToastStore(state => state.addToast);
  return {
    toast: addToast,
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toasts = useToastStore(state => state.toasts);
  const removeToast = useToastStore(state => state.removeToast);

  const [closingToastIds, setClosingToastIds] = React.useState<Set<string>>(
    new Set(),
  );

  // Ref để lưu timeout id đếm 3s ẩn toast
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Hàm đóng toast có animation rồi mới remove
  const handleClose = React.useCallback(
    (id: string) => {
      // Nếu có timer đếm 3s đang chạy thì clear nó
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // Đánh dấu toast này đang đóng để trigger animation
      setClosingToastIds(prev => new Set(prev).add(id));

      // Sau 300ms animation thì remove toast thực sự
      setTimeout(() => {
        removeToast(id);
        setClosingToastIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 300);
    },
    [removeToast],
  );

  React.useEffect(() => {
    // Nếu không có toast nào hoặc đang đóng toast nào thì không set timeout
    if (toasts.length === 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (closingToastIds.size > 0) {
      // Đang có toast đóng animation, đợi animation xong sẽ xử lý tiếp
      return;
    }

    // Chỉ đếm thời gian ẩn cho toast đầu tiên trong danh sách (theo thứ tự xuất hiện)
    const firstToast = toasts[0];

    // Bắt đầu đếm 3s rồi ẩn toast đầu tiên
    timerRef.current = setTimeout(() => {
      handleClose(firstToast.id);
      timerRef.current = null;
    }, 3000);

    // Cleanup khi unmount hoặc deps thay đổi
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [toasts, closingToastIds, handleClose]);

  return (
    <>
      {children}
      <div className="fixed right-4 bottom-4 z-[99999] max-w-80 space-y-3">
        {toasts.map(toast => {
          const isClosing = closingToastIds.has(toast.id);
          return (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              description={toast.description}
              action={toast.action}
              onClose={() => handleClose(toast.id)}
              className={cn(
                'transition-[opacity,transform]',
                isClosing
                  ? 'animate-fade-out translate-y-2 opacity-0'
                  : 'animate-fade-in translate-y-0 opacity-100',
              )}
            />
          );
        })}
      </div>
    </>
  );
}

{
  /* <div className="fixed right-4 bottom-4 z-[1000] space-y-2">
        {toasts.map(toast => {
          const isClosing = closingToastIds.has(toast.id);
          return (
            <div
              key={toast.id}
              className={cn(
                'rounded border bg-white px-4 py-3 shadow transition-[opacity,transform]',
                isClosing
                  ? 'animate-fade-out translate-y-2 opacity-0'
                  : 'animate-fade-in translate-y-0 opacity-100',
              )}
            >
              {toast.title && (
                <Typography asChild className="font-semibold">
                  <p>{toast.title}</p>
                </Typography>
              )}
              {toast.description && (
                <Typography
                  asChild
                  className="text-pj-gray-light"
                  variant="sub-body"
                >
                  <p>{toast.description}</p>
                </Typography>
              )}
              <button
                onClick={() => handleClose(toast.id)}
                className="mt-2 cursor-pointer"
              >
                <Typography asChild className="text-pj-red" variant="sub-body">
                  <p>Close</p>
                </Typography>
              </button>
            </div>
          );
        })}
      </div> */
}
