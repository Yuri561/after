import { useState, useEffect } from "react";

/**

 * @param format 
 */
export default function useCurrentTime(format: "12h" | "24h" = "12h") {
  // Helper to format time
  const getFormattedTime = () => {
    const now = new Date();

    if (format === "24h") {
      return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [format]);

  return time;
}
