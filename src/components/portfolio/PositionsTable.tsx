import React from "react";
import MaterialTable from "material-table";
import {useSelector} from "react-redux";

interface PositionsTableProps {
  positions: any
}

interface TransferTableState {
  portfolio: any,
  position: any,
}

export default function PositionsTable(props: PositionsTableProps) {
  const loadingPorts = useSelector((state: TransferTableState) => state.portfolio.loading)
  const loadingPositions = useSelector((state: TransferTableState) => state.position.loading)

  let position_columns = [
    { title: 'Stock', field: 'stock' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Value', field: 'value'},
  ]

  let position_data = props.positions
    .map(({ stock, quantity, value }) => ({ stock, quantity: parseFloat(quantity), value: parseFloat(value) }))
    .sort((a, b) => a.value === b.value ? a.quantity - b.quantity : a.value - b.value)
    .reverse()

  return (
    <MaterialTable
      style={{padding: "0px 15px"}}
      isLoading={loadingPorts || loadingPositions}
      title={"Positions"}
      columns={position_columns}
      data={position_data}
    />
  )
}