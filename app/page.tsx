import { Pagination } from "./components";

export default function Home() {
  return (
    <Pagination itemCount={100} currentPage={2} pageSize={10} />
  )
}
