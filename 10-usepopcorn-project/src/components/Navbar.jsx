// import React, { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";

const Navbar = () => {
	return (
		<nav className="nav-bar">
			<Logo />
			<Search />
			<NumResults />
		</nav>
	);
};

export default Navbar;
