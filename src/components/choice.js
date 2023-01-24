import truck from '../images/truck.svg';
import bag from "../images/bag.svg";
import support from "../images/support.svg";
import returns from "../images/return.svg";
import Reason from './reason';
import why from '../images/why-choose-us-img.jpg';


export default function Choice(){
    return(
        <div class="why-choose-section">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-6">
						<h2 class="section-title">Why Choose Us</h2>
						<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

						<div class="row my-5">
                            {
                                [{name:"Fast & Free Shipping", img: truck}, {name: "Easy to Shop", img: bag},
                                {name: "24/7 Support", img: support},{name: "Hassle Free Returns", img: returns}
                                ].map((item, index) =>(
                                    <Reason name={item.name} img={item.img} class="col-6 col-md-6"></Reason>
                                ))
                            }
						</div>
					</div>

					<div class="col-lg-5">
						<div class="img-wrap">
							<img src={why} alt="Image" class="img-fluid" />
						</div>
					</div>

				</div>
			</div>
		</div>
    )
}