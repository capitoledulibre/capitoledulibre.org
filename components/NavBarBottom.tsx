import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2022, 2023, 2024];

const NavBarBottom = () => {
  const yearLinks = years.map((year =>
    <a
      key={year}
      className="nav-link px-3 py-2"
      href={`//${year}.capitoledulibre.org`}>
          {year}
    </a>
  ));

  return (
<nav className="navbar bg-light px-3">
  Éditions précédentes:
  <div className="container-fluid justify-content-start">
    {yearLinks}
  </div>
</nav>
  );
}

export default NavBarBottom;
