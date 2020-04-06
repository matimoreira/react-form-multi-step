import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import Marathones from './Marathones';
import Emulator from './Emulator';
import Mapa from './Components/emulador/mapa';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">Navbar</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<div className="nav-link"><Link to="/">Home</Link><span className="sr-only">(current)</span></div>
							</li>
							<li className="nav-item">
								<div className="nav-link" ><Link to="/marathon">Marathon</Link></div>
							</li>
							<li className="nav-item">
								<div className="nav-link" ><Link to="/emulator">Emulador</Link></div>
							</li>
							<li className="nav-item">
								<div className="nav-link" ><Link to="/mapaEmulador">mapaEmulador</Link></div>
							</li>
						</ul>
					</div>
				</nav>
				<Switch>
					<Route exact path="/">
						<div>Home</div>
					</Route>
					<Route path="/marathon">
						<Marathones />
					</Route>
					<Route path="/emulator">
						<Emulator></Emulator>
					</Route>
					<Route path="/mapaEmulador">
						<Mapa idMarathon={20}></Mapa>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
