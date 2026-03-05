"use client";

import { useEffect, useMemo, useState } from "react";

import { Transaction, transactions } from "@/data/recent-transactions";
import { TableHeadersProps } from "@/interface";
import clsx from "clsx";
import { BsStar } from "react-icons/bs";
import Table from "../Shared/Table";

function getRandomTransactions(
  transactions: Transaction[],
  count: number = 10,
): Transaction[] {
  if (transactions.length <= count) {
    return [...transactions]; // Return all if fewer than requested
  }

  // Create a copy to avoid mutating the original array
  const shuffled = [...transactions];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export default function RecentTransactions() {
  const [transactionsCount, setTransactionsCount] = useState(5);
  const tableHeaders: TableHeadersProps[] = useMemo(() => {
    return [
      {
        title: "S/N",
        field: "sn",
        body: (data: Transaction) => {
          return (
            <span
              className={clsx(
                "capitalize text-xs py-1 px-2 border rounded-lg inline-flex items-center gap-2 font-semibold",
              )}
            >
              {data["s/n"]}
            </span>
          );
        },
      },
      {
        title: "Name",
        field: "name",
        body: ({ full_name }: Transaction) => {
          return <span className={clsx("text-xs")}>{full_name}</span>;
        },
      },
      {
        title: "Amount",
        field: "amount",
        body: ({ amount }: Transaction) => {
          return <span className={clsx("text-xs")}>{amount}</span>;
        },
      },
      {
        title: "Method",
        field: "method",
        body: ({ method }: Transaction) => {
          return (
            <span
              className={clsx(
                "capitalize text-xs py-1 px-2 border rounded-lg inline-flex items-center gap-2 font-semibold",
              )}
            >
              {method}
            </span>
          );
        },
      },
    ];
  }, []);

  // Randomize transactions every 5 seconds, resetting to 5 after reaching 10
  useEffect(() => {
    const transactionsInterval = setInterval(() => {
      if (transactionsCount >= 10) {
        setTransactionsCount(5);
        return;
      }
      setTransactionsCount((prev) => prev + 1);
    }, 5000);

    return () => {
      clearInterval(transactionsInterval);
    };
  }, [transactionsCount]);

  const deposits = useMemo(() => {
    return getRandomTransactions(transactions, transactionsCount);
  }, [transactionsCount]);

  const withdrawals = useMemo(() => {
    return getRandomTransactions(transactions, transactionsCount);
  }, [transactionsCount]);

  return (
    <section className="p-4 sm:px-8 lg:px-16 xl:px-32 py-16 bg-gray-50">
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-xs p-2 px-4 flex items-center justify-center gap-2 border border-secondary rounded-full text-secondary">
          <BsStar /> Benefit from a complete range of products
        </span>
        <p className="text-gray-800 font-bold text-4xl">Recent Transactions</p>
      </div>
      <div
        data-aos={"fade-right"}
        className="rounded-2xl grid lg:grid-cols-2 gap-6 md:gap-8 overflow-auto"
      >
        <div className="overflow-auto">
          <p className="text-gray-800 font-medium text-lg mb-4">
            Recent Deposits
          </p>
          <Table data={deposits} headers={tableHeaders} hidePagination />
        </div>
        <div className="overflow-auto">
          <p className="text-gray-800 font-medium text-lg mb-4">
            Recent Withdrawals
          </p>
          <Table data={withdrawals} headers={tableHeaders} hidePagination />
        </div>
      </div>
    </section>
  );
}
