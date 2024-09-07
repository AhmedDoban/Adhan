import dynamic from "next/dynamic";
const Home = dynamic(() => import("./Home/Home"), { ssr: false });
function Page() {
  return <Home />;
}

export default Page;
