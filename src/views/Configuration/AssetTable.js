import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

const tableIcons = {
  /* eslint-disable react/jsx-props-no-spreading */
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  /* eslint-enable react/jsx-props-no-spreading */
};

function AssetTable({
  userId,
  assets,
  initiateRemoveAsset,
}) {
  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        { title: 'Symbol', field: 'symbol' },
        { title: 'Name', field: 'name' },
        { title: 'Category', field: 'category' },
        { title: 'Type', field: 'type' },
        { title: 'Amount', field: 'amount' },
        { title: 'Region', field: 'region' },
      ]}
      data={assets}
      title="Demo Title"
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowDelete: ({ id }) => initiateRemoveAsset(userId, id),
      }}
    />
  );
}

AssetTable.propTypes = {
  userId: PropTypes.string.isRequired,
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      region: PropTypes.string,
    }),
  ).isRequired,
  initiateRemoveAsset: PropTypes.func.isRequired,
};

export default AssetTable;
