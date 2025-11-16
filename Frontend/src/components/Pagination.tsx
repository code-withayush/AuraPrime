import React from 'react';

export default function Pagination({ page, pages, setPage }: { page: number; pages: number; setPage: (n:number)=>void; }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3">
      <button className="px-3 py-1 border rounded" disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
      <div className="text-sm">{page} / {pages}</div>
      <button className="px-3 py-1 border rounded" disabled={page===pages} onClick={()=>setPage(page+1)}>Next</button>
    </div>
  );
}
