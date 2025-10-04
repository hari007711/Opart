// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "../ui/Button";
// import { useDayCountStore, useStatusStore } from "@/store/forecastStore";

// export default function inventoryStockOrder() {
//   const { dayCount } = useDayCountStore();
//   const { status } = useStatusStore();

//   const [offCycleData, setOffCycleData] = useState(
//     Array(4).fill({
//       itemName: "Item Name",
//       startBoxes: 10,
//       startBags: 10,
//       endBoxes: 10,
//       endBags: 10,
//       remainingBoxes: 10,
//       remainingBags: 10,
//       each: 10,
//       consumption: { boxes: 10, bags: 10, type: "increase" },
//     })
//   );

//   const batchData = Array(4).fill({
//     itemName: "Item Name",
//     startBoxes: 10,
//     startBags: 10,
//     endBoxes: 10,
//     endBags: 10,
//     remainingBoxes: 10,
//     remainingBags: 10,
//     each: 10,
//     consumption: { boxes: 10, bags: 10, type: "increase" },
//   });

//   const dayData = Array(4).fill({
//     itemName: "Item Name",
//     startBoxes: 10,
//     startBags: 10,
//     endBoxes: 10,
//     endBags: 10,
//     remainingBoxes: 10,
//     remainingBags: 10,
//     each: 10,
//     consumption: { boxes: 10, bags: 10, type: "increase" },
//   });

//   const nonFoodData = Array(4).fill({
//     itemName: "Item Name",
//     startBoxes: 10,
//     startBags: 10,
//     endBoxes: 10,
//     endBags: 10,
//     remainingBoxes: 10,
//     remainingBags: 10,
//     each: 10,
//     consumption: { boxes: 10, bags: 10, type: "increase" },
//   });

//   const updateValue = (
//     rowIndex: number,
//     field: "remainingBoxes" | "remainingBags" | "each",
//     delta: number
//   ) => {
//     setOffCycleData((prev) =>
//       prev.map((row, i) =>
//         i === rowIndex
//           ? {
//               ...row,
//               [field]: Math.max(0, row[field] + delta),
//             }
//           : row
//       )
//     );
//   };

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // removed TableCaption
import { Button } from "../ui/Button";
import { useStatusStore } from "@/store/forecastStore"; // removed dayCount since unused

export default function InventoryStockOrder() {
  const { status } = useStatusStore(); // ✅ only keep what you use

  const [offCycleData, setOffCycleData] = useState(
    Array(4).fill({
      itemName: "Item Name",
      startBoxes: 10,
      startBags: 10,
      endBoxes: 10,
      endBags: 10,
      remainingBoxes: 10,
      remainingBags: 10,
      each: 10,
      consumption: { boxes: 10, bags: 10, type: "increase" },
    })
  );

  const batchData = Array(4).fill({
    itemName: "Item Name",
    startBoxes: 10,
    startBags: 10,
    endBoxes: 10,
    endBags: 10,
    remainingBoxes: 10,
    remainingBags: 10,
    each: 10,
    consumption: { boxes: 10, bags: 10, type: "increase" },
  });

  const dayData = Array(4).fill({
    itemName: "Item Name",
    startBoxes: 10,
    startBags: 10,
    endBoxes: 10,
    endBags: 10,
    remainingBoxes: 10,
    remainingBags: 10,
    each: 10,
    consumption: { boxes: 10, bags: 10, type: "increase" },
  });

  const nonFoodData = Array(4).fill({
    itemName: "Item Name",
    startBoxes: 10,
    startBags: 10,
    endBoxes: 10,
    endBags: 10,
    remainingBoxes: 10,
    remainingBags: 10,
    each: 10,
    consumption: { boxes: 10, bags: 10, type: "increase" },
  });

  const updateValue = (
    rowIndex: number,
    field: "remainingBoxes" | "remainingBags" | "each",
    delta: number
  ) => {
    setOffCycleData((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              [field]: Math.max(0, row[field] + delta),
            }
          : row
      )
    );
  };

  return (
    <div>
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Off-Cycle Fry Prep Items</h1>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader className="h-15">
              <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                <TableHead className="text-white border border-r-white">
                  Item Name
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Last Updated Count
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Previuos Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Next Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Expected On-Hand Quantity
                  <br /> on the day of delivery
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border-1 border-gray-500 bg-white">
              {offCycleData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🖼️</span>
                    </div>
                    {row.itemName}
                  </TableCell>
                  <TableCell>
                    {row.startBoxes} Boxes ・ {row.startBags} Bags
                  </TableCell>
                  <TableCell>{row.endBags} Bags</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {status !== "confirm" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateValue(i, "remainingBoxes", -1)}
                          >
                            -
                          </Button>
                        )}
                        <span className="px-2 border rounded bg-gray-100 text-sm">
                          {row.remainingBoxes} boxes
                        </span>
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            +
                          </Button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
                          row.consumption.type === "increase"
                            ? "bg-yellow-500"
                            : row.consumption.type === "decrease"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {row.consumption.type === "increase" ? "+" : "-"}
                      </div>
                      {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
                      Bags
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Batch Prep Items</h1>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader className="h-15">
              <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                <TableHead className="text-white border border-r-white">
                  Item Name
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Last Updated Count
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Previuos Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Next Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Expected On-Hand Quantity
                  <br /> on the day of delivery
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border-1 border-gray-500  bg-white">
              {batchData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🖼️</span>
                    </div>
                    {row.itemName}
                  </TableCell>
                  <TableCell>
                    {row.startBoxes} Boxes ・ {row.startBags} Bags
                  </TableCell>
                  <TableCell>{row.endBags} Bags</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            -
                          </Button>
                        )}
                        <span className="px-2 border rounded bg-gray-100 text-sm">
                          {row.remainingBoxes} boxes
                        </span>
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            +
                          </Button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
                          row.consumption.type === "increase"
                            ? "bg-yellow-500"
                            : row.consumption.type === "decrease"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {row.consumption.type === "increase" ? "+" : "-"}
                      </div>
                      {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
                      Bags
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">24-hours Items</h1>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader className="h-15">
              <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                <TableHead className="text-white border border-r-white">
                  Item Name
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Last Updated Count
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Previuos Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Next Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Expected On-Hand Quantity
                  <br /> on the day of delivery
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border-1 border-gray-500 bg-white">
              {dayData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🖼️</span>
                    </div>
                    {row.itemName}
                  </TableCell>
                  <TableCell>
                    {row.startBoxes} Boxes ・ {row.startBags} Bags
                  </TableCell>
                  <TableCell>{row.endBags} Bags</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            -
                          </Button>
                        )}
                        <span className="px-2 border rounded bg-gray-100 text-sm">
                          {row.remainingBoxes} boxes
                        </span>
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            +
                          </Button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
                          row.consumption.type === "increase"
                            ? "bg-yellow-500"
                            : row.consumption.type === "decrease"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {row.consumption.type === "increase" ? "+" : "-"}
                      </div>
                      {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
                      Bags
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Non-Food Items</h1>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader className="h-15">
              <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                <TableHead className="text-white border border-r-white">
                  Item Name
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Last Updated Count
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Previuos Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Next Order Quantity
                </TableHead>
                <TableHead className="text-white border border-r-white">
                  Expected On-Hand Quantity <br />
                  on the day of delivery
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="border-1 border-gray-500 bg-white">
              {nonFoodData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">🖼️</span>
                    </div>
                    {row.itemName}
                  </TableCell>
                  <TableCell>
                    {row.startBoxes} Boxes ・ {row.startBags} Bags
                  </TableCell>
                  <TableCell>{row.endBags} Bags</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            -
                          </Button>
                        )}
                        <span className="px-2 border rounded bg-gray-100 text-sm">
                          {row.remainingBoxes} boxes
                        </span>
                        {status !== "confirm" && (
                          <Button variant="outline" size="sm">
                            +
                          </Button>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
                          row.consumption.type === "increase"
                            ? "bg-yellow-500"
                            : row.consumption.type === "decrease"
                            ? "bg-red-600"
                            : "bg-gray-400"
                        }`}
                      >
                        {row.consumption.type === "increase" ? "+" : "-"}
                      </div>
                      {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
                      Bags
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
