import SidebarPage from "./SidebarPage";

function ProfilePage({ accountMenuChange, menu }) {
	/**
	 * Handle the change of the menu in the sidebar
	 * - This function is passed to the SidebarPage component
	 * @param { Event } event Click event
	 * @param { string } menu Menu name
	 */
	const handleProfileMenuChange = (event, menu) => {
		accountMenuChange(event, menu);
	};

	return (
		<div id="content" className="p-4 p-md-5">
			<SidebarPage sidebarMenuChange={handleProfileMenuChange} menu={menu} />
			<div>
				<div className="row">
					<div className="col-12">
						<form className="file-upload">
							<div className="row gx-5">
								<div className="col-12 mb-3 mb-xxl-0">
									<div className="bg-secondary-soft rounded">
										<div className="row g-3">
											<div className="col-12">
												<label htmlFor="lastName" className="form-label">
													Nom<span className="red">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													placeholder="John"
													id="lastName"
												/>
											</div>
										</div>
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="firstName" className="form-label">
													Prénom<span className="red">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													placeholder="Doe"
													id="firstName"
												/>
											</div>
										</div>
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="email" className="form-label">
													Adresse email<span className="red">*</span>
												</label>
												<input
													type="email"
													className="form-control"
													id="email"
													placeholder="johndoe@hotmail.fr"
												/>
											</div>
										</div>
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="password" className="form-label">
													Nouveau mot de passe<span className="red">*</span>
												</label>
												<input
													placeholder="******"
													type="password"
													className="form-control"
													id="password"
												/>
											</div>
										</div>
										<div className="row g-3 mt-2">
											<div className="col-12">
												<label htmlFor="confirmPassword" className="form-label">
													Confirmation mot de passe{" "}
													<span className="red">*</span>
												</label>
												<input
													placeholder="******"
													type="password"
													className="form-control"
													id="confirmPassword"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="gap-3 d-md-flex text-center">
								<button className="button profile_button">
									<span>Mettre à jour</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
