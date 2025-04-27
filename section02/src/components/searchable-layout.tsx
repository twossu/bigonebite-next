import { useRouter } from "next/router";
import { useEffect, ReactNode, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  //f5해도 서치바의 검색내용이 안사라지게
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return; //q === search 같은검색어일시 검색해도 안되도록
    router.push(`/search?q=${search}`); //백틱 사용해야함
  };

  //엔터누르면 검새되도록록
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.search_container}>
        {" "}
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
