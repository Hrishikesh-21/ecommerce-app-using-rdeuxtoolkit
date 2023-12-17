import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseItemQuantity, getCartTotal, increaseItemQuantity, removeItem } from '../Redux Store/slice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Badge, Typography, styled } from '@mui/material';



export default function MaxWidthDialog() {


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));





  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const buttonstyle = { maxHeight: '20px', minHeight: '20px', margin: '10px', alignItems: 'center' }

  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );



  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <React.Fragment>
      <StyledBadge badgeContent={cart.length} color="secondary">
      <ShoppingCart onClick={handleClickOpen}>
      </ShoppingCart>
      </StyledBadge>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Cart Item</DialogTitle>
        <DialogContent>

          <div>
            <h5>Cart - {cart.length} items</h5>
          </div>

          <div >
            {cart?.map((data) => (
              <div >
                <div >
                  <div

                    data-mdb-ripple-color="light"
                  >
                    <img style={{ maxWidth: "500px", maxHeight: "500px", display: 'flex', justifyContent: 'center' }}
                      src={data.img}

                    />
                  </div>
                </div>

                <div  >
                  <p>
                    <strong>{data.title}</strong>
                  </p>
                </div>



                <div
                  // className="d-flex mb-4"
                  style={{ display: 'flex', margin: '10px' }}
                >
                  <AddShoppingCartIcon
                    onClick={() =>
                      dispatch(increaseItemQuantity(data.id))
                    }
                    style={buttonstyle}
                  />


                  <Typography  style={buttonstyle}>{data.quantity}</Typography>

                  <RemoveShoppingCartIcon
                    onClick={() =>
                      dispatch(decreaseItemQuantity(data.id))
                    }
                    style={buttonstyle}
                  />


                  <DeleteIcon
                    title="Remove item"
                    onClick={() => dispatch(removeItem(data.id))}
                    style={buttonstyle}
                  />


                  {/* <label className="form-label" for="form1">
                    Quantity
                  </label> */}

                  <p className="text-start text-md-center">
                    <strong>{data.price}</strong>
                  </p>
                </div>

              </div>
            ))}
          </div>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
