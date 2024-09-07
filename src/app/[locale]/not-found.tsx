import { redirect } from "next/navigation";

function notFound() {
  return redirect("/ar");
}
export default notFound;
