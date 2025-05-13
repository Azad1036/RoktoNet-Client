const Footer = () => {
  return (
    <div>
      <footer className="bg-red-100 py-8 pt-12">
        <div className="container mx-auto text-center">
          <p>© 2023 Blood Donation App. All rights reserved.</p>
          <div className="mt-4">
            <a href="/blog" className="mx-2">
              Blog
            </a>
            <a href="/contact" className="mx-2">
              Contact
            </a>
            <a href="/privacy" className="mx-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
