import React from "react";
import { useNavigate } from "react-router-dom";
import DashCard from "../Component/Cards/DashCards";
import Data from "../DataStore/DataStore.json";
import { CiShop } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiAnycubic } from "react-icons/si";
import { SiGooglemessages } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import CommisionChart from "../Component/Charts/Commission";
import Anaylitics from "../Component/Charts/AnalyticsChart";
import { MdOutlineAnalytics } from "react-icons/md";

function Dashboard() {
  const navigate = useNavigate();

  const data = {
    retailers: Data.retailers.length,
    customers: Data.customers.length,
    products: Data.product_listings.length,
    messages: Data.messages.length,
    revenue: Data?.admins?.[0]?.revenue_summary?.currentyear?.July?.total || 0,
  };
  const breakdown = Data.admins?.[0].revenue_summary;
  const CardsData = [
    {
      icon: <CiShop />,
      title: "Retailers",
      count: data.retailers,
      path: "/users/retailers",
      bgColor: "bg-[var(--accent)]",
    },
    {
      icon: <FaPeopleGroup />,
      title: "Customers",
      count: data.customers,
      path: "/users/customers",
      bgColor: "bg-[var(--accent-dark)]",
    },
    {
      icon: <SiAnycubic />,
      title: "Products",
      count: data.products,
      path: "/products",
      bgColor: "bg-[var(--success)]",
    },
    {
      icon: <SiGooglemessages />,
      title: "Messages",
      count: data.messages,
      path: "/messages",
      bgColor: "bg-[var(--warning)]",
    },
    {
      icon: <GiTakeMyMoney />,
      title: "Revenue",
      count: data.revenue,
      path: "/revenue",
    },
  ];

  return (
    <section className="px-6 w-full bg-[var(--primary-bg)] min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--primary-text)] mb-8">
          Dashboard
        </h1>

        <div className=""></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6  ">
        {CardsData.map(({ icon, title, count, path, bgColor }, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => navigate(path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(path);
            }}
          >
            <DashCard
              icon={icon}
              title={title}
              number={count}
              bgColor={bgColor}
            />
          </div>
        ))}
      </div>

      {/* <CommisionChart  breakdown={breakdown}/>
      <Anaylitics/> */}
    </section>
  );
}

export default Dashboard;
