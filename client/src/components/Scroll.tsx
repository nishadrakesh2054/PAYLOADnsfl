import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Scroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // Fallback in case smooth scrolling doesn't complete
      setTimeout(() => {
        if (window.pageYOffset > 0) {
          window.scrollTo(0, 0);
        }
      }, 500);
    } catch (e) {
      // Ultimate fallback
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default Scroll;
