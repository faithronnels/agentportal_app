import React, { Fragment } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const BonusPage = () => {
  return (
    <Fragment>
      <main className="relative bg-[#ffffff] pt-2 md:pt-5">
        <section className="flex flex-col lg:flex-row justify-around max-w-[1240px] mx-auto   max-h-full mt-[10px]  p-3  md:p-5 ">
          <div className="">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center md:text-left">
              Monthly bonus
            </h1>
            <div>
              <p className="md:text-xl my-2">
                The monthly bonus will be a way of rewarding account that had
                good activity and profits in the month. It will be calculated
                by:
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
                have a total of at least 150 bet counts in each of the weeks in
                that month.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default BonusPage;
