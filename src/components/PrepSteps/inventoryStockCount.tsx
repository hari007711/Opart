import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/Button";
import { useDayCountStore, useStatusStore } from "@/store/forecastStore";
import { CommonDialog } from "../Dialog/CommonDialog";
import { Input } from "../ui/input";
import { api } from "@/lib/api";

export default function InventoryStockCount() {
  const { dayCount } = useDayCountStore();
  const { status } = useStatusStore();
  const [data, setData] = useState(
    Array(8)
      .fill(null)
      .map(() => ({
        itemName: "Item Name",
        startBoxes: 10,
        startBags: 10,
        endBoxes: 10,
        endBags: 10,
        remainingBoxes: 10,
        remainingBags: 10,
        each: 10,
        consumption: { boxes: 10, bags: 10, type: "increase" },
      }))
  );

  const [InvData, setInvData] = useState();

  const fetchData = async () => {
    try {
      const res = await api.InventoryCnt();

      // API returns { items: [...], totalItems, location }
      setInvData(res);
    } catch (err) {
      console.error("Failed to fetch inventory data:", err);
    } finally {
      // setLoading(false);
    }
  };

  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [currentField, setCurrentField] = useState<
    "remainingBoxes" | "remainingBags" | "each" | null
  >(null);
  const [quantityHand, setQuantityHand] = useState<number>(0);

  const handleEdit = (
    rowIndex: number,
    field: "remainingBoxes" | "remainingBags" | "each"
  ) => {
    setCurrentRow(rowIndex);
    setCurrentField(field);
    setQuantityHand(data[rowIndex][field]);
  };

  const offCycleData = Array(4).fill({
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
    setData((prev) =>
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
    <div className="p-2 bg-[#edeff7]">
      {dayCount === "Daily Count" ? (
        <>
          <div className="p-2 bg-[#dadee9] rounded">
            <h1 className="font-semibold text-lg">Daily Items</h1>
          </div>

          <div className="my-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                  <TableHead className="text-white border border-r-white">
                    Item Name
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Start of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    End of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Remaining Quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Consumption Rate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-1 border-gray-500 bg-white">
                {data.map((row, i) => (
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
                              onClick={() =>
                                updateValue(i, "remainingBoxes", -1)
                              }
                            >
                              -
                            </Button>
                          )}
                          <span className="px-2 h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBoxes} boxes
                          </span>
                          {status !== "confirm" && (
                            <CommonDialog
                              trigger={
                                <div className="flex bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleEdit(i, "remainingBoxes")
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              }
                              title="Update the Box Quantity"
                              description="Please add remaining quantity of boxes of the item"
                              onConfirm={() => {
                                if (currentRow !== null && currentField) {
                                  setData((prev) =>
                                    prev.map((row, index) =>
                                      index === currentRow
                                        ? {
                                            ...row,
                                            [currentField]: quantityHand,
                                          }
                                        : row
                                    )
                                  );
                                }
                              }}
                              onCancel={() => console.log("Cancelled")}
                            >
                              <Input
                                type="number"
                                value={quantityHand}
                                onChange={(e) =>
                                  setQuantityHand(Number(e.target.value))
                                }
                                className="text-center text-xl border border-gray-500 h-12 font-semibold"
                              />
                            </CommonDialog>
                          )}
                        </div>

                        <span>・</span>

                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateValue(i, "remainingBags", -1)
                              }
                            >
                              -
                            </Button>
                          )}
                          <span className="px-2 h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBags} bags
                          </span>
                          {status !== "confirm" && (
                            <CommonDialog
                              trigger={
                                <div className="flex bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleEdit(i, "remainingBags")
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              }
                              title="Update Bag Quantity"
                              description="Please add remaining quantity of bags of the item"
                              onConfirm={() => {
                                if (currentRow !== null && currentField) {
                                  setData((prev) =>
                                    prev.map((row, index) =>
                                      index === currentRow
                                        ? {
                                            ...row,
                                            [currentField]: quantityHand,
                                          }
                                        : row
                                    )
                                  );
                                }
                              }}
                              onCancel={() => console.log("Cancelled")}
                            >
                              <Input
                                type="number"
                                value={quantityHand}
                                onChange={(e) =>
                                  setQuantityHand(Number(e.target.value))
                                }
                                className="text-center text-xl border border-gray-500 h-12 font-semibold"
                              />
                            </CommonDialog>
                          )}
                        </div>

                        <span>・</span>

                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateValue(i, "each", -1)}
                            >
                              -
                            </Button>
                          )}
                          <span className="px-2 h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.each} each
                          </span>
                          {status !== "confirm" && (
                            <CommonDialog
                              trigger={
                                <div className="flex bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(i, "each")}
                                  >
                                    +
                                  </Button>
                                </div>
                              }
                              title="Update Individual Quantity"
                              description="Please add remaining quantity of individual units of the item"
                              onConfirm={() => {
                                if (currentRow !== null && currentField) {
                                  setData((prev) =>
                                    prev.map((row, index) =>
                                      index === currentRow
                                        ? {
                                            ...row,
                                            [currentField]: quantityHand,
                                          }
                                        : row
                                    )
                                  );
                                }
                              }}
                              onCancel={() => console.log("Cancelled")}
                            >
                              <Input
                                type="number"
                                value={quantityHand}
                                onChange={(e) =>
                                  setQuantityHand(Number(e.target.value))
                                }
                                className="text-center text-xl border border-gray-500 h-12 font-semibold"
                              />
                            </CommonDialog>
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
        </>
      ) : (
        <>
          <div className="p-2 bg-[#dadee9] rounded">
            <h1 className="font-semibold text-lg">Off-Cycle Fry Prep Items</h1>
          </div>
          <div className="my-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                  <TableHead className="text-white border border-r-white">
                    Item Name
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Start of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    End of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Remaining Quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Consumption Rate
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
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 h-7.5 flex items-center border rounded bg-gray-100 text-sm">
                            {row.remainingBoxes} boxes
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBags} bags
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.each} each
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
          <div className="p-2 bg-[#dadee9] rounded">
            <h1 className="font-semibold text-lg">Batch Prep Items</h1>
          </div>
          <div className="my-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                  <TableHead className="text-white border border-r-white">
                    Item Name
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Start of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    End of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Remaining Quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Consumption Rate
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="border-1 border-gray-500 bg-white">
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
                          <span className="px-2 h-7.5 flex items-center border rounded bg-gray-100 text-sm">
                            {row.remainingBoxes} boxes
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBags} bags
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.each} each
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
          <div className="p-2 bg-[#dadee9] rounded">
            <h1 className="font-semibold text-lg">24-hours Items</h1>
          </div>
          <div className="my-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                  <TableHead className="text-white border border-r-white">
                    Item Name
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Start of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    End of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Remaining Quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Consumption Rate
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
                          <span className="px-2 h-7.5 flex items-center border rounded bg-gray-100 text-sm">
                            {row.remainingBoxes} boxes
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBags} bags
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.each} each
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
          <div className="p-2 bg-[#dadee9] rounded">
            <h1 className="font-semibold text-lg">Non-Food Items</h1>
          </div>
          <div className="my-5">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-500 text-white hover:bg-gray-500">
                  <TableHead className="text-white border border-r-white">
                    Item Name
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Start of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    End of the day quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Remaining Quantity
                  </TableHead>
                  <TableHead className="text-white border border-r-white">
                    Consumption Rate
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
                          <span className="px-2 h-7.5 flex items-center border rounded bg-gray-100 text-sm">
                            {row.remainingBoxes} boxes
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.remainingBags} bags
                          </span>
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              +
                            </Button>
                          )}
                        </div>
                        <span>・</span>
                        <div className="flex items-center gap-1">
                          {status !== "confirm" && (
                            <Button variant="outline" size="sm">
                              -
                            </Button>
                          )}
                          <span className="px-2 border h-7.5 flex items-center border rounded-md bg-gray-100 text-sm">
                            {row.each} each
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
        </>
      )}
    </div>
  );
}
