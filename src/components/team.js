import person1 from '../images/person_1.jpg';
import person2 from '../images/person_2.jpg';
import person3 from '../images/person_3.jpg';
import person4 from '../images/person_4.jpg';
import Member from './member';

export default function Team(){
    return(
        <div class="untree_co-section">
			<div class="container">

				<div class="row mb-5">
					<div class="col-lg-5 mx-auto text-center">
						<h2 class="section-title">Our Team</h2>
					</div>
				</div>

				<div class="row">

					{
                        [{name:"Lawson Arnold", img: person1 }, {name:"Jeremy Walker", img: person2 },
                        {name:"Patrik White", img: person3 },{name:"Kathryn Ryan", img: person4 }
                        ].map((item, index) =>(
                            <Member img={item.img} name={item.name}></Member>
                        ))
                    }
				</div>
			</div>
		</div>
    )
}