import { useEffect, useRef } from "react";

interface ErrorProps {
  error: Error | null;
}

const Error = ({ error }: ErrorProps) => {
  const alertShown = useRef(false);

  useEffect(() => {
    if (error && !alertShown.current) {
      alert(
        "There seems to be a problem please try again later" +
          "\n" +
          error.message
      );
      alertShown.current = true;
    }
  }, [error]);

  // Return null as we don't want to render anything in the DOM
  return null;
};

export default Error;
