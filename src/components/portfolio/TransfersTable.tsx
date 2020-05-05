import React, {useCallback} from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useDispatch, useSelector} from "react-redux";
import {transfer} from "../../redux/actions";

interface TransferData {
  amount: string;
  date: string;
  is_deposit: boolean;
  manually_added: boolean;
  port_id: number;
  uid: string;
}

interface TransfersTableProps {
  transfers: TransferData[]
}

interface TransferRow {
  uid: string,
  port_id: number,
  date: string;
  action: string;
  amount: number;
  type: string;
}

interface TransferTableState {
  portfolio: any,
  transfer: any,
}

export default function TransfersTable(props: TransfersTableProps) {
  const dispatch = useDispatch();
  const selectedPort = useSelector((state: TransferTableState) => state.portfolio.selected_port)
  const loadingPorts = useSelector((state: TransferTableState) => state.portfolio.loading)
  const upsertingTransfer = useSelector((state: TransferTableState) => state.transfer.upserting)

  const upsertTransfer = useCallback(
    (t) => dispatch(transfer.upsertTransfer(t)), [dispatch])
  const deleteTransfer = useCallback(
    (uid, port_id) => dispatch(transfer.deleteTransfer(uid, port_id)), [dispatch])

  let transfer_columns = [
    { title: 'Date', field: 'date', editComponent: props => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            value={props.value}
            placeholder="2017-06-24"
            onChange={(new_date) => { props.onChange(new_date) }}
            format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
      )},
    { title: 'Action', field: 'action', lookup: { WITHDRAW: 'WITHDRAW', DEPOSIT: 'DEPOSIT' } },
    { title: 'Amount', field: 'amount', type: 'numeric' as const },
    { title: 'Type', field: 'type', initialEditValue: 'MANUAL', editable: 'never' as const},
  ]

  let transfer_data: TransferRow[] = props.transfers.map(({uid, port_id, date, is_deposit, amount, manually_added }) => {
    let action = is_deposit ? "DEPOSIT" : "WITHDRAW";
    let type = manually_added ? "MANUAL" : "SCRAPED";
    return {uid, port_id, date, action, amount: parseFloat(amount), type}
  })

  return (
    <MaterialTable
      style={{padding: "0px 15px"}}
      isLoading={loadingPorts || upsertingTransfer}
      title={"Transfers"}
      columns={transfer_columns}
      data={transfer_data}
      editable={selectedPort===-1 ? undefined : {
        isEditable: ({ type }) => type === "MANUAL",
        isDeletable: ({ type }) => type === "MANUAL",
        onRowAdd: ({ date, amount, action }) =>
          new Promise((resolve) => {
            upsertTransfer({
              port_id: selectedPort,
              amount,
              is_deposit: action === "DEPOSIT",
              manually_added: true,
              date: date ? date : new Date().toISOString
            })
            resolve();
          }),
        onRowUpdate: ({ port_id, uid, date, amount, action, type }) =>
          new Promise((resolve) => {
            upsertTransfer({
              uid,
              port_id,
              amount,
              is_deposit: action === "DEPOSIT",
              manually_added:  type === "MANUAL",
              date: date ? date : new Date().toISOString
            })
            resolve();
          }),
        onRowDelete: ({port_id, uid}) =>
          new Promise((resolve) => {
            deleteTransfer(uid, port_id)
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
          tooltip: 'Refresh transfers data',
          onClick: (e, d) => {
            console.log(e, d);
          },
          isFreeAction: true
        }
      ]}
    />
  )
}