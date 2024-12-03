import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

function CheckoutButton({ bookingId }) {

  const {checkOutMutation, isCheckingOut} = useCheckOut();
  return (
    <Button 
    variation="primary" 
    size="small"
    onClick={() => checkOutMutation(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
