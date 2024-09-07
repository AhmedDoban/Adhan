import { useTranslations } from "next-intl";
import "./Loding.css";

function Loading() {
  const Translate = useTranslations();

  return (
    <div className="Loding">
      <div className="box-content">
        <h1>{Translate("Loadig.Title")}</h1>
      </div>
    </div>
  );
}
export default Loading;
