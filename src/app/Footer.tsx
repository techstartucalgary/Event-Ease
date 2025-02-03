import './footer.css';
import {Suspense} from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
            <Suspense fallback={<div>Loading...</div>}>
                    <ul className="footer-links">
                        <li><a href="/about">Our Story</a></li>
                        <li><a href="/team">Team</a></li>
                    </ul>
            </Suspense>
                </div>

                <div className="footer-section">
                    <h3>Services</h3>
            <Suspense fallback={<div>Loading...</div>}>
                    <ul className="footer-links">
                        <li><a href="/services">What We Offer</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
            </Suspense>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
            <Suspense fallback={<div>Loading...</div>}>
                    <ul className="footer-links">
                        <li><a href="/contact">Get in Touch</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/help">Help Center</a></li>
                    </ul>
            </Suspense>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Event Ease. All rights reserved.</p>
            </div>
        </footer>
    );
}
