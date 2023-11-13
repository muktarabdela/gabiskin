import { Button, TextField } from "@material-ui/core";
import { useContext } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import { Link } from "react-router-dom";

const DeliveryForm = () => {
    const { setStep, DeliveryData, setDeliveryData, submitDeliveryData } = useContext(MultiStepContext)


    return (
        <div className="w-[40vh] mx-auto">
            <p className="text-md text-gray-700 leading-tight text-center text-[23px] mb-2">
                Delivery Address
            </p>
            <div className="mb-2">
                <TextField
                    label="First name"
                    margin="normal"
                    variant="outlined"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    value={DeliveryData["firstName"]}
                    onChange={(e) => setDeliveryData({ ...DeliveryData, "firstName": e.target.value })}
                />

            </div>
            <div className="mb-2">
                <TextField
                    label="Last name"
                    margin="normal"
                    variant="outlined"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    value={DeliveryData["lastName"]}
                    onChange={(e) => setDeliveryData({ ...DeliveryData, "lastName": e.target.value })}

                />
            </div>
            <div className="mb-2">
                <TextField
                    label="Phone Number"
                    margin="normal"
                    variant="outlined"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    value={DeliveryData["phoneNumber"]}
                    onChange={(e) => setDeliveryData({ ...DeliveryData, "phoneNumber": e.target.value })}

                />
            </div>
            <div className="mb-2">
                <select
                    name="SubCity"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    value={DeliveryData["subCity"]}
                    onChange={(e) => setDeliveryData({ ...DeliveryData, "subCity": e.target.value })}
                >
                    <option value="" disabled selected>Select a Sub City</option>
                    <option value="Addis Ketema">Addis Ketema</option>
                    <option value="Akaky Kaliti">Akaky Kaliti</option>
                    <option value="Arada">Arada</option>
                    <option value="Bole">Bole</option>
                    <option value="Gullele">Gullele</option>
                    <option value="Kiros">Kiros</option>
                    <option value="Kolfie Keranio">Kolfie Keranio</option>
                    <option value="Lideta">Lideta</option>
                    <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                    <option value="Yeka">Yeka</option>
                    <option value="Lemi Kura">Lemi Kura</option>
                </select>

            </div>
            <div className="mb-3">
                <TextField
                    label="Delivery Location"
                    margin="normal"
                    variant="outlined"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                    value={DeliveryData["DeliveryLocation"]}
                    onChange={(e) => setDeliveryData({ ...DeliveryData, "DeliveryLocation": e.target.value })}
                />
            </div>
            <div className="flex mx-auto">
                <div className="mx-auto">
                    <Link to="/">
                        <Button variant="contained" color="primary"> Back to shop</Button>
                    </Link>

                </div>
                <div className="mx-auto">
                    <Button className="" variant="contained" color="primary" onClick={() => {
                        submitDeliveryData();
                        setStep(2);
                    }}> Next</Button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryForm;
