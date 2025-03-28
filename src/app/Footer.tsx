import "./footer.css";
import Link from "next/link";
import { Suspense } from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Main Footer Sections */}
                <div className="footer-sections">
                    <div className="footer-section">
                        <h3 className="footer-heading">About Us</h3>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/about">Our Story</Link>
                                </li>
                                <li>
                                    <Link href="/team">Team</Link>
                                </li>
                            </ul>
                        </Suspense>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Services</h3>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/services">What We Offer</Link>
                                </li>
                                <li>
                                    <Link href="/pricing">Pricing</Link>
                                </li>
                                <li>
                                    <Link href="/support">Support</Link>
                                </li>
                            </ul>
                        </Suspense>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Contact</h3>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/contact">Get in Touch</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQ</Link>
                                </li>
                                <li>
                                    <Link href="/help">Help Center</Link>
                                </li>
                            </ul>
                        </Suspense>
                    </div>

                    {/* Social Links Section */}
                    <div className="footer-section">
                        <h3 className="footer-heading">Connect</h3>
                        <div className="social-links">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                            >
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Event Ease. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
