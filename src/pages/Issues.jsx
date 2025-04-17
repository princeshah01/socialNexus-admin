import React, { useEffect, useState } from "react";
import Table from "../components/ui/Table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllIssues } from "../service";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
const Issues = () => {
  const [issue, setIssues] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    getNextPageParam: (lastPage) => {
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
  useEffect(() => {
    setFilteredData(issue);
  }, [issue]);
  const handelSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const newData = issue.filter(
      (item) =>
        item.userId.userName.toLowerCase().includes(query) ||
        item.issueType.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );

    setFilteredData(newData);
  };
  return (
    data &&
    issue && (
      <div className="relative w-full h-full overflow-y-auto  border-neutral border-2 rounded-md">
        <div className="sticky gap-4 top-0 z-10 backdrop-blur-xl px-4 h-12 flex justify-end items-center border-b border-neutral rounded-sm">
          <div className="h-full py-2">
            <input
              value={searchQuery}
              onChange={handelSearch}
              type="text"
              className="h-full border-1 rounded-lg border-neutral focus:outline-none p-1 shadow-2xl"
              placeholder="Search"
              list="issue"
            />
            <datalist id="issue"></datalist>
          </div>
        </div>
        <Table data={filteredData ? filteredData : issue} />

        <div className="w-full h-20 flex items-center justify-center" ref={ref}>
          {hasNextPage ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  );
};

export default Issues;
