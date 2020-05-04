import React, {useCallback} from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useDispatch, useSelector} from "react-redux";
import {order} from "../../redux/actions";
import Input from "@material-ui/core/Input";

interface OrderData {
  amount: string;
  date: string;
  is_deposit: boolean;
  manually_added: boolean;
  port_id: number;
  uid: string;
}

interface OrdersTableProps {
  orders: any
}

interface OrderRow {
  uid: string,
  port_id: number,
  date: string;
  action: string;
  amount: number;
  type: string;
}

interface OrderTableState {
  portfolio: any;
  order: any;
}

export default function OrdersTable(props: OrdersTableProps) {
  const dispatch = useDispatch();
  const selectedPort = useSelector((state: OrderTableState) => state.portfolio.selected_port)
  const loadingPorts = useSelector((state: OrderTableState) => state.portfolio.loading)
  const upsertingOrder = useSelector((state: OrderTableState) => state.order.upserting)

  const upsertOrder = useCallback(
    (t) => dispatch(order.upsertOrder(t)), [dispatch])
  const deleteOrder = useCallback(
    (uid) => dispatch(order.deleteOrder(uid)), [dispatch])

  let order_columns = [
    { title: 'Date', field: 'date' , editComponent: props => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            value={props.value}
            placeholder={new Date().toISOString().substr(0, 10)}
            onChange={(new_date) => { props.onChange(new_date) }}
            format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
      )},
    { title: 'Stock', field: 'stock', editComponent: props => (
        <Input value={props.value || ''} onChange={(e) => {
          let input_value = e.target.value.toUpperCase().replace(/[0-9]/g, "");
          props.onChange(input_value.substr(0, 5));
        }} />
      ) },
    { title: 'Action', field: 'action', lookup: { BUY: "BUY", SELL: "SELL" } },
    { title: 'Quantity', field: 'quantity', type: "numeric" as const},
    { title: 'Price', field: 'price', type: "numeric" as const },
    { title: 'Value', field: 'value', type: "numeric" as const, editable: 'never' as const},
    { title: 'Type', field: 'type', editable: 'never' as const, initialEditValue: 'MANUAL' }
  ];

  let order_data = props.orders.map(({date, is_buy, manually_added, port_id, quantity, stock, uid, value}) => {
    let action = is_buy ? "BUY" : "SELL";
    let type = manually_added ? "MANUAL" : "SCRAPED";

    return {uid, port_id, date, stock, action, quantity: parseFloat(quantity), price: parseFloat(value), value: parseFloat(quantity) * parseFloat(value), type }
  })

  return (
    <MaterialTable
      style={{padding: "0px 15px"}}
      isLoading={loadingPorts || upsertingOrder}
      title={"Orders"}
      columns={order_columns}
      data={order_data}
      editable={selectedPort===-1 ? undefined : {
        isEditable: ({ type }) => type === "MANUAL",
        isDeletable: ({ type }) => type === "MANUAL",
        onRowAdd: ({uid, date, stock, action, quantity, price }) =>
          new Promise((resolve) => {
            upsertOrder({
              uid,
              is_buy: action === "BUY",
              quantity,
              stock,
              value: price,
              port_id: selectedPort,
              manually_added: true,
              date: date ? date : new Date().toISOString
            })
            resolve();
          }),
        onRowUpdate: ({uid, port_id, date, stock, action, quantity, price, type }) =>
          new Promise((resolve) => {
            upsertOrder({
              uid,
              port_id,
              is_buy: action === "BUY",
              quantity,
              stock,
              value: price,
              manually_added: type==="MANUAL",
              date: date ? date : new Date().toISOString
            })
            resolve();
          }),
        onRowDelete: ({uid}) =>
          new Promise((resolve) => {
            deleteOrder(uid)
            resolve();
          })
      }}
      actions={[
        {
          icon: () => {
            if (true) {
              return (<Icon>refresh</Icon>);
            }
            return (<i className={"small spinner loading icon"} />);
          },
          tooltip: 'Refresh orders data',
          onClick: (e, d) => {
            console.log(e, d);
          },
          isFreeAction: true
        }
      ]}
    />
  )
}