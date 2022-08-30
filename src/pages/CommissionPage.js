import React, { Fragment } from "react";
import BiWeeklyCommission from "../components/commissions/BiWeeklyCommission";
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
              Bi-weekly per ticket commission
            </h1>
            <div>
              {" "}
              <BiWeeklyCommission />
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
                Merrybet Bi-Weekly Bonus
              </h2>
              <p className="md:text-xl my-2">
                This bonus is paid once every two weeks (twice a month) on
                Tuesday. Agent will get 30% of total difference for the two
                weeks minus weekly commission paid to agent for both weeks.
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">
                Bi-weekly bonus calculation
              </h3>

              <p className="md:text-xl my-2">
                Total stake for two weeks – total winnings for two weeks =
                difference
              </p>
              <p className="md:text-xl my-2">
                (Difference X 30%) – (total weekly per ticket commission for two
                weeks) = Agent Bonus
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">
                Example
              </h3>

              <p className="md:text-xl my-2">
                Total stake for two weeks = N600,000
              </p>
              <p className="md:text-xl my-2">
                Total winnings for two weeks = N250,000
              </p>
              <p className="md:text-xl my-2">
                Total weekly per ticket commission for two weeks = N35,000 (week
                one) + N42,000 (week two) = N77,000
              </p>
              <p className="md:text-xl my-2">Calculation will be:</p>
              <p className="md:text-xl my-2">N600,000 – N250,000 = N350,000</p>
              <p className="md:text-xl my-2">(N350,000 X 30%) – (N77,000)</p>
              <p className="md:text-xl my-2">(N105,000) – (N77,000)</p>
              <p className="md:text-xl my-2">Agent bi-weekly bonus = N28,000</p>
            </div>
            <div className="pt-2 md:pt-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center ">
                Merrybet Bi-Weekly Bonus
              </h2>
              <p className="md:text-xl my-2">
                {" "}
                <IoMdCheckmarkCircleOutline
                  size={15}
                  style={{ color: "#FF7204" }}
                  className="inline-flex mx-2"
                />
                To be eligible for bi-weekly bonus, agent must play all Merrybet
                products only
              </p>
              <p className="md:text-xl my-2">
                {" "}
                <IoMdCheckmarkCircleOutline
                  size={15}
                  style={{ color: "#FF7204" }}
                  className="inline-flex mx-2"
                />
                Agent must work a minimum of 12 of the 14 days and must place a
                certain number of bets each day
              </p>
              <p className="md:text-xl my-2">
                {" "}
                <IoMdCheckmarkCircleOutline
                  size={15}
                  style={{ color: "#FF7204" }}
                  className="inline-flex mx-2"
                />
                Agents who do not meet up to the criteria above would get a
                lower bi-weekly bonus or would not even be paid
              </p>
            </div>
          </div>
        </section>
      </main>
  
    </Fragment>
  );
};

export default CommissionPage;
