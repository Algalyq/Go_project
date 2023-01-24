import About from "../components/about";
import Choice from "../components/choice";
import Team from "../components/team";
import Testimonials from "../components/testimonials";


export default function Info(){
    return(
       <main>
            <About text="About us"></About>
            <Choice></Choice>
            <Team></Team>
            <Testimonials></Testimonials>
       </main>
    )
}