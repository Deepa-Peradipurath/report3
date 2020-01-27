import React, {useState, Fragment} from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Loader from "../Loader"
import './table.scss';

const StickyHeadTable = ({
  type,
  tableData,
  start,
  setStart,
  columns,
  createData,
  pageSize,
  setPageSize,
  totalCount,
  page,
  setPage
}) => {
  
  console.log(tableData)
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [rowsData, setRowsData] = React.useState([]);
  const [count, setCount] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setStart((newPage+1)); 
    // setStart(2);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
     setPage(0);
     setStart(0)

    setPageSize(event.target.value)

    
  };

  const clickedRow = row => {
    // alert(JSON.stringify(row.name));
  };
  let rows = [];

  React.useEffect(() => {
      setCount(totalCount)
    if (!!tableData) {
      if (type === "notification") {
        {
          tableData.map((value, index) => {
            rows.push(
              createData(
                value.NOTIFICATIONNAME,
                value.CATEGORYNAME,
                value.UPDATED_DATE,
                value.STATUS,
                value.NOTIFICATIONID,
                value.CATEGORYID,
                value.DESCRIPTION
              )
            ); return null;
          });
        }
      }
     else if (type === "template") {
          tableData.map((value, index) => {
            rows.push(
              createData(
                value.NOTIFICATIONNAME,
                value.CHANNELNAME,
                value.TEMPLATENAME,
                value.UPDATEDATE,
                value.STATUS,
                value.TEMPLATEID,
                value.NOTIFICATIONID,
                value.CHANNELID
              )
            );return null;
          });
        }
        else if (type === "reports") {
            tableData.map((value, index) => {
                rows.push(
                  createData(
                    value.notifcationname,
                    value.templatename,
                    value.itemid,
                    value.channelname,
                    value.sentdate,
                    value.count
                  )
                );return null;
                
              });
        }
    }
    setRowsData(rows);
  }, [tableData,start,columns,page]);

  return (
      <Paper className='root'>
        <TableContainer className='tableContainer'>
          <Table stickyHeader aria-label="sticky table" className='table'>
            <TableHead className='stickyHeader'>
              <TableRow className='tableRow'>
                {columns.map((column,index) => (
                  <TableCell
                    className='stickyHeader'
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {(rowsData.length > 0 )? <TableBody>
              {rowsData
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index) => {
                  return (
                    <TableRow className='tableRow'
                     key = {index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => {
                        clickedRow(row);
                      }}
                    >
                      {columns.map((column,index) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                           key = {index}
                            key={column.id}
                            align={column.align}
                            className='tableBody'
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody> :<TableBody><TableRow><TableCell height='230' align='center' colSpan={Object.keys(columns).length}>{ count === 0 ? <div>No data Found</div> :<Loader/> }</TableCell></TableRow></TableBody>}
          </Table>
        </TableContainer>
        {/* {!! totalCount ?  */}
        <TablePagination
          rowsPerPageOptions={[2, 4, 6]}
          component="div"
          className='paginaion'
          count={!!count ? count : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> 
        {/* // : <div>No Data Found</div>} */}
      </Paper>
  );
};
export default StickyHeadTable;
