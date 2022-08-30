import React, { useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { useAuthState } from "../../redux/selectors";

const AgentDashboard = () => {
  const authState = useAuthState();
  const { currentUser } = authState;
  const { fullname } = currentUser;
  useEffect(() => {}, [currentUser]);
 
  return (
   
      <section
        className="flex flex-col justify-around w-full mx-auto pt-2 md:pt-5   text-gray-700    
     "
      >
       
        <h1 className="text-2xl md:text-3xl font-bold text-[#344968]">
          Notifications
        </h1>
        <h2 className="font-bold text-2xl my-2">Hello, {fullname}</h2>{" "}
        <div className="p-2 my-2 ">
          {" "}
          <label className="text-xl text-[#FF7204]"> Welcome Message</label>
          <p className="">
            Congratulations on becoming one of our highly esteemed
            agents.Welcome to Where Champions Play!!!!
          </p>
        </div>
        <div className="p-2 my-2 ">
          {" "}
          <label className="text-xl text-[#FF7204]">
            {" "}
            Dear Esteemed Principal Agent
          </label>
          <p className="">
            This is to notify you that performance on your duty as a Principal
            agent will be considered while sending Monthly commission from June
            2021. The criteria that will be used are as follows:
          </p>
          <ul>
            <li className="">
              <FcCheckmark size={20} className="mr-1 inline-flex" />
              New Agents brought in for the month/Shop visitation
            </li>
            <li>
              {" "}
              <FcCheckmark size={20} className="mr-1 inline-flex" />
              Loan Funding{" "}
            </li>
            <li>
              {" "}
              <FcCheckmark size={20} className="mr-1 inline-flex" />
              Completion of loan
            </li>
            <li>
              {" "}
              <FcCheckmark size={20} className="mr-1 inline-flex" />
              Any additional task given for the month.
            </li>
          </ul>{" "}
          <p className="my-2"> Regards, Merrybet Team.</p>
        </div>
      </section>
  
  );
};

export default AgentDashboard;
