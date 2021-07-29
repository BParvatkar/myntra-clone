import { Alert } from "react-bootstrap";


// Alert Component for network error
const NetworkErrorAlert = (props) => {

    const onCloseCallback = props.onCloseCallback // Callback to call when close button is clicked on alert

    return (
        <Alert variant="danger" dismissible onClose={onCloseCallback}>
            <Alert.Heading>Ohh oh.. </Alert.Heading>
            <p>
                Failed to load products due to network error. Please try again.
            </p>
        </Alert>
    );
}


export default NetworkErrorAlert;