import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllIssues } from "../service";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";

const Issues = () => {
  const [issue, setIssues] = useState(null);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["issue/view"],
    queryFn: getAllIssues,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage?.data?.nextPage;
    },
  });
  const { ref, inView } = useInView();
  console.log(inView);
  if (isLoading) {
    <div>Loading</div>;
  }
  if (error && isError) {
    toast.error(error.response.data.message);
  }
  useEffect(() => {
    if (!isLoading) {
      const newData = data.pages.map((page) => page.data.data).flat();
      setIssues(newData);
    }
  }, [isFetchingNextPage, isLoading, data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    data &&
    issue && (
      <div>
        <Table data={issue} />

        <div className="w-full h-20 flex items-center justify-center" ref={ref}>
          {hasNextPage ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            <p>Now no Data left</p>
          )}
        </div>
      </div>
    )
  );
};

export default Issues;
