import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Table } from "react-daisyui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserList } from "../service";
import UserListRow from "../components/ui/UserListRow";
const Users = () => {
  const [userList, setUserList] = useState([]);
  const { ref, inView } = useInView();
  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: getUserList,
      initialPageParam: 1,
      getNextPageParam: (lastpage) => {
        return lastpage?.data.nextPage;
      },
    });
  useEffect(() => {
    if (!isLoading && data.pages.length > 0) {
      let newData = data.pages.map((page) => page?.data?.users).flat();
      setUserList(newData);
    }
  }, [data, isFetchingNextPage]);

  useEffect(() => {
    console.log("fetch next page");
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(userList);
  return (
    userList.length > 0 && (
      <div className="relative w-full h-full overflow-y-auto  border-neutral border-2 rounded-md">
        <div className="sticky gap-4 top-0 z-10 backdrop-blur-[1px] px-4 h-12 flex justify-end items-center border-b border-neutral rounded-sm">
          <div className="h-full py-2">
            <input
              // value={searchQuery}
              // onChange={handelSearch}
              type="text"
              className="h-full border-1 bg-base-200 rounded-lg border-neutral focus:outline-none p-1 shadow-2xl"
              placeholder="Search"
              list="issue"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="">
            <Table className="rounded-2xl">
              <Table.Head>
                <span>S.No.</span>
                <span>USER</span>
                <span>EMAIL</span>
                <span>JOINED DATE</span>
                <span>STATUS</span>
                <span>REPORTS</span>
                <span>ACTIONS</span>
              </Table.Head>

              <Table.Body>
                {userList.map((user, idx) => (
                  <UserListRow {...user} idx={idx} />
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

        <div className="w-full h-20 flex items-center justify-center" ref={ref}>
          {isFetchingNextPage ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  );
};

export default Users;
