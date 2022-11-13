import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { StyleState, StyleContextProviderType } from "./types";
import { comparatorFunction, getMediaType } from "./media";
// @ts-ignore
import { ThemeProvider } from "@xstyled/styled-components";
import { theme } from "./theme";
import { usePrevious } from "../utils/usePrevious";

const defaultMediaType = getMediaType();

const DEFAULT_STYLE = {
  mediaType: defaultMediaType,
} as StyleState;

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const useMediaType = () => {
  const [mediaType, setMediaType] = useState(defaultMediaType);
  const [width] = useWindowSize();
  const prevWidth = usePrevious(width);
  useEffect(() => {
    if (width !== prevWidth) {
      const currentMediaType = getMediaType();
      if (!comparatorFunction(currentMediaType, mediaType)) {
        setMediaType(currentMediaType);
      }
    }
  }, [width, prevWidth, setMediaType, mediaType]);
  return mediaType;
};

const StyleContext = createContext([
  DEFAULT_STYLE,
  null as any,
] as StyleContextProviderType);

const useStyleContextCreator = (): StyleContextProviderType => {
  const [style, setStyle] = useState(DEFAULT_STYLE);
  return [style, setStyle];
};

export const StyleContextProvider = ({ children }: { children: ReactNode }) => {
  const provider = useStyleContextCreator();
  // @TODO Alex uncomment this and add .env params to enable this only on production
  const [width] = useWindowSize();
  const prevWidth = usePrevious(width);
  const [{ mediaType }, setStyle] = provider;

  useEffect(() => {
    if (width !== prevWidth) {
      const currentMediaType = getMediaType();
      if (!comparatorFunction(currentMediaType, mediaType)) {
        setStyle({ mediaType: currentMediaType });
      }
    }
  }, [width, prevWidth, setStyle, mediaType]);

  return (
    <StyleContext.Provider value={provider}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleContext.Provider>
  );
};

export const useStyleContext = (): StyleContextProviderType => {
  const service = useContext(StyleContext);

  if (!service) {
    throw new Error("Tooltip Context is unavailable");
  }

  return service;
};

export const withStyleContext = (Component: any) => {
  return function WithStyleContext(props: any) {
    const service = useStyleContext();

    return <Component {...props} styleContext={service} />;
  };
};
