import React from "react";

const ProfileInformation = ({ userName, email, role }) => {
  return (
    <div className="w-[100%] flex flex-col justify-between items-end gap-10">
      <div className="flex w-[100%]">
        <p className="text-xl font-semibold">Name: </p>
        <div className="border-b-2 h-[100%] w-[100%] flex justify-end">
          <p className="text-[18px]">{userName}</p>
        </div>
      </div>

      <div className="flex w-[100%]">
        <p className="text-xl font-semibold">EmailID: </p>
        <div className="border-b-2 h-[100%] w-[100%] flex justify-end">
          <p className="text-[18px]">{email}</p>
        </div>
      </div>
      <div className="flex w-[100%]">
        <p className="text-xl font-semibold">Role: </p>
        <div className="border-b-2 h-[100%] w-[100%] flex justify-end">
          <p className="text-[18px]">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
