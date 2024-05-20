import * as React from "react";

const APIDeposits = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.defer = true;
    script.setAttribute("data-use-service-core", "");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        className="elfsight-app-c2a774ce-f0c6-457a-b5df-2701a8598fc6"
        data-elfsight-app-lazy
      ></div>
    </React.Fragment>
  );
};

export default APIDeposits;
