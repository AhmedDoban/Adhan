import type { Metadata } from "next";
import "../Style/Normalize.css";
import "../Style/Root.css";
import "../Style/Style.css";

export const metadata: Metadata = {
  title: "مواقيت الصلاه",
  description:
    "أمرنا الله سبحانه وتعالى أن نقيم الصلاة لدلوك الشمس أي من زوالها إلى غسق الليل أي ظلمته وهذه الفترة هي أوقات صلوات أربع هي: الظهر – العصر – المغرب – العشاء، وقد جمع سبحانه وتعالى الأوقات الأربع دون فصل، لأن كل وقت منها ينتهي مع دخول وقت الصلاة التالية لها. ثم فصل سبحانه وتعالى صلاة الفجر لأن وقت صلاتها ينتهي بشروق الشمس ولا يتصل بوقت صلاة الظهر التالية لها، أما تحديد مواقيت الصلاة تفصيلاً فقد ورد في السنة الشريفة قولية وفعلية، مع العلم أنها تتحدد شرعاً بعلامات تتوقف على حركة الشمس الظاهرية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
