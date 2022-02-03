import React, { Component } from 'react';
import { useState } from 'react';
import './Navbar.css';
import Dropdown from './Dropdown';
import Button from './Button'

function Navbar() {
	const [selected, setSelected] = useState('Who is this?');
	return (
		<div>
			<nav className="NavbarItems">
				<h1 className="navbar-logo">Bug Tracker</h1>
				<Dropdown
					className="dropdown"
					selected={selected}
					setSelected={setSelected}
				/>
        <Button />
			</nav>
		</div>
	);
}

export default Navbar;
