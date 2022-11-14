import React from "react";
import { Link, Route, Routes } from 'react-router-dom'
import { AboutUs } from '../AboutUs/AboutUs'
import { Contact } from '../Contact/Contact'
import { LogIn } from '../LogIn/LogIn'
import { NewOrder } from '../NewOrder/NewOrder'
import { Prices } from '../Prices/Prices'
import { Tracking } from '../Tracking/Tracking'

export function Home() {
    return (
        <div>
        <ul>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">LogIn</Link></li>
        <li><Link to="/new">NewOrder</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        <li><Link to="/tracking">Tracking</Link></li>
      </ul>
        </div>
    );
}