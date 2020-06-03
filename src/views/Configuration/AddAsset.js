import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControl,
  MenuItem,
  InputLabel,
  CircularProgress,
  TextField,
  Select,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { search } from '../../services';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formControl: {
    minWidth: 160,
  },
  input: {
    margin: 0,
  },
  submit: {
    width: 120,
  },
  mainInput: {
    flexGrow: 0.9,
  },
}));

function AddAsset({
  userId,
  initiateAddAsset,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [assetCategory, setAssetCategory] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [asset, setAsset] = React.useState(null);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        initiateAddAsset(userId, {
          category: assetCategory,
          ...asset,
          amount,
        });
      }}
    >
      <FormControl
        required
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel id="demo-simple-select-outlined-label">Asset type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={({ target }) => setAssetCategory(target.value)}
          value={assetCategory}
          label="Asset category"
        >
          <MenuItem value="Commodity">Commodity</MenuItem>
          <MenuItem value="Stock / Bonds">Stock / Bonds</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        className={classes.mainInput}
        onChange={(e, newValue) => setAsset(newValue)}
        value={asset}
        id="asset"
        name="asset"
        required
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => `[${option.symbol}] ${option.name}`}
        options={options}
        loading={loading}
        renderInput={(params) => {
          const {
            InputLabelProps,
            InputProps,
            disabled,
            fullWidth,
            id,
            inputProps,
            size,
          } = params;
          return (
            <TextField
              required
              className={classes.input}
              onChange={({ target }) => {
                setLoading(true);
                search(target.value).then((res) => {
                  setOptions(res);
                  setLoading(false);
                });
              }}
              InputLabelProps={InputLabelProps}
              disabled={disabled}
              fullWidth={fullWidth}
              id={id}
              inputProps={inputProps}
              size={size}
              label="Asset"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      />
      <TextField
        className={classes.input}
        id="amount"
        name="amount"
        type="number"
        margin="normal"
        onChange={({ target }) => setAmount(target.value)}
        value={amount}
        required
        label="Amount"
        variant="outlined"
      />
      <Button
        className={classes.submit}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
}

AddAsset.propTypes = {
  userId: PropTypes.string.isRequired,
  initiateAddAsset: PropTypes.func.isRequired,
};

export default AddAsset;
