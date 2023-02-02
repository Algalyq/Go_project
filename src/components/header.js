import { Link } from 'react-router-dom';
import cart from '../images/cart.svg';
import user from '../images/user.svg';


function Header(){
     return(
        <nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div class="container">
				<Link class="navbar-brand" href="index.html">Furni<span>.</span></Link>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarsFurni">
					<ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li class="nav-item active">
							<Link class="nav-link" to="/">Home</Link>
						</li>
						<li><Link class="nav-link" to="/shop">Shop</Link></li>
						<li><Link class="nav-link" to="/info">About us</Link></li>
						<li><Link class="nav-link" to="/services">Services</Link></li>
						<li><Link class="nav-link" to="/contact">Contact us</Link></li>
					</ul>

					<ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li><Link class="nav-link" to="/login"><img src={user} alt="logo"/></Link></li>
						<li><Link class="nav-link"  to="/admin"><img src={cart} alt="logo"/></Link></li>
					</ul>
				</div>
			</div>
		</nav>
     )
}

export default Header;