import { Pagination } from "./components";

type Props = { searchParams: { page: string } }

export default function Home({ searchParams }: Props) {
  return (
    <Pagination itemCount={100} currentPage={parseInt(searchParams.page)} pageSize={10} />
  )
}
