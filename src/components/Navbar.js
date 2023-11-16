import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link to='/index.html'>
					<h1>Sketchy</h1>
				</Link>
			</div>
		</header>
	)

};

export default Navbar;
