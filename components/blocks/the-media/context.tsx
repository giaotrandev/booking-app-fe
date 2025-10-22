'use client';
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';
import { TheMediaProps } from '.';
import { TheMediaOptionsProps, VideoInformationProps } from '#/types/global';
// import { TheMediaProps } from '.';

type TheMediaStateProps = {
  platform?: VideoInformationProps['platform'];
  playerRef?: RefObject<ReactPlayer | null>;
  isRendered?: boolean;
  isReady?: boolean;
  videoWidth: number;
  videoHeight: number;
  isLoaded?: boolean;
  isStart?: boolean;
  isPlaying?: boolean;
  isMuted?: boolean;
  duration: number;
  loaded: number;
  currentTime: number;
  isSeeking?: boolean;
  volume: number;
  showingControls?: boolean;
  interactingControls?: boolean;
  breakpoints?: TheMediaOptionsProps['breakpoints'];
  defaultAspectRatio?: Exclude<TheMediaOptionsProps['aspectRatio'], 'auto'>;
};

type TheMediaActionsProps = {
  setIsRendered: (payload: TheMediaStateProps['isRendered']) => void;
  setIsReady: (payload: TheMediaStateProps['isReady']) => void;
  setVideoWidth: (payload: TheMediaStateProps['videoWidth']) => void;
  setVideoHeight: (payload: TheMediaStateProps['videoHeight']) => void;
  setIsLoaded: (payload: TheMediaStateProps['isLoaded']) => void;
  setIsStart: (payload: TheMediaStateProps['isStart']) => void;
  setIsPlaying: (payload: TheMediaStateProps['isPlaying']) => void;
  setIsMuted: (payload: TheMediaStateProps['isMuted']) => void;
  setDuration: (payload: TheMediaStateProps['duration']) => void;
  setLoaded: (payload: TheMediaStateProps['loaded']) => void;
  setCurrentTime: (payload: TheMediaStateProps['currentTime']) => void;
  setIsSeeking: (payload: TheMediaStateProps['isSeeking']) => void;
  setVolume: (payload: TheMediaStateProps['volume']) => void;
  setShowingControls: (payload: TheMediaStateProps['showingControls']) => void;
  setInteractingControls: (
    payload: TheMediaStateProps['interactingControls'],
  ) => void;
  setBreakpoints: (payload: TheMediaStateProps['breakpoints']) => void;
  setDefaultAspectRatio: (
    payload: TheMediaStateProps['defaultAspectRatio'],
  ) => void;
};

export type TheMediaContextProps = TheMediaStateProps & TheMediaActionsProps;

const initialTheMediaState: TheMediaStateProps = {
  isRendered: false,
  isReady: false,
  videoWidth: 0,
  videoHeight: 0,
  isLoaded: false,
  isStart: false,
  isPlaying: false,
  isMuted: false,
  duration: 0,
  loaded: 0,
  currentTime: 0,
  isSeeking: false,
  volume: 1, // TODO: Make volume control +/-
  showingControls: false,
  interactingControls: false,
  breakpoints: undefined,
  defaultAspectRatio: undefined,
};

const TheMediaContext = createContext<TheMediaContextProps | undefined>(
  undefined,
);

interface TheMediaContextProviderProps
  extends PropsWithChildren,
    TheMediaProps {}

const TheMediaContextProvider = (props: TheMediaContextProviderProps) => {
  const playerRef = useRef(null);
  const [isRendered, setIsRendered] = useState(initialTheMediaState.isRendered);
  const [isReady, setIsReady] = useState(initialTheMediaState.isReady);
  const [videoWidth, setVideoWidth] = useState(
    props.video?.width || initialTheMediaState.videoWidth,
  );
  const [videoHeight, setVideoHeight] = useState(
    props.video?.height || initialTheMediaState.videoHeight,
  );
  const [isLoaded, setIsLoaded] = useState(initialTheMediaState.isLoaded);
  const [isStart, setIsStart] = useState(initialTheMediaState.isStart);
  const hasIsPlaying = props.isPlaying !== undefined;
  const [internalIsPlaying, setInternalIsPlaying] = useState(
    props.options?.autoplay || initialTheMediaState.isPlaying,
  );
  const isPlaying = hasIsPlaying ? props.isPlaying : internalIsPlaying;
  const setIsPlaying = (isPlaying: TheMediaStateProps['isPlaying']) => {
    if (hasIsPlaying) {
      props.setIsPlaying?.(isPlaying);
    } else {
      setInternalIsPlaying(isPlaying);
    }
  };
  const hasIsMuted = props.isMuted !== undefined;
  const [internalIsMuted, setInternalIsMuted] = useState(
    props.options?.autoplay ||
      props.options?.muted ||
      initialTheMediaState.isMuted,
  );
  const isMuted = hasIsMuted ? props.isMuted : internalIsMuted;
  const setIsMuted = (isMuted: TheMediaStateProps['isMuted']) => {
    if (hasIsMuted) {
      props.setIsMuted?.(isMuted);
    } else {
      setInternalIsMuted(isMuted);
    }
  };
  const [duration, setDuration] = useState(initialTheMediaState.duration);
  const [loaded, setLoaded] = useState(initialTheMediaState.loaded);
  const [currentTime, setCurrentTime] = useState(
    props.startAt || initialTheMediaState.currentTime,
  );
  const [isSeeking, setIsSeeking] = useState(initialTheMediaState.isSeeking);
  const [volume, setVolume] = useState(
    props.options?.volume || initialTheMediaState.volume,
  );
  const [showingControls, setShowingControls] = useState(
    initialTheMediaState.showingControls,
  );
  const [interactingControls, setInteractingControls] = useState(
    initialTheMediaState.interactingControls,
  );
  const [breakpoints, setBreakpoints] = useState(
    initialTheMediaState.breakpoints,
  );
  const [defaultAspectRatio, setDefaultAspectRatio] = useState(
    initialTheMediaState.defaultAspectRatio,
  );
  const value: TheMediaContextProps = {
    platform: props.video?.platform,
    playerRef,
    isRendered,
    isReady,
    videoWidth,
    videoHeight,
    isLoaded,
    isStart,
    isPlaying,
    isMuted,
    duration,
    loaded,
    currentTime,
    isSeeking,
    volume,
    showingControls,
    interactingControls,
    breakpoints,
    defaultAspectRatio,
    setIsRendered,
    setIsReady,
    setVideoWidth,
    setVideoHeight,
    setIsLoaded,
    setIsStart,
    setIsPlaying,
    setIsMuted,
    setDuration,
    setLoaded,
    setCurrentTime,
    setIsSeeking,
    setVolume,
    setShowingControls,
    setInteractingControls,
    setBreakpoints,
    setDefaultAspectRatio,
  };
  return (
    <TheMediaContext.Provider value={value}>
      {props.children}
    </TheMediaContext.Provider>
  );
};

const useTheMediaContext = (): TheMediaContextProps => {
  const context = useContext(TheMediaContext);
  if (!context) {
    throw new Error('useTheMedia must be used within a TheMediaProvider');
  }
  return context;
};

export { TheMediaContextProvider, useTheMediaContext };
