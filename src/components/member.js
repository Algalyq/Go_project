

export default function Member(props){
     return(
        <div class="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
            <img src={props.img} class="img-fluid mb-5" alt="People"/>
            <h3 clas><a href="#"><span class="">{props.name}</span></a></h3>
            <span class="d-block position mb-4">CEO, Founder, Atty.</span>
            <p>Separated they live in.
            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
            <p class="mb-0"><a href="#" class="more dark">Learn More <span class="icon-arrow_forward"></span></a></p>
        </div> 
     )
}