import React, { Fragment } from "react";
import WeeklyCommission from "../components/commissions/WeeklyCommission";
import VirtualCommissionTable from "../components/commissions/VirtualCommissionTable";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const CommissionPage = () => {
  return (
    <Fragment>
      <main className="relative bg-[#ffffff] pt-2 md:pt-5">
        <section className="flex flex-col lg:flex-row justify-around max-w-[1240px] mx-auto   max-h-full mt-[10px]  p-3  md:p-5 ">
          <div className="">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center md:text-left">
              Virtual Weekly bonus
            </h1>
            <div>
              {" "}
              <VirtualCommissionTable />
            </div>
          </div>
          <div className="">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center md:text-left">
              Weekly per ticket commission
            </h1>
            <div>
              {" "}
              <WeeklyCommission />
            </div>
          </div>
        </section>
        <section className="bg-[#fbfbfb] p-3  md:p-5  ">
          <div className=" max-w-[1240px] mx-auto ">
            <p className="md:text-xl my-2">
              Every Tuesday our agents are paid a “weekly commission” based on
              the sum of the individual stake commission earned per betslip. It
              should be noted that commission is earned on decided betslips only
              (either won or lost bets).
            </p>

            <div className="pt-2 md:pt-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center ">
                Weekly per ticket commission example
              </h2>
              <p className="md:text-xl my-2">
                For a betslip with 5 selections or events, the commission
                percentage is 8%. If the stake is N5,000. Commission on this
                betslip would be 8% of N5,000 = N400
              </p>
              <p className="md:text-xl my-2">
                If the agent places a second bet with 15 selections, the
                commission percentage is 20%. If the stake is N5,000. Commission
                on this betslip would be 20% of N5,000 = N1,000
              </p>
              <p className="md:text-xl my-2">
                The total commission this agent would earn for the week for the
                two bets would be N400 + N1,000 = N1,400
              </p>
            </div>
            <div className="pt-2 md:pt-4 ">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center ">
                Merrybet Monthly Bonus
              </h2>
              <div>
                <p className="md:text-xl my-2">
                  The monthly bonus will be a way of rewarding agent accounts
                  that had good activity and profits in the month. It will be
                  calculated by:
                </p>
                <p className="md:text-xl my-5 mx-4">
                  Monthly bonus = (30% * Profit of the month) - (Total weekly
                  commission paid in the month)
                </p>
                <p className="md:text-xl my-2">
                  Accounts that will recieve this bonus must meet the following
                  condition:
                </p>
                <p className="md:text-xl my-2">
                  {" "}
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  <span style={{ fontSize: "bold" }}>a.</span> The account must
                  play at least 5 out of 7 days. It must play on Saturday and
                  Sunday then at least 3 other days.
                </p>
                <p className="md:text-xl my-2">
                  {" "}
                  <IoMdCheckmarkCircleOutline
                    size={15}
                    style={{ color: "#FF7204" }}
                    className="inline-flex mx-2"
                  />
                  <span style={{ fontSize: "bold" }}>b.</span> The account must
                  have a total of at least 150 bet counts in each of the weeks
                  in that month.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default CommissionPage;
