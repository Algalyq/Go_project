import person1 from '../images/person-1.png';
import People from './people';


export default function Testimonials(){
    return(
        <div class="testimonial-section">
			<div class="container">
				<div class="row">
					<div class="col-lg-7 mx-auto text-center">
						<h2 class="section-title">Testimonials</h2>
					</div>
				</div>

				<div class="row justify-content-center">
					<div class="col-lg-12">
						<div class="testimonial-slider-wrap text-center">

							<div id="testimonial-nav">
								<span class="prev" data-controls="prev"><span class="fa fa-chevron-left"></span></span>
								<span class="next" data-controls="next"><span class="fa fa-chevron-right"></span></span>
							</div>

							<div class="testimonial-slider">
								
								{
                                    [{img: person1, img: person1, img: person1}].map((item) =>(
                                        <People img={item.img}></People>
                                    ))
                                }
								

							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
    )
}