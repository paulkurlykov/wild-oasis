import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import StartBookingCreating from "./StartBookingCreating";
import { useSearchParams } from "react-router-dom";




function AddBooking() {

    return <Modal>
        <Modal.Open opens="booking-form" >
            <Button >Add new booking </Button>
        </Modal.Open>
        <Modal.Window name="booking-form" >
            <StartBookingCreating/>
        </Modal.Window>
    </Modal>
}

export default AddBooking;