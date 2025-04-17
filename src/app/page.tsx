import Kitoblar from "@/components/Kitoblar";
import Statistics from "@/components/Statistics";
import React from "react";

function page() {
  return (
    <div className="container mx-auto">
      <Statistics />
      <Kitoblar />
    </div>
  );
}

export default page;
