import cross from '../images/cross.svg';

export default function Product(props){
    return(
        <div class="col-12 col-md-4 col-lg-3 mb-5">
            <a class="product-item" href="cart.html">
                <img src={props.img} class="img-fluid product-thumbnail" />
                <h3 class="product-title">{props.name}</h3>
                <strong class="product-price">${props.price}</strong>

                <span class="icon-cross">
                    <img src={cross} class="img-fluid" />
                </span>
            </a>
        </div> 
    )
}