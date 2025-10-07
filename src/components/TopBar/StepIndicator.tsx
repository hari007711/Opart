import PrintIcon from "@/assets/icons/printIcon";
import SearchIcon from "@/assets/icons/searchIcon";
import { useStep } from "@/contexts/stepContext";
import Insights from "@/assets/images/insights.svg";
import Approve from "@/assets/images/approve.svg";
import Edit from "@/assets/images/editWhite.svg";
import ConfirmWt from "@/assets/images/CfmWhite.svg";
import Edit2 from "@/assets/images/editIcon.svg";
import Back from "@/assets/images/back.svg";
import Order from "@/assets/images/order.svg";
import Add from "@/assets/images/Add.svg";
import Confirm from "@/assets/images/Confirm.svg";
import Image from "next/image";
import {
  useDayCountStore,
  useForecastStatusStore,
  useForecastStore,
  useInsightsStore,
  useStatusStore,
} from "@/store/forecastStore";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function StepIndicator() {
  const { approveForecasts } = useForecastStore();
  const { steps, currentStep } = useStep();
  const currentStepData = steps[currentStep];
  const { dayCount, setDayCount } = useDayCountStore();
  const { insightsState, setInsightsState } = useInsightsStore();
  const { status, setStatus } = useStatusStore();
  const { forecastState, setForecastState } = useForecastStatusStore();
  const [activeTab, setActiveTab] = useState("Overall");

  // useEffect(() => {
  //   if (currentStepData.name != "Today's Forecast") {
  //     setForecastState("modify");
  //   }
  // }, [currentStepData.name]);

  useEffect(() => {
    if (currentStepData.name !== "Today's Forecast") {
      setForecastState("modify");
    }
  }, [currentStepData.name, setForecastState]);

  return (
    <div className="bg-white border-b-3 border-gray-200 px-6 py-4  rounded-t-2xl">
      {forecastState == "modify" ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentStepData.name}
                </h2>
              </div>
              {currentStepData.name == "Inventory Count" && (
                <div className="flex ml-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-gray-600 font-medium flex items-center gap-2"
                      >
                        <ChevronDown className="h-10 w-10" />
                        {dayCount}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => setDayCount("Daily Count")}
                      >
                        Daily Count
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setDayCount("Weekly Count")}
                      >
                        Weekly Count
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-gray-600 font-medium flex items-center gap-2"
                      >
                        <ChevronDown className="h-4 w-4" />
                        Location 1
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Location 1</DropdownMenuItem>
                      <DropdownMenuItem>Location 2</DropdownMenuItem>
                      <DropdownMenuItem>Location 3</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
          {currentStepData.name == "Inventory Order" && (
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3">
                Next order will be placed by 10 pm on{" "}
                <span className="font-semibold text-gray-700">
                  Friday 03.10.2025
                </span>
              </button>
              <button className="px-4 py-3 bg-[#1f3678] text-white rounded-md hover:bg-[#1f3678] flex items-center gap-3">
                <span>
                  <Image src={Order} alt="Order" height={20} width={20} />
                </span>
                Place Order Now
              </button>
            </div>
          )}

          {currentStepData.name == "Today's Forecast" ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setForecastState("insights")}
                className="px-4 py-3 text-xl font-semibold text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3"
              >
                <span>
                  <Image
                    src={Insights}
                    alt="Insights"
                    height={25}
                    width={25}
                    className=""
                  />
                </span>
                Insights
              </button>
              <button
                onClick={() => setForecastState("modify")}
                className="px-4 py-3 bg-[#1f3678] text-white text-xl font-semibold text-gray-700 rounded-md hover:bg-[#1a2e66] flex items-center gap-3"
              >
                <span>
                  <Image
                    src={Edit}
                    alt="Edit"
                    height={25}
                    width={25}
                    className="text-white"
                  />
                </span>
                Modify
              </button>
              <button
                className="px-4 py-3 font-semibold text-xl text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3"
                onClick={approveForecasts}
              >
                <span>
                  <Image
                    src={Approve}
                    alt="Approve"
                    height={25}
                    width={25}
                    className=""
                  />
                </span>
                Approve
              </button>
            </div>
          ) : (
            <>
              {currentStepData.name == "Inventory Count" ? (
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-3 text-lg text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3">
                    <span>
                      <Image
                        src={Add}
                        alt="Add"
                        height={25}
                        width={25}
                        className=""
                      />
                    </span>
                    Add Items
                  </button>
                  {/* <button
                    className="px-4 py-3 bg-[#1f3678] text-white text-xl text-gray-700 rounded-md hover:bg-[#1a2e66] flex items-center gap-3"
                    onClick={() => setStatus("modify")}
                  > */}
                  <button
                    onClick={() => setStatus("modify")}
                    className={`px-4 py-3 text-xl rounded-md flex items-center gap-3 transition-colors
          ${
            status === "modify"
              ? "bg-[#1f3678] text-white hover:bg-[#1a2e66]"
              : "bg-transparent text-gray-700 hover:bg-gray-200"
          }
        `}
                  >
                    <span>
                      {status == "modify" ? (
                        <Image
                          src={Edit}
                          alt="Edit"
                          height={25}
                          width={25}
                          className="text-white"
                        />
                      ) : (
                        <Image
                          src={Edit2}
                          alt="Edit"
                          height={25}
                          width={25}
                          className="text-white"
                        />
                      )}
                    </span>
                    Modify
                  </button>
                  {/* <button
                    onClick={() => setStatus("confirm")}
                    className="px-4 py-3 text-xl text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3"
                  > */}
                  <button
                    onClick={() => setStatus("confirm")}
                    className={`px-4 py-3 text-xl rounded-md flex items-center gap-3 transition-colors
          ${
            status === "confirm"
              ? "bg-[#1f3678] text-white hover:bg-[#1a2e66]"
              : "bg-transparent text-gray-700 hover:bg-gray-200"
          }
        `}
                  >
                    <span>
                      {status !== "confirm" ? (
                        <Image
                          src={Confirm}
                          alt="Confirm"
                          height={25}
                          width={25}
                          className=""
                        />
                      ) : (
                        <Image
                          src={ConfirmWt}
                          alt="Confirm"
                          height={25}
                          width={25}
                          className=""
                        />
                      )}
                    </span>
                    Confirm
                  </button>
                </div>
              ) : (
                <>
                  {currentStepData.name != "Inventory Order" && (
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 text-lg text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3">
                        <span>
                          <SearchIcon width={25} height={25} />
                        </span>
                        search items
                      </button>
                      <button className="px-4 py-2  text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-3">
                        <span>
                          <PrintIcon width={20} height={20} />
                        </span>
                        Print Prep Label
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      ) : (
        currentStepData.name == "Today's Forecast" && (
          <div className="flex items-center justify-between">
            <div className="flex gap-5 items-center">
              <div className="flex gap-3">
                <button onClick={() => setForecastState("modify")}>
                  <Image src={Back} alt="Back" height={20} width={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  Insights
                </h2>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-600 font-medium flex items-center gap-2"
                  >
                    <ChevronDown className="h-10 w-10" />
                    {insightsState}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() => setInsightsState("Yesterday")}
                  >
                    Yesterday
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setInsightsState("Today")}>
                    Today
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="rounded-lg"
              >
                <TabsList className="bg-transparent h-auto rounded-lg border-b border-gray-200 border border-gray-300 ">
                  {["Overall", "Off-Cycle Fry", "Batch", "24 Hours"].map(
                    (tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="px-12 py-3 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:text-white data-[state=active]:bg-[#1f3678] transition-all duration-150"
                      >
                        {tab}
                      </TabsTrigger>
                    )
                  )}
                </TabsList>
              </Tabs>
            </div>
          </div>
        )
      )}
    </div>
  );
}
