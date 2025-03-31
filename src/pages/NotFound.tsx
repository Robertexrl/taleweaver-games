
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-taleweaver-lightPurple/30 to-white p-4">
      <Logo size="lg" className="mb-8" />
      
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-4 text-taleweaver-purple">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! This page doesn't exist.</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for can't be found. Let's get you back to telling stories and playing games!
        </p>
        
        <Link to="/">
          <Button className="btn-primary">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
