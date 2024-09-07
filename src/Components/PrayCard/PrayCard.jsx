import { useLocale } from "next-intl";
import "./PrayCard.css";

function PrayCard({ Title, Time, NextPray }) {
  const localActive = useLocale();

  const timeString12hr = new Date(
    "1970-01-01T" + Time + "Z"
  ).toLocaleTimeString(localActive, {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={`PrayCard ${NextPray == Title ? "active" : ""}`}>
      <p>{Title}</p>
      <p>{timeString12hr}</p>
    </div>
  );
}
export default PrayCard;
