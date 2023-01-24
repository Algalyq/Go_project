import About from "../components/about";
import Choice from "../components/choice";
import Help from "../components/help";
import Material from "../components/material";
import Popular from "../components/popular";
import Testimonials from "../components/testimonials";


export default function Main(){
     return(
        <main>
            <About text="Home"></About>
            <Material></Material>
            <Choice></Choice>
            <Help></Help>
            <Popular></Popular>
            <Testimonials></Testimonials>
        </main>
     )
}