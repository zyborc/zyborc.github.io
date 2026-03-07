import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="section">
      <div className="shell prose-shell">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <Link className="button button--primary" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
