import { Card } from "react-bootstrap"


// Card component to display single product
const ProductCard = (props) => {
    const productItem = props.productItem;
    const brand = productItem.brand;

    const additionalInfo = productItem.additionalInfo;
    const additionalInfoSliced = additionalInfo.length > 25 ? productItem.additionalInfo.slice(0, 25) + '...' : productItem.additionalInfo;
    const imageSrc = productItem.searchImage;

    const price = productItem.price
    const mrp = productItem.mrp
    const discountDisplayLabel = productItem.discountDisplayLabel

    const strongCurrentPrice = <strong>Rs {price}</strong>
    const smallStrikedMrp = <small><del>Rs {mrp}</del></small>
    const discountInRed = <span className='text-danger'>{discountDisplayLabel}</span>

    const cardPriceText = <span>{strongCurrentPrice} {smallStrikedMrp} {discountInRed}</span>

    return (
        <Card>
            <Card.Img variant='top' src={imageSrc} />
            <Card.Body>
                <Card.Title style={{ fontSize: 15 }}>{brand}</Card.Title>
                <Card.Text style={{ fontSize: 14 }}>{additionalInfoSliced}</Card.Text>
                <Card.Text style={{ fontSize: 14 }}>
                    <a href='#' className='text-reset text-decoration-none stretched-link'>{cardPriceText}</a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;