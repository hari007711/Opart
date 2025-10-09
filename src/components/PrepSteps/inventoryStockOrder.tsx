// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "../ui/Button";
// import { useStatusStore } from "@/store/forecastStore";
// import { api } from "@/lib/api";

// export default function InventoryStockOrder() {
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

//   const [data, setData] = useState<[]>([]);

//   const fetchData = async () => {
//     try {
//       // setLoading(true);
//       const res = await api.InventoryOrder();
//       setData(res.items || []);
//     } catch (err) {
//       console.error("Failed to fetch inventory data:", err);
//     } finally {
//       // setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="bg-gray-200 p-2 mb-2 rounded-xl">
//         <div className="p-2 bg-[#dadee9] rounded">
//           <h1 className="font-semibold text-lg">Off-Cycle Fry Prep Items</h1>
//         </div>
//         <div className="mt-5">
//           <Table>
//             <TableHeader className="h-15">
//               <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
//                 <TableHead className="text-white border border-r-white">
//                   Item Name
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Last Updated Count
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Previuos Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Next Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Expected On-Hand Quantity
//                   <br /> on the day of delivery
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="border-1 border-gray-500 bg-white">
//               {offCycleData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
//                       <span className="text-xs">🖼️</span>
//                     </div>
//                     {row.itemName}
//                   </TableCell>
//                   <TableCell>
//                     {row.startBoxes} Boxes ・ {row.startBags} Bags
//                   </TableCell>
//                   <TableCell>{row.endBags} Bags</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         {status !== "confirm" && (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateValue(i, "remainingBoxes", -1)}
//                           >
//                             -
//                           </Button>
//                         )}
//                         <span className="px-2 border rounded bg-gray-100 text-sm">
//                           {row.remainingBoxes} boxes
//                         </span>
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             +
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
//                           row.consumption.type === "increase"
//                             ? "bg-yellow-500"
//                             : row.consumption.type === "decrease"
//                             ? "bg-red-600"
//                             : "bg-gray-400"
//                         }`}
//                       >
//                         {row.consumption.type === "increase" ? "+" : "-"}
//                       </div>
//                       {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
//                       Bags
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       <div className="bg-gray-200 p-2 mb-2 rounded-xl">
//         <div className="p-2 bg-[#dadee9] rounded">
//           <h1 className="font-semibold text-lg">Batch Prep Items</h1>
//         </div>
//         <div className="mt-5">
//           <Table>
//             <TableHeader className="h-15">
//               <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
//                 <TableHead className="text-white border border-r-white">
//                   Item Name
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Last Updated Count
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Previuos Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Next Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Expected On-Hand Quantity
//                   <br /> on the day of delivery
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="border-1 border-gray-500  bg-white">
//               {batchData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
//                       <span className="text-xs">🖼️</span>
//                     </div>
//                     {row.itemName}
//                   </TableCell>
//                   <TableCell>
//                     {row.startBoxes} Boxes ・ {row.startBags} Bags
//                   </TableCell>
//                   <TableCell>{row.endBags} Bags</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             -
//                           </Button>
//                         )}
//                         <span className="px-2 border rounded bg-gray-100 text-sm">
//                           {row.remainingBoxes} boxes
//                         </span>
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             +
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
//                           row.consumption.type === "increase"
//                             ? "bg-yellow-500"
//                             : row.consumption.type === "decrease"
//                             ? "bg-red-600"
//                             : "bg-gray-400"
//                         }`}
//                       >
//                         {row.consumption.type === "increase" ? "+" : "-"}
//                       </div>
//                       {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
//                       Bags
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       <div className="bg-gray-200 p-2 mb-2 rounded-xl">
//         <div className="p-2 bg-[#dadee9] rounded">
//           <h1 className="font-semibold text-lg">24-hours Items</h1>
//         </div>
//         <div className="mt-5">
//           <Table>
//             <TableHeader className="h-15">
//               <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
//                 <TableHead className="text-white border border-r-white">
//                   Item Name
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Last Updated Count
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Previuos Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Next Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Expected On-Hand Quantity
//                   <br /> on the day of delivery
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="border-1 border-gray-500 bg-white">
//               {dayData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
//                       <span className="text-xs">🖼️</span>
//                     </div>
//                     {row.itemName}
//                   </TableCell>
//                   <TableCell>
//                     {row.startBoxes} Boxes ・ {row.startBags} Bags
//                   </TableCell>
//                   <TableCell>{row.endBags} Bags</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             -
//                           </Button>
//                         )}
//                         <span className="px-2 border rounded bg-gray-100 text-sm">
//                           {row.remainingBoxes} boxes
//                         </span>
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             +
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
//                           row.consumption.type === "increase"
//                             ? "bg-yellow-500"
//                             : row.consumption.type === "decrease"
//                             ? "bg-red-600"
//                             : "bg-gray-400"
//                         }`}
//                       >
//                         {row.consumption.type === "increase" ? "+" : "-"}
//                       </div>
//                       {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
//                       Bags
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//       <div className="bg-gray-200 p-2 mb-2 rounded-xl">
//         <div className="p-2 bg-[#dadee9] rounded">
//           <h1 className="font-semibold text-lg">Non-Food Items</h1>
//         </div>
//         <div className="mt-5">
//           <Table>
//             <TableHeader className="h-15">
//               <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
//                 <TableHead className="text-white border border-r-white">
//                   Item Name
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Last Updated Count
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Previuos Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Next Order Quantity
//                 </TableHead>
//                 <TableHead className="text-white border border-r-white">
//                   Expected On-Hand Quantity <br />
//                   on the day of delivery
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="border-1 border-gray-500 bg-white">
//               {nonFoodData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell className="flex items-center gap-2">
//                     <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
//                       <span className="text-xs">🖼️</span>
//                     </div>
//                     {row.itemName}
//                   </TableCell>
//                   <TableCell>
//                     {row.startBoxes} Boxes ・ {row.startBags} Bags
//                   </TableCell>
//                   <TableCell>{row.endBags} Bags</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1">
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             -
//                           </Button>
//                         )}
//                         <span className="px-2 border rounded bg-gray-100 text-sm">
//                           {row.remainingBoxes} boxes
//                         </span>
//                         {status !== "confirm" && (
//                           <Button variant="outline" size="sm">
//                             +
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-sm ${
//                           row.consumption.type === "increase"
//                             ? "bg-yellow-500"
//                             : row.consumption.type === "decrease"
//                             ? "bg-red-600"
//                             : "bg-gray-400"
//                         }`}
//                       >
//                         {row.consumption.type === "increase" ? "+" : "-"}
//                       </div>
//                       {row.consumption.boxes} Boxes ・ {row.consumption.bags}{" "}
//                       Bags
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/Button";
import { useStatusStore } from "@/store/forecastStore";
import { api } from "@/lib/api";

// Type definitions
interface QuantityCount {
  units?: number;
  bags?: number;
  boxes?: number;
}

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  lastUpdatedCount: QuantityCount;
  prevOrderQuantity: QuantityCount;
  nxtOrderQuantity: QuantityCount;
  ExpOnHandQuantity: QuantityCount;
}

export default function InventoryStockOrder() {
  const { status } = useStatusStore();
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.InventoryOrder();
      setData(res.items || []);
    } catch (err) {
      console.error("Failed to fetch inventory data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter items by category
  const offCycleData = data.filter(
    (item) => item.category === "Off-cycle Fry Prep Items"
  );
  const batchData = data.filter((item) => item.category === "Batch Prep Items");
  const dayData = data.filter((item) => item.category === "24-hours Items");
  const nonFoodData = data.filter((item) => item.category === "Non-Food Items");

  const updateValue = (
    itemId: string,
    field: "boxes" | "bags" | "units",
    delta: number
  ) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              nxtOrderQuantity: {
                ...item.nxtOrderQuantity,
                [field]: Math.max(
                  0,
                  (item.nxtOrderQuantity[field] || 0) + delta
                ),
              },
            }
          : item
      )
    );
  };

  const renderQuantity = (quantity: QuantityCount): string => {
    const parts: string[] = [];

    if (quantity.units && quantity.units > 0) {
      parts.push(`${quantity.units} Units`);
    }
    if (quantity.boxes && quantity.boxes > 0) {
      parts.push(`${quantity.boxes} Boxes`);
    }
    if (quantity.bags && quantity.bags > 0) {
      parts.push(`${quantity.bags} Bags`);
    }

    return parts.join(" ・ ") || "—";
  };

  if (loading) {
    return (
      <div className="flex text-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  const renderTable = (tableData: InventoryItem[], categoryName: string) => {
    // if (loading) {
    //   return (
    //     <div className="text-center py-8">
    //       <p>Loading...</p>
    //     </div>
    //   );
    // }

    if (tableData.length === 0) {
      return (
        <div className="text-center py-8 bg-white rounded">
          <p className="text-gray-500">No items found in this category</p>
        </div>
      );
    }

    return (
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
              Previous Order Quantity
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
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs">🖼️</span>
                </div>
                {row.itemName}
              </TableCell>

              <TableCell>{renderQuantity(row.lastUpdatedCount)}</TableCell>

              <TableCell>{renderQuantity(row.prevOrderQuantity)}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  {row.nxtOrderQuantity.boxes !== undefined && (
                    <div className="flex items-center gap-1">
                      {status !== "confirm" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateValue(row.id, "boxes", -1)}
                        >
                          -
                        </Button>
                      )}
                      <span className="px-2 border rounded bg-gray-100 text-sm">
                        {row.nxtOrderQuantity.boxes} boxes
                      </span>
                      {status !== "confirm" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateValue(row.id, "boxes", 1)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  )}
                  {row.nxtOrderQuantity.bags !== undefined && (
                    <div className="flex items-center gap-1">
                      {status !== "confirm" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateValue(row.id, "bags", -1)}
                        >
                          -
                        </Button>
                      )}
                      <span className="px-2 border rounded bg-gray-100 text-sm">
                        {row.nxtOrderQuantity.bags} bags
                      </span>
                      {status !== "confirm" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateValue(row.id, "bags", 1)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>{renderQuantity(row.ExpOnHandQuantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      {/* Off-Cycle Fry Prep Items */}
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Off-Cycle Fry Prep Items</h1>
        </div>
        <div className="mt-5">
          {renderTable(offCycleData, "Off-Cycle Fry Prep Items")}
        </div>
      </div>

      {/* Batch Prep Items */}
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Batch Prep Items</h1>
        </div>
        <div className="mt-5">{renderTable(batchData, "Batch Prep Items")}</div>
      </div>

      {/* 24-hours Items */}
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">24-hours Items</h1>
        </div>
        <div className="mt-5">{renderTable(dayData, "24-hours Items")}</div>
      </div>

      {/* Non-Food Items */}
      <div className="bg-gray-200 p-2 mb-2 rounded-xl">
        <div className="p-2 bg-[#dadee9] rounded">
          <h1 className="font-semibold text-lg">Non-Food Items</h1>
        </div>
        <div className="mt-5">{renderTable(nonFoodData, "Non-Food Items")}</div>
      </div>
    </div>
  );
}
