"use client";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import "./Home.css";
import { useFormatter, useNow } from "next-intl";
import PrayCard from "@/Components/PrayCard/PrayCard";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "../loading";

function Home() {
  const format = useFormatter();
  const localActive = useLocale();
  const Translate = useTranslations();
  const PathName = usePathname();
  const router = useRouter();

  const [, startTranslation] = useTransition();
  const [Adhan, SetAdhan] = useState();
  const [NewtPrayTime, SetNextPrayTime] = useState({
    hours: "",
    minutes: "",
  });
  const [NewtPrayName, SetNewtPrayName] = useState();
  const [IsLoading, SetLoading] = useState(false);

  // For changing language  inti library
  const ChangeLanguage = (lang) => {
    startTranslation(() => {
      const OldPath = PathName.replace(/\/en|\/ar/, `/${lang}`);
      router.replace(`${OldPath}`);
    });
  };

  const now = useNow({
    updateInterval: 1000,
  });

  // get today in spacific shape
  const GetTodayDate = () => {
    const today = new Date();
    const DateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString(localActive, DateOptions);
  };

  // loading data form api
  useEffect(() => {
    const GetAdhan = async () => {
      try {
        SetLoading(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (e) => {
            const res = await axios.get(
              `https://api.aladhan.com/v1/timings?latitude=${e.coords.latitude}&longitude=${e.coords.longitude}&method=2`
            );
            SetAdhan(res.data.data);
            GetNextPray(res.data.data);
            SetLoading(false);
          });
        }
      } catch (err) {}
    };
    GetAdhan();
  }, [localActive]);

  // get next pray
  const GetNextPray = (alldata) => {
    const timings = alldata.timings;
    const currentDate = new Date();
    const currentTimeInMinutes =
      currentDate.getHours() * 60 + currentDate.getMinutes();
    const timeToMinutes = (timeString) => {
      const [hours, minutes] = timeString.split(":");
      return parseInt(hours) * 60 + parseInt(minutes);
    };
    const prayerTimes = [
      { name: "Fajr", time: timeToMinutes(timings.Fajr) },
      { name: "Dhuhr", time: timeToMinutes(timings.Dhuhr) },
      { name: "Asr", time: timeToMinutes(timings.Asr) },
      { name: "Maghrib", time: timeToMinutes(timings.Maghrib) },
      { name: "Isha", time: timeToMinutes(timings.Isha) },
    ];
    let nextPrayer = prayerTimes.find(
      (prayer) => prayer.time > currentTimeInMinutes
    );
    if (!nextPrayer) {
      nextPrayer = {
        name: "Fajr",
        time: timeToMinutes(timings.Fajr) + 24 * 60,
      };
    }
    const remainingTimeInMinutes = nextPrayer.time - currentTimeInMinutes;
    const hours = Math.floor(remainingTimeInMinutes / 60);
    const minutes = remainingTimeInMinutes % 60;

    SetNewtPrayName(Translate(`Home.${nextPrayer.name}`));
    SetNextPrayTime({ hours, minutes });
  };

  Adhan &&
    setInterval(() => {
      GetNextPray(Adhan);
    }, 6000);

  return IsLoading ? (
    <Loading />
  ) : (
    <div className="PrayingHomePage" dir={localActive === "ar" ? "rtl" : "ltr"}>
      <div className="container">
        {Adhan && (
          <div className="PrayingContent">
            <div className="right">
              <h1 className={`TittlLogo ${localActive}`}>
                {Translate("Loadig.Title")}
              </h1>
              <p className="timeZone">{Adhan?.meta?.timezone}</p>
              <p className="clock">
                {format.dateTime(now, {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>

              <p>
                {GetTodayDate()} {Translate("Home.Gregorian")}
              </p>

              <p>
                {`${Adhan?.date?.hijri?.day} ${Adhan?.date?.hijri.month[localActive]} ${Adhan?.date?.hijri?.year} `}
                {Translate("Home.Hijri")}
              </p>
              <div className="Remaining">
                <p>
                  {Translate("Home.NextPray")} {NewtPrayName}{" "}
                  {Translate("Home.After")}
                </p>
                <span>
                  {NewtPrayTime.hours} {Translate("Home.Hour")}
                  {" , "}
                  {NewtPrayTime.minutes} {Translate("Home.Minute")}
                </span>
              </div>
              <div
                className="lan"
                onClick={() =>
                  localActive == "ar"
                    ? ChangeLanguage("en")
                    : ChangeLanguage("ar")
                }
              >
                {localActive == "ar" ? "English" : "العربية"}
              </div>
            </div>
            <div className="left">
              <PrayCard
                Title={Translate("Home.Fajr")}
                Time={Adhan.timings.Fajr}
                NextPray={NewtPrayName}
              />
              <PrayCard
                Title={Translate("Home.Dhuhr")}
                Time={Adhan.timings.Dhuhr}
                NextPray={NewtPrayName}
              />
              <PrayCard
                Title={Translate("Home.Asr")}
                Time={Adhan.timings.Asr}
                NextPray={NewtPrayName}
              />
              <PrayCard
                Title={Translate("Home.Maghrib")}
                Time={Adhan.timings.Maghrib}
                NextPray={NewtPrayName}
              />
              <PrayCard
                Title={Translate("Home.Isha")}
                Time={Adhan.timings.Isha}
                NextPray={NewtPrayName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
