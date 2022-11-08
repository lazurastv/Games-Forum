import { Outlet } from "react-router";

//może się przydać przy zagnieżdżonych stronach w react router

export default function NestedPage() {
  return (
    <>
      <Outlet />
    </>
  )
}