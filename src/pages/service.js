import About from "../components/about";
import truck from '../images/truck.svg';
import bag from "../images/bag.svg";
import support from "../images/support.svg";
import returns from "../images/return.svg";
import Reason from '../components/reason';
import Material from "../components/material";
import Testimonials from "../components/testimonials";

export default function Service(){
    return(
        <main>
            <About text="Services"></About>
            <div class="why-choose-section">
                <div class="container">
                    <div class="row my-5">
                    {
                        [{name:"Fast & Free Shipping", img: truck}, {name: "Easy to Shop", img: bag},
                        {name: "24/7 Support", img: support},{name: "Hassle Free Returns", img: returns},
                        {name:"Fast & Free Shipping", img: truck}, {name: "Easy to Shop", img: bag},
                        {name: "24/7 Support", img: support},{name: "Hassle Free Returns", img: returns}
                        ].map((item, index) =>(
                            <Reason key={index} name={item.name} img={item.img} class="col-6 col-md-6 col-lg-3 mb-4"></Reason>
                        ))
                    }
                    </div>
                </div>
            </div>
            <Material></Material>
            <Testimonials></Testimonials>
        </main>
    )
}