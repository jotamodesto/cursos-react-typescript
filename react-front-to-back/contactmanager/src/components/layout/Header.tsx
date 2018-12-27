import React, { FunctionComponent } from "react";
//import PropTypes from "prop-types"; Não é necessário uma vez que estou usando typescript. Mas fica como referência

interface IHeaderProps {
  branding: string;
}

// Usar a o tipo FunctionComponent se eu quiser usar defaultProps
const Header: FunctionComponent<IHeaderProps> = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "My App"
};

// Não é necessário uma vez que estou usando typescript. Mas fica como referência
// Header.propTypes = {
//   branding: PropTypes.string.isRequired
// };

export default Header;
