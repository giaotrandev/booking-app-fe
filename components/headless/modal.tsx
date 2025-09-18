'use client';
import {
  CSSProperties,
  Dispatch,
  ElementType,
  RefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  useEventListener,
  useIsClient,
  useOnClickOutside,
  useScrollLock,
} from 'usehooks-ts';

const TRANSITION_DURATION_DEFAULT = 10;

interface StyleAndClassNameProps {
  className?: string | null;
  style?: CSSProperties | null;
}

interface TransitionProps {
  enter?: StyleAndClassNameProps;
  leave?: StyleAndClassNameProps;
}

interface CommonProps extends StyleAndClassNameProps {
  as?: ElementType;
}

const handleAnimate = (
  ref: RefObject<HTMLElement | null>,
  transition?: {
    remove?: StyleAndClassNameProps;
    add?: StyleAndClassNameProps;
  },
) => {
  if (ref.current) {
    const { remove, add } = transition ?? {};
    const removeClassList = remove?.className
      ? remove.className.split(' ')
      : [];
    const addClassList = add?.className ? add.className.split(' ') : [];
    ref.current.classList.remove(...removeClassList);
    ref.current.classList.add(...addClassList);
    const removeStyle = remove?.style ?? {};
    const addStyle = add?.style ?? {};
    Object.assign(ref.current.style, removeStyle);
    Object.assign(ref.current.style, addStyle);
  }
};

const getTransitionDuration = (ref: RefObject<HTMLElement | null>) => {
  if (typeof window !== 'undefined') {
    const panel = ref.current?.querySelector('.panel');
    const backdrop = ref.current?.querySelector('.backdrop');
    if (ref.current && panel && backdrop) {
      const panelDuration =
        parseFloat(window.getComputedStyle(panel).transitionDuration) * 1000;
      const backdropDuration =
        parseFloat(window.getComputedStyle(backdrop).transitionDuration) * 1000;

      return Math.max(backdropDuration, panelDuration);
    }
  }
  return 0;
};

interface ContextModalProps {
  open: boolean;
  isOpened?: boolean;
  onClose: () => void;
  clickOutsideToClose?: boolean;
  transitionDurationBackdrop: number;
  setTransitionDurationBackdrop?: Dispatch<SetStateAction<number>>;
  transitionDurationPanel: number;
  setTransitionDurationPanel?: Dispatch<SetStateAction<number>>;
}

const ContextModal = createContext<ContextModalProps>({
  open: false,
  isOpened: false,
  onClose: () => {},
  clickOutsideToClose: true,
  transitionDurationBackdrop: TRANSITION_DURATION_DEFAULT,
  transitionDurationPanel: TRANSITION_DURATION_DEFAULT,
});

interface ModalProps extends CommonProps {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  clickOutsideToClose?: boolean;
  container?: Element | DocumentFragment;
  id?: string | null | undefined;
}

const HeadlessModal = ({
  children,
  as = 'div',
  className = null,
  style = null,
  open,
  onClose,
  clickOutsideToClose = true,
  container,
  id,
}: ModalProps) => {
  const [isOpened, setIsOpened] = useState(open);
  const [transitionDurationBackdrop, setTransitionDurationBackdrop] = useState(
    TRANSITION_DURATION_DEFAULT,
  );
  const [transitionDurationPanel, setTransitionDurationPanel] = useState(
    TRANSITION_DURATION_DEFAULT,
  );

  const isClient = useIsClient();
  const ref = useRef<HTMLElement | null>(null);

  useScrollLock({
    autoLock: open,
    lockTarget: 'body',
  });

  const firstOpen = useRef(open);

  useEffect(() => {
    if (isClient) {
      if (open) {
        const el = ref.current;
        if (el) {
          setIsOpened(true);
          el.style.zIndex = '';
        }
      } else {
        const el = ref.current;
        if (el) {
          const timeout = setTimeout(() => {
            setIsOpened(false);
            el.style.zIndex = '-1';
          }, getTransitionDuration(ref));
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [isClient, open, transitionDurationBackdrop, transitionDurationPanel]);

  useEventListener('keydown', event => {
    if (event.defaultPrevented) return;
    if (event.key === 'Escape' || event.key === 'Esc') {
      onClose();
    }
  });

  const firstStyle: CSSProperties | null = firstOpen.current
    ? null
    : { zIndex: -1 };

  const As = as;

  return isClient
    ? createPortal(
        <ContextModal.Provider
          value={{
            open,
            isOpened,
            onClose,
            clickOutsideToClose,
            transitionDurationBackdrop,
            setTransitionDurationBackdrop,
            transitionDurationPanel,
            setTransitionDurationPanel,
          }}
        >
          <As
            ref={ref}
            className={className ?? ''}
            style={{ ...style, ...firstStyle }}
          >
            {children}
          </As>
        </ContextModal.Provider>,
        container ?? document.body,
        id,
      )
    : null;
};

interface BackdropProps extends CommonProps, TransitionProps {
  children?: ReactNode;
}

const Backdrop = ({
  children,
  as = 'div',
  className = null,
  style = null,
  enter = {},
  leave = {},
}: BackdropProps) => {
  const { open } = useContext(ContextModal);
  const isClient = useIsClient();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isClient) {
      if (open) {
        const timeout = setTimeout(() => {
          handleAnimate(ref, { remove: leave, add: enter });
        }, TRANSITION_DURATION_DEFAULT);
        return () => clearTimeout(timeout);
      } else {
        handleAnimate(ref, { remove: enter, add: leave });
      }
    }
  }, [isClient, open, enter, leave]);

  const As = as;
  return isClient ? (
    <As ref={ref} className={`backdrop ${className ?? ''}`} style={style ?? {}}>
      {children}
    </As>
  ) : null;
};

interface PanelProps extends CommonProps, TransitionProps {
  children: ({ isOpened }: { isOpened?: boolean }) => ReactNode;
}

const Panel = ({
  children,
  as = 'div',
  className = null,
  style = null,
  enter = {},
  leave = {},
}: PanelProps) => {
  const { open, isOpened, onClose, clickOutsideToClose } =
    useContext(ContextModal);

  const isClient = useIsClient();
  const ref = useRef<HTMLElement | null>(null);

  // @ts-ignore
  useOnClickOutside(ref, clickOutsideToClose ? onClose : () => {});

  useEffect(() => {
    if (isClient) {
      if (open) {
        const timeout = setTimeout(() => {
          handleAnimate(ref, { remove: leave, add: enter });
        }, TRANSITION_DURATION_DEFAULT);
        return () => clearTimeout(timeout);
      } else {
        handleAnimate(ref, { remove: enter, add: leave });
      }
    }
  }, [isClient, open, enter, leave]);

  const As = as;
  return isClient ? (
    <As ref={ref} className={`panel ${className ?? ''}`} style={style ?? {}}>
      {children({ isOpened })}
    </As>
  ) : null;
};

export const Modal = Object.assign(HeadlessModal, {
  Backdrop,
  Panel,
});
