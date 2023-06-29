import profileImage from "../../assets/images/account/profile.png";

function ProfilePage() {
	return (
		<div className="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div className="p-4 pt-5">
					<a
						href="/"
						className="img logo rounded-circle mb-5"
						style={{ backgroundImage: `url(${profileImage})` }}
					/>
					<ul className="list-unstyled components mb-5">
						<li className="active">
							<a
								href="#homeSubmenu"
								data-toggle="collapse"
								aria-expanded="false"
								className="dropdown-toggle"
							>
								Home
							</a>
							<ul className="collapse list-unstyled" id="homeSubmenu">
								<li>
									<a href="/">Home 1</a>
								</li>
								<li>
									<a href="/">Home 2</a>
								</li>
								<li>
									<a href="/">Home 3</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/">About</a>
						</li>
						<li>
							<a
								href="#pageSubmenu"
								data-toggle="collapse"
								aria-expanded="false"
								className="dropdown-toggle"
							>
								Pages
							</a>
							<ul className="collapse list-unstyled" id="pageSubmenu">
								<li>
									<a href="/">Page 1</a>
								</li>
								<li>
									<a href="/">Page 2</a>
								</li>
								<li>
									<a href="/">Page 3</a>
								</li>
							</ul>
						</li>
						<li>
							<a href="/">Portfolio</a>
						</li>
						<li>
							<a href="/">Contact</a>
						</li>
					</ul>
				</div>
			</nav>

			<div id="content" className="p-4 p-md-5">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="container-fluid">
						<button
							type="button"
							id="sidebarCollapse"
							className="btn btn-primary"
						>
							<i className="fa fa-bars"></i>
							<span className="sr-only">Toggle Menu</span>
						</button>
						<button
							className="btn btn-dark d-inline-block d-lg-none ml-auto"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<i className="fa fa-bars"></i>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="nav navbar-nav ml-auto">
								<li className="nav-item active">
									<a className="nav-link" href="/">
										Home
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/">
										About
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/">
										Portfolio
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/">
										Contact
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<h2 className="mb-4">Sidebar #01</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</div>
	);
}

export default ProfilePage;
